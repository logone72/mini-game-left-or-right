import type Monster from "./Monster";
import type { FadingMonsterDirection } from "../index";
interface AnimatorOptions {
  canvasWidth: number;
  canvasHeight: number;
}

class Animator {
  canvasWidth: number;
  canvasHeight: number;
  yPerFrame: number;
  xPerFrame: number;
  yInterval: number | null;

  constructor(options: AnimatorOptions) {
    this.canvasWidth = options.canvasWidth;
    this.canvasHeight = options.canvasHeight;

    this.yPerFrame = this.canvasHeight / 120;
    this.xPerFrame = this.canvasWidth / 30;

    this.yInterval = null;
  }

  animateMonstersY(monsters: Monster[], maxY: number) {
    if (this.yInterval) {
      clearInterval(this.yInterval);
      this.yInterval = null;
    }

    this.yInterval = setInterval(() => {
      for (let i = 0; i < monsters.length; i++) {
        const monster = monsters[i];
        monster.y += this.yPerFrame;

        if (monsters.length - 1 === i && monster.y > maxY) {
          monster.y = maxY;

          if (this.yInterval) {
            clearInterval(this.yInterval);
            this.yInterval = null;
          }
        }
      }
    }, 1000 / 60);
  }

  animateFadingMonster(
    monster: Monster,
    direction: FadingMonsterDirection
  ): Promise<void> {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (direction === "left") {
          monster.x -= this.xPerFrame;
        } else {
          monster.x += this.xPerFrame;
        }

        if (monster.x < -monster.width) {
          monster.x = -monster.width * 2;
          clearInterval(interval);
          resolve();
        } else if (monster.x > this.canvasWidth) {
          monster.x = this.canvasWidth + monster.width;
          clearInterval(interval);
          resolve();
        }
      }, 1000 / 60);

      setTimeout(() => {
        clearInterval(interval);
        resolve();
      }, 2000);
    });
  }
}

export default Animator;
