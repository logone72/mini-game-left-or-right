import Confetti from "./modules/Confetti";

export interface GameEndOptions {
  canvasWidth: number;
  canvasHeight: number;
  confettiCount?: number;
}

class GameEnd {
  static readonly defaultConfettiCount = 200;

  private ctx: CanvasRenderingContext2D;
  private canvasWidth: number;
  private canvasHeight: number;
  private confetties: Confetti[];

  private isDrawStarted: boolean = false;
  private backgroundPosition: number;
  private backgroundTimer: number | null = null;

  constructor(ctx: CanvasRenderingContext2D, options: GameEndOptions) {
    this.ctx = ctx;
    this.canvasWidth = options.canvasWidth;
    this.canvasHeight = options.canvasHeight;
    this.confetties = this.createConfetties(
      options.confettiCount || GameEnd.defaultConfettiCount
    );

    this.backgroundPosition = -this.canvasHeight;
  }

  public draw() {
    if (!this.isDrawStarted) {
      this.isDrawStarted = true;
      this.animateBackground();
    }

    const ctx = this.ctx;

    ctx.save();
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "black";
    ctx.fillRect(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight + this.backgroundPosition
    );

    ctx.restore();

    ctx.save();
    this.confetties.forEach((conf) => {
      conf.update();
      conf.draw(ctx);
    });
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "white";
    ctx.font = "bold 100px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("FINISH", this.canvasWidth / 2, this.canvasHeight / 2);
    ctx.restore();
  }

  public clear() {
    if (this.backgroundTimer) {
      clearInterval(this.backgroundTimer);
    }
  }

  private animateBackground() {
    const perFrame = this.canvasHeight / 100;
    const interval = 10;

    this.backgroundTimer = setInterval(() => {
      this.backgroundPosition += perFrame;

      if (this.backgroundPosition > 0) {
        this.backgroundPosition = 0;

        if (this.backgroundTimer) {
          clearInterval(this.backgroundTimer);
        }
      }
    }, interval);
  }

  private createConfetties(count: number) {
    return new Array(count).fill(undefined).map(
      () =>
        new Confetti({
          canvasWidth: this.canvasWidth,
          canvasHeight: this.canvasHeight,
        })
    );
  }
}

export default GameEnd;
