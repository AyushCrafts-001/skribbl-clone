import "dotenv/config";
import express from "express";
import http from "node:http";
import cors from "cors";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import roomRoutes from "./routes/roomRoutes.js";
import roomManager from "./game/RoomManager.js";

const app = express();
const server = http.createServer(app);

// Allow configured Client URL or fallback for development
const clientOrigin = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin || origin === clientOrigin || origin.startsWith("http://localhost:")) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev/testing
    },
    credentials: true,
  })
);

app.use(express.json());

// REST Routes
app.use("/api/rooms", roomRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Skribbl Clone backend is running!",
    timestamp: new Date().toISOString(),
    activeRooms: roomManager.rooms.size,
  });
});

app.get("/", (req, res) => {
  res.json({
    name: "Skribbl.io Clone API",
    status: "online",
    activeRooms: roomManager.rooms.size,
  });
});

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  pingInterval: 20000,
  pingTimeout: 10000,
});

// Provide io instance to room manager
roomManager.setIO(io);

// =======================================================
// SOCKET.IO EVENT HANDLERS
// =======================================================

io.on("connection", (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);

  // -----------------------------------------------------
  // ROOM JOIN
  // -----------------------------------------------------
  socket.on("room:join", ({ roomCode, playerName, avatar } = {}, callback) => {
    try {
      if (!roomCode || !playerName) {
        return callback?.({
          success: false,
          message: "Room code and player name are required.",
        });
      }

      const code = roomCode.trim().toUpperCase();
      let room = roomManager.getRoom(code);

      if (!room) {
        return callback?.({
          success: false,
          message: `Room "${code}" does not exist.`,
        });
      }

      // Add player to room object
      let player;
      try {
        player = room.addPlayer(socket.id, playerName, avatar);
      } catch (err) {
        return callback?.({
          success: false,
          message: err.message,
        });
      }

      // Join Socket.io room channel
      const socketRoom = `room:${code}`;
      socket.join(socketRoom);
      roomManager.registerSocket(socket.id, code);

      socket.data.roomCode = code;
      socket.data.playerName = player.name;

      // Broadcast updated players list to everyone in room
      io.to(socketRoom).emit("room:players", room.getPlayersJSON());

      // Send system message
      io.to(socketRoom).emit("chat:message", {
        type: "system",
        text: `${player.name} joined the room!`,
        timestamp: Date.now(),
      });

      // Response to joining player
      callback?.({
        success: true,
        roomCode: code,
        player: player.toJSON(),
        players: room.getPlayersJSON(),
        settings: room.settings,
        gameState: {
          phase: room.game.phase,
          round: room.game.round,
          maxRounds: room.game.maxRounds,
          duration: room.game.roundDuration,
          timeLeft: room.game.timeLeft,
          drawer: room.game.currentDrawer ? room.game.currentDrawer.toJSON() : null,
          maskedWord: room.game.getMaskedWord(),
          isDrawer: room.game.currentDrawer?.id === socket.id,
        },
      });

      // Send canvas history if game is currently in drawing phase (for late joins)
      if (room.game.phase === "drawing" && room.game.drawHistory.length > 0) {
        socket.emit("drawing:history", {
          history: room.game.drawHistory,
        });
      }
    } catch (error) {
      console.error("room:join error:", error);
      callback?.({
        success: false,
        message: "Failed to join room.",
      });
    }
  });

  // -----------------------------------------------------
  // ROOM SETTINGS UPDATE (HOST ONLY)
  // -----------------------------------------------------
  socket.on("room:update_settings", ({ roomCode, settings } = {}, callback) => {
    try {
      const code = (roomCode || socket.data.roomCode || "").toUpperCase();
      const room = roomManager.getRoom(code);
      if (!room) return callback?.({ success: false, message: "Room not found." });

      const updated = room.updateSettings(socket.id, settings);

      io.to(`room:${code}`).emit("room:settings_updated", {
        settings: updated,
      });

      callback?.({ success: true, settings: updated });
    } catch (err) {
      callback?.({ success: false, message: err.message });
    }
  });

  // -----------------------------------------------------
  // KICK PLAYER (HOST ONLY)
  // -----------------------------------------------------
  socket.on("room:kick", ({ roomCode, targetSocketId } = {}, callback) => {
    try {
      const code = (roomCode || socket.data.roomCode || "").toUpperCase();
      const room = roomManager.getRoom(code);
      if (!room) return callback?.({ success: false, message: "Room not found." });

      const kicked = room.kickPlayer(socket.id, targetSocketId);

      // Force target socket to leave
      const targetSocket = io.sockets.sockets.get(targetSocketId);
      if (targetSocket) {
        targetSocket.leave(`room:${code}`);
        targetSocket.emit("room:kicked", {
          message: "You have been removed from the room by the host.",
        });
      }

      io.to(`room:${code}`).emit("room:players", room.getPlayersJSON());
      io.to(`room:${code}`).emit("chat:message", {
        type: "system",
        text: `${kicked.name} was kicked from the room.`,
        timestamp: Date.now(),
      });

      callback?.({ success: true });
    } catch (err) {
      callback?.({ success: false, message: err.message });
    }
  });

  // -----------------------------------------------------
  // START GAME (HOST ONLY)
  // -----------------------------------------------------
  socket.on("game:start", ({ roomCode } = {}, callback) => {
    try {
      const code = (roomCode || socket.data.roomCode || "").toUpperCase();
      const room = roomManager.getRoom(code);

      if (!room) {
        return callback?.({ success: false, message: "Room not found." });
      }

      const player = room.getPlayer(socket.id);
      if (!player || !player.isHost) {
        return callback?.({ success: false, message: "Only the host can start the game." });
      }

      if (room.getConnectedPlayers().length < 2) {
        return callback?.({
          success: false,
          message: "At least 2 players are needed to start the game.",
        });
      }

      room.game.start();
      room.syncToDB("playing");

      callback?.({ success: true });
    } catch (err) {
      callback?.({ success: false, message: err.message });
    }
  });

  // -----------------------------------------------------
  // RESTART GAME (RETURN TO LOBBY / PLAY AGAIN)
  // -----------------------------------------------------
  socket.on("game:restart", ({ roomCode } = {}, callback) => {
    try {
      const code = (roomCode || socket.data.roomCode || "").toUpperCase();
      const room = roomManager.getRoom(code);
      if (!room) return callback?.({ success: false, message: "Room not found." });

      const player = room.getPlayer(socket.id);
      if (!player || !player.isHost) {
        return callback?.({ success: false, message: "Only the host can restart the game." });
      }

      room.game.reset();

      io.to(`room:${code}`).emit("game:reset", {
        players: room.getPlayersJSON(),
      });

      callback?.({ success: true });
    } catch (err) {
      callback?.({ success: false, message: err.message });
    }
  });

  // -----------------------------------------------------
  // CHOOSE WORD
  // -----------------------------------------------------
  socket.on("game:choose_word", ({ roomCode, word } = {}, callback) => {
    try {
      const code = (roomCode || socket.data.roomCode || "").toUpperCase();
      const room = roomManager.getRoom(code);
      if (!room) return callback?.({ success: false, message: "Room not found." });

      const success = room.game.chooseWord(socket.id, word);
      callback?.({ success });
    } catch (err) {
      callback?.({ success: false, message: err.message });
    }
  });

  // -----------------------------------------------------
  // DRAWING EVENTS
  // -----------------------------------------------------
  socket.on("drawing:start", (data) => {
    const code = (data?.roomCode || socket.data.roomCode || "").toUpperCase();
    const room = roomManager.getRoom(code);
    if (!room || room.game.phase !== "drawing" || room.game.currentDrawer?.id !== socket.id) return;

    room.game.addStroke(data);
    socket.to(`room:${code}`).emit("drawing:start", data);
  });

  socket.on("drawing:move", (data) => {
    const code = (data?.roomCode || socket.data.roomCode || "").toUpperCase();
    const room = roomManager.getRoom(code);
    if (!room || room.game.phase !== "drawing" || room.game.currentDrawer?.id !== socket.id) return;

    room.game.addStroke(data);
    socket.to(`room:${code}`).emit("drawing:move", data);
  });

  socket.on("drawing:end", (data) => {
    const code = (data?.roomCode || socket.data.roomCode || "").toUpperCase();
    const room = roomManager.getRoom(code);
    if (!room || room.game.phase !== "drawing" || room.game.currentDrawer?.id !== socket.id) return;

    room.game.addStroke(data);
    socket.to(`room:${code}`).emit("drawing:end", data);
  });

  // Compatible line event
  socket.on("drawing:line", (data) => {
    const code = (data?.roomCode || socket.data.roomCode || "").toUpperCase();
    const room = roomManager.getRoom(code);
    if (!room || room.game.phase !== "drawing" || room.game.currentDrawer?.id !== socket.id) return;

    room.game.addStroke(data);
    socket.to(`room:${code}`).emit("drawing:line", data);
  });

  // Flood fill / bucket tool
  socket.on("drawing:fill", (data) => {
    const code = (data?.roomCode || socket.data.roomCode || "").toUpperCase();
    const room = roomManager.getRoom(code);
    if (!room || room.game.phase !== "drawing" || room.game.currentDrawer?.id !== socket.id) return;

    room.game.addStroke(data);
    socket.to(`room:${code}`).emit("drawing:fill", data);
  });

  // Clear canvas
  socket.on("drawing:clear", (data) => {
    const code = (data?.roomCode || socket.data.roomCode || "").toUpperCase();
    const room = roomManager.getRoom(code);
    if (!room || room.game.phase !== "drawing" || room.game.currentDrawer?.id !== socket.id) return;

    room.game.clearCanvas();
    io.to(`room:${code}`).emit("drawing:clear");
  });

  // Undo last stroke
  socket.on("drawing:undo", (data) => {
    const code = (data?.roomCode || socket.data.roomCode || "").toUpperCase();
    const room = roomManager.getRoom(code);
    if (!room || room.game.phase !== "drawing" || room.game.currentDrawer?.id !== socket.id) return;

    room.game.undoStroke();
    io.to(`room:${code}`).emit("drawing:undo", {
      history: room.game.drawHistory,
    });
  });

  // -----------------------------------------------------
  // CHAT & GUESSING
  // -----------------------------------------------------
  socket.on("chat:message", ({ roomCode, text } = {}, callback) => {
    try {
      const code = (roomCode || socket.data.roomCode || "").toUpperCase();
      const room = roomManager.getRoom(code);
      if (!room || !text || !text.trim()) return;

      const player = room.getPlayer(socket.id);
      if (!player) return;

      const trimmed = text.trim();

      // If active drawing round, pass to guess handler
      if (room.game.phase === "drawing") {
        const guessResult = room.game.handleGuess(player, trimmed);

        if (guessResult.isGuess) {
          if (guessResult.correct) {
            callback?.({ success: true, correct: true, points: guessResult.points });
            return;
          }
          if (guessResult.blocked) {
            callback?.({ success: false, blocked: true });
            return;
          }
          // If already guessed, send private chat to other guessers
        }

        if (guessResult.alreadyGuessed) {
          // Send only to drawer and players who already guessed
          const privilegedSockets = room
            .getConnectedPlayers()
            .filter((p) => p.hasGuessed || p.isDrawer)
            .map((p) => p.id);

          privilegedSockets.forEach((sockId) => {
            io.to(sockId).emit("chat:message", {
              type: "guesser_chat",
              playerName: player.name,
              text: trimmed,
              timestamp: Date.now(),
            });
          });
          callback?.({ success: true });
          return;
        }
      }

      // Normal public chat message
      io.to(`room:${code}`).emit("chat:message", {
        type: "normal",
        playerName: player.name,
        text: trimmed,
        timestamp: Date.now(),
      });

      callback?.({ success: true });
    } catch (err) {
      console.error("chat:message error:", err);
      callback?.({ success: false, message: err.message });
    }
  });

  // Backward compatibility alias for "game:guess"
  socket.on("game:guess", ({ roomCode, guess } = {}, callback) => {
    const code = (roomCode || socket.data.roomCode || "").toUpperCase();
    const room = roomManager.getRoom(code);
    if (!room) return callback?.({ success: false, message: "Room not found." });

    const player = room.getPlayer(socket.id);
    if (!player) return callback?.({ success: false, message: "Player not found." });

    const result = room.game.handleGuess(player, guess || "");
    if (result.correct) {
      callback?.({
        success: true,
        correct: true,
        points: result.points,
        message: "Correct guess!",
      });
    } else {
      callback?.({
        success: true,
        correct: false,
        message: result.close ? "You are very close!" : "Wrong guess!",
      });
    }
  });

  // -----------------------------------------------------
  // ROOM LEAVE & DISCONNECT
  // -----------------------------------------------------
  socket.on("room:leave", ({ roomCode } = {}) => {
    const code = (roomCode || socket.data.roomCode || "").toUpperCase();
    socket.leave(`room:${code}`);

    const room = roomManager.unregisterSocket(socket.id);
    if (room) {
      io.to(`room:${code}`).emit("room:players", room.getPlayersJSON());
      io.to(`room:${code}`).emit("chat:message", {
        type: "system",
        text: `${socket.data.playerName || "A player"} left the room.`,
        timestamp: Date.now(),
      });
    }
  });

  socket.on("disconnect", () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);
    const code = socket.data.roomCode;
    const room = roomManager.unregisterSocket(socket.id);

    if (room && code) {
      io.to(`room:${code}`).emit("room:players", room.getPlayersJSON());
      io.to(`room:${code}`).emit("chat:message", {
        type: "system",
        text: `${socket.data.playerName || "A player"} disconnected.`,
        timestamp: Date.now(),
      });
    }
  });
});

// =======================================================
// SERVER INITIALIZATION
// =======================================================
const PORT = process.env.PORT || 5000;

const startServer = () => {
  try {
    server.listen(PORT, () => {
      console.log(`🚀 Skribbl server listening on port ${PORT}`);
    });

    // Attempt DB connection in background without blocking server startup
    connectDB().catch((err) => {
      console.warn("MongoDB connection note:", err.message);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
