![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image1.png){width="1.7083333333333333in"
height="0.3055555555555556in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image2.png){width="1.625in"
height="0.3055555555555556in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image3.png){width="2.0in"
height="0.3055555555555556in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image4.png){width="2.1666666666666665in"
height="0.3055555555555556in"}

10/30/26, 11:34 AM Skribbl.io Clone - Documentation

> 🎨 **Skribbl.io Clone - Real-Time Multiplayer Drawing Game**

+-----------------------+-----------------------+-----------------------+
|                       |                       |                       |
+-----------------------+-----------------------+-----------------------+
|                       |                       |                       |
+-----------------------+-----------------------+-----------------------+
|                       |                       |                       |
+-----------------------+-----------------------+-----------------------+
|   ------------------  |   ------------------  |                       |
|   LICENSE             |   **M I T**           |                       |
|   ------------------  |   ------------------  |                       |
|                       |                       |                       |
|   ------------------  |   ------------------  |                       |
+-----------------------+-----------------------+-----------------------+

> A modern, full-stack, real-time multiplayer drawing and guessing game
> inspired by . Built with an
>
> authoritative **Object-Oriented game server**, real-time **WebSockets
> (Socket.IO)**, a resolution-independent **HTML5**
>
> **Canvas engine**, dynamic time-decay scoring, and an interactive
> glassmorphic UI.
>
> 🌐 **Live Deployment & Links**

+-----------------------+-----------------------+-----------------------+
| > **Service**         | > **Link**            | > **Description**     |
+=======================+=======================+=======================+
| > **Frontend**\       |                       | > Production client   |
| > **Application**     |                       | > deployed on Render  |
+-----------------------+-----------------------+-----------------------+
| > **Backend API /     |                       | > Authoritative       |
| > Health**            |                       | > WebSocket & REST    |
|                       |                       | > backend             |
+-----------------------+-----------------------+-----------------------+

+-----------------------------------+-----------------------------------+
| > 📸 **Application Showcase**\    |                                   |
| > \<div align=\"center\"\>\       |                                   |
| > **1. Room Lobby & Configuration |                                   |
| > UI**\                           |                                   |
| > *Create public/private rooms,   |                                   |
| > invite friends via 6-character  |                                   |
| > room codes or direct links,     |                                   |
| > customize avatars, and          |                                   |
| > configure draw time, rounds,    |                                   |
| > and word modes.*                |                                   |
+===================================+===================================+
| > └───────                        |                                   |
| ───────────────────────────────── |                                   |
| ────────────────────────────────┘ |                                   |
+-----------------------------------+-----------------------------------+
| file                              | 1/13                              |
| :///C:/Users/ayush/OneDrive/Deskt |                                   |
| op/skribbl-clone/docs/README.html |                                   |
+-----------------------------------+-----------------------------------+

+-----------------------------------------------------------------------+
| > │ 🎮 SKRIBBL.IO CLONE │                                             |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > │ \[ Player Name \] \[ Choose Avatar 🎨 \] │                        |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > │ ┌──────────────────────────────┐ ┌──────────────────────────────┐ |
| > │                                                                   |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > │ │ 🎲 Quick Play (Public) │ │ ➕ Create Private Room │ │           |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > │ └──────────────────────────────┘ └──────────────────────────────┘ |
| > │                                                                   |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > │ Lobby Settings: Rounds (2-10) • Draw Time (15-240s) • Word Count  |
| > (3) │                                                               |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > ┌────                                                               |
| ────────────────────────────────────────────────────────────────────┐ |
+=======================================================================+
+-----------------------------------------------------------------------+

10/30/26, 11:34 AM Skribbl.io Clone - Documentation

> **2. Real-Time Canvas Sync & Chat Guessing**
>
> *Low-latency stroke streaming, flood-fill bucket, color palette,
> progressive letter hints, anti-spoiler chat protection, and*
>
> *instant scoring.*

+-----------------------------------------------------------------------+
| > ┌────                                                               |
| ────────────────────────────────────────────────────────────────────┐ |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > │ ⏱️ 45s │ ROUND 2 / 3 │ HINT: \_ E \_ G \_ I \_ │ Word Mode:       |
| > Normal │                                                            |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > ├────                                                               |
| ─────────────────────┬──────────────────────────────┬───────────────┤ |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > │ 🏆 LEADERBOARD │ 🖌️ CANVAS (800x600 Virtual) │ 💬 LIVE CHAT │     |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > │ 1. Alice ⭐ 1,450 pts │ │ Bob: cat? │                             |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > │ 2. Bob (✏️) ⭐ 980 pts │ \[ Real-Time Sync Drawing \] │ Sam:      |
| > bird? │                                                             |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > │ 3. Sam ⭐ 820 pts │ │ Alice guessed │                             |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > │ ├──────────────────────────────┤ the word! 🎉 │                   |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > │ │ 🎨 Palette • Undo • Clear │ \[Type guess\] │                    |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > └────                                                               |
| ─────────────────────┴──────────────────────────────┴───────────────┘ |
+=======================================================================+
+-----------------------------------------------------------------------+

> **3. Game Over & Winner Podium**
>
> *Detailed end-of-game leaderboard, medal podium, round recap, and
> one-click play-again rematch.*
>
> \</div\>
>
> 🏗️ **Architecture Overview**
>
> The system follows a decoupled full-stack architecture with an
> **authoritative backend server** to prevent cheating and
>
> state desynchronization.

  ------------------------------------------------------------------------------------------------------------
  file:///C:/Users/ayush/OneDrive/Desktop/skribbl-clone/docs/README.html   2/13
  ------------------------------------------------------------------------ -----------------------------------

  ------------------------------------------------------------------------------------------------------------

+-----------------------------------+-----------------------------------+
| > 10/30/26, 11:34 AM              | Skribbl.io Clone - Documentation  |
+===================================+===================================+
+-----------------------------------+-----------------------------------+

+-----------------------------------------------------------------------+
| > flowchart TD                                                        |
+=======================================================================+
+-----------------------------------------------------------------------+

