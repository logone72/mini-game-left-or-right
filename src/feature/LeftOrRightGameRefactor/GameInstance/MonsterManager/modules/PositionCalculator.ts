import { MONSTER_MAX_COUNT, MONSTER_SIZE } from "../constant";

const POSITION = {
  START_Y_PERCENT: 30,
  END_Y_PERCENT: 76,
};

interface PositionCalculatorOptions {
  canvasWidth: number;
  canvasHeight: number;
}

class PositionCalculator {
  canvasWidth: number;
  canvasHeight: number;

  x: number;
  startY: number;
  endY: number;
  diffYPerMonster: number;
  constructor(options: PositionCalculatorOptions) {
    this.canvasWidth = options.canvasWidth;
    this.canvasHeight = options.canvasHeight;

    this.x = this.calcX();
    this.startY = this.calcStartY();
    this.endY = this.calcEndY();
    this.diffYPerMonster = this.calcDiffYPerMonster();
  }

  calcX() {
    return Math.round(this.canvasWidth / 2 - MONSTER_SIZE.width / 2);
  }

  calcStartY() {
    return Math.round((this.canvasHeight * POSITION.START_Y_PERCENT) / 100);
  }

  calcEndY() {
    return Math.round((this.canvasHeight * POSITION.END_Y_PERCENT) / 100);
  }

  calcDiffYPerMonster() {
    return (this.endY - this.startY) / MONSTER_MAX_COUNT;
  }
}

export default PositionCalculator;
