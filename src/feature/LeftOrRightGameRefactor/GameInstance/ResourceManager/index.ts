//이미지
import BlueMonsterImg from "../../../../assets/BlueMonster.png";
import GreenMonsterImg from "../../../../assets/GreenMonster.png";
import ArrowLeftButtonImg from "../../../../assets/neonArrowLeft.png";
import ArrowRightButtonImg from "../../../../assets/neonArrowRight.png";
import type { MonsterType } from "../@types";

export const ResourceManager = {
  blueMonster: new Image(),
  greenMonster: new Image(),
  arrowLeftButton: new Image(),
  arrowRightButton: new Image(),

  loadResources() {
    this.blueMonster.src = BlueMonsterImg;
    this.greenMonster.src = GreenMonsterImg;
    this.arrowLeftButton.src = ArrowLeftButtonImg;
    this.arrowRightButton.src = ArrowRightButtonImg;
  },

  getMonsterImage(type: MonsterType) {
    switch (type) {
      case "left":
        return this.greenMonster;
      case "right":
        return this.blueMonster;
    }
  },
};
