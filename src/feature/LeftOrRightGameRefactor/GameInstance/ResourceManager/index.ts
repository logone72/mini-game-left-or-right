//이미지
import BlueMonsterImg from "../../../../assets/BlueMonster.png";
import GreenMonsterImg from "../../../../assets/GreenMonster.png";
import ArrowLeftButtonImg from "../../../../assets/neonArrowLeft.png";
import ArrowRightButtonImg from "../../../../assets/neonArrowRight.png";

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
};
