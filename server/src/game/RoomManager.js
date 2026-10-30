import { randomBytes } from "node:crypto";
import Room from "./Room.js";

/**
 * RoomManager Class (Singleton) manages all active game rooms
 */
export class RoomManager {
  constructor() {
    this.rooms = new Map(); // roomCode -> Room instance
    this.socketToRoom = new Map(); // socketId -> roomCode
    this.io = null;
  }

  setIO(io) {
    this.io = io;
  }

  /**
   * Generate a unique 6-character alphanumeric room code
   */
  generateCode() {
    let code;
    do {
      code = randomBytes(3).toString("hex").toUpperCase();
    } while (this.rooms.has(code));
    return code;
  }

  /**
   * Create a new room
   */
  createRoom({ hostName, settings = {}, isPrivate = false }) {
    const code = this.generateCode();
    const room = new Room({
      code,
      hostName,
      settings,
      isPrivate,
      io: this.io,
    });

    this.rooms.set(code, room);
    return room;
  }

  /**
   * Get room by code (case-insensitive)
   */
  getRoom(code) {
    if (!code || typeof code !== "string") return null;
    return this.rooms.get(code.trim().toUpperCase()) || null;
  }

  /**
   * Find an existing public room that has space for Quick Play
   */
  findPublicRoom() {
    for (const room of this.rooms.values()) {
      if (
        !room.isPrivate &&
        room.getConnectedPlayers().length < room.settings.maxPlayers &&
        room.game.phase !== "game_over"
      ) {
        return room;
      }
    }
    return null;
  }

  /**
   * Get list of public rooms with joinable status
   */
  getPublicRooms() {
    const list = [];
    for (const room of this.rooms.values()) {
      if (!room.isPrivate) {
        list.push(room.toJSON());
      }
    }
    return list;
  }

  /**
   * Associate socket to room
   */
  registerSocket(socketId, roomCode) {
    this.socketToRoom.set(socketId, roomCode.toUpperCase());
  }

  /**
   * Get roomCode by socket ID
   */
  getRoomCodeBySocket(socketId) {
    return this.socketToRoom.get(socketId) || null;
  }

  /**
   * Unregister socket and clean up empty rooms
   */
  unregisterSocket(socketId) {
    const roomCode = this.socketToRoom.get(socketId);
    if (!roomCode) return null;

    this.socketToRoom.delete(socketId);
    const room = this.rooms.get(roomCode);
    if (!room) return null;

    room.removePlayer(socketId);

    // If room is completely empty, clean it up after a grace period
    if (room.getConnectedPlayers().length === 0) {
      setTimeout(() => {
        const checkRoom = this.rooms.get(roomCode);
        if (checkRoom && checkRoom.getConnectedPlayers().length === 0) {
          checkRoom.game.clearTimers();
          this.rooms.delete(roomCode);
        }
      }, 5000);
    }

    return room;
  }

  /**
   * Remove room explicitly
   */
  removeRoom(roomCode) {
    const code = roomCode.toUpperCase();
    const room = this.rooms.get(code);
    if (room) {
      room.game.clearTimers();
      this.rooms.delete(code);
    }
  }
}

// Export singleton instance
export const roomManager = new RoomManager();
export default roomManager;
