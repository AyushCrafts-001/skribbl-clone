 Skribbl.io Clone - Real-Time Multiplayer Drawing Game
A full-stack, real-time multiplayer drawing and guessing game inspired by **Skribbl.io**. The application features an authoritative turn-based game loop, real-time canvas stroke synchronization, dynamic time-decay scoring, and a custom Object-Oriented game engine built with **React**, **Node.js**, **Express**, and **Socket.IO**.
---
## 🌐 Live Deployment
- **Live Frontend:** [https://skribbl-clone-6u0z.onrender.com](https://skribbl-clone-6u0z.onrender.com)
- **Backend API Health:** [https://skribbl-clone-api-1gcx.onrender.com/api/health](https://skribbl-clone-api-1gcx.onrender.com/api/health)
---
## 📸 Application Screenshots
### 1. Room Lobby and Configuration UI
Host creates rooms with custom settings (players, rounds, draw time, word count), custom avatar picker, and invite link/code.
```
┌────────────────────────────────────────────────────────────────────────┐
│                        🎮 SKRIBBL.IO CLONE                             │
│                                                                        │
│   Enter your name: [ Ayush          ]  Avatar: [ 🦊 ]                  │
│                                                                        │
│   ┌──────────────────────────────┐  ┌──────────────────────────────┐   │
│   │     🎲 Play (Public Room)    │  │   ➕ Create Private Room     │   │
│   └──────────────────────────────┘  └──────────────────────────────┘   │
│                                                                        │
│   Room Settings:                                                       │
│   • Players: 2 - 20        • Rounds: 2 - 10                            │
│   • Draw Time: 15 - 240s   • Word Choices: 3                           │
└────────────────────────────────────────────────────────────────────────┘
```
### 2. Real-Time Canvas Sync and Chat Guessing
Real-time stroke broadcast, color palette, brush sizes, undo/clear, letter hints, and anti-spoiler chat protection.
```
┌────────────────────────────────────────────────────────────────────────┐
│ ⏱️ 45s  │  ROUND 2 / 3  │  WORD: _ E _ G _ I _  │  Category: Animals   │
├─────────────────────────┬──────────────────────────────┬───────────────┤
│ 🏆 LEADERBOARD          │ 🖌️ CANVAS (800x600 Virtual)   │ 💬 LIVE CHAT  │
│                         │                              │               │
