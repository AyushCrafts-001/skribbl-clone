# Skribbl.io Clone

A real-time multiplayer drawing and guessing game built with React, Vite, Node.js, Express, and Socket.IO.

**Live game:** [Frontend](https://skribbl-clone-6u0z.onrender.com) | [Backend](https://skribbl-clone-api-1gcx.onrender.com/api/health)

## Features

- Public matchmaking and private rooms with configurable settings
- Turn-based word selection (15-second choice), drawing, hints, and round transitions
- Room settings support 2-20 players and 1-10 rounds
- Live canvas, chat, and game-state updates over Socket.IO
- Pen, eraser, flood fill, undo, clear, and late-join stroke replay
- Time-based scoring: `round(100 + 400 * timeLeft / roundDuration)`; the drawer earns 50 points per correct guess
- Leaderboard, host controls, and customizable avatars

## Technology Stack

- **Frontend:** React 19, Vite, React Router, HTML Canvas, Axios
- **Backend:** Node.js, Express 5, Socket.IO 4
- **Database:** MongoDB with Mongoose (optional)
- **Hosting:** Render static site and web service

## Application screens

- **Home and room setup:** Avatar selection, quick match, room-code join, and room configuration.
- **Waiting room:** Invite code, player list, room settings, and chat.
- **Game screen:** Synchronized canvas, drawing controls, timer, word hints, chat, and leaderboard.

## Project structure


skribbl-clone/
|-- client/
|   |-- public/
|   |-- src/
|   |   |-- assets/
|   |   |-- components/   Canvas, chat, avatars, modals, leaderboard
|   |   |-- pages/        Home and room lobby
|   |   |-- services/     Axios API and Socket.IO clients
|   |   |-- utils/        Game constants and sound effects
|   |   |-- App.jsx
|   |   |-- App.css
|   |   |-- index.css
|   |   `-- main.jsx
|   |-- package.json
|   `-- package-lock.json
|-- server/
|   |-- src/
|   |   |-- config/       MongoDB connection
|   |   |-- game/         Game, Room, Player, RoomManager, word logic
|   |   |-- models/       Mongoose room model
|   |   |-- routes/       Room REST API
|   |   `-- index.js      Express and Socket.IO server
|   |-- package.json
|   `-- package-lock.json
|-- package.json
`-- README.md

## Run locally

### Backend

In Terminal 1:

```bash
cd server
npm install
npm run dev
```

The backend runs on `http://localhost:5000`. To enable database snapshots, create `server/.env` and set `MONGODB_URI`.

### Frontend

Create `client/.env` with:

```env
VITE_API_URL=http://localhost:5000
```

In Terminal 2:

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`.

## Author

Designed and Developed by **Ayush Saxena** | [LinkedIn](https://www.linkedin.com/in/ayush-saxena-developer) | [GitHub](https://github.com/AyushCrafts-001/skribbl-clone)
