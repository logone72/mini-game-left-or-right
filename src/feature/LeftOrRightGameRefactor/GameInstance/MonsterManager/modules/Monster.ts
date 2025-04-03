import { ResourceManager } from "../../ResourceManager";
import { MONSTER_SIZE } from "../constant";

export type MonsterColor = "blue" | "green";

interface MonsterOptions {
  color: MonsterColor;
  x: number;
  y: number;
  width?: number;
  height?: number;
  resourceManager: typeof ResourceManager;
  ctx: CanvasRenderingContext2D;
}

class Monster {
  color: MonsterColor;
  width: number;
  height: number;
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;
  resourceManager: typeof ResourceManager;
  image: HTMLImageElement;

  static createRandomMonster(options: Omit<MonsterOptions, "color">) {
    return new Monster({
      ...options,
      color: Math.random() < 0.5 ? "blue" : "green",
    });
  }

  constructor(options: MonsterOptions) {
    this.color = options.color;
    this.width = options.width || MONSTER_SIZE.width;
    this.height = options.height || MONSTER_SIZE.height;
    this.x = options.x;
    this.y = options.y;
    this.ctx = options.ctx;
    this.resourceManager = options.resourceManager;
    this.image = this.resourceManager.getMonsterImage(this.color);
  }

  render() {
    this.ctx.save();
    this.ctx.drawImage(
      this.resourceManager.getMonsterImage(this.color),
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.ctx.restore();
  }
}

export default Monster;
