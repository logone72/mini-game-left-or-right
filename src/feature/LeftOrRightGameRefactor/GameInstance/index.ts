import Confetti from "./Confetti";
import GameStartCountdown from "./GameStartCountdown";
import { ResourceManager } from "./ResourceManager";
import Score from "./Score";
import Timer from "./Timer";
import UiComponent from "./UiComponent";
import { wait } from "./utils/time-helper";

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

    this.render();
    this.addEventListeners();
  }

  async startGame() {
    await wait(GameInstance.displayTime.tutorial);

    void this.gameStartCountdown.processAnimation();
    this.drawConfetties();

    await wait(GameStartCountdown.countDownTime);

    this.timer.start();

    await wait(15000);
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
    this.timer.draw();
    this.score.drawScore();
    this.drawUi();
    this.gameStartCountdown.drawCountDown();
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

    this.render();
  }

  addEventListeners() {
    window.addEventListener("blur", () => {
      this.clearInstance();
    });
  }

  drawConfetties() {
    console.log("drawConfetties");
    const confs = new Array(100).fill(undefined).map(
      () =>
        new Confetti({
          canvasWidth: this.canvas.width,
          canvasHeight: this.canvas.height,
        })
    );

    const ctx = this.ctx;

    ctx.save();
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.restore();

    ctx.save();
    confs.forEach((conf) => {
      conf.update();
      conf.draw(ctx);
    });
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "white";
    ctx.font = "bold 100px Trebuchet MS";
    ctx.fillText("FINISH", 35, this.canvas.height / 2);
    ctx.restore();
  }
}

export default GameInstance;
