import type { MonsterType } from "../@types";
import { ResourceManager } from "../ResourceManager";
import { drawRoundRect } from "../utils/canvas-helper";

interface GameUIOptions {
  ctx: CanvasRenderingContext2D;
  resourceManager: typeof ResourceManager;
  canvasWidth: number;
  canvasHeight: number;
}

class GameUI {
  static viewConstant = {
    // 버튼 위치 세로 = height/ 3 = 167 * 2 = 334, 가로 좌우 마진 30px 4등분 300 / 4 = 75, 왼쪽 75 오른쪽 225
    height: 75,
    width: 75,
    margin: 25,

    left: {
      x: 25,
      y: 500 + 140 - 75 - 50, //canvas height - button Height - 50;
    },

    right: {
      x: 360 - 75 - 25, //canvas width - button width - margin
      y: 500 + 140 - 75 - 50,
    },
    backgroundColor: "#DC143C",
    headerBackgroundColor: "white",
    font: "bold 18px Trebuchet MS",
  };

  static leftRightGuideViewConstant = {
    bottomRadius: {
      tl: 5,
      tr: 5,
      br: 40,
      bl: 40,
    },
    headerRadius: {
      tl: 5,
      tr: 5,
      br: 0,
      bl: 0,
    },
  };

  ctx: CanvasRenderingContext2D;
  resourceManager: typeof ResourceManager;
  canvasWidth: number;
  canvasHeight: number;

  constructor(options: GameUIOptions) {
    this.ctx = options.ctx;
    this.resourceManager = options.resourceManager;
    this.canvasWidth = options.canvasWidth;
    this.canvasHeight = options.canvasHeight;
  }

  drawArrowButton() {
    const viewConstant = GameUI.viewConstant;

    this.ctx.drawImage(
      this.resourceManager.arrowLeftButton,
      viewConstant.left.x,
      viewConstant.left.y,
      viewConstant.width,
      viewConstant.height
    );

    this.ctx.drawImage(
      this.resourceManager.arrowRightButton,
      viewConstant.right.x,
      viewConstant.right.y,
      viewConstant.width,
      viewConstant.height
    );
  }

  drawLeftRightGuide(location: MonsterType) {
    const viewConstant = GameUI.viewConstant;
    const ctx = this.ctx;

    let positionX = 0;
    let text = "";
    let monsterImage: HTMLImageElement =
      this.resourceManager.getMonsterImage(location);

    if (location === "left") {
      positionX = viewConstant.left.x;
      text = "좌측으로";
    } else if (location === "right") {
      positionX = viewConstant.right.x;
      text = "우측으로";
      monsterImage = this.resourceManager.getMonsterImage(location);
    }

    // 하얀색 아래쪽 둥근 바탕
    ctx.save();
    ctx.fillStyle = viewConstant.backgroundColor;
    drawRoundRect(
      ctx,
      positionX,
      viewConstant.left.y - 110 - 30,
      viewConstant.width,
      110,
      GameUI.leftRightGuideViewConstant.bottomRadius,
      true,
      false
    );
    ctx.restore();

    //header
    ctx.save();
    ctx.fillStyle = viewConstant.headerBackgroundColor;
    drawRoundRect(
      ctx,
      positionX,
      viewConstant.left.y - 110 - 30,
      viewConstant.width,
      25,
      GameUI.leftRightGuideViewConstant.headerRadius,
      true,
      false
    );
    ctx.restore();

    ctx.save();
    ctx.fillStyle = viewConstant.backgroundColor;
    ctx.font = viewConstant.font;
    ctx.fillText(`${text}`, positionX + 6, viewConstant.left.y - 110 - 30 + 20);
    ctx.restore();

    ctx.drawImage(
      monsterImage,
      positionX + 7,
      viewConstant.left.y - 110 - 30 + 25 + 12,
      60,
      60
    );
  }

  drawTutorial() {
    const ctx = this.ctx;

    ctx.save();

    ctx.drawImage(
      this.resourceManager.tutorial,
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );

    ctx.restore();
  }
}

export default GameUI;
