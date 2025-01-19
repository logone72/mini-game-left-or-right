import GameStartCountdown from "./GameStartCountdown";
import { ResourceManager } from "./ResourceManager";
import Score from "./Score";
import Timer from "./Timer";
import UiComponent from "./UiComponent";

class GameInstance {
  static displayTime = {
    tutorial: 4000,
  };

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  resourceManager: typeof ResourceManager;
  timer: Timer;
  score: Score;
  ui: UiComponent;
  gameStartCountdown: GameStartCountdown;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    if (!this.ctx) {
      throw new Error("Canvas context not found");
    }

    this.resourceManager = ResourceManager;
    this.loadResources();

    this.timer = new Timer(this.ctx);
    this.score = new Score(this.ctx);
    this.ui = new UiComponent(this.ctx, this.resourceManager);
    this.gameStartCountdown = new GameStartCountdown(this.ctx, {
      canvasWidth: this.canvas.width,
      canvasHeight: this.canvas.height,
    });
  }

  startGame() {
    setTimeout(() => {
      this.gameStartCountdown.processAnimation();
    }, GameInstance.displayTime.tutorial);

    setTimeout(() => {
      this.timer.start();
    },  + GameInstance.displayTime.tutorial);
  }

  loadResources() {
    this.resourceManager.loadResources();
  }

  drawUi() {
    this.ui.drawArrowButton();
    this.ui.drawWhichLRGuide("left");
    this.ui.drawWhichLRGuide("right");
  }

  render() {
    this.clearCanvas();
    this.timer.draw();
    this.score.drawScore();
    this.drawUi();
    this.gameStartCountdown.drawCountDown();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default GameInstance;
