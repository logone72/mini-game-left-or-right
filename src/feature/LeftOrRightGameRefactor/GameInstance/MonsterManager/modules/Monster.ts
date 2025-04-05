import { MonsterType } from "../../@types";
import { ResourceManager } from "../../ResourceManager";
import { MONSTER_SIZE } from "../constant";

interface MonsterOptions {
  type: MonsterType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  resourceManager: typeof ResourceManager;
  ctx: CanvasRenderingContext2D;
}

class Monster {
  type: MonsterType;
  width: number;
  height: number;
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;
  resourceManager: typeof ResourceManager;
  image: HTMLImageElement;

  static createRandomMonster(options: Omit<MonsterOptions, "type">) {
    return new Monster({
      ...options,
      type: Math.random() < 0.5 ? "left" : "right",
    });
  }

  constructor(options: MonsterOptions) {
    this.type = options.type;
    this.width = options.width || MONSTER_SIZE.width;
    this.height = options.height || MONSTER_SIZE.height;
    this.x = options.x;
    this.y = options.y;
    this.ctx = options.ctx;
    this.resourceManager = options.resourceManager;
    this.image = this.resourceManager.getMonsterImage(this.type);
  }

  render(renderType: "normal" | "wrong" = "normal") {
    this.ctx.save();

    if (renderType === "wrong") {
      this.ctx.globalAlpha = 0.5;
      this.ctx.fillStyle = "red";
    }

    this.ctx.drawImage(
      this.resourceManager.getMonsterImage(this.type),
      this.x,
      this.y,
      this.width,
      this.height
    );
    9;

    if (renderType === "wrong") {
      this.ctx.beginPath();
      this.ctx.arc(
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.width / 2,
        0,
        2 * Math.PI
      );
      this.ctx.fill();
    }

    this.ctx.restore();
  }
}

export default Monster;
