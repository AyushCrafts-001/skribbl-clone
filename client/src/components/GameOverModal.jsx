import { useEffect, useRef } from "react";
import Avatar from "./Avatar.jsx";
import sound from "../utils/sound";

export function GameOverModal({ leaderboard = [], isHost = false, onRestart, onExit }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    sound.playWinner();

    // Canvas Confetti animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      size: Math.random() * 8 + 4,
      color: ["#f59e0b", "#3b82f6", "#10b981", "#ef4444", "#8b5cf6", "#ec4899"][
        Math.floor(Math.random() * 6)
      ],
      speedY: Math.random() * 4 + 2,
      speedX: Math.random() * 2 - 1,
      rotation: Math.random() * 360,
    }));

    let animId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += 2;
        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];

  return (
    <div className="modal-backdrop game-over-backdrop">
      <canvas ref={canvasRef} className="confetti-canvas" />

      <div className="modal-card game-over-card">
        <h2 className="modal-title">🏆 GAME FINISHED! 🏆</h2>
        <p className="modal-subtitle">Congratulations to the winners!</p>

        {/* Podium Display */}
        <div className="podium-container">
          {/* 2nd Place */}
          {top2 && (
            <div className="podium-slot rank-2">
              <span className="medal-icon">🥈 2nd</span>
              <Avatar avatar={top2.avatar} size={50} />
              <div className="podium-name">{top2.name}</div>
              <div className="podium-score">{top2.score} pts</div>
              <div className="podium-block block-2">2</div>
            </div>
          )}

          {/* 1st Place */}
          {top1 && (
            <div className="podium-slot rank-1">
              <span className="medal-icon">🥇 1st</span>
              <Avatar avatar={top1.avatar} size={65} />
              <div className="podium-name">{top1.name}</div>
              <div className="podium-score">{top1.score} pts</div>
              <div className="podium-block block-1">1</div>
            </div>
          )}

          {/* 3rd Place */}
          {top3 && (
            <div className="podium-slot rank-3">
              <span className="medal-icon">🥉 3rd</span>
              <Avatar avatar={top3.avatar} size={44} />
              <div className="podium-name">{top3.name}</div>
              <div className="podium-score">{top3.score} pts</div>
              <div className="podium-block block-3">3</div>
            </div>
          )}
        </div>

        {/* Full Leaderboard */}
        <div className="final-leaderboard-list">
          <h3 className="section-title">Final Standings:</h3>
          {leaderboard.map((player, index) => (
            <div key={player.id || player.name} className="final-standing-row">
              <span className="standing-rank">#{index + 1}</span>
              <Avatar avatar={player.avatar} size={28} />
              <span className="standing-name">{player.name}</span>
              <span className="standing-score">{player.score} pts</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="game-over-actions">
          {isHost ? (
            <button type="button" className="action-btn primary" onClick={onRestart}>
              🔄 Play Again
            </button>
          ) : (
            <p className="waiting-host-text">Waiting for host to restart game...</p>
          )}

          <button type="button" className="action-btn secondary" onClick={onExit}>
            🚪 Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameOverModal;