> subgraph Frontend \[\"Client (React 19 + Vite)\"\]\
> UI\[Glassmorphism UI & Router\]\
> Canvas\[HTML5 Canvas Engine\\n800x600 Virtual Scaling\]\
> ClientSocket\[Socket.IO Client Service\]\
> RestAPI\[Axios REST Client\]\
> end
>
> subgraph Backend \[\"Server Engine (Node.js + Express 5)\"\]\
> Server\[HTTP + Socket.IO Server\]\
> Router\[REST Endpoints /api/rooms\]\
> RManager\[\"RoomManager (Singleton)\"\]\
> RoomInstance\[\"Room Entity\"\]\
> GameEngine\[\"Game State Machine\"\]\
> PlayerEntity\[\"Player Entity\"\]\
> WordService\[\"Word Engine & Levenshtein\"\]\
> end
>
> subgraph Storage \[\"Persistence (Optional)\"\]\
> MongoDB\[(MongoDB / Mongoose)\]\
> end
>
> UI \--\> Canvas\
> UI \--\> ClientSocket\
> UI \--\> RestAPI
>
> RestAPI \--\>\|HTTP REST\| Router\
> ClientSocket \<\--\>\|WebSocket Events\| Server
>
> Router \--\> RManager\
> Server \--\> RManager\
> RManager \--\> RoomInstance\
> RoomInstance \--\> GameEngine\
> RoomInstance \--\> PlayerEntity\
> GameEngine \--\> WordService

+-----------------------------------------------------------------------+
| > RoomInstance -.-\>\|Snapshot State\| MongoDB                        |
+=======================================================================+
+-----------------------------------------------------------------------+

> **1. Frontend Client (React 19 + Vite)**
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image5.png){width="6.944444444444445e-2in"
> height="5.555555555555555e-2in"}**Virtual Canvas Engine**: Renders
> onto a native HTML5 \<canvas\> using a fixed internal coordinate
> matrix (\$800 \\times 600\$), ensuring strokes align identically
> regardless of client device resolution or screen aspect ratio.
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image6.png){width="6.944444444444445e-2in"
> height="6.944444444444445e-2in"}**Stroke Streaming**: Emits touch and
> mouse events as normalized delta segments (x0, y0, x1, y1, color,
> size, tool) for sub-millisecond drawing sync.

+-----------------------------------+-----------------------------------+
| ![](vertopal_1ca98a70cb8d4ec      | > **Undo & Clear History**:       |
| fab3d67846913b947/media/image7.pn | > Supports multi-step undo with   |
| g){width="6.944444444444445e-2in" | > server-synchronized stroke      |
| height="5.555555555555555e-2in"}  | > stacks and instant canvas       |
|                                   | > clears. **Flood Fill (Paint     |
| ![](vertopal_1ca98a70cb8d4ec      | > Bucket)**: Features a           |
| fab3d67846913b947/media/image8.pn | > breadth-first search (BFS)      |
| g){width="6.944444444444445e-2in" | > scanline flood-fill algorithm   |
| height="5.555555555555555e-2in"}  | > for filling enclosed            |
+===================================+===================================+
+-----------------------------------+-----------------------------------+

> canvas areas.
>
> **2. Authoritative Backend Server (Node.js + Express 5)**
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image9.png){width="6.944444444444445e-2in"
> height="6.944444444444445e-2in"}**State Ownership**: All timers, phase
> transitions, word masking, score updates, and turn queues exist
> exclusively on the server to prevent client spoofing.
>
> file:///C:/Users/ayush/OneDrive/Desktop/skribbl-clone/docs/README.html
> 3/13

![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image12.png){width="0.8194444444444444in"
height="0.19444444444444445in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image13.png){width="0.3611111111111111in"
height="0.20833333333333334in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image14.png){width="0.6805555555555556in"
height="0.20833333333333334in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image15.png){width="0.3472222222222222in"
height="0.19444444444444445in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image16.png){width="0.6805555555555556in"
height="0.20833333333333334in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image17.png){width="0.6805555555555556in"
height="0.20833333333333334in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image18.png){width="0.5555555555555556in"
height="0.20833333333333334in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image19.png){width="0.6805555555555556in"
height="0.20833333333333334in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image20.png){width="0.5555555555555556in"
height="0.20833333333333334in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image21.png){width="0.625in"
height="0.19444444444444445in"}

10/30/26, 11:34 AM Skribbl.io Clone - Documentation

> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image9.png){width="6.944444444444445e-2in"
> height="6.944444444444445e-2in"}**In-Memory Performance**: Room and
> game state are stored in memory for zero-latency lookups, with
> optional
>
> MongoDB persistence for room metadata.
>
> **3. Real-Time Communication (Socket.IO 4)**
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image10.png){width="6.944444444444445e-2in"
> height="6.944444444444445e-2in"}**Room-Scoped Channels**: Uses
> Socket.IO room multiplexing ( room:\${code} ) so events never leak
> across separate
>
> game sessions.
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image11.png){width="6.944444444444445e-2in"
> height="5.555555555555555e-2in"}**Late-Join Stroke Replay**: When a
> player joins or reconnects midway through a round, the server
> transmits the
>
> entire drawing history buffer so the canvas renders instantaneously.
>
> 🧩 **Object-Oriented Design (OOP Architecture)**
>
> The backend is cleanly structured using strict OOP design principles
> to ensure scalability and maintainability:

+-----------------------------------------------------------------------+
| > server/src/game/                                                    |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > ├── RoomManager.js \# Singleton coordinator for all rooms           |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > ├── Room.js \# Room lifecycle, host permissions, participant roster |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > ├── Game.js \# Authoritative turn-based state machine & timers      |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > ├── Player.js \# Participant domain model, socket mapping, and      |
| > score tracking                                                      |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > └── words.js \# Categorized word repository & fuzzy Levenshtein     |
| > distance                                                            |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------+-----------------------------------+
| > **Class**                       | > **Role & Key Responsibilities** |
+===================================+===================================+
| **RoomManager**                   | > **Singleton Registry:** Creates |
|                                   | > rooms, generates unique         |
|                                   | > 6-character room codes, matches |
|                                   | > players into public rooms, maps |
|                                   | > socket.id \$\\to\$ Room , and   |
|                                   | > prunes empty rooms.             |
+-----------------------------------+-----------------------------------+
|   ------------------------------  | > **Session Lifecycle:** Manages  |
|   **Room**                        | > player membership (join, leave, |
|   ------------------------------  | > disconnect), handles host       |
|                                   | > transfers, kick/ban controls,   |
|   ------------------------------  | > room privacy, and instantiates  |
|                                   | > the Game engine.                |
+-----------------------------------+-----------------------------------+
| > **Game**                        | > **Core Game Loop:** Controls    |
|                                   | > round phases ( waiting ,        |
|                                   | > selecting , drawing , round_end |
|                                   | > , game_over ), maintains the    |
|                                   | > drawer queue, handles drawing   |
|                                   | > timers, progressive hint        |
|                                   | > reveals, guess validation, and  |
|                                   | > score calculation.              |
+-----------------------------------+-----------------------------------+
|   ------------------------------  | > **Domain Entity:** Encapsulates |
|   **Player**                      | > socket ID, display name, avatar |
|   ------------------------------  | > configuration, score, round     |
|                                   | > score, guessing status (        |
|   ------------------------------  | > hasGuessed ), and host/drawer   |
|                                   | > privileges.                     |
+-----------------------------------+-----------------------------------+
| > **words.js**                    | > **Dictionary & Matcher:**       |
|                                   | > Categorized word bank (animals, |
|                                   | > food, objects, actions, nature, |
|                                   | > pop culture), random word       |
|                                   | > selection, and Levenshtein edit |
|                                   | > distance for close-guess        |
|                                   | > notifications.                  |
+-----------------------------------+-----------------------------------+

