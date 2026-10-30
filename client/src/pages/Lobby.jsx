import { useState, useEffect } from "react";
import socket from "../services/socket";
import TopBar from "../components/TopBar.jsx";
import Canvas from "../components/Canvas.jsx";
import Chat from "../components/Chat.jsx";
import Leaderboard from "../components/Leaderboard.jsx";
import WordSelectModal from "../components/WordSelectModal.jsx";
import RoundEndModal from "../components/RoundEndModal.jsx";
import GameOverModal from "../components/GameOverModal.jsx";
import Avatar from "../components/Avatar.jsx";
import sound from "../utils/sound";

export function Lobby({ roomCode, playerName, avatar, onLeave }) {
  const [players, setPlayers] = useState([]);
  const [settings, setSettings] = useState({});
  const [gameState, setGameState] = useState({
    phase: "waiting", // 'waiting' | 'selecting' | 'drawing' | 'round_end' | 'game_over'
    round: 1,
    maxRounds: 3,
    timeLeft: 60,
    drawer: null,
    maskedWord: "",
    wordLength: 0,
    secretWord: "",
    isDrawer: false,
    category: "all",
  });

  const [wordChoices, setWordChoices] = useState([]);
  const [showWordSelect, setShowWordSelect] = useState(false);
  const [roundEndData, setRoundEndData] = useState(null);
  const [gameOverData, setGameOverData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  // Current user's player object
  const currentPlayer =
    players.find(
      (p) => p.name?.trim().toLowerCase() === playerName?.trim().toLowerCase()
    ) || {};
  const isHost = Boolean(currentPlayer.isHost);
  const isDrawer = Boolean(
    (gameState.drawer?.name &&
      gameState.drawer.name.trim().toLowerCase() ===
        playerName?.trim().toLowerCase()) ||
      gameState.drawer?.id === socket.id ||
      gameState.isDrawer
  );
  const hasGuessed = Boolean(currentPlayer.hasGuessed);

  useEffect(() => {
    if (!roomCode || !playerName) return;

    // Connect to room via socket
    const joinData = { roomCode, playerName, avatar };

    const handleConnect = () => {
      socket.emit("room:join", joinData, (res) => {
        if (!res?.success) {
          setErrorMessage(res?.message || "Failed to join room.");
          return;
        }
        setPlayers(res.players || []);
        if (res.settings) setSettings(res.settings);
        if (res.gameState) {
          setGameState((prev) => ({
            ...prev,
            ...res.gameState,
          }));
        }
      });
    };

    if (socket.connected) {
      handleConnect();
    } else {
      socket.connect();
      socket.once("connect", handleConnect);
    }

    // Socket Event Handlers
    const onPlayers = (updatedPlayers) => {
      setPlayers(Array.isArray(updatedPlayers) ? updatedPlayers : []);
    };

    const onSettingsUpdated = (data) => {
      if (data?.settings) {
        setSettings(data.settings);
      }
    };

    const onTurnStart = (data) => {
      setRoundEndData(null);
      setShowWordSelect(false);
      if (data.players) setPlayers(data.players);

      const amDrawer =
        (data.drawer?.name &&
          data.drawer.name.trim().toLowerCase() ===
            playerName.trim().toLowerCase()) ||
        data.drawer?.id === socket.id;

      setGameState((prev) => ({
        ...prev,
        phase: "selecting",
        round: data.round,
        maxRounds: data.maxRounds,
        drawer: data.drawer,
        isDrawer: amDrawer,
        timeLeft: data.selectTime || 15,
        secretWord: "",
        maskedWord: "",
        wordLength: 0,
      }));
    };

    const onSelectTimer = (data) => {
      setGameState((prev) => ({
        ...prev,
        timeLeft: data.timeLeft,
      }));
    };

    const onWordOptions = (data) => {
      setWordChoices(data.words || []);
      setShowWordSelect(true);
    };

    const onSecretWord = (data) => {
      setGameState((prev) => ({
        ...prev,
        secretWord: data.word,
        category: data.category || "all",
      }));
    };

    const onDrawingStart = (data) => {
      setShowWordSelect(false);
      setRoundEndData(null);

      const amDrawer =
        (data.drawer?.name &&
          data.drawer.name.trim().toLowerCase() ===
            playerName.trim().toLowerCase()) ||
        data.drawer?.id === socket.id;

      setGameState((prev) => ({
        ...prev,
        phase: "drawing",
        round: data.round,
        maxRounds: data.maxRounds,
        drawer: data.drawer,
        isDrawer: amDrawer,
        timeLeft: data.duration,
        maskedWord: data.maskedWord,
        wordLength: data.wordLength,
        category: data.category || "all",
      }));
    };

    const onTimer = (data) => {
      setGameState((prev) => ({
        ...prev,
        timeLeft: data.timeLeft,
      }));
      if (data.timeLeft <= 10 && data.timeLeft > 0) {
        sound.playTick(data.timeLeft <= 5);
      }
    };

    const onHintUpdate = (data) => {
      setGameState((prev) => ({
        ...prev,
        maskedWord: data.maskedWord,
      }));
    };

    const onCorrectGuess = (data) => {
      if (data?.players) {
        setPlayers(data.players);
      }
    };

    const onRoundEnded = (data) => {
      setShowWordSelect(false);
      setGameState((prev) => ({
        ...prev,
        phase: "round_end",
      }));
      setRoundEndData(data);
    };

    const onGameOver = (data) => {
      setShowWordSelect(false);
      setGameState((prev) => ({
        ...prev,
        phase: "game_over",
      }));
      setGameOverData(data);
    };

    const onGameReset = (data) => {
      setRoundEndData(null);
      setGameOverData(null);
      setShowWordSelect(false);
      setPlayers(data.players || []);
      setGameState({
        phase: "waiting",
        round: 1,
        maxRounds: 3,
        timeLeft: 60,
        drawer: null,
        maskedWord: "",
        wordLength: 0,
        secretWord: "",
        isDrawer: false,
        category: "all",
      });
    };

    const onKicked = (data) => {
      alert(data.message || "You have been kicked from the room.");
      onLeave();
    };

    socket.on("room:players", onPlayers);
    socket.on("room:settings_updated", onSettingsUpdated);
    socket.on("game:turn_start", onTurnStart);
    socket.on("game:select_timer", onSelectTimer);
    socket.on("game:word_options", onWordOptions);
    socket.on("game:secret_word", onSecretWord);
    socket.on("game:drawing_start", onDrawingStart);
    socket.on("game:timer", onTimer);
    socket.on("game:hint_update", onHintUpdate);
    socket.on("game:correct_guess", onCorrectGuess);
    socket.on("game:round_ended", onRoundEnded);
    socket.on("game:game_over", onGameOver);
    socket.on("game:reset", onGameReset);
    socket.on("room:kicked", onKicked);

    return () => {
      socket.off("room:players", onPlayers);
      socket.off("room:settings_updated", onSettingsUpdated);
      socket.off("game:turn_start", onTurnStart);
      socket.off("game:select_timer", onSelectTimer);
      socket.off("game:word_options", onWordOptions);
      socket.off("game:secret_word", onSecretWord);
      socket.off("game:drawing_start", onDrawingStart);
      socket.off("game:timer", onTimer);
      socket.off("game:hint_update", onHintUpdate);
      socket.off("game:correct_guess", onCorrectGuess);
      socket.off("game:round_ended", onRoundEnded);
      socket.off("game:game_over", onGameOver);
      socket.off("game:reset", onGameReset);
      socket.off("room:kicked", onKicked);
      socket.emit("room:leave", { roomCode });
    };
  }, [roomCode, playerName, avatar, onLeave]);

  // Host starts game
  const handleStartGame = () => {
    if (players.length < 2) {
      alert("At least 2 players are required to start the game! Invite a friend.");
      return;
    }
    socket.emit("game:start", { roomCode }, (res) => {
      if (!res?.success) {
        alert(res?.message || "Could not start game.");
      }
    });
  };

  // Drawer chooses word
  const handleSelectWord = (word) => {
    setShowWordSelect(false);
    socket.emit("game:choose_word", { roomCode, word });
  };

  // Host restarts game
  const handleRestartGame = () => {
    socket.emit("game:restart", { roomCode });
  };

  const handleCopyLink = () => {
    const inviteUrl = `${window.location.origin}?room=${roomCode}`;
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (errorMessage) {
    return (
      <div className="error-screen">
        <div className="error-card">
          <h2>⚠️ Unable to Join Room</h2>
          <p>{errorMessage}</p>
          <button type="button" className="btn-primary" onClick={onLeave}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-screen-layout">
      {/* Top Header */}
      <TopBar
        roomCode={roomCode}
        round={gameState.round}
        maxRounds={gameState.maxRounds}
        timeLeft={gameState.timeLeft}
        maskedWord={gameState.maskedWord}
        wordLength={gameState.wordLength}
        secretWord={gameState.secretWord}
        isDrawer={isDrawer}
        category={gameState.category}
        onLeave={onLeave}
      />

      {/* Main Game Arena */}
      <main className="game-arena">
        {/* Left: Players Leaderboard */}
        <aside className="arena-left">
          <Leaderboard
            players={players}
            currentPlayerName={playerName}
            isHost={isHost}
            roomCode={roomCode}
          />
        </aside>

        {/* Center: Canvas Area or Waiting Lobby */}
        <section className="arena-center">
          {gameState.phase === "waiting" ? (
            /* Waiting in Lobby View */
            <div className="lobby-waiting-card">
              <div className="lobby-hero">
                <h2 className="lobby-title">🎨 Welcome to Room {roomCode}</h2>
                <p className="lobby-desc">Invite your friends using the code or link below!</p>

                <div className="lobby-invite-box">
                  <span className="code-display">{roomCode}</span>
                  <button type="button" className="btn-copy-invite" onClick={handleCopyLink}>
                    {copied ? "✅ Copied Link!" : "📋 Copy Invite Link"}
                  </button>
                </div>
              </div>

              {/* Lobby Players Grid */}
              <div className="lobby-players-grid">
                {players.map((p) => (
                  <div key={p.id || p.name} className="lobby-player-card">
                    <Avatar avatar={p.avatar} size={54} />
                    <span className="lobby-player-name">{p.name}</span>
                    {p.isHost && <span className="host-pill">👑 Host</span>}
                  </div>
                ))}
              </div>

              {/* Settings Summary */}
              <div className="lobby-settings-summary">
                <span className="setting-tag">👥 Max: {settings.maxPlayers || 8}</span>
                <span className="setting-tag">🔄 Rounds: {settings.rounds || 3}</span>
                <span className="setting-tag">⏱️ Draw Time: {settings.drawTime || 60}s</span>
                <span className="setting-tag">💡 Hints: {settings.hints ?? 2}</span>
                <span className="setting-tag">🏷️ Mode: {settings.wordMode || "normal"}</span>
                {settings.category && settings.category !== "all" && (
                  <span className="setting-tag">📂 Category: {settings.category}</span>
                )}
              </div>

              {/* Host Action or Waiting Indicator */}
              <div className="lobby-action-area">
                {isHost ? (
                  <button
                    type="button"
                    className="btn-start-game"
                    onClick={handleStartGame}
                    disabled={players.length < 2}
                  >
                    {players.length < 2 ? "Waiting for players (min 2)..." : "🚀 Start Game!"}
                  </button>
                ) : (
                  <div className="waiting-host-box">
                    ⏳ Waiting for host (<strong>{players.find((p) => p.isHost)?.name || "Host"}</strong>) to start the game...
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Active Drawing Canvas */
            <div className="canvas-column">
              {gameState.phase === "selecting" && !isDrawer && (
                <div className="drawer-selecting-banner">
                  🤔 <strong>{gameState.drawer?.name || "Drawer"}</strong> is choosing a word...
                </div>
              )}

              <Canvas
                roomCode={roomCode}
                isDrawer={isDrawer && gameState.phase === "drawing"}
                disabled={gameState.phase !== "drawing"}
              />
            </div>
          )}
        </section>

        {/* Right: Live Chat & Guessing feed */}
        <aside className="arena-right">
          <Chat
            roomCode={roomCode}
            playerName={playerName}
            isDrawer={isDrawer}
            hasGuessed={hasGuessed}
          />
        </aside>
      </main>

      {/* Word Selection Modal (Only shown to active drawer) */}
      {showWordSelect && isDrawer && (
        <WordSelectModal
          words={wordChoices}
          onSelectWord={handleSelectWord}
          selectTime={gameState.timeLeft || 15}
        />
      )}

      {/* Round Ended Modal */}
      {gameState.phase === "round_end" && roundEndData && (
        <RoundEndModal
          word={roundEndData.word}
          reason={roundEndData.reason}
          roundScores={roundEndData.roundScores}
          nextTurnIn={roundEndData.nextTurnIn || 4}
        />
      )}

      {/* Game Over Modal */}
      {gameState.phase === "game_over" && gameOverData && (
        <GameOverModal
          leaderboard={gameOverData.leaderboard}
          isHost={isHost}
          onRestart={handleRestartGame}
          onExit={onLeave}
        />
      )}
    </div>
  );
}

export default Lobby;
