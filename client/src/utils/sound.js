// Web Audio API Synthesizer for Skribbl Clone sound effects
class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem("skribbl_muted") === "true";
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem("skribbl_muted", this.muted ? "true" : "false");
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  playTone(freq, type = "sine", duration = 0.15, gainVal = 0.1) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Happy chime when guessing word correctly
  playCorrect() {
    if (this.muted) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, "triangle", 0.25, 0.15), i * 80);
    });
  }

  // Clock tick when time is low (< 10s)
  playTick(urgent = false) {
    if (this.muted) return;
    this.playTone(urgent ? 880 : 440, "sine", 0.05, 0.08);
  }

  // Pop sound on player join or chat message
  playPop() {
    if (this.muted) return;
    this.playTone(330, "sine", 0.08, 0.06);
  }

  // Fanfare when game finishes
  playWinner() {
    if (this.muted) return;
    this.init();
    const melody = [523.25, 523.25, 523.25, 659.25, 783.99, 1046.5];
    melody.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, "triangle", 0.3, 0.2), i * 140);
    });
  }

  // Buzz sound on invalid action or close guess
  playBuzz() {
    if (this.muted) return;
    this.playTone(180, "sawtooth", 0.15, 0.08);
  }
}

export const sound = new SoundManager();
export default sound;
