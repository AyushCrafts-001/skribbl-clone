# 🎨 Skribbl.io Clone - Full Stack MERN Multiplayer Game

A production-ready, feature-complete clone of **skribbl.io** built with the **MERN** stack (MongoDB, Express, React, Node.js) and **Socket.IO** for real-time multiplayer drawing and word guessing.

![Skribbl Clone](https://raw.githubusercontent.com/saxenaayush/skribbl-clone/main/preview.png)

---

## 🌟 Key Features

### 1. Multiplayer Rooms & Lobby
- **Public & Private Rooms**: Quick match matchmaking for open public rooms or private invite-only rooms.
- **Configurable Settings**: Host can customize max players (2–20), rounds (1–10), draw time (15–240s), word count (1–5 choices), hints count (0–5 or disabled), word modes (Normal, Hidden, Combination), categories, and custom words.
- **Customizable Avatars**: Iconic skribbl avatars with customizable body colors, eye expressions, mouths, and an instant randomize dice button.
- **1-Click Invite Link**: Instant copy invite link with automatic room code routing (`?room=CODE`).
- **Host Moderation**: Host can kick disruptive players with real-time room removal.

### 2. Turn-Based Game Engine
- **Turn Rotation**: Every round, players take turns drawing while non-drawers guess.
- **Word Selection**: Drawer picks 1 of N categorized words with a 15-second selection countdown timer.
- **Dynamic Hints**: Blanks (`_ _ _ _`) automatically reveal random letter hints over time based on round progress.
- **Close Guess Detection**: Fuzzy string matching (Levenshtein distance = 1) alerts players privately with `"💡 '[guess]' is close!"`.
- **Anti-Spoiler Protection**: Drawer cannot type the secret word into chat. Once a player guesses correctly, their chat is masked to prevent spoiling for remaining players.
- **Dynamic Scoring**: Faster guesses earn higher points (from 500 down to 100 based on time left). Drawers earn bonus points for every player who solves their drawing.

### 3. Real-Time Drawing Canvas
- **Resolution-Independent Coordinates**: Canvas coordinates are normalized (800x600 virtual coordinate system) so drawings appear identical across mobile, tablet, and 4K desktop screens.
- **Tools**: Pen/Brush, Eraser, Flood Fill (4-way BFS paint bucket), Undo last stroke, and Clear canvas.
- **Skribbl Palette**: 22 classic skribbl color swatches + custom HTML5 color picker.
- **Brush Sizes**: 4 size presets (Fine, Medium, Thick, Huge) with real-time visual indicator.
- **Late Join Replay**: When a player joins mid-round, the server automatically replays all strokes from the current turn.

### 4. Audio & Visual Polish
- **Web Audio API Synthesizer**: Native in-browser chime sounds for correct guesses, countdown ticks under 10s, round start fanfare, and winner fanfares (with mute/unmute toggle).
- **Winner Podium & Confetti**: Top 3 podium animation with particle confetti on game completion.

---

## 📐 Architecture Overview

```mermaid
flowchart TD
    subgraph Client["Frontend (React 19 + Vite)"]
        UI["UI Screens (Home, Lobby, Game)"]
        CanvasComp["Canvas (Virtual 800x600 Resolution)"]
        ChatComp["Chat & Guessing Feed"]
        SoundFX["Web Audio API Synthesizer"]
        SocketClient["Socket.IO Client"]
    end

    subgraph Server["Backend (Node.js + Express)"]
        SocketServer["Socket.IO Server (Port 5000)"]
        RM["RoomManager (Singleton)"]
        RoomClass["Room (Settings, Players, Moderation)"]
        GameClass["Game (Rounds, Timers, Scoring, Stroke History)"]
        PlayerClass["Player (Scores, Avatars, Roles)"]
        WordsMod["Word Engine (Categories & Levenshtein)"]
    end

    subgraph Database["Database"]
        MongoDB[(MongoDB Atlas)]
    end

    UI --> SocketClient
    CanvasComp -->|drawing:line / drawing:fill| SocketClient
    ChatComp -->|chat:message| SocketClient
    SocketClient <-->|WebSockets (ws://)| SocketServer
    SocketServer --> RM
    RM --> RoomClass
    RoomClass --> GameClass
    RoomClass --> PlayerClass
    GameClass --> WordsMod
    RoomClass -.->|Async Non-Blocking Sync| MongoDB
```

---

## 🏗️ Object-Oriented Programming (OOP) Architecture

The WebSocket backend is structured using clean OOP design principles:

| Class | Responsibility | Key Properties & Methods |
|---|---|---|
| **`Player`** | Represents an active user session in a room | `id`, `name`, `avatar`, `score`, `hasGuessed`, `isDrawer`, `isHost`, `addScore()`, `resetRound()` |
| **`Game`** | Manages turn rotation, countdown timers, stroke history, and scoring | `round`, `phase`, `currentWord`, `timeLeft`, `drawHistory`, `start()`, `chooseWord()`, `handleGuess()`, `revealNextHint()` |
| **`Room`** | Manages room settings, participant list, chat, moderation, and DB persistence | `code`, `hostName`, `settings`, `players`, `game`, `addPlayer()`, `removePlayer()`, `kickPlayer()`, `syncToDB()` |
| **`RoomManager`** | Singleton registry managing active rooms and socket routing | `rooms`, `socketToRoom`, `createRoom()`, `getRoom()`, `findPublicRoom()`, `unregisterSocket()` |

---

## 📡 WebSocket Events Specification

### Room & Lobby Events
| Event | Direction | Payload | Description |
|---|---|---|---|
| `room:join` | Client ➔ Server | `{ roomCode, playerName, avatar }` | Join or reconnect to a game room |
| `room:players` | Server ➔ Client | `Player[]` | Broadcast updated room player list |
| `room:update_settings` | Client ➔ Server | `{ roomCode, settings }` | Host updates rounds, draw time, hints, etc. |
| `room:kick` | Client ➔ Server | `{ roomCode, targetSocketId }` | Host kicks a player from the room |
| `room:kicked` | Server ➔ Client | `{ message }` | Target player receives removal notification |
| `room:leave` | Client ➔ Server | `{ roomCode }` | Player voluntarily leaves the room |

### Game Flow Events
| Event | Direction | Payload | Description |
|---|---|---|---|
| `game:start` | Client ➔ Server | `{ roomCode }` | Host starts the game from the lobby |
| `game:turn_start` | Server ➔ Client | `{ drawer, round, maxRounds, selectTime }` | New turn starts; drawer begins picking |
| `game:word_options` | Server ➔ Drawer | `{ words, selectTime }` | Drawer receives 3 private word choices |
| `game:choose_word` | Drawer ➔ Server | `{ roomCode, word }` | Drawer confirms their selected word |
| `game:secret_word` | Server ➔ Drawer | `{ word, category }` | Drawer receives the secret word |
| `game:drawing_start` | Server ➔ Client | `{ drawer, duration, maskedWord, wordLength }` | Round countdown begins; guessers see blanks |
| `game:timer` | Server ➔ Client | `{ timeLeft }` | 1-second interval countdown sync |
| `game:hint_update` | Server ➔ Client | `{ maskedWord, revealedLetter }` | Server reveals an unrevealed letter hint |
| `game:round_ended` | Server ➔ Client | `{ word, reason, roundScores, nextTurnIn }` | Turn concludes; word revealed with scores |
| `game:game_over` | Server ➔ Client | `{ leaderboard, winner }` | Game finished; podium results displayed |
| `game:restart` | Client ➔ Server | `{ roomCode }` | Host resets game to replay from lobby |

### Canvas & Drawing Events
| Event | Direction | Payload | Description |
|---|---|---|---|
| `drawing:line` | Drawer ➔ Server ➔ Clients | `{ fromX, fromY, toX, toY, color, size }` | Broadcast drawing stroke segment |
| `drawing:fill` | Drawer ➔ Server ➔ Clients | `{ x, y, color }` | Broadcast flood fill (bucket tool) |
| `drawing:undo` | Drawer ➔ Server ➔ Clients | `{ history }` | Drawer undos the last stroke |
| `drawing:clear` | Drawer ➔ Server ➔ Clients | `{ roomCode }` | Drawer clears the entire canvas |
| `drawing:history` | Server ➔ Client | `{ history }` | Replays all strokes to mid-game joiners |

### Chat & Guessing Events
| Event | Direction | Payload | Description |
|---|---|---|---|
| `chat:message` | Client ➔ Server ➔ Clients | `{ type, playerName, text, timestamp }` | Public message or guesser-only message |
| `game:correct_guess` | Server ➔ Client | `{ playerId, playerName, points, players }` | Broadcast when player solves the word |
| `chat:system_alert` | Server ➔ Client | `{ message, type }` | Private whisper (`close` or `warning`) |

---

## 💡 Code Understanding & Implementation Details

### 1. How drawing strokes are captured, sent, and rendered across clients
- **Capture**: The drawer interacts via pointer or touch events (`onMouseDown`, `onMouseMove`, `onTouchMove`). Coordinates are mapped to a normalized 800x600 virtual coordinate space via `getCanvasCoordinates(e)` using `rect.left` and canvas scale ratios.
- **Transmission**: As the pointer moves, line segments `{ fromX, fromY, toX, toY, color, size }` are emitted via `drawing:line` using Socket.IO.
- **Rendering**: Clients listening to `drawing:line` render the segment using native HTML5 2D context (`beginPath()`, `moveTo()`, `lineTo()`, `stroke()`) with `lineCap = "round"` and `lineJoin = "round"` for smooth curves.
- **Flood Fill**: The bucket tool uses a Breadth-First Search (BFS) pixel replacement algorithm directly on canvas `ImageData`. Emitting `{ x, y, color }` runs the identical flood fill algorithm on all connected peers.

### 2. How game state (rounds, turn order, scoring) is managed
- The `Game` class manages state transitions: `waiting` ➔ `selecting` ➔ `drawing` ➔ `round_end` ➔ `game_over`.
- **Turn Order**: At the start of each round, connected players are queued in `turnQueue`. In each turn, the queue shifts to the next drawer until all players have drawn once per round.
- **Scoring**: Points are awarded dynamically based on speed:
  $$\text{Points} = \text{round}\left(100 + 400 \times \frac{\text{timeLeft}}{\text{roundDuration}}\right)$$
  The drawer also receives $+50$ bonus points for each player who successfully guesses their drawing.

### 3. How WebSockets are used for real-time sync
- Room-based isolation is achieved with Socket.IO rooms (`room:${roomCode}`).
- When a player leaves or disconnects, `RoomManager.unregisterSocket(socket.id)` cleans up references. If the drawer leaves mid-turn, the turn ends gracefully. If the host leaves, the crown is dynamically passed to the next connected player.

### 4. Word-matching logic
- In `Game.handleGuess(player, text)`:
  1. Guesses are normalized using `.trim().toLowerCase()`.
  2. If identical to `currentWord.toLowerCase()`, the guess is recorded as correct, points are calculated, and the word is kept hidden from public chat.
  3. If not an exact match, the Levenshtein distance between guess and target is evaluated. If the distance is 1 (e.g. typing `"elphant"` for `"elephant"`), a private system alert is whispered: `"💡 'elphant' is very close!"`.
  4. Drawers attempting to send messages containing the secret word are blocked by an anti-cheat filter.

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js** v18+ (tested on Node v20 and v24)
- **npm** or **pnpm**
- **MongoDB** (Local instance or free MongoDB Atlas URI)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/skribbl-clone.git
cd skribbl-clone
```

### 2. Setup Server
```bash
cd server
npm install
```

Configure `server/.env`:
```env
PORT=5000
MONGODB_URI="mongodb+srv://<user>:<password>@cluster.mongodb.net/skribbl-clone"
CLIENT_URL=http://localhost:5173
```

Start the backend:
```bash
npm run dev
```

### 3. Setup Client
Open a second terminal window:
```bash
cd client
npm install
```

Configure `client/.env`:
```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:
```bash
npm run dev
```

Visit **`http://localhost:5173`** in your browser. Open multiple browser tabs (or incognito windows) to test multiplayer drawing and guessing!

---

## 🌐 Production Deployment Guide

### Deploying on Render (Recommended for Full-Stack WebSockets)
1. **Backend Service**:
   - Create a **Web Service** pointing to `/server`.
   - Build Command: `npm install`
   - Start Command: `node src/index.js`
   - Environment Variables:
     - `PORT`: `10000` (or leave default assigned by Render)
     - `CLIENT_URL`: `https://your-skribbl-frontend.onrender.com`
     - `MONGODB_URI`: `<Your MongoDB Atlas Connection String>`

2. **Frontend Service**:
   - Create a **Static Site** pointing to `/client`.
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Environment Variables:
     - `VITE_API_URL`: `https://your-skribbl-backend.onrender.com`

### Deploying on Railway
- Deploy root or separate services for client and server. Railway natively supports persistent WebSockets with zero configuration.

### Deploying on Vercel (Frontend) + Render / Railway (Backend)
- Deploy `client` on Vercel with `VITE_API_URL` pointing to your deployed WebSocket backend on Render or Railway (serverless platforms like Vercel serverless functions cannot hold persistent stateful WebSocket connections).

---

## 📄 License
MIT License. Created for the skribbl.io Full-Stack MERN Intern Assignment.
