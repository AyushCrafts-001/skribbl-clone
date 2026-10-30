import { useState } from "react";
import sound from "../utils/sound";

export function TopBar({
  roomCode,
  round = 1,
  maxRounds = 3,
  timeLeft = 60,
  maskedWord = "",
  wordLength = 0,
  secretWord = "",
  isDrawer = false,
  category = "all",
  onLeave,
}) {
  const [copied, setCopied] = useState(false);
  const [muted, setMuted] = useState(sound.isMuted());

  const handleCopyLink = () => {
    const inviteUrl = `${window.location.origin}?room=${roomCode}`;
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSound = () => {
    const isNowMuted = sound.toggleMute();
    setMuted(isNowMuted);
  };

  const isUrgent = timeLeft <= 10 && timeLeft > 0;

  return (
    <header className="topbar">
      {/* Left: Round & Timer */}
      <div className="topbar-left">
        <div className="round-badge">
          Round {round} / {maxRounds}
        </div>

        <div className={`timer-badge ${isUrgent ? "urgent" : ""}`}>
          <span className="timer-icon">⏱️</span>
          <span className="timer-number">{timeLeft}s</span>
        </div>
      </div>

      {/* Center: Word hint display */}
      <div className="topbar-center">
        {category && category !== "all" && (
          <span className="category-pill">{category.toUpperCase()}</span>
        )}

        {isDrawer ? (
          <div className="secret-word-display">
            <span className="drawer-label">DRAW THIS:</span>
            <span className="word-text">{secretWord || maskedWord}</span>
          </div>
        ) : (
          <div className="hint-word-display">
            <span className="masked-word">{maskedWord || "_ _ _ _"}</span>
            {wordLength > 0 && <span className="word-count">({wordLength})</span>}
          </div>
        )}
      </div>

      {/* Right: Room code, Invite, Sound, Exit */}
      <div className="topbar-right">
        <div className="room-code-tag">
          <span className="code-label">ROOM:</span>
          <strong className="code-val">{roomCode}</strong>
          <button
            type="button"
            className="copy-btn"
            onClick={handleCopyLink}
            title="Copy invite link"
          >
            {copied ? "✅ Copied" : "🔗 Copy Link"}
          </button>
        </div>

        <button
          type="button"
          className="icon-btn sound-btn"
          onClick={handleToggleSound}
          title={muted ? "Unmute sound" : "Mute sound"}
        >
          {muted ? "🔇" : "🔊"}
        </button>

        <button
          type="button"
          className="icon-btn leave-btn"
          onClick={onLeave}
          title="Leave Room"
        >
          🚪
        </button>
      </div>
    </header>
  );
}

export default TopBar;
