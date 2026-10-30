import { useEffect, useState } from "react";

export function WordSelectModal({ words = [], onSelectWord, selectTime = 15 }) {
  const [timeLeft, setTimeLeft] = useState(selectTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="modal-backdrop">
      <div className="modal-card word-select-card">
        <h2 className="modal-title">🎨 Pick a word to draw!</h2>
        <p className="modal-subtitle">
          Time remaining: <span className="urgent-time">{timeLeft}s</span>
        </p>

        <div className="word-cards-grid">
          {words.map((word, idx) => (
            <button
              key={idx}
              type="button"
              className="word-card-btn"
              onClick={() => onSelectWord(word)}
            >
              <span className="word-title">{word}</span>
              <span className="word-len">{word.length} letters</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WordSelectModal;
