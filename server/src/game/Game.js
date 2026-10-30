import { getRandomWords, isCloseGuess } from "./words.js";

/**
 * Game Class encapsulates skribbl game flow, turn management, scoring, and timers
 */
export class Game {
  constructor(room) {
    this.room = room; // Parent Room reference
    this.round = 0;
    this.maxRounds = room.settings.rounds || 3;
    this.roundDuration = room.settings.drawTime || 60;
    this.wordChoiceCount = room.settings.wordCount || 3;
    this.hintsCount = room.settings.hints !== undefined ? room.settings.hints : 2;
    this.wordMode = room.settings.wordMode || "normal";

    this.phase = "waiting"; // 'waiting' | 'selecting' | 'drawing' | 'round_end' | 'game_over'
    this.drawerIndex = -1;
    this.currentDrawer = null;
    this.currentWord = "";
    this.wordChoices = [];
    this.revealedIndices = new Set();
    this.drawHistory = []; // History of strokes for current turn (for undo and late join)

    this.timeLeft = 0;
    this.timer = null;
    this.selectTimer = null;
    this.hintCheckpoints = [];
    this.turnQueue = []; // Queue of player IDs to draw in this round
  }

  get io() {
    return this.room.io;
  }

  get socketRoom() {
    return `room:${this.room.code}`;
  }

  /**
   * Start the entire game from lobby
   */
  start() {
    const players = this.room.getConnectedPlayers();
    if (players.length < 2) {
      throw new Error("At least 2 players are required to start the game.");
    }

    this.round = 1;
    this.turnQueue = players.map((p) => p.id);
    this.phase = "selecting";
    this.startNextTurn();
  }

  /**
   * Reset game back to lobby state
   */
  reset() {
    this.clearTimers();
    this.phase = "waiting";
    this.round = 0;
    this.currentDrawer = null;
    this.currentWord = "";
    this.wordChoices = [];
    this.revealedIndices.clear();
    this.drawHistory = [];
    this.turnQueue = [];

    this.room.players.forEach((p) => {
      p.score = 0;
      p.resetRound();
    });
  }