+-----------------------------------+-----------------------------------+
| > ⚡ **Real-Time WebSocket Events |                                   |
| > API**\                          |                                   |
| > The client and server           |                                   |
| > synchronize through structured  |                                   |
| > Socket.IO events:               |                                   |
+===================================+===================================+
| file                              | 4/13                              |
| :///C:/Users/ayush/OneDrive/Deskt |                                   |
| op/skribbl-clone/docs/README.html |                                   |
+-----------------------------------+-----------------------------------+

10/30/26, 11:34 AM Skribbl.io Clone - Documentation

> **Room & Lobby Management**

+-----------------+-----------------+-----------------+-----------------+
| > **Event**     | > **Direction** | > **Payload**   | >               |
|                 |                 |                 | **Description** |
+=================+=================+=================+=================+
|   ------------  | > Client        | +------------+  | > Join an       |
|   room:join     | > \$\\to\$      | | > {        |  | > existing room |
|   ------------  |                 | | >          |  | > via code      |
|                 | +------------+  | |  roomCode, |  |                 |
|   ------------  | | > Server   |  | | > p        |  |                 |
|                 | +============+  | | layerName, |  |                 |
|                 | +------------+  | +============+  |                 |
|                 |                 | +------------+  |                 |
|                 |                 |                 |                 |
|                 |                 | > avatar }      |                 |
+-----------------+-----------------+-----------------+-----------------+
|   -----         | > Server        |   ------------  | > Broadcasts    |
| --------------- | > \$\\to\$      |   { player,     | > newly joined  |
|   roo           | > Clients       |   players,      | > player        |
| m:player_joined |                 |   room }        |                 |
|   -----         |                 |   ------------  |                 |
| --------------- |                 |                 |                 |
|                 |                 |   ------------  |                 |
|   -----         |                 |                 |                 |
| --------------- |                 |                 |                 |
+-----------------+-----------------+-----------------+-----------------+
|   ---           | > Server        | +------------+  | > Broadcasts    |
| --------------- | > \$\\to\$      | | > {        |  | > player        |
|   r             |                 | | >          |  | > departure /   |
| oom:player_left | +------------+  | |  playerId, |  | > host          |
|   ---           | | > Clients  |  | | > players, |  | > migration     |
| --------------- | +============+  | +============+  |                 |
|                 | +------------+  | +------------+  |                 |
|   ---           |                 |                 |                 |
| --------------- |                 | > newHostId }   |                 |
+-----------------+-----------------+-----------------+-----------------+
|   ------------  | > Client        |   ------------  | > Host triggers |
|   game:start    | > \$\\to\$      |   {}            | > game start    |
|   ------------  | > Server        |   ------------  |                 |
|                 |                 |                 |                 |
|   ------------  |                 |   ------------  |                 |
+-----------------+-----------------+-----------------+-----------------+

> **Game State Transitions**

+-----------------+-----------------+-----------------+-----------------+
| > **Event**     | > **Direction** | > **Payload**   | >               |
|                 |                 |                 | **Description** |
+=================+=================+=================+=================+
|   ------------  | > Server        | +------------+  | > Full game     |
|   game:state    | > \$\\to\$      | | > { phase, |  | > state\        |
|   ------------  |                 | | > round,   |  | >               |
|                 | +------------+  | | >          |  | synchronization |
|   ------------  | | > Clients  |  | | maxRounds, |  |                 |
|                 | +============+  | +============+  |                 |
|                 | +------------+  | +------------+  |                 |
|                 |                 |                 |                 |
|                 |                 | > drawer, \...  |                 |
|                 |                 | > }             |                 |
+-----------------+-----------------+-----------------+-----------------+
|   ------        | > Server        | +------------+  | > Drawer        |
| --------------- | > \$\\to\$      | | > { words: |  | > selects 1 of  |
|   game          |                 | | > \[w1,    |  | > 3 words       |
| :word_selection | +------------+  | | > w2,      |  |                 |
|   ------        | | > Drawer   |  | | > w3\],    |  |                 |
| --------------- | +============+  | | >          |  |                 |
|                 | +------------+  | |  timeLeft: |  |                 |
|   ------        |                 | +============+  |                 |
| --------------- |                 | +------------+  |                 |
|                 |                 |                 |                 |
|                 |                 | > 15 }          |                 |
+-----------------+-----------------+-----------------+-----------------+
|   ---           | > Drawer        |   ------------  | > Drawer        |
| --------------- | > \$\\to\$      |   { word }      | > selects their |
|   g             | > Server        |   ------------  | > chosen word   |
| ame:choose_word |                 |                 |                 |
|   ---           |                 |   ------------  |                 |
| --------------- |                 |                 |                 |
|                 |                 |                 |                 |
|   ---           |                 |                 |                 |
| --------------- |                 |                 |                 |
+-----------------+-----------------+-----------------+-----------------+
|   ---           | > Server        | +------------+  | > Active        |
| --------------- | > \$\\to\$      | | > {        |  | > drawing round |
|   g             |                 | | >          |  | > begins        |
| ame:round_start | +------------+  | |  drawerId, |  |                 |
|   ---           | | > Clients  |  | | > d        |  |                 |
| --------------- | +============+  | | rawerName, |  |                 |
|                 | +------------+  | +============+  |                 |
|   ---           |                 | +------------+  |                 |
| --------------- |                 |                 |                 |
|                 |                 | > maskedWord,   |                 |
|                 |                 | > drawTime }    |                 |
+-----------------+-----------------+-----------------+-----------------+
|   ------------  | > Server        |   ------------  | > Broadcasts    |
|   game:timer    | > \$\\to\$      |   { timeLeft }  | > 1-second      |
|   ------------  | > Clients       |   ------------  | > countdown     |
|                 |                 |                 | > tick          |
|   ------------  |                 |   ------------  |                 |
+-----------------+-----------------+-----------------+-----------------+
|   ---           | > Server        |   -             | > Unveils       |
| --------------- | > \$\\to\$      | --------------- | > letters at    |
|   g             | > Guessers      |   { maskedWord, | > scheduled     |
| ame:hint_update |                 |   r             | > checkpoints   |
|   ---           |                 | evealedLetter } |                 |
| --------------- |                 |   -             |                 |
|                 |                 | --------------- |                 |
|   ---           |                 |                 |                 |
| --------------- |                 |   -             |                 |
|                 |                 | --------------- |                 |
+-----------------+-----------------+-----------------+-----------------+
|   -             | > Server        |   ------------  | > Round         |
| --------------- | > \$\\to\$      |   { word,       | > complete;     |
|                 | > Clients       |   reason,       | > reveals       |
|  game:round_end |                 |   scores,       | > secret word   |
|   -             |                 |   players }     |                 |
| --------------- |                 |   ------------  |                 |
|                 |                 |                 |                 |
|   -             |                 |   ------------  |                 |
| --------------- |                 |                 |                 |
+-----------------+-----------------+-----------------+-----------------+
|   -             | > Server        |                 | > Match over;   |
| --------------- | > \$\\to\$      |  -------------- | > announces     |
|                 | > Clients       |                 | > podium        |
|  game:game_over |                 |  { leaderboard, | > winners       |
|   -             |                 |   winner }      |                 |
| --------------- |                 |                 |                 |
|                 |                 |  -------------- |                 |
|   -             |                 |                 |                 |
| --------------- |                 |                 |                 |
|                 |                 |  -------------- |                 |
+-----------------+-----------------+-----------------+-----------------+

  ------------------------------------------------------------------------------------------------------------
  file:///C:/Users/ayush/OneDrive/Desktop/skribbl-clone/docs/README.html   5/13
  ------------------------------------------------------------------------ -----------------------------------

  ------------------------------------------------------------------------------------------------------------

