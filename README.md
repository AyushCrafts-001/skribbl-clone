 🎨 Skribbl.io Clone - Real-Time Multiplayer Drawing Game
A full-stack multiplayer drawing and guessing game inspired by Skribbl.io. It features a server-managed turn-based game loop, live canvas synchronization, time-based scoring, and an object-oriented game engine.
[![Live Demo](https://img.shields.io/badge/Demo-Live%20App-brightgreen?style=for-the-badge&logo=render)](https://skribbl-clone-6u0z.onrender.com)
[![Video Walkthrough](https://img.shields.io/badge/YouTube-Video%20Demo-red?style=for-the-badge&logo=youtube)](https://youtu.be/dsrWwDutcLw?si=jVqoMPMQlV90A0oH)
[![React](https://img.shields.io/badge/React%2019-Vite-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express%205-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--Time-black?style=for-the-badge&logo=socket.io)](https://socket.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
## Live deployment
A modern, full-stack, real-time multiplayer drawing and guessing game inspired by [skribbl.io](https://skribbl.io). Built with an authoritative **Object-Oriented game server**, real-time **WebSockets (Socket.IO)**, a resolution-independent **HTML5 Canvas engine**, dynamic time-decay scoring, and an interactive glassmorphic UI.
- **Frontend:** https://skribbl-clone-6u0z.onrender.com
- **Backend health:** https://skribbl-clone-api-1gcx.onrender.com/api/health
- **Demo video:** https://youtu.be/dsrWwDutcLw?si=jVqoMPMQlV90A0oH
---
## Application screens
## 🌐 Live Deployment & Links
The app includes a home and room-configuration screen, a waiting room with invite code and player list, and a gameplay screen with canvas, chat, timer, hints, and leaderboard. See the [live app](https://skribbl-clone-6u0z.onrender.com) and [demo video](https://youtu.be/dsrWwDutcLw?si=jVqoMPMQlV90A0oH) for the current UI.
| Service | Link | Description |
| :--- | :--- | :--- |
| **Frontend Application** | [https://skribbl-clone-6u0z.onrender.com](https://skribbl-clone-6u0z.onrender.com) | Production client deployed on Render |
| **Backend API / Health** | [https://skribbl-clone-api-1gcx.onrender.com/api/health](https://skribbl-clone-api-1gcx.onrender.com/api/health) | Authoritative WebSocket & REST backend |
| **Video Walkthrough** | [YouTube Demo Video](https://youtu.be/dsrWwDutcLw?si=jVqoMPMQlV90A0oH) | End-to-end gameplay & architecture tour |
## Architecture overview
---
1. **Frontend:** React and Vite render the home, lobby, canvas, chat, and score screens. Axios calls the room REST API; the Socket.IO client connects to the game server.
2. **Backend engine:** Node.js and Express provide room endpoints. The server owns room membership, game phases, turn order, timers, hints, word validation, and scoring.
3. **Real-time communication:** Socket.IO room channels broadcast drawing, chat, player, and game-state events to connected players.
## 📸 Application Showcase
<div align="center">
### 1. Room Lobby & Configuration UI
*Create public/private rooms, invite friends via 6-character room codes or direct links, customize avatars, and configure draw time, rounds, and word modes.*
```
┌────────────────────────────────────────────────────────────────────────┐
