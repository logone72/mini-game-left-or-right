//이미지
import BlueMonsterImg from "../../../../assets/BlueMonster.png";
import GreenMonsterImg from "../../../../assets/GreenMonster.png";
import ArrowLeftButtonImg from "../../../../assets/neonArrowLeft.png";
import ArrowRightButtonImg from "../../../../assets/neonArrowRight.png";
import PikachuImg from "../../../../assets/Pikachu.png";
import CharmanderImg from "../../../../assets/Charmander.png";
import tutorialImg from "../../../../assets/tutorialLeftRight.png";
import type { MonsterType } from "../@types";

export const ResourceManager = {
  blueMonster: new Image(),
  greenMonster: new Image(),
  arrowLeftButton: new Image(),
  arrowRightButton: new Image(),
  pikachu: new Image(),
  charmander: new Image(),
  tutorial: new Image(),

  loadResources() {
    this.blueMonster.src = BlueMonsterImg;
    this.greenMonster.src = GreenMonsterImg;
    this.arrowLeftButton.src = ArrowLeftButtonImg;
    this.arrowRightButton.src = ArrowRightButtonImg;
    this.pikachu.src = PikachuImg;
    this.charmander.src = CharmanderImg;
    this.tutorial.src = tutorialImg;
  },

  getMonsterImage(type: MonsterType) {
    switch (type) {
      case "left":
        return this.blueMonster;
      case "right":
        return this.greenMonster;
    }
  },
};