![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image23.png){width="0.8194444444444444in"
height="0.19444444444444445in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image24.png){width="2.1527777777777777in"
height="0.19444444444444445in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image25.png){width="0.8472222222222222in"
height="0.19444444444444445in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image26.png){width="0.6805555555555556in"
height="0.20833333333333334in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image27.png){width="1.0833333333333333in"
height="0.20833333333333334in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image28.png){width="0.75in"
height="0.19444444444444445in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image29.png){width="0.2222222222222222in"
height="0.19444444444444445in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image30.png){width="0.875in"
height="0.19444444444444445in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image31.png){width="0.625in"
height="0.19444444444444445in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image32.png){width="1.2777777777777777in"
height="0.19444444444444445in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image33.png){width="2.0972222222222223in"
height="0.4027777777777778in"}![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image34.png){width="2.138888888888889in"
height="0.3888888888888889in"}

10/30/26, 11:34 AM Skribbl.io Clone - Documentation

> **Drawing Synchronization**

+-----------------+-----------------+-----------------+-----------------+
| > **Event**     | > **Direction** | > **Payload**   | >               |
|                 |                 |                 | **Description** |
+=================+=================+=================+=================+
| draw:stroke     | > Drawer        | +------------+  | > Sends         |
|                 | > \$\\to\$      | | > { fromX, |  | > continuous    |
|                 |                 | | > fromY,   |  | > stroke        |
|                 | +------------+  | | > toX,     |  | > coordinates   |
|                 | | > Server   |  | | > toY,     |  |                 |
|                 | +============+  | | > color,   |  |                 |
|                 | +------------+  | +============+  |                 |
|                 |                 | +------------+  |                 |
|                 |                 |                 |                 |
|                 |                 | > size, tool }  |                 |
+-----------------+-----------------+-----------------+-----------------+
| draw:stroke     | > Server        | +------------+  | > Real-time     |
|                 | > \$\\to\$      | | > { fromX, |  | > stroke        |
|                 |                 | | > fromY,   |  | > broadcast to  |
|                 | +------------+  | | > toX,     |  | > all players   |
|                 | | > Guessers |  | | > toY,     |  |                 |
|                 | +============+  | | > color,   |  |                 |
|                 | +------------+  | +============+  |                 |
|                 |                 | +------------+  |                 |
|                 |                 |                 |                 |
|                 |                 | > size, tool }  |                 |
+-----------------+-----------------+-----------------+-----------------+
| > draw:fill     | > Drawer        | > { x, y, color | > Flood-fill    |
|                 | > \$\\to\$      | > }             | > bucket        |
|                 | > Server        |                 | > operation     |
+-----------------+-----------------+-----------------+-----------------+
|   ------------  | > Drawer        |   ------------  | Pops last       |
|   draw:undo     | > \$\\to\$      |   {}            | stroke from     |
|   ------------  | > Server        |   ------------  | history stack   |
|                 |                 |                 |                 |
|   ------------  |                 |   ------------  |                 |
+-----------------+-----------------+-----------------+-----------------+
| > draw:clear    | > Drawer        | > {}            | > Clears active |
|                 | > \$\\to\$      |                 | > canvas buffer |
|                 | > Server        |                 |                 |
+-----------------+-----------------+-----------------+-----------------+
|   ------------  | Server \$\\to\$ |   ------------  | > Transmits     |
|   draw:init     | Client          |   { history:    | > full stroke   |
|   ------------  |                 |   \[\...\] }    | > history for   |
|                 |                 |   ------------  | > late joiners  |
|   ------------  |                 |                 |                 |
|                 |                 |   ------------  |                 |
+-----------------+-----------------+-----------------+-----------------+

> **Chat & Guessing System**

