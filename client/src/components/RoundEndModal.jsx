import Avatar from "./Avatar.jsx";

export function RoundEndModal({ word, reason, roundScores = [], nextTurnIn = 4 }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-card round-end-card">
        <h2 className="modal-title">⏱️ {reason || "Round Finished!"}</h2>

        <div className="revealed-word-box">
          <span className="revealed-word-label">The secret word was:</span>
          <span className="revealed-word-text">{word}</span>
        </div>

        <div className="round-scores-list">
          <h3 className="section-title">Points this turn:</h3>
          {roundScores.length > 0 ? (
            roundScores.map((player) => (
              <div key={player.id || player.name} className="round-score-row">
                <div className="score-row-player">
                  <Avatar avatar={player.avatar} size={28} />
                  <span className="score-player-name">{player.name}</span>
                  {player.isDrawer && <span className="drawer-badge">Drawer</span>}
                </div>
                <div className="score-points">
                  {player.roundScore > 0 ? (
                    <span className="positive-pts">+{player.roundScore}</span>
                  ) : (
                    <span className="zero-pts">0</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="no-points">No one guessed the word.</p>
          )}
        </div>

        <div className="next-round-timer">
          Next turn starts in <strong>{nextTurnIn}s</strong>...
        </div>
      </div>
    </div>
  );
}

export default RoundEndModal;