  clearTimers() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.selectTimer) {
      clearTimeout(this.selectTimer);
      this.selectTimer = null;
    }
  }

  /**
   * Begin next turn or advance round
   */
  startNextTurn() {
    this.clearTimers();
    this.drawHistory = [];
    this.revealedIndices.clear();

    // Reset each player's per-turn status
    this.room.players.forEach((p) => p.resetRound());

    // Filter connected players in the turn queue
    const connectedPlayers = this.room.getConnectedPlayers();
    if (connectedPlayers.length < 2) {
      this.endGame("Game ended: Not enough players remaining.");
      return;
    }

    // Advance to next player in turn queue
    while (this.turnQueue.length > 0) {
      const candidateId = this.turnQueue.shift();
      const player = this.room.getPlayer(candidateId);
      if (player && player.isConnected) {
        this.currentDrawer = player;
        break;
      }
    }

    // If turn queue is empty, complete round
    if (!this.currentDrawer) {
      this.round += 1;
      if (this.round > this.maxRounds) {
        this.endGame();
        return;
      }
      // Re-populate turn queue for new round
      this.turnQueue = connectedPlayers.map((p) => p.id);
      this.currentDrawer = this.room.getPlayer(this.turnQueue.shift());
    }

    if (!this.currentDrawer) {
      this.endGame();
      return;
    }

    this.currentDrawer.isDrawer = true;
    this.phase = "selecting";

    // Generate word choices
    this.wordChoices = getRandomWords(
      this.wordChoiceCount,
      this.room.settings.category,
      this.room.settings.customWords
    );

    // Broadcast turn starting
    this.io.to(this.socketRoom).emit("game:turn_start", {
      drawer: this.currentDrawer.toJSON(),
      round: this.round,
      maxRounds: this.maxRounds,
      selectTime: 15,
      players: this.room.getPlayersJSON(),
    });

    // Send word choices ONLY to the drawer
    this.io.to(this.currentDrawer.id).emit("game:word_options", {
      words: this.wordChoices,
      selectTime: 15,
    });

    // 15 second auto-selection timer if drawer is idle
    let selectTimeRemaining = 15;
    this.selectTimer = setInterval(() => {
      selectTimeRemaining -= 1;
      this.io.to(this.socketRoom).emit("game:select_timer", {
        timeLeft: selectTimeRemaining,
      });

      if (selectTimeRemaining <= 0) {
        clearInterval(this.selectTimer);
        this.selectTimer = null;
        // Auto select first word
        const fallbackWord = this.wordChoices[0] || "apple";
        this.chooseWord(this.currentDrawer.id, fallbackWord);
      }
    }, 1000);
  }

  /**
   * Drawer chooses a word
   */
  chooseWord(drawerSocketId, chosenWord) {
    if (this.phase !== "selecting") return false;
    if (!this.currentDrawer || this.currentDrawer.id !== drawerSocketId) return false;

    // Validate word is in choices (or fallback if expired)
    if (!this.wordChoices.includes(chosenWord)) {
      chosenWord = this.wordChoices[0];
    }

    if (this.selectTimer) {
      clearInterval(this.selectTimer);
      this.selectTimer = null;
    }

    this.currentWord = chosenWord;
    this.phase = "drawing";
    this.timeLeft = this.roundDuration;
    this.revealedIndices.clear();

    // Setup hint checkpoints (e.g. at 50% and 25% of draw time)
    this.setupHintCheckpoints();

    // Send full secret word to drawer
    this.io.to(this.currentDrawer.id).emit("game:secret_word", {
      word: this.currentWord,
      category: this.room.settings.category,
    });

    // Send masked hint to all players (drawer gets actual word client-side)
    const initialMask = this.getMaskedWord();

    this.io.to(this.socketRoom).emit("game:drawing_start", {
      drawer: this.currentDrawer.toJSON(),
      round: this.round,
      maxRounds: this.maxRounds,
      duration: this.roundDuration,
      maskedWord: initialMask,
      wordLength: this.currentWord.length,
      category: this.room.settings.category,
    });

    this.startDrawingTimer();
    return true;
  }

  /**
   * Generate masked representation of word
   */
  getMaskedWord() {
    if (this.wordMode === "hidden") {
      return this.currentWord
        .split("")
        .map((c) => (c === " " ? " " : "_"))
        .join(" ");
    }

    return this.currentWord
      .split("")
      .map((char, index) => {
        if (char === " " || char === "-") return char;
        if (this.revealedIndices.has(index)) return char;
        return "_";
      })
      .join(" ");
  }

  /**
   * Schedule hint reveal checkpoints based on time remaining
   */
  setupHintCheckpoints() {
    this.hintCheckpoints = [];
    if (this.hintsCount <= 0 || this.wordMode === "hidden") return;

    // Reveal hints evenly across round duration
    const lettersToReveal = Math.min(
      this.hintsCount,
      Math.floor(this.currentWord.replace(/\s+/g, "").length / 2)
    );

    if (lettersToReveal <= 0) return;

    const step = this.roundDuration / (lettersToReveal + 1);
    for (let i = 1; i <= lettersToReveal; i++) {
      const triggerTime = Math.round(this.roundDuration - step * i);
      if (triggerTime > 2) {
        this.hintCheckpoints.push(triggerTime);
      }
    }
  }

  /**
   * Reveal next random letter hint
   */
  revealNextHint() {
    if (this.wordMode === "hidden") return;

    const unrevealed = [];
    for (let i = 0; i < this.currentWord.length; i++) {
      const ch = this.currentWord[i];
      if (ch !== " " && ch !== "-" && !this.revealedIndices.has(i)) {
        unrevealed.push(i);
      }
    }

    // Leave at least half the letters hidden
    const minHidden = Math.max(1, Math.ceil(this.currentWord.length / 3));
    if (unrevealed.length <= minHidden) return;

    const chosenIndex = unrevealed[Math.floor(Math.random() * unrevealed.length)];
    this.revealedIndices.add(chosenIndex);

    const updatedMask = this.getMaskedWord();
    this.io.to(this.socketRoom).emit("game:hint_update", {
      maskedWord: updatedMask,
      revealedLetter: this.currentWord[chosenIndex],
    });
  }

  /**
   * Start 1-second countdown timer for active drawing turn
   */
  startDrawingTimer() {
    this.clearTimers();

    this.timer = setInterval(() => {
      this.timeLeft -= 1;

      // Broadcast time tick
      this.io.to(this.socketRoom).emit("game:timer", {
        timeLeft: this.timeLeft,
      });

      // Check for hints
      if (this.hintCheckpoints.includes(this.timeLeft)) {
        this.revealNextHint();
      }

      // Time expired
      if (this.timeLeft <= 0) {
        this.endRound("Time's up!");
      }
    }, 1000);
  }

  /**
   * Handle incoming guess from player
   */
  handleGuess(player, text) {
    if (this.phase !== "drawing") {
      return { isGuess: false };
    }

    const trimmed = text.trim();
    if (!trimmed) return { isGuess: false };

    // Anti-spoiler: drawer cannot send messages containing the secret word
    if (player.isDrawer) {
      if (trimmed.toLowerCase().includes(this.currentWord.toLowerCase())) {
        this.io.to(player.id).emit("chat:system_alert", {
          message: "⚠️ You cannot write the secret word in chat!",
          type: "warning",
        });
        return { isGuess: true, blocked: true };
      }
      return { isGuess: false };
    }

    // If player already guessed, their messages are only visible to other correct guessers
    if (player.hasGuessed) {
      return { isGuess: false, alreadyGuessed: true };
    }

    // Exact word match
    const isCorrect = trimmed.toLowerCase() === this.currentWord.trim().toLowerCase();

    if (isCorrect) {
      player.hasGuessed = true;

      // Calculate dynamic score: faster guess = more points (from 500 down to 100)
      const timeRatio = Math.max(0, this.timeLeft / this.roundDuration);
      const guessScore = Math.round(100 + 400 * timeRatio);
      player.addScore(guessScore);

      // Drawer earns bonus points for each player who guesses (+50)
      if (this.currentDrawer) {
        this.currentDrawer.addScore(50);
      }

      // Notify room of correct guess (word is NEVER revealed in chat)
      this.io.to(this.socketRoom).emit("game:correct_guess", {
        playerId: player.id,
        playerName: player.name,
        points: guessScore,
        players: this.room.getPlayersJSON(),
      });

      // Check if all non-drawing connected players have guessed
      const guessers = this.room
        .getConnectedPlayers()
        .filter((p) => p.id !== this.currentDrawer?.id);
      const allGuessed = guessers.length > 0 && guessers.every((p) => p.hasGuessed);

      if (allGuessed) {
        // Accelerate end if everyone guessed
        this.endRound("All players guessed the word!");
      }

      return { isGuess: true, correct: true, points: guessScore };
    }

    // Close guess check (Levenshtein distance of 1)
    if (isCloseGuess(trimmed, this.currentWord)) {
      this.io.to(player.id).emit("chat:system_alert", {
        message: `💡 '${trimmed}' is very close!`,
        type: "close",
      });
      return { isGuess: true, close: true };
    }

    return { isGuess: true, correct: false };
  }

  /**
   * End current round/turn
   */
  endRound(reason = "Round ended") {
    if (this.phase !== "drawing" && this.phase !== "selecting") return;
    this.phase = "round_end";
    this.clearTimers();

    const roundScores = this.room.getPlayersJSON().map((p) => ({
      id: p.id,
      name: p.name,
      roundScore: p.roundScore,
      totalScore: p.score,
      hasGuessed: p.hasGuessed,
      isDrawer: p.isDrawer,
      avatar: p.avatar,
    }));

    this.io.to(this.socketRoom).emit("game:round_ended", {
      reason,
      word: this.currentWord,
      roundScores,
      nextTurnIn: 4,
    });

    // Short 4s pause to view results, then start next turn
    setTimeout(() => {
      if (this.phase === "round_end") {
        this.startNextTurn();
      }
    }, 4000);
  }

  /**
   * End the entire game and show podium
   */
  endGame(reason = "Game finished!") {
    this.phase = "game_over";
    this.clearTimers();

    const leaderboard = this.room
      .getConnectedPlayers()
      .map((p) => p.toJSON())
      .sort((a, b) => b.score - a.score);

    this.io.to(this.socketRoom).emit("game:game_over", {
      reason,
      leaderboard,
      winner: leaderboard[0] || null,
    });

    this.room.syncToDB("finished");
  }

  /**
   * Drawing actions recording
   */
  addStroke(stroke) {
    if (this.phase !== "drawing") return;
    this.drawHistory.push(stroke);
  }

  undoStroke() {
    if (this.phase !== "drawing") return null;
    return this.drawHistory.pop();
  }

  clearCanvas() {
    if (this.phase !== "drawing") return;
    this.drawHistory = [];
  }
}

export default Game;