+-----------------+-----------------+-----------------+-----------------+
| > **Event**     | > **Direction** | > **Payload**   | >               |
|                 |                 |                 | **Description** |
+=================+=================+=================+=================+
| > chat:message  | > Client        | > { text }      | > Player sends  |
|                 | > \$\\to\$      |                 | > a chat        |
|                 | > Server        |                 | > message or    |
|                 |                 |                 | > guess         |
+-----------------+-----------------+-----------------+-----------------+
|                 | > Server        | +------------+  | > Broadcasts    |
|  -------------- | > \$\\to\$      | | > {        |  | > chat message  |
|   chat:message  |                 | | >          |  |                 |
|                 | +------------+  | |  playerId, |  |                 |
|  -------------- | | > Clients  |  | | > p        |  |                 |
|                 | +============+  | | layerName, |  |                 |
|                 | +------------+  | | > text,    |  |                 |
|  -------------- |                 | +============+  |                 |
|                 |                 | +------------+  |                 |
|                 |                 |                 |                 |
|                 |                 | > type }        |                 |
+-----------------+-----------------+-----------------+-----------------+
| gam             | > Server        | +------------+  | > \"PlayerX     |
| e:correct_guess | > \$\\to\$      | | > {        |  | > guessed the   |
|                 |                 | | >          |  | > word!\"       |
|                 | +------------+  | |  playerId, |  | > announcement  |
|                 | | > Clients  |  | | > p        |  |                 |
|                 | +============+  | | layerName, |  |                 |
|                 | +------------+  | | > points,  |  |                 |
|                 |                 | +============+  |                 |
|                 |                 | +------------+  |                 |
|                 |                 |                 |                 |
|                 |                 | > players }     |                 |
+-----------------+-----------------+-----------------+-----------------+
|   ---           | > Server        |   ------------  | > Private       |
| --------------- | > \$\\to\$      |   { message:    | > prompt when   |
|   c             | > Client        |   \"You are     | > guess is off  |
| hat:close_guess |                 |   close!\" }    | > by 1 letter   |
|   ---           |                 |   ------------  |                 |
| --------------- |                 |                 |                 |
|                 |                 |   ------------  |                 |
|   ---           |                 |                 |                 |
| --------------- |                 |                 |                 |
+-----------------+-----------------+-----------------+-----------------+
| > ![]           | > Server        |   ------------  | > Drawer        |
| (vertopal_1ca98 | > \$\\to\$      |   { message:    | > spoiler       |
| a70cb8d4ecfab3d |                 |   \"⚠️ You      | > prevention    |
| 67846913b947/me | +------------+  |   cannot write  | > alert         |
| dia/image22.png | | > Drawer   |  |   ------------  |                 |
| ){width="1.2083 | +============+  |                 |                 |
| 333333333333in" | +------------+  |   ------------  |                 |
| > h             |                 |                 |                 |
| eight="0.208333 |                 | > the word!\" } |                 |
| 33333333334in"} |                 |                 |                 |
+-----------------+-----------------+-----------------+-----------------+

+-----------------------------------+-----------------------------------+
| > 💡 **Technical Deep Dive**      |                                   |
| >                                 |                                   |
| > **1. How Drawing Strokes Are    |                                   |
| > Captured, Sent, and Rendered**\ |                                   |
| > Drawing across varied screens   |                                   |
| > and high-DPI displays often     |                                   |
| > leads to misalignment. To solve |                                   |
| > this, the client uses a         |                                   |
| > **normalized virtual canvas     |                                   |
| > resolution (\$800 \\times       |                                   |
| > 600\$)**:                       |                                   |
| >                                 |                                   |
| > ![](vertopal_1ca98a70cb8d4ec    |                                   |
| fab3d67846913b947/media/image6.pn |                                   |
| g){width="6.944444444444445e-2in" |                                   |
| >                                 |                                   |
|  height="6.944444444444445e-2in"} |                                   |
| > When a user touches or clicks   |                                   |
| > the canvas, coordinates are     |                                   |
| > scaled:\                        |                                   |
| > \$\$x\_{\\text{virtual}} =      |                                   |
| > (x\_{\\text{client}} -          |                                   |
| > \\text{rect.left}) \\times      |                                   |
| > \\                              |                                   |
| frac{800}{\\text{rect.width}}\$\$ |                                   |
| > \$\$y\_{\\text{virtual}} =      |                                   |
| > (y\_{\\text{client}} -          |                                   |
| > \\text{rect.top}) \\times       |                                   |
| > \\f                             |                                   |
| rac{600}{\\text{rect.height}}\$\$ |                                   |
+===================================+===================================+
| file                              | 6/13                              |
| :///C:/Users/ayush/OneDrive/Deskt |                                   |
| op/skribbl-clone/docs/README.html |                                   |
+-----------------------------------+-----------------------------------+

10/30/26, 11:34 AM Skribbl.io Clone - Documentation

> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image9.png){width="6.944444444444445e-2in"
> height="6.944444444444445e-2in"}Continuous line segments (x0, y0, x1,
> y1) are streamed over WebSockets rather than large bitmap images,
> reducing network overhead to a few bytes per packet.
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image11.png){width="6.944444444444445e-2in"
> height="5.555555555555555e-2in"}Upon receipt, remote clients render
> the segment using native HTML5 Canvas ctx.lineTo() and ctx.stroke() .
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image35.png){width="6.944444444444445e-2in"
> height="5.555555555555555e-2in"}The server maintains a drawHistory
> buffer of all strokes during the active turn, which is dispatched to
> new or reconnecting players via draw:init .
>
> **2. Authoritative State Management & Turn Rotation**
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image8.png){width="6.944444444444445e-2in"
> height="5.555555555555555e-2in"}The server maintains a round queue (
> turnQueue ) of connected player IDs.
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image36.png){width="6.944444444444445e-2in"
> height="6.944444444444445e-2in"}At the start of each turn, the next
> player is assigned as isDrawer = true while all others have isDrawer =
> false and hasGuessed = false .
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image6.png){width="6.944444444444445e-2in"
> height="6.944444444444445e-2in"}The drawer has 15 seconds to choose
> from 3 randomized words. If the drawer fails to choose in time, the
> server auto-selects a random word.
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image8.png){width="6.944444444444445e-2in"
> height="5.555555555555555e-2in"}The drawing round automatically ends
> when:
>
> 1\. The countdown timer expires ( timeLeft \<= 0 ).
>
> 2\. All non-drawing players have successfully guessed the word.
>
> 3\. The active drawer disconnects or leaves the game.
>
> **3. Dynamic Scoring Engine**
>
> Points for guessers decay dynamically as time elapses, incentivizing
> fast guesses while still rewarding later correct answers:
>
> \$\$\\text{Points} = \\text{round}\\left(100 + 400 \\times
> \\max\\left(0, \\frac{\\text{timeLeft}}
> {\\text{roundDuration}}\\right)\\right)\$\$
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image9.png){width="6.944444444444445e-2in"
> height="6.944444444444445e-2in"}**Guesser Score:** Up to **500
> points** for an instant guess down to **100 points** at the final
> second.
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image6.png){width="6.944444444444445e-2in"
> height="6.944444444444445e-2in"}**Drawer Bonus:** The drawer earns
> **50 bonus points** for every player who correctly guesses the word,
> encouraging clear drawings.
>
> **4. Anti-Cheat & Word-Matching Intelligence**
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image35.png){width="6.944444444444445e-2in"
> height="5.555555555555555e-2in"}**Case & Whitespace Invariance**:
> Incoming guesses are sanitized using .trim().toLowerCase() .
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image8.png){width="6.944444444444445e-2in"
> height="5.555555555555555e-2in"}**Drawer Spoiler Guard**: If the
> drawer attempts to type the secret word into chat, the message is
> blocked, and the drawer receives a private warning notification.
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image36.png){width="6.944444444444445e-2in"
> height="6.944444444444445e-2in"}**Correct Guesser Isolation**: Once a
> player guesses correctly, their subsequent chat messages are hidden
> from players who are still guessing, preventing spoilers.
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image35.png){width="6.944444444444445e-2in"
> height="5.555555555555555e-2in"}**Fuzzy Match (Levenshtein
> Distance)**: If a guess is off by an edit distance of 1 letter for
> words \$\\ge 4\$ characters (e.g. guessing \"elefant\" for
> \"elephant\" ), the server emits a private \"You are close!\"
> notification without revealing the word.
>
> 📋 **Requirements Checklist**
>
> ✅ **Must Have (Core Requirements)**
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image37.png){width="0.1527777777777778in"
> height="0.1527777777777778in"} **Create room with configurable
> settings** (player count, rounds, draw time, word mode)

file:///C:/Users/ayush/OneDrive/Desktop/skribbl-clone/docs/README.html
7/13

10/30/26, 11:34 AM Skribbl.io Clone - Documentation

> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image38.png){width="0.1527777777777778in"
> height="0.1527777777777778in"} **Join room via link or room code**
> (6-character invite code & direct URL sharing)
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image39.png){width="0.1527777777777778in"
> height="0.1388888888888889in"} **Lobby with player list and avatar
> selector**; host controls start game
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image40.png){width="0.1527777777777778in"
> height="0.1527777777777778in"} **Turn-based rounds** with rotating
> drawers and guessers
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image38.png){width="0.1527777777777778in"
> height="0.1527777777777778in"} **Real-time drawing sync** (strokes
> instantly visible to all viewers)
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image41.png){width="0.1527777777777778in"
> height="0.1388888888888889in"} **Word selection for drawer** (choice
> of 3 words with countdown)
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image40.png){width="0.1527777777777778in"
> height="0.1527777777777778in"} **Guessing system**: type word in chat,
> correct guess awards points
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image38.png){width="0.1527777777777778in"
> height="0.1527777777777778in"} **Scoring and leaderboard** with live
> rank recalculation
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image42.png){width="0.1527777777777778in"
> height="0.1388888888888889in"} **Game end screen** displaying winner
> podium and leaderboard
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image43.png){width="0.1527777777777778in"
> height="0.1388888888888889in"} **Basic drawing tools**: brush, color
> palette, brush sizes, undo, and clear canvas
>
> 🌟 **Should Have**
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image44.png){width="0.1527777777777778in"
> height="0.1527777777777778in"} **Progressive letter hints** ( \_ \_ a
> \_ \_ ) revealed over time
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image45.png){width="0.1527777777777778in"
> height="0.1527777777777778in"} **Chat system** (guesses filtered,
> general chat, correct guess notifications)
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image46.png){width="0.1527777777777778in"
> height="0.1388888888888889in"} **Draw time countdown** with live timer
> broadcast
>
> ![](vertopal_1ca98a70cb8d4ecfab3d67846913b947/media/image43.png){width="0.1527777777777778in"
> height="0.1388888888888889in"} **Private rooms** with invite-only
> links
>
> 🎁 **Nice to Have & Bonus Implementations**

