import { radiusType } from "../type";
import { drawRoundRect } from "../utils/canvas-helper";

type GameTime = {
  maxPlayTime: number; //최대 플레이 시간 (초)
  cntDownTime: number; //게임 시작전 카운트 다운 시간 (ms)
  timePassed: number; //흘러간 시간 (초)
  progressWidth: number;
  maxProgressWidth: number;
};

type ViewConstant = {
  radius: radiusType;
  paddingLR: number;
  paddingTB: number;
  minProgressWidth: number;
  progressBarHeight: number;
};

type TimerOptions = {
  maxPlayTime: number;
  cntDownTime: number;
  canvasWidth: number;
  onEnd: () => void;
};

class Timer {
  static viewConstant: ViewConstant = {
    //타이머 바 모서리 반지름
    radius: {
      tl: 17,
      tr: 17,
      br: 17,
      bl: 17,
    },
    paddingLR: 40,
    paddingTB: 30,
    minProgressWidth: 30,
    progressBarHeight: 30,
  };

  static initialValue: GameTime = {
    maxPlayTime: 15,
    cntDownTime: 3700 + 4000,
    timePassed: 0,
    progressWidth: 0,
    maxProgressWidth: 360 - Timer.viewConstant.paddingLR * 2,
  };

  gameTime: GameTime;
  ctx: CanvasRenderingContext2D;
  onEnd?: () => void;

  constructor(ctx: CanvasRenderingContext2D, options?: TimerOptions) {
    this.gameTime = Timer.initialValue;
    this.ctx = ctx;

    if (options?.canvasWidth) {
      this.gameTime.maxProgressWidth =
        options.canvasWidth - Timer.viewConstant.paddingLR * 2;
    }

    if (options?.onEnd) {
      this.onEnd = options.onEnd;
    }
  }

  startCountDown() {
    setTimeout(() => {
      const timer = setInterval(() => {
        const progressWidth =
          (this.gameTime.maxProgressWidth -
            Timer.viewConstant.minProgressWidth) /
          (this.gameTime.maxPlayTime * 100);

        this.gameTime.timePassed += 0.01;
        this.gameTime.progressWidth += progressWidth;

        // 게임 종료
        if (this.gameTime.timePassed > this.gameTime.maxPlayTime) {
          this.gameTime.timePassed = this.gameTime.maxPlayTime;
          this.gameTime.progressWidth = this.gameTime.maxProgressWidth;

          clearInterval(timer);
          this.onEnd?.();
        }
      }, 10);
    }, this.gameTime.cntDownTime);
  }

  draw() {
    this.ctx.save();

    // this.drawBackground();
    this.drawProgress();
    this.drawTimeText();
  }

  drawBackground() {
    const ctx = this.ctx;

    ctx.fillStyle = "DarkRed";
    drawRoundRect(
      ctx,
      Timer.viewConstant.paddingLR,
      Timer.viewConstant.paddingTB,
      this.gameTime.maxProgressWidth,
      Timer.viewConstant.progressBarHeight,
      Timer.viewConstant.radius,
      true,
      false
    );
    ctx.save();
    ctx.restore();
  }

  drawProgress() {
    const ctx = this.ctx;

    ctx.fillStyle = "white";
    drawRoundRect(
      ctx,
      Timer.viewConstant.paddingLR,
      Timer.viewConstant.paddingTB,
      this.gameTime.progressWidth,
      Timer.viewConstant.progressBarHeight,
      Timer.viewConstant.radius,
      true,
      false
    );

    ctx.beginPath();
    ctx.arc(40 + 15, 30 + 15, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.save();
    ctx.restore();
  }

  drawTimeText() {
    const ctx = this.ctx;
    ctx.fillStyle = "#ff4d4d";
    ctx.font = "bold 16px Trebuchet MS";
    ctx.fillText(`${this.gameTime.timePassed.toFixed(2)}`, 180 - 15, 30 + 20);
    ctx.save();
  }
}

export default Timer;
