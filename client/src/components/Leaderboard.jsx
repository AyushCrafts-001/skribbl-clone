import Avatar from "./Avatar.jsx";
import socket from "../services/socket";

export function Leaderboard({ players = [], currentPlayerName, isHost = false, roomCode }) {
  // Sort players descending by score
  const sortedPlayers = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));

  const handleKick = (targetSocketId, targetName) => {
    if (!window.confirm(`Are you sure you want to kick ${targetName}?`)) return;
    socket.emit("room:kick", { roomCode, targetSocketId });
  };

  return (
    <div className="leaderboard-card">
      <div className="leaderboard-header">
        <span className="leaderboard-title">🏆 Players ({players.length})</span>
      </div>

      <div className="player-list">
        {sortedPlayers.map((player, index) => {
          const isCurrent = player.name === currentPlayerName;
          const rank = index + 1;

          return (
            <div
              key={player.id || player.name}
              className={`player-item ${isCurrent ? "player-self" : ""} ${player.hasGuessed ? "player-guessed" : ""}`}
            >
              {/* Rank Badge */}
              <div className="player-rank">
                {rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `#${rank}`}
              </div>

              {/* Avatar */}
              <Avatar avatar={player.avatar} size={34} />

              {/* Name & Indicators */}
              <div className="player-info">
                <div className="player-name-row">
                  <span className="player-name" title={player.name}>
                    {player.name}
                  </span>
                  {player.isHost && <span className="crown-icon" title="Host">👑</span>}
                </div>
                <div className="player-score">{player.score || 0} pts</div>
              </div>

              {/* Status Badge */}
              <div className="player-status">
                {player.isDrawer && (
                  <span className="status-drawer" title="Drawing now">
                    ✏️
                  </span>
                )}
                {player.hasGuessed && (
                  <span className="status-guessed" title="Guessed the word">
                    ✅
                  </span>
                )}
                {!player.isConnected && (
                  <span className="status-dc" title="Disconnected">
                    ⚠️
                  </span>
                )}
              </div>

              {/* Host kick option */}
              {isHost && !player.isHost && (
                <button
                  type="button"
                  className="kick-btn"
                  title={`Kick ${player.name}`}
                  onClick={() => handleKick(player.id, player.name)}
                >
                  ✕
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Leaderboard;
