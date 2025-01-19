type CountDownOptions = {
  canvasWidth: number;
  canvasHeight: number;
};

class GameStartCountdown {
  static viewConstant = {
    font: "bold 100px Trebuchet MS",
    fontColor: "white",
  };

  ctx: CanvasRenderingContext2D;
  options: CountDownOptions;

  countdownAnimationValue: number;

  constructor(ctx: CanvasRenderingContext2D, options: CountDownOptions) {
    this.ctx = ctx;
    this.options = options;
    this.countdownAnimationValue = 0;
  }

  drawCountDown() {
    const ctx = this.ctx;
    const canvasWidth = this.options.canvasWidth;
    const canvasHeight = this.options.canvasHeight;
    const countdownAnimationValue = this.countdownAnimationValue;

    // 캔버스를 완전히 벗어나는 경우 출력 정지
    if (countdownAnimationValue > canvasWidth * 5) {
      return;
    }

    ctx.save();
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.restore();

    // 3초
    ctx.save();
    ctx.fillStyle = GameStartCountdown.viewConstant.fontColor;
    ctx.font = GameStartCountdown.viewConstant.font;
    ctx.fillText(
      "3",
      -20 + canvasWidth / 2 - canvasWidth * 1 + countdownAnimationValue,
      canvasHeight / 2
    );
    ctx.restore();

    // 2초
    ctx.save();
    ctx.fillStyle = GameStartCountdown.viewConstant.fontColor;
    ctx.font = GameStartCountdown.viewConstant.font;
    ctx.fillText(
      "2",
      -20 + canvasWidth / 2 - canvasWidth * 2 + countdownAnimationValue,
      canvasHeight / 2
    );
    ctx.restore();

    // 1초
    ctx.save();
    ctx.fillStyle = GameStartCountdown.viewConstant.fontColor;
    ctx.font = GameStartCountdown.viewConstant.font;
    ctx.fillText(
      "1",
      -20 + canvasWidth / 2 - canvasWidth * 3 + countdownAnimationValue,
      canvasHeight / 2
    );
    ctx.restore();

    // 게임시작
    ctx.save();
    ctx.fillStyle = GameStartCountdown.viewConstant.fontColor;
    ctx.font = GameStartCountdown.viewConstant.font;
    ctx.fillText(
      "GAME",
      -150 + canvasWidth / 2 - canvasWidth * 4 + countdownAnimationValue,
      canvasHeight / 2
    );
    ctx.fillStyle = GameStartCountdown.viewConstant.fontColor;
    ctx.font = GameStartCountdown.viewConstant.font;
    ctx.fillText(
      "START!",
      -150 + canvasWidth / 2 - canvasWidth * 4 + countdownAnimationValue,
      80 + canvasHeight / 2
    );
    ctx.restore();
  }

  processAnimation() {
    const canvasWidth = this.options.canvasWidth;

    // 3초
    const threeSecond = setInterval(() => {
      this.countdownAnimationValue += canvasWidth / 28;

      if (this.countdownAnimationValue >= canvasWidth) {
        this.countdownAnimationValue = canvasWidth;
        clearInterval(threeSecond);
      }
    }, 25); // 1000 = 1초이니 700 = 0.7초, 총 700/ 25 = 28프레임 으로 360을 나눠서 글자들 이동 및 출력

    // 2초
    setTimeout(() => {
      const twoSecond = setInterval(() => {
        this.countdownAnimationValue += canvasWidth / 28;

        if (this.countdownAnimationValue >= canvasWidth * 2) {
          this.countdownAnimationValue = canvasWidth * 2;
          clearInterval(twoSecond);
        }
      }, 25);
    }, 1000);

    // 1초
    setTimeout(() => {
      const oneSecond = setInterval(() => {
        this.countdownAnimationValue += canvasWidth / 28;

        if (this.countdownAnimationValue >= canvasWidth * 3) {
          this.countdownAnimationValue = canvasWidth * 3;
          clearInterval(oneSecond);
        }
      }, 25);
    }, 2000);

    // 게임 시작
    setTimeout(() => {
      const gameStart = setInterval(() => {
        this.countdownAnimationValue += canvasWidth / 14; // 350 동안 진행

        if (this.countdownAnimationValue >= canvasWidth * 4) {
          this.countdownAnimationValue = canvasWidth * 4;

          // 더이상 랜더링되지 않게
          setTimeout(() => {
            this.countdownAnimationValue += 10000;
          }, 350);

          clearInterval(gameStart);
        }
      }, 25);
    }, 3000);
  }
}

export default GameStartCountdown;
