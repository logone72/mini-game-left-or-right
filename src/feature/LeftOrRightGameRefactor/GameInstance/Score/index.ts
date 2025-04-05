class Score {
  static viewConstant = {
    xMaxPosition: 180,
    yPosition: 160,
    font: "bold 30px Trebuchet MS",
  };

  ctx: CanvasRenderingContext2D;
  scoreValue: number;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.scoreValue = 0;
  }

  correct() {
    this.scoreValue += 1;
  }

  incorrect() {
    this.scoreValue -= 1;
  }

  drawScore() {
    const ctx = this.ctx;
    const score = this.scoreValue;
    const scoreString = `${score}`;

    ctx.save();
    ctx.font = "bold 100px Trebuchet MS";
    ctx.fillStyle = "white";

    if (score < 10 && score >= 0) {
      // 양수 일의 자리
      ctx.fillText(
        scoreString,
        Score.viewConstant.xMaxPosition - 20,
        Score.viewConstant.yPosition
      );
    } else if (score < -1 && score > -10) {
      // 음수 일의 자리
      ctx.fillText(
        scoreString,
        Score.viewConstant.xMaxPosition - 50,
        Score.viewConstant.yPosition
      );
    } else if (score <= -10) {
      // 음수 10이상
      ctx.fillText(
        scoreString,
        Score.viewConstant.xMaxPosition - 90,
        Score.viewConstant.yPosition
      );
    } else {
      // 양수 10이상
      ctx.fillText(
        scoreString,
        Score.viewConstant.xMaxPosition - 60,
        Score.viewConstant.yPosition
      );
    }

    ctx.save();
    ctx.font = Score.viewConstant.font;
    ctx.fillText(
      "your score",
      Score.viewConstant.xMaxPosition - 70,
      Score.viewConstant.yPosition + 30
    );
    ctx.restore();
    ctx.restore();
  }
}

export default Score;
