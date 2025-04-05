class GameState {
  progress: "beforeStart" | "tutorial" | "countDown" | "playing" | "end" =
    "beforeStart";
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

  public get isTutorial() {
    return this.progress === "tutorial";
  }

  public get isCountDown() {
    return this.progress === "countDown";
  }

  public clear() {
    this.progress = "beforeStart";
    this.score = 0;
  }
}

export default GameState;
