import GameEnd from "./GameEnd";
import GameStartCountdown from "./GameStartCountdown";
import GameState from "./GameState";
import { ResourceManager } from "./ResourceManager";
import Score from "./Score";
import Timer from "./Timer";
import GameUI from "./GameUI";
import { wait } from "./utils/time-helper";

class GameInstance {
  static displayTime = {
    tutorial: 4000,
  };

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  gameState: GameState;
  resourceManager: typeof ResourceManager;
  timer: Timer;
  score: Score;
  ui: GameUI;
  gameStartCountdown: GameStartCountdown;
  gameEnd: GameEnd;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    if (!this.ctx) {
      throw new Error("Canvas context not found");
    }

    this.resourceManager = ResourceManager;
    this.loadResources();

    this.gameState = new GameState();

    this.timer = new Timer(this.ctx);
    this.score = new Score(this.ctx);
    this.ui = new GameUI(this.ctx, this.resourceManager);
    this.gameStartCountdown = new GameStartCountdown(this.ctx, {
      canvasWidth: this.canvas.width,
      canvasHeight: this.canvas.height,
    });
    this.gameEnd = new GameEnd(this.ctx, {
      canvasWidth: this.canvas.width,
      canvasHeight: this.canvas.height,
    });

    this.render();
    this.addEventListeners();
  }

  async startGame() {
    this.gameState.progress = "beforeStart";

    await wait(GameInstance.displayTime.tutorial);

    void this.gameStartCountdown.processAnimation();

    await wait(GameStartCountdown.countDownTime);

    this.gameState.progress = "playing";

    this.timer.start();

    await wait(15000);

    this.gameState.progress = "end";
  }

  renderGame() {
    this.render();
    requestAnimationFrame(() => this.renderGame());
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
    this.drawUi();

    this.timer.draw();
    this.score.drawScore();

    if (this.gameState.isBeforeStart) {
      this.gameStartCountdown.drawCountDown();
    }

    if (this.gameState.isEnded) {
      this.gameEnd.draw();
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // TODO: 게임 초기화
  clearInstance() {
    this.timer.clear();

    this.timer = new Timer(this.ctx);
    this.score = new Score(this.ctx);
    this.gameStartCountdown = new GameStartCountdown(this.ctx, {
      canvasWidth: this.canvas.width,
      canvasHeight: this.canvas.height,
    });
    this.gameState.clear();
    this.gameEnd.clear();
    this.gameEnd = new GameEnd(this.ctx, {
      canvasWidth: this.canvas.width,
      canvasHeight: this.canvas.height,
    });

    this.render();
  }

  addEventListeners() {
    window.addEventListener("blur", () => {
      // this.clearInstance();
    });
  }

  drawGameEnd() {}
}

export default GameInstance;
