import Player from "./Player.js";
import Game from "./Game.js";
import RoomModel from "../models/Room.js";

/**
 * Room Class manages participants, settings, moderation, chat history, and game instance
 */
export class Room {
  constructor({ code, hostName, settings = {}, isPrivate = false, io = null }) {
    this.code = code.toUpperCase();
    this.io = io;
    this.isPrivate = isPrivate;
    this.hostName = hostName;
    this.createdAt = Date.now();

    // Default configurable settings
    this.settings = {
      maxPlayers: Math.min(20, Math.max(2, Number(settings.maxPlayers) || 8)),
      rounds: Math.min(10, Math.max(1, Number(settings.rounds) || 3)),
      drawTime: Math.min(240, Math.max(15, Number(settings.drawTime) || 60)),
      wordCount: Math.min(5, Math.max(1, Number(settings.wordCount) || 3)),
      hints: Math.min(5, Math.max(0, settings.hints !== undefined ? Number(settings.hints) : 2)),
      wordMode: ["normal", "hidden", "combination"].includes(settings.wordMode)
        ? settings.wordMode
        : "normal",
      category: settings.category || "all",
      customWords: Array.isArray(settings.customWords)
        ? settings.customWords
        : typeof settings.customWords === "string"
        ? settings.customWords
            .split(/[\n,]+/)
            .map((w) => w.trim())
            .filter((w) => w.length > 0)
        : [],
    };

    this.players = new Map(); // socketId -> Player
    this.game = new Game(this);
    this.messages = []; // Chat history
  }

  setIO(io) {
    this.io = io;
  }

  get socketRoom() {
    return `room:${this.code}`;
  }

  /**
   * Add a player to the room
   */
  addPlayer(socketId, name, avatar) {
    if (this.players.size >= this.settings.maxPlayers) {
      throw new Error(`Room is full (max ${this.settings.maxPlayers} players).`);
    }

    const isFirstPlayer = this.players.size === 0;
    const player = new Player({
      id: socketId,
      name,
      avatar,
      isHost: isFirstPlayer || name.trim().toLowerCase() === this.hostName.trim().toLowerCase(),
    });

    this.players.set(socketId, player);
    return player;
  }

  /**
   * Remove a player on disconnect or leave
   */
  removePlayer(socketId) {
    const player = this.players.get(socketId);
    if (!player) return null;

    player.isConnected = false;
    this.players.delete(socketId);

    // If host left, assign host to first remaining connected player
    if (player.isHost && this.players.size > 0) {
      const nextHost = this.getConnectedPlayers()[0];
      if (nextHost) {
        nextHost.isHost = true;
        this.hostName = nextHost.name;
        this.io?.to(this.socketRoom).emit("room:host_changed", {
          newHost: nextHost.toJSON(),
        });
      }
    }

    // If current drawer left during drawing/selecting phase, end turn early
    if (this.game.phase === "drawing" || this.game.phase === "selecting") {
      if (this.game.currentDrawer && this.game.currentDrawer.id === socketId) {
        this.game.endRound(`${player.name} (drawer) left the game.`);
      }
    }

    return player;
  }

  /**
   * Kick player (moderation)
   */
  kickPlayer(requesterSocketId, targetSocketId) {
    const requester = this.players.get(requesterSocketId);
    if (!requester || !requester.isHost) {
      throw new Error("Only the room host can kick players.");
    }

    const target = this.players.get(targetSocketId);
    if (!target) {
      throw new Error("Player not found in room.");
    }

    if (target.isHost) {
      throw new Error("Host cannot kick themselves.");
    }

    this.removePlayer(targetSocketId);
    return target;
  }

  getPlayer(socketId) {
    return this.players.get(socketId);
  }

  getConnectedPlayers() {
    return Array.from(this.players.values()).filter((p) => p.isConnected);
  }

  getPlayersJSON() {
    return this.getConnectedPlayers().map((p) => p.toJSON());
  }

  /**
   * Update room settings (only while in waiting/lobby)
   */
  updateSettings(requesterSocketId, newSettings) {
    const requester = this.players.get(requesterSocketId);
    if (!requester || !requester.isHost) {
      throw new Error("Only the host can modify room settings.");
    }
    if (this.game.phase !== "waiting") {
      throw new Error("Cannot change settings while game is in progress.");
    }

    Object.assign(this.settings, {
      rounds: Math.min(10, Math.max(1, Number(newSettings.rounds) || this.settings.rounds)),
      drawTime: Math.min(240, Math.max(15, Number(newSettings.drawTime) || this.settings.drawTime)),
      maxPlayers: Math.min(20, Math.max(2, Number(newSettings.maxPlayers) || this.settings.maxPlayers)),
      wordCount: Math.min(5, Math.max(1, Number(newSettings.wordCount) || this.settings.wordCount)),
      hints: newSettings.hints !== undefined ? Number(newSettings.hints) : this.settings.hints,
      wordMode: newSettings.wordMode || this.settings.wordMode,
      category: newSettings.category || this.settings.category,
    });

    // Update Game instance parameters
    this.game.maxRounds = this.settings.rounds;
    this.game.roundDuration = this.settings.drawTime;
    this.game.wordChoiceCount = this.settings.wordCount;
    this.game.hintsCount = this.settings.hints;
    this.game.wordMode = this.settings.wordMode;

    return this.settings;
  }

  /**
   * Persist room state to MongoDB (non-blocking)
   */
  async syncToDB(statusOverride = null) {
    try {
      const status = statusOverride || (this.game.phase === "game_over" ? "finished" : this.game.phase === "waiting" ? "waiting" : "playing");
      const playersData = Array.from(this.players.values()).map((p) => ({
        name: p.name,
        score: p.score,
        avatar: p.avatar,
      }));

      await RoomModel.findOneAndUpdate(
        { roomCode: this.code },
        {
          host: this.hostName,
          players: playersData,
          maxPlayers: this.settings.maxPlayers,
          rounds: this.settings.rounds,
          drawTime: this.settings.drawTime,
          status,
          isPrivate: this.isPrivate,
        },
        { upsert: true, new: true }
      );
    } catch (err) {
      // In-memory fallback if Mongo disconnected or offline
      // Non-blocking so real-time gameplay is never delayed
    }
  }

  toJSON() {
    return {
      code: this.code,
      hostName: this.hostName,
      isPrivate: this.isPrivate,
      settings: this.settings,
      playersCount: this.getConnectedPlayers().length,
      maxPlayers: this.settings.maxPlayers,
      status: this.game.phase === "waiting" ? "waiting" : this.game.phase === "game_over" ? "finished" : "playing",
      round: this.game.round,
      maxRounds: this.settings.rounds,
    };
  }
}

export default Room;