+-----------------------+-----------------------+-----------------------+
| ![](verto             | > **Word categories** |                       |
| pal_1ca98a70cb8d4ecfa | > (Animals, Food,     |                       |
| b3d67846913b947/media | > Objects, Actions,   |                       |
| /image44.png){width=" | > Nature, Pop         |                       |
| 0.1527777777777778in" | > Culture)            |                       |
| height="0             |                       |                       |
| .1527777777777778in"} |                       |                       |
+=======================+=======================+=======================+
| ![](verto             | > **Custom word list  |                       |
| pal_1ca98a70cb8d4ecfa | > support** (host can |                       |
| b3d67846913b947/media | > supply              |                       |
| /image45.png){width=" | > comma-separated     |                       |
| 0.1527777777777778in" | > custom words)       |                       |
| height="0             |                       |                       |
| .1527777777777778in"} |                       |                       |
+-----------------------+-----------------------+-----------------------+
| ![](verto             | > **Paint bucket tool |                       |
| pal_1ca98a70cb8d4ecfa | > (Flood Fill)** with |                       |
| b3d67846913b947/media | > scanline BFS fill   |                       |
| /image46.png){width=" |                       |                       |
| 0.1527777777777778in" |                       |                       |
| height="0             |                       |                       |
| .1388888888888889in"} |                       |                       |
+-----------------------+-----------------------+-----------------------+
| ![](verto             | > **Fuzzy guess       |                       |
| pal_1ca98a70cb8d4ecfa | > detection** (\"You  |                       |
| b3d67846913b947/media | > are close!\" via    |                       |
| /image43.png){width=" | > Levenshtein         |                       |
| 0.1527777777777778in" | > distance)           |                       |
| height="0             |                       |                       |
| .1388888888888889in"} |                       |                       |
+-----------------------+-----------------------+-----------------------+
| ![](verto             | > **Sound effects &   |                       |
| pal_1ca98a70cb8d4ecfa | > audio toggle** for  |                       |
| b3d67846913b947/media | > correct guesses,    |                       |
| /image45.png){width=" | > timers, and game    |                       |
| 0.1527777777777778in" | > over                |                       |
| height="0             |                       |                       |
| .1527777777777778in"} |                       |                       |
+-----------------------+-----------------------+-----------------------+
| ![](verto             | > **Strict            |                       |
| pal_1ca98a70cb8d4ecfa | > Object-Oriented     |                       |
| b3d67846913b947/media | > Architecture** (    |                       |
| /image47.png){width=" | > RoomManager , Room  |                       |
| 0.1527777777777778in" | > , Game , Player )   |                       |
| height="0             |                       |                       |
| .1388888888888889in"} |                       |                       |
+-----------------------+-----------------------+-----------------------+
| file://               |                       | 8/13                  |
| /C:/Users/ayush/OneDr |                       |                       |
| ive/Desktop/skribbl-c |                       |                       |
| lone/docs/README.html |                       |                       |
+-----------------------+-----------------------+-----------------------+

10/30/26, 11:34 AM Skribbl.io Clone - Documentation

> 🛠️ **Technology Stack**

+-----------------+-----------------+-----------------+-----------------+
| > **Layer**     | >               | > **Version**   | > **Purpose**   |
|                 |  **Technology** |                 |                 |
+=================+=================+=================+=================+
| > **Frontend**  | > React         |   ------------  | > Declarative   |
|                 |                 |   \^19.3.1      | > reactive UI   |
|                 |                 |   ------------  | > components    |
|                 |                 |                 |                 |
|                 |                 |   ------------  |                 |
+-----------------+-----------------+-----------------+-----------------+
| > **Build       | > Vite          |   ------------  | > Fast HMR and  |
| > Tool**        |                 |   \^8.3.5       | > production    |
|                 |                 |   ------------  | > bundling      |
|                 |                 |                 |                 |
|                 |                 |   ------------  |                 |
+-----------------+-----------------+-----------------+-----------------+
| > **Styling**   | > Vanilla CSS3  | > Modern CSS    | > Responsive    |
|                 |                 |                 | > layouts, CSS  |
|                 |                 |                 | > variables,    |
|                 |                 |                 | > Glassmorphism |
+-----------------+-----------------+-----------------+-----------------+
| > **Canvas**    | > HTML5 Canvas  | > Native        | > Pixel         |
|                 | > API           |                 | > manipulation, |
|                 |                 |                 | > stroke        |
|                 |                 |                 | > rendering,    |
|                 |                 |                 | > flood fill    |
+-----------------+-----------------+-----------------+-----------------+
| > **Routing**   | > React Router  |   ------------  | > Client-side   |
|                 | > DOM           |   \^7.18.5      | > routing ( /   |
|                 |                 |   ------------  | > and           |
|                 |                 |                 | > /room/:code ) |
|                 |                 |   ------------  |                 |
+-----------------+-----------------+-----------------+-----------------+
| > **Backend**   | > Node.js       |   ------------  | > JavaScript    |
|                 |                 |   \^20.x        | > runtime       |
|                 |                 |   ------------  | > environment   |
|                 |                 |                 |                 |
|                 |                 |   ------------  |                 |
+-----------------+-----------------+-----------------+-----------------+
| > **Server      | > Express       |   ------------  | > HTTP server,  |
| > Framework**   |                 |   \^5.3.0       | > REST          |
|                 |                 |   ------------  | > endpoints,    |
|                 |                 |                 | > CORS          |
|                 |                 |   ------------  | > middleware    |
+-----------------+-----------------+-----------------+-----------------+
| > **Real-Time** | > Socket.IO     |   ------------  | >               |
|                 |                 |   \^4.8.4       |  Bi-directional |
|                 |                 |   ------------  | > WebSocket     |
|                 |                 |                 | > communication |
|                 |                 |   ------------  |                 |
+-----------------+-----------------+-----------------+-----------------+
| > **Database**  | > MongoDB /     |   ------------  | > Optional      |
|                 | > Mongoose      |   \^9.11.4      | > persistent    |
|                 |                 |   ------------  | > room/score    |
|                 |                 |                 | > snapshots     |
|                 |                 |   ------------  |                 |
+-----------------+-----------------+-----------------+-----------------+
| >               | > Render        | > Cloud         | > Full-stack    |
|  **Deployment** |                 |                 | > production    |
|                 |                 |                 | > hosting       |
+-----------------+-----------------+-----------------+-----------------+

  ------------------------------------------------------------------------ -----------------------------------
  file:///C:/Users/ayush/OneDrive/Desktop/skribbl-clone/docs/README.html   9/13

  ------------------------------------------------------------------------ -----------------------------------

10/30/26, 11:34 AM Skribbl.io Clone - Documentation

> 📁 **Project Structure**

+-----------------------------------------------------------------------+
| > skribbl-clone/                                                      |
+=======================================================================+
+-----------------------------------------------------------------------+

> ├── client/ \# Frontend React + Vite Application\
> │ ├── public/ \# Static assets & favicon\
> │ ├── src/\
> │ │ ├── assets/ \# Audio sound effects & graphics\
> │ │ ├── components/ \# Modular UI components\
> │ │ │ ├── Avatar.jsx \# Customizable player avatar renderer│ │ │ ├──
> Canvas.jsx \# HTML5 drawing engine, flood fill & tools│ │ │ ├──
> Canvas.css \# Canvas styling & toolbar layout\
> │ │ │ ├── Chat.jsx \# Real-time chat & guess input box\
> │ │ │ ├── CreateRoomModal.jsx \# Host settings modal (rounds, time,
> words)│ │ │ ├── GameOverModal.jsx \# Winner podium & final
> leaderboard\
> │ │ │ ├── Leaderboard.jsx \# Live score ranking component\
> │ │ │ ├── RoundEndModal.jsx \# Round intermission & word reveal\
> │ │ │ ├── TopBar.jsx \# Round info, countdown timer, hints display│ │
> │ └── WordSelectModal.jsx \# 3-word selection dialog for drawer│ │ ├──
> pages/\
> │ │ │ ├── Home.jsx \# Landing page (Quick Play, Join, Create)│ │ │ └──
> Room.jsx \# Main game room coordinator\
> │ │ ├── services/\
> │ │ │ ├── api.js \# Axios client for REST endpoints\
> │ │ │ └── socket.js \# Socket.IO client instance & listeners│ │ ├──
> utils/\
> │ │ │ ├── constants.js \# Color palette, brush sizes, avatars│ │ │ └──
> sound.js \# Audio synthesizers & effects\
> │ │ ├── App.jsx \# React Router configuration\
> │ │ ├── App.css \# Global themes & glassmorphism styles│ │ ├──
> index.css \# Reset styles & typography\
> │ │ └── main.jsx \# React 19 root entry\
> │ ├── index.html \# HTML template\
> │ ├── package.json \# Client dependencies & scripts\
> │ └── vite.config.js \# Vite bundler configuration\
> │\
> ├── server/ \# Authoritative Node.js Backend Server│ ├── src/\
> │ │ ├── config/\
> │ │ │ └── db.js \# MongoDB connection setup (optional)│ │ ├── game/ \#
> Object-Oriented Game Engine\
> │ │ │ ├── Game.js \# Round logic, timers, scoring, hints│ │ │ ├──
> Player.js \# Player domain model & scores\
> │ │ │ ├── Room.js \# Room session & host permissions\
> │ │ │ ├── RoomManager.js \# Singleton registry for active rooms│ │ │
> └── words.js \# Word bank & Levenshtein distance matcher│ │ ├──
> models/\
> │ │ │ └── Room.js \# Mongoose schema for persistent rooms│ │ ├──
> routes/\
> │ │ │ └── roomRoutes.js \# REST endpoints (/api/rooms)\
> │ │ └── index.js \# Express application & Socket.IO server│ └──
> package.json \# Server dependencies & scripts\
> │\
> ├── docs/ \# Documentation & screenshots

file:///C:/Users/ayush/OneDrive/Desktop/skribbl-clone/docs/README.html
10/13

10/30/26, 11:34 AM Skribbl.io Clone - Documentation

+-----------------------------------------------------------------------+
| > │ └── screenshots/ \# Application preview images                    |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > ├── package.json \# Monorepo root helper scripts                    |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > ├── .gitignore \# Git ignore rules                                  |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > └── README.md \# Project documentation                              |
+=======================================================================+
+-----------------------------------------------------------------------+

> 🚀 **Local Development Setup**
>
> **Prerequisites**

+-----------------------------------+-----------------------------------+
| ![](vertopal_1ca98a70cb8d4ecf     | > **Node.js**: v18.0.0 or higher\ |
| ab3d67846913b947/media/image11.pn | > **npm**: v9.0.0 or higher\      |
| g){width="6.944444444444445e-2in" | > *(Optional)***MongoDB**: Local  |
| height="5.555555555555555e-2in"}  | > or MongoDB Atlas URI (falls     |
|                                   | > back to in-memory mode if       |
| ![](vertopal_1ca98a70cb8d4ec      | > omitted)                        |
| fab3d67846913b947/media/image8.pn |                                   |
| g){width="6.944444444444445e-2in" |                                   |
| height="5.555555555555555e-2in"}  |                                   |
|                                   |                                   |
| ![](vertopal_1ca98a70cb8d4ec      |                                   |
| fab3d67846913b947/media/image9.pn |                                   |
| g){width="6.944444444444445e-2in" |                                   |
| height="6.944444444444445e-2in"}  |                                   |
+===================================+===================================+
+-----------------------------------+-----------------------------------+

> **Step 1: Clone the Repository**

+-----------------------------------------------------------------------+
| > git clone https://github.com/AyushCrafts-001/skribbl-clone.git      |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > cd skribbl-clone                                                    |
+=======================================================================+
+-----------------------------------------------------------------------+

> **Step 2: Start the Backend Server**
>
> 1\. Open a new terminal and navigate to server/ :

+-----------------------------------------------------------------------+
| > cd server                                                           |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > npm install                                                         |
+=======================================================================+
+-----------------------------------------------------------------------+

> 2\. *(Optional)* Configure environment variables in server/.env :

+-----------------------------------------------------------------------+
| > PORT=5000                                                           |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > CLIENT_URL=http://localhost:5173                                    |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > \# MONGODB_URI=mongodb://localhost:27017/skribbl (optional)         |
+=======================================================================+
+-----------------------------------------------------------------------+

> 3\. Launch the development server:

+-----------------------------------------------------------------------+
| > npm run dev                                                         |
+-----------------------------------------------------------------------+
|                                                                       |
+-----------------------------------------------------------------------+

> *The backend will boot up at http://localhost:5000 .*
>
> **Step 3: Start the Frontend Client**
>
> 1\. Open a second terminal and navigate to client/ :

file:///C:/Users/ayush/OneDrive/Desktop/skribbl-clone/docs/README.html
11/13

  -----------------------------------------------------------------------
  10/30/26, 11:34 AM                  Skribbl.io Clone - Documentation
  ----------------------------------- -----------------------------------

  -----------------------------------------------------------------------

+-----------------------------------------------------------------------+
| > cd client                                                           |
+=======================================================================+
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| > npm install                                                         |
+=======================================================================+
+-----------------------------------------------------------------------+

> 2\. Create a .env file in client/ :

+-----------------------------------------------------------------------+
| > VITE_API_URL=http://localhost:5000                                  |
+-----------------------------------------------------------------------+
|                                                                       |
+-----------------------------------------------------------------------+

> 3\. Launch the Vite dev server:

+-----------------------------------------------------------------------+
| > npm run dev                                                         |
+-----------------------------------------------------------------------+
|                                                                       |
+-----------------------------------------------------------------------+

> *The client will start at http://localhost:5173 .*
>
> **Step 4: Play Multiplayer Locally**
>
> Open multiple browser windows or tabs at http://localhost:5173 : 1. In
> Tab 1, enter a name and click **Create Private Room**.
>
> 2\. Copy the 6-character room code or URL.
>
> 3\. In Tab 2 (or an incognito window), enter another name and join
> with the code. 4. Click **Start Game** from Tab 1 (host) to begin
> drawing and guessing!
>
> ☁️ **Deployment Guide**
>
> **Deploying to Render**
>
> 1\. **Backend Web Service**:

+-----------------------------------+-----------------------------------+
| ![](vertopal_1ca98a70cb8d4ec      | > Environment: Node\              |
| fab3d67846913b947/media/image9.pn | > Build Command: cd server && npm |
| g){width="6.944444444444445e-2in" | > install\                        |
| height="6.944444444444445e-2in"}  | > Start Command: cd server && npm |
|                                   | > start\                          |
| ![](vertopal_1ca98a70cb8d4ec      | > Add Environment Variable:       |
| fab3d67846913b947/media/image6.pn | > CLIENT_URL=h                    |
| g){width="6.944444444444445e-2in" | ttps://your-frontend.onrender.com |
| height="6.944444444444445e-2in"}  |                                   |
|                                   |                                   |
| ![](vertopal_1ca98a70cb8d4ecf     |                                   |
| ab3d67846913b947/media/image35.pn |                                   |
| g){width="6.944444444444445e-2in" |                                   |
| height="5.555555555555555e-2in"}  |                                   |
|                                   |                                   |
| ![](vertopal_1ca98a70cb8d4ecf     |                                   |
| ab3d67846913b947/media/image35.pn |                                   |
| g){width="6.944444444444445e-2in" |                                   |
| height="5.555555555555555e-2in"}  |                                   |
+===================================+===================================+
+-----------------------------------+-----------------------------------+

> 2\. **Frontend Static Site**:

+-----------------------------------+-----------------------------------+
| ![](vertopal_1ca98a70cb8d4ecf     | > Environment: Static Site\       |
| ab3d67846913b947/media/image36.pn | > Build Command: cd client && npm |
| g){width="6.944444444444445e-2in" | > install && npm run build\       |
| height="6.944444444444445e-2in"}  | > Publish Directory: client/dist\ |
|                                   | > Add Environment Variable:       |
| ![](vertopal_1ca98a70cb8d4ec      | > VITE_API_URL=                   |
| fab3d67846913b947/media/image6.pn | https://your-backend.onrender.com |
| g){width="6.944444444444445e-2in" |                                   |
| height="6.944444444444445e-2in"}  |                                   |
|                                   |                                   |
| ![](vertopal_1ca98a70cb8d4ecf     |                                   |
| ab3d67846913b947/media/image35.pn |                                   |
| g){width="6.944444444444445e-2in" |                                   |
| height="5.555555555555555e-2in"}  |                                   |
|                                   |                                   |
| ![](vertopal_1ca98a70cb8d4ecf     |                                   |
| ab3d67846913b947/media/image11.pn |                                   |
| g){width="6.944444444444445e-2in" |                                   |
| height="5.555555555555555e-2in"}  |                                   |
+===================================+===================================+
+-----------------------------------+-----------------------------------+

> 👨‍💻 **Author**
>
> **Designed and Developed by Ayush Saxena**

file:///C:/Users/ayush/OneDrive/Desktop/skribbl-clone/docs/README.html
12/13

+-----------------------+-----------------------+-----------------------+
| 10/30/26, 11:34 AM    |                       | > Skribbl.io Clone -  |
|                       |                       | > Documentation       |
+=======================+=======================+=======================+
| ![](vertopa           | > 💼**LinkedIn:**     |                       |
| l_1ca98a70cb8d4ecfab3 |                       |                       |
| d67846913b947/media/i |                       |                       |
| mage36.png){width="6. |                       |                       |
| 944444444444445e-2in" |                       |                       |
| height="6.9           |                       |                       |
| 44444444444445e-2in"} |                       |                       |
+-----------------------+-----------------------+-----------------------+
| ![](vertopa           | > 🐙**GitHub:**       |                       |
| l_1ca98a70cb8d4ecfab3 |                       |                       |
| d67846913b947/media/i |                       |                       |
| mage48.png){width="6. |                       |                       |
| 944444444444445e-2in" |                       |                       |
| height="6.9           |                       |                       |
| 44444444444445e-2in"} |                       |                       |
+-----------------------+-----------------------+-----------------------+
| ![](vertopa           | > 📁**Repository:**   |                       |
| l_1ca98a70cb8d4ecfab3 |                       |                       |
| d67846913b947/media/i |                       |                       |
| mage35.png){width="6. |                       |                       |
| 944444444444445e-2in" |                       |                       |
| height="5.5           |                       |                       |
| 55555555555555e-2in"} |                       |                       |
+-----------------------+-----------------------+-----------------------+

> 📄 **License**\
> This project is licensed under the **MIT License** - see the LICENSE
> file for details.

file:///C:/Users/ayush/OneDrive/Desktop/skribbl-clone/docs/README.html
13/13
