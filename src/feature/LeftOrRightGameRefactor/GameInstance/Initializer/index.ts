import GameInstance from '..';
import { drawRoundRect } from "../../../LeftOrRightGame/util";
import { timer } from "../../constant";


class Initializer {
  static radius: radius = {
    tl: 17,
    tr: 17,
    br: 17,
    bl: 17,
  };

  ctx: CanvasRenderingContext2D;

  constructor(gameInstance: GameInstance) {
    this.ctx = gameInstance.ctx;
  }

  drawTimer() {
    const time = timer.timePassed;

    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = "DarkRed";
    drawRoundRect(
      ctx,
      40,
      30,
      timer.maxWidth,
      30,
      Initializer.radius,
      true,
      false
    );
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "white";
    // 흰색 바
    drawRoundRect(
      ctx,
      40,
      30,
      timer.width,
      30,
      Initializer.radius,
      true,
      false
    );

    ctx.beginPath();
    ctx.arc(40 + 15, 30 + 15, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "#ff4d4d";
    ctx.font = "bold 16px Trebuchet MS";
    ctx.fillText(`${time.toFixed(2)}`, 180 - 15, 30 + 20);
    ctx.restore();
  }

  drawScore(ctx: any) {
    ctx.save();
    ctx.font = "bold 100px Trebuchet MS";
    ctx.fillStyle = "white";

    if (score < 10 && score >= 0) {
      // 양수 일의 자리
      ctx.fillText(`${score}`, 180 - 20, instance.score.location);
    } else if (score < -1 && score > -10) {
      // 음수 일의 자리
      ctx.fillText(`${score}`, 180 - 50, instance.score.location);
    } else if (score <= -10) {
      // 음수 10이상
      ctx.fillText(`${score}`, 180 - 90, instance.score.location);
    } else {
      // 양수 10이상
      ctx.fillText(`${score}`, 180 - 60, instance.score.location);
    }

    ctx.save();
    ctx.font = "bold 30px Trebuchet MS";
    ctx.fillText("your score", 180 - 70, instance.score.location + 30);
    ctx.restore();
    ctx.restore();
  }
}

export default Initializer;
