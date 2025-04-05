import { radiusType } from "../@types";
import { drawRoundRect } from "../utils/canvas-helper";

type GameTime = {
  maxPlayTime: number; //최대 플레이 시간 (초)
  timePassed: number; //흘러간 시간 (초)
  progressWidth: number; //타이머 바의 현재 너비
  maxProgressWidth: number; //타이머 바의 최대 너비
};

type ViewConstant = {
  radius: radiusType; //타이머 바 모서리의 반지름 값
  paddingLR: number; //타이머 바의 좌우 패딩
  paddingTB: number; //타이머 바의 상하 패딩
  minProgressWidth: number; //타이머 바의 최소 너비
  defaultProgressWidth: number; //타이머 바의 기본 너비
  progressBarHeight: number; //타이머 바의 높이
};

type TimerOptions = {
  maxPlayTime: number; //게임의 최대 플레이 시간 설정
  canvasWidth: number; //캔버스의 너비
  onEnd: () => void; //타이머 종료 시 실행될 콜백 함수
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
    defaultProgressWidth: 30,
    progressBarHeight: 30,
  };

  static initialValue: GameTime = {
    maxPlayTime: 15,
    timePassed: 0,
    progressWidth: Timer.viewConstant.defaultProgressWidth,
    maxProgressWidth: 360 - Timer.viewConstant.paddingLR * 2,
  };

  gameTime: GameTime;
  timer: number | null;
  ctx: CanvasRenderingContext2D;
  onEnd?: () => void;

  constructor(ctx: CanvasRenderingContext2D, options?: TimerOptions) {
    this.gameTime = { ...Timer.initialValue };
    this.timer = null;
    this.ctx = ctx;

    if (options?.canvasWidth) {
      this.gameTime.maxProgressWidth =
        options.canvasWidth - Timer.viewConstant.paddingLR * 2;
    }

    if (options?.onEnd) {
      this.onEnd = options.onEnd;
    }
  }

  start() {
    this.timer = setInterval(() => {
      const progressWidth =
        (this.gameTime.maxProgressWidth - Timer.viewConstant.minProgressWidth) /
        (this.gameTime.maxPlayTime * 100);

      this.gameTime.timePassed += 0.01;
      this.gameTime.progressWidth += progressWidth;

      // 게임 종료
      if (this.gameTime.timePassed > this.gameTime.maxPlayTime) {
        this.gameTime.timePassed = this.gameTime.maxPlayTime;
        this.gameTime.progressWidth = this.gameTime.maxProgressWidth;

        if (this.timer) {
          clearInterval(this.timer);
        }
        this.timer = null;

        this.onEnd?.();
      }
    }, 10);
  }

  clear() {
    this.gameTime = { ...Timer.initialValue };
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = null;

    this.draw();
  }

  draw() {
    this.ctx.save();

    this.drawBackground();
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
