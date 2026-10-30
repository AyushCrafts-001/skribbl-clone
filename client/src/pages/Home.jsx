import { useState, useEffect } from "react";
import api from "../services/api";
import Avatar from "../components/Avatar.jsx";
import { AVATAR_COLORS, TOTAL_EYES, TOTAL_MOUTHS, getRandomAvatar } from "../utils/constants";
import CreateRoomModal from "../components/CreateRoomModal.jsx";

export function Home({ onJoinRoom }) {
  const [playerName, setPlayerName] = useState(
    () => localStorage.getItem("skribbl_name") || ""
  );
  const [avatar, setAvatar] = useState(() => {
    const saved = localStorage.getItem("skribbl_avatar");
    return saved ? JSON.parse(saved) : getRandomAvatar();
  });

  const [roomCode, setRoomCode] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return (urlParams.get("room") || "").toUpperCase();
  });

  const [publicRooms, setPublicRooms] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Poll active joinable public rooms
  useEffect(() => {
    let isMounted = true;
    const fetchRooms = async () => {
      try {
        const res = await api.get("/api/rooms");
        if (isMounted && res.data?.success) {
          setPublicRooms(res.data.rooms || []);
        }
      } catch {
        // Fallback when server is connecting
      }
    };

    fetchRooms();
    const interval = setInterval(fetchRooms, 5000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const saveProfile = (name, av) => {
    localStorage.setItem("skribbl_name", name);
    localStorage.setItem("skribbl_avatar", JSON.stringify(av));
  };

  const handleRandomizeAvatar = () => {
    const newAv = getRandomAvatar();
    setAvatar(newAv);
    saveProfile(playerName, newAv);
  };

  const cycleColor = () => {
    const currentIdx = AVATAR_COLORS.indexOf(avatar.color);
    const nextColor = AVATAR_COLORS[(currentIdx + 1) % AVATAR_COLORS.length];
    const newAv = { ...avatar, color: nextColor };
    setAvatar(newAv);
    saveProfile(playerName, newAv);
  };

  const cycleEyes = () => {
    const newAv = { ...avatar, eyes: (avatar.eyes + 1) % TOTAL_EYES };
    setAvatar(newAv);
    saveProfile(playerName, newAv);
  };

  const cycleMouth = () => {
    const newAv = { ...avatar, mouth: (avatar.mouth + 1) % TOTAL_MOUTHS };
    setAvatar(newAv);
    saveProfile(playerName, newAv);
  };

  // Quick Play / Join Public
  const handleQuickPlay = async () => {
    if (!playerName.trim()) {
      setErrorMessage("Please enter your name!");
      return;
    }
    setErrorMessage("");
    setLoading(true);

    try {
      saveProfile(playerName.trim(), avatar);
      const res = await api.post("/api/rooms/quick-join", {
        playerName: playerName.trim(),
      });

      if (res.data?.success) {
        onJoinRoom({
          roomCode: res.data.roomCode,
          playerName: playerName.trim(),
          avatar,
        });
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Failed to find public room.");
    } finally {
      setLoading(false);
    }
  };

  // Join by room code
  const handleJoinByCode = async (codeToJoin = null) => {
    const code = (codeToJoin || roomCode).trim().toUpperCase();
    if (!playerName.trim()) {
      setErrorMessage("Please enter your name first!");
      return;
    }
    if (!code) {
      setErrorMessage("Please enter a room code!");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    try {
      saveProfile(playerName.trim(), avatar);
      const res = await api.post(`/api/rooms/${code}/join`, {
        playerName: playerName.trim(),
      });

      if (res.data?.success) {
        onJoinRoom({
          roomCode: code,
          playerName: playerName.trim(),
          avatar,
        });
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Room not found or cannot join.");
    } finally {
      setLoading(false);
    }
  };

  // Create room with custom settings
  const handleCreateRoom = async ({ settings, isPrivate }) => {
    if (!playerName.trim()) {
      setErrorMessage("Please enter your name!");
      setShowCreateModal(false);
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      saveProfile(playerName.trim(), avatar);
      const res = await api.post("/api/rooms", {
        playerName: playerName.trim(),
        settings,
        isPrivate,
      });

      if (res.data?.success) {
        setShowCreateModal(false);
        onJoinRoom({
          roomCode: res.data.roomCode,
          playerName: playerName.trim(),
          avatar,
        });
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Failed to create room.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      {/* Brand Header */}
      <header className="home-brand">
        <h1 className="brand-logo">
          <span className="logo-letter letter-s">s</span>
          <span className="logo-letter letter-k">k</span>
          <span className="logo-letter letter-r">r</span>
          <span className="logo-letter letter-i">i</span>
          <span className="logo-letter letter-b">b</span>
          <span className="logo-letter letter-b2">b</span>
          <span className="logo-letter letter-l">l</span>
          <span className="logo-io">.io</span>
        </h1>
        <p className="brand-tagline">Free Online Multiplayer Drawing & Guessing Game</p>
      </header>

      {/* Main Play Card */}
      <div className="home-card">
        {/* Avatar Customizer */}
        <div className="avatar-studio">
          <Avatar avatar={avatar} size={88} className="hero-avatar" />

          <div className="avatar-controls">
            <button
              type="button"
              className="avatar-btn"
              onClick={cycleColor}
              title="Change Color"
            >
              🎨 Color
            </button>
            <button
              type="button"
              className="avatar-btn"
              onClick={cycleEyes}
              title="Change Eyes"
            >
              👀 Eyes
            </button>
            <button
              type="button"
              className="avatar-btn"
              onClick={cycleMouth}
              title="Change Mouth"
            >
              👄 Mouth
            </button>
            <button
              type="button"
              className="avatar-btn rand-btn"
              onClick={handleRandomizeAvatar}
              title="Randomize Avatar"
            >
              🎲 Random
            </button>
          </div>
        </div>

        {/* Name input */}
        <div className="name-input-group">
          <input
            type="text"
            value={playerName}
            onChange={(e) => {
              setPlayerName(e.target.value);
              saveProfile(e.target.value, avatar);
            }}
            placeholder="Enter your name..."
            maxLength={18}
            className="home-input"
          />
        </div>

        {errorMessage && <div className="home-error-banner">{errorMessage}</div>}

        {/* Action Buttons */}
        <div className="home-actions">
          <button
            type="button"
            className="btn-play-public"
            onClick={handleQuickPlay}
            disabled={loading}
          >
            {loading ? "Connecting..." : "🚀 Play! (Quick Match)"}
          </button>

          <button
            type="button"
            className="btn-create-private"
            onClick={() => setShowCreateModal(true)}
            disabled={loading}
          >
            ⚙️ Create Private Room
          </button>
        </div>

        {/* Join by code */}
        <div className="join-code-divider">
          <span>OR JOIN VIA CODE</span>
        </div>

        <div className="join-code-row">
          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            placeholder="ROOM CODE"
            maxLength={6}
            className="code-input"
          />
          <button
            type="button"
            className="btn-join-code"
            onClick={() => handleJoinByCode()}
            disabled={loading || !roomCode.trim()}
          >
            Join
          </button>
        </div>
      </div>

      {/* Active Public Rooms Browser */}
      {publicRooms.length > 0 && (
        <div className="public-rooms-panel">
          <h3 className="public-rooms-title">
            🌐 Active Open Rooms ({publicRooms.length})
          </h3>
          <div className="public-rooms-grid">
            {publicRooms.map((r) => (
              <div key={r.code} className="public-room-item">
                <div className="room-meta">
                  <span className="room-badge">{r.code}</span>
                  <span className="room-players">
                    👥 {r.playersCount} / {r.maxPlayers}
                  </span>
                  <span className="room-status-pill">{r.status}</span>
                </div>
                <button
                  type="button"
                  className="btn-join-small"
                  onClick={() => handleJoinByCode(r.code)}
                  disabled={r.playersCount >= r.maxPlayers}
                >
                  {r.playersCount >= r.maxPlayers ? "Full" : "Join"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Room Settings Modal */}
      <CreateRoomModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateRoom={handleCreateRoom}
        loading={loading}
      />
    </div>
  );
}

export default Home;
