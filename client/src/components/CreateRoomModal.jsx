import { useState } from "react";

export function CreateRoomModal({ isOpen, onClose, onCreateRoom, loading = false }) {
  const [maxPlayers, setMaxPlayers] = useState(8);
  const [rounds, setRounds] = useState(3);
  const [drawTime, setDrawTime] = useState(60);
  const [wordCount, setWordCount] = useState(3);
  const [hints, setHints] = useState(2);
  const [wordMode, setWordMode] = useState("normal");
  const [category, setCategory] = useState("all");
  const [customWords, setCustomWords] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateRoom({
      settings: {
        maxPlayers: Number(maxPlayers),
        rounds: Number(rounds),
        drawTime: Number(drawTime),
        wordCount: Number(wordCount),
        hints: Number(hints),
        wordMode,
        category,
        customWords: customWords
          .split(/[\n,]+/)
          .map((w) => w.trim())
          .filter((w) => w.length > 0),
      },
      isPrivate,
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card create-room-card">
        <div className="create-room-header">
          <h2 className="modal-title">⚙️ Room Settings</h2>
          <button type="button" className="close-x-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-grid">
            {/* Players */}
            <div className="form-group">
              <label>Max Players: <strong>{maxPlayers}</strong></label>
              <input
                type="range"
                min="2"
                max="20"
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(e.target.value)}
              />
            </div>

            {/* Rounds */}
            <div className="form-group">
              <label>Rounds: <strong>{rounds}</strong></label>
              <input
                type="range"
                min="1"
                max="10"
                value={rounds}
                onChange={(e) => setRounds(e.target.value)}
              />
            </div>

            {/* Draw Time */}
            <div className="form-group">
              <label>Draw Time: <strong>{drawTime}s</strong></label>
              <select
                value={drawTime}
                onChange={(e) => setDrawTime(Number(e.target.value))}
                className="select-input"
              >
                <option value={30}>30 seconds (Fast)</option>
                <option value={45}>45 seconds</option>
                <option value={60}>60 seconds (Standard)</option>
                <option value={80}>80 seconds</option>
                <option value={100}>100 seconds</option>
                <option value={120}>120 seconds (Relaxed)</option>
              </select>
            </div>

            {/* Word choices */}
            <div className="form-group">
              <label>Word Choices: <strong>{wordCount}</strong></label>
              <select
                value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                className="select-input"
              >
                <option value={1}>1 word</option>
                <option value={2}>2 words</option>
                <option value={3}>3 words (Default)</option>
                <option value={4}>4 words</option>
                <option value={5}>5 words</option>
              </select>
            </div>

            {/* Hints */}
            <div className="form-group">
              <label>Hints: <strong>{hints === 0 ? "Disabled" : `${hints} hints`}</strong></label>
              <select
                value={hints}
                onChange={(e) => setHints(Number(e.target.value))}
                className="select-input"
              >
                <option value={0}>0 (No hints)</option>
                <option value={1}>1 hint</option>
                <option value={2}>2 hints (Default)</option>
                <option value={3}>3 hints</option>
                <option value={4}>4 hints</option>
              </select>
            </div>

            {/* Word Category */}
            <div className="form-group">
              <label>Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select-input"
              >
                <option value="all">🌟 All Categories</option>
                <option value="animals">🐾 Animals</option>
                <option value="food">🍕 Food & Drinks</option>
                <option value="objects">💻 Everyday Objects</option>
                <option value="actions">🏃 Actions / Verbs</option>
                <option value="nature">🌋 Nature & Places</option>
                <option value="popculture">🦸 Pop Culture & Heroes</option>
              </select>
            </div>

            {/* Word Mode */}
            <div className="form-group">
              <label>Word Mode:</label>
              <select
                value={wordMode}
                onChange={(e) => setWordMode(e.target.value)}
                className="select-input"
              >
                <option value="normal">Normal (Blanks & Hints)</option>
                <option value="hidden">Hidden (No letter hints)</option>
                <option value="combination">Combination</option>
              </select>
            </div>

            {/* Privacy toggle */}
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />
                🔒 Private Room (Invite-only via link)
              </label>
            </div>
          </div>

          {/* Custom words */}
          <div className="form-group custom-words-group">
            <label>
              Custom Words (Optional):
              <span className="label-sub">Separate with commas or newlines</span>
            </label>
            <textarea
              value={customWords}
              onChange={(e) => setCustomWords(e.target.value)}
              placeholder="e.g. pikachu, lightsaber, spiderman, minecraft"
              rows={3}
              className="textarea-input"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="action-btn secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="action-btn primary" disabled={loading}>
              {loading ? "Creating..." : "Create Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateRoomModal;
