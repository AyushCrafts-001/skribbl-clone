import { useState, useEffect } from "react";
import Home from "./pages/Home.jsx";
import Lobby from "./pages/Lobby.jsx";
import "./App.css";

export function App() {
  const [activeRoom, setActiveRoom] = useState(null);

  // Sync room parameter in browser URL address bar
  useEffect(() => {
    if (activeRoom?.roomCode) {
      window.history.replaceState(null, "", `?room=${activeRoom.roomCode}`);
    } else {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [activeRoom]);

  const handleLeaveRoom = () => {
    setActiveRoom(null);
  };

  return (
    <div className="skribbl-app">
      {activeRoom ? (
        <Lobby
          roomCode={activeRoom.roomCode}
          playerName={activeRoom.playerName}
          avatar={activeRoom.avatar}
          onLeave={handleLeaveRoom}
        />
      ) : (
        <Home onJoinRoom={(data) => setActiveRoom(data)} />
      )}
    </div>
  );
}

export default App;
