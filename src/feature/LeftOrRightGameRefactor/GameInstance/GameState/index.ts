class GameState {
  progress: "beforeStart" | "playing" | "end" = "beforeStart";
  score: number = 0;

  public get isBeforeStart() {
    return this.progress === "beforeStart";
  }

  public get isPlaying() {
    return this.progress === "playing";
  }

  public get isEnded() {
    return this.progress === "end";
  }

  public clear() {
    this.progress = "beforeStart";
    this.score = 0;
  }
}

export default GameState;
