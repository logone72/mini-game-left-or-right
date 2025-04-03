import Monster from "./modules/Monster";
import { ResourceManager } from "../ResourceManager";
import PositionCalculator from "./modules/PositionCalculator";
import { MONSTER_MAX_COUNT } from "./constant";
import Animator from "./modules/Animator";

export type FadingMonsterDirection = "left" | "right";

export interface MonsterManagerOptions {
  canvasWidth: number;
  canvasHeight: number;
  ctx: CanvasRenderingContext2D;
  resourceManager: typeof ResourceManager;
}

class MonsterManager {
  monsters: Monster[];
  fadingMonster: {
    left: Monster[];
    right: Monster[];
    wrong: Monster | null;
  };

  canvasWidth: number;
  canvasHeight: number;
  ctx: CanvasRenderingContext2D;

  resourceManager: typeof ResourceManager;
  positionCalculator: PositionCalculator;
  animator: Animator;

  constructor(options: MonsterManagerOptions) {
    this.monsters = [];
    this.fadingMonster = {
      left: [],
      right: [],
      wrong: null,
    };

    this.canvasWidth = options.canvasWidth;
    this.canvasHeight = options.canvasHeight;
    this.ctx = options.ctx;

    this.resourceManager = options.resourceManager;

    this.positionCalculator = new PositionCalculator({
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
    });
    this.animator = new Animator({
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
    });
  }

  init() {
    this.monsters = [];

    for (let i = 0; i < MONSTER_MAX_COUNT; i++) {
      this.monsters.push(
        Monster.createRandomMonster({
          ctx: this.ctx,
          resourceManager: this.resourceManager,
          x: this.positionCalculator.x,
          y:
            this.positionCalculator.startY +
            this.positionCalculator.diffYPerMonster * (i + 1),
        })
      );
    }

    this.render();
  }

  render() {
    this.monsters.forEach((monster) => monster.render());
    this.fadingMonster.left.forEach((monster) => monster.render());
    this.fadingMonster.right.forEach((monster) => monster.render());
  }

  pop(direction: FadingMonsterDirection): Monster {
    const monster = this.monsters.pop();

    if (!monster) throw new Error("Monster not found which should not happen.");

    this.fadeOutMonster(direction, monster);

    return monster;
  }

  insertNewMonster() {
    this.animator.animateMonstersY(this.monsters, this.positionCalculator.endY);

    const monster = Monster.createRandomMonster({
      ctx: this.ctx,
      resourceManager: this.resourceManager,
      x: this.positionCalculator.x,
      y: this.monsters[0].y - this.positionCalculator.diffYPerMonster,
    });

    this.monsters.unshift(monster);
  }

  fadeOutMonster(direction: FadingMonsterDirection, monster: Monster) {
    this.fadingMonster[direction].push(monster);
    this.animator
      .animateFadingMonster(monster, direction)
      .then(() => {
        this.fadingMonster[direction].shift();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default MonsterManager;
