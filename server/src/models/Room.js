import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    host: {
      type: String,
      required: true,
      trim: true,
    },
    players: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        score: {
          type: Number,
          default: 0,
        },
        avatar: {
          color: { type: String, default: "#f59e0b" },
          eyes: { type: Number, default: 0 },
          mouth: { type: Number, default: 0 },
        },
      },
    ],
    maxPlayers: {
      type: Number,
      default: 8,
      min: 2,
      max: 20,
    },
    rounds: {
      type: Number,
      default: 3,
      min: 1,
      max: 10,
    },
    drawTime: {
      type: Number,
      default: 60,
      min: 15,
      max: 240,
    },
    wordCount: {
      type: Number,
      default: 3,
      min: 1,
      max: 5,
    },
    hints: {
      type: Number,
      default: 2,
      min: 0,
      max: 5,
    },
    wordMode: {
      type: String,
      enum: ["normal", "hidden", "combination"],
      default: "normal",
    },
    category: {
      type: String,
      default: "all",
    },
    customWords: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["waiting", "playing", "finished"],
      default: "waiting",
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
