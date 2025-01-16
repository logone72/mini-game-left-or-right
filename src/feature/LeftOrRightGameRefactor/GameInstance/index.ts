import { ResourceManager } from "./ResourceManager";
import Timer from "./Timer";

class GameInstance {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  resourceManager: typeof ResourceManager;
  timer: Timer;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    if (!this.ctx) {
      throw new Error("Canvas context not found");
    }

    this.resourceManager = ResourceManager;
    this.loadResources();

    this.timer = new Timer(this.ctx);
  }

  startGame() {
    this.timer.startCountDown();
  }

  loadResources() {
    this.resourceManager.loadResources();
  }

  render() {
    this.clearCanvas();
    this.timer.draw();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default GameInstance;
