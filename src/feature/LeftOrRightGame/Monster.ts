class Monster {
  isBlue: boolean;
  width: number;
  height: number;
  x: number;
  y: number;
  goLeft: boolean;

  constructor(blueOrGreen: boolean) {
    this.isBlue = blueOrGreen;
    this.width = 75;
    this.height = 75;
    this.x = 180 - 37;
    this.y = (500 + 140) / 3;
    this.goLeft = true;
  }

}


export function makeNewMonster() {
  const random_boolean = Math.random() < 0.5;
  return new Monster(random_boolean);
}

export default Monster;
