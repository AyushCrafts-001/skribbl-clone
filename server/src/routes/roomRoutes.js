import express from "express";
import roomManager from "../game/RoomManager.js";
import RoomModel from "../models/Room.js";

const router = express.Router();

// GET /api/rooms - list joinable public rooms
router.get("/", async (req, res) => {
  try {
    const publicRooms = roomManager.getPublicRooms();
    return res.status(200).json({
      success: true,
      rooms: publicRooms,
    });
  } catch (error) {
    console.error("List rooms error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to list rooms.",
    });
  }
});

// POST /api/rooms - create a new room
router.post("/", async (req, res) => {
  try {
    const { playerName, hostName, settings = {}, isPrivate = false } = req.body;
    const name = (playerName || hostName || "").trim();

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Player name is required.",
      });
    }

    if (name.length > 20) {
      return res.status(400).json({
        success: false,
        message: "Player name cannot exceed 20 characters.",
      });
    }

    const room = roomManager.createRoom({
      hostName: name,
      settings,
      isPrivate: Boolean(isPrivate),
    });

    // Asynchronously save to DB
    room.syncToDB("waiting");

    return res.status(201).json({
      success: true,
      message: "Room created successfully.",
      room: room.toJSON(),
      roomCode: room.code,
    });
  } catch (error) {
    console.error("Create room error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create room.",
    });
  }
});

// POST /api/rooms/quick-join - join open public room or create one
router.post("/quick-join", async (req, res) => {
  try {
    const { playerName } = req.body;
    const name = (playerName || "").trim();

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Player name is required.",
      });
    }

    let room = roomManager.findPublicRoom();

    if (!room) {
      // Create a new public room
      room = roomManager.createRoom({
        hostName: name,
        settings: {
          maxPlayers: 8,
          rounds: 3,
          drawTime: 60,
          hints: 2,
        },
        isPrivate: false,
      });
      room.syncToDB("waiting");
    }

    return res.status(200).json({
      success: true,
      roomCode: room.code,
      room: room.toJSON(),
    });
  } catch (error) {
    console.error("Quick join error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to quick join.",
    });
  }
});

// GET /api/rooms/:roomCode - get room info
router.get("/:roomCode", async (req, res) => {
  try {
    const code = req.params.roomCode.trim().toUpperCase();
    let room = roomManager.getRoom(code);

    if (room) {
      return res.status(200).json({
        success: true,
        room: room.toJSON(),
      });
    }

    // Try MongoDB in case room was persisted earlier
    try {
      const dbRoom = await RoomModel.findOne({ roomCode: code });
      if (dbRoom) {
        return res.status(200).json({
          success: true,
          room: {
            code: dbRoom.roomCode,
            hostName: dbRoom.host,
            isPrivate: dbRoom.isPrivate,
            status: dbRoom.status,
            maxPlayers: dbRoom.maxPlayers,
            rounds: dbRoom.rounds,
            drawTime: dbRoom.drawTime,
            playersCount: dbRoom.players.length,
          },
        });
      }
    } catch (e) {
      // Ignore DB query errors
    }

    return res.status(404).json({
      success: false,
      message: "Room not found.",
    });
  } catch (error) {
    console.error("Get room error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch room.",
    });
  }
});

// POST /api/rooms/:roomCode/join - pre-validate join
router.post("/:roomCode/join", async (req, res) => {
  try {
    const code = req.params.roomCode.trim().toUpperCase();
    const { playerName } = req.body;
    const name = (playerName || "").trim();

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Player name is required.",
      });
    }

    const room = roomManager.getRoom(code);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found.",
      });
    }

    if (room.getConnectedPlayers().length >= room.settings.maxPlayers) {
      return res.status(400).json({
        success: false,
        message: "Room is already full.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Ready to join room.",
      room: room.toJSON(),
      roomCode: room.code,
    });
  } catch (error) {
    console.error("Join room error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to join room.",
    });
  }
});

export default router;
