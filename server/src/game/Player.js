/**
 * Player Class representing a player in a Skribbl room
 */
export class Player {
  constructor({ id, name, avatar = null, isHost = false }) {
    this.id = id; // Socket ID
    this.name = name.trim();
    this.avatar = avatar || {
      color: "#f59e0b",
      eyes: 0,
      mouth: 0,
    };
    this.score = 0;
    this.roundScore = 0;
    this.hasGuessed = false;
    this.isHost = isHost;
    this.isDrawer = false;
    this.isConnected = true;
    this.joinedAt = Date.now();
  }

  resetRound() {
    this.roundScore = 0;
    this.hasGuessed = false;
    this.isDrawer = false;
  }

  addScore(points) {
    this.score += points;
    this.roundScore += points;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      avatar: this.avatar,
      score: this.score,
      roundScore: this.roundScore,
      hasGuessed: this.hasGuessed,
      isHost: this.isHost,
      isDrawer: this.isDrawer,
      isConnected: this.isConnected,
    };
  }
}

export default Player;
