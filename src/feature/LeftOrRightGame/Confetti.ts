import GameInstance from "./gameInstance";

class Confetti {
  private x: number;
  private y: number;
  private rotation: number;
  private size: number;
  private color: string;
  private speed: number;
  private opacity: number;
  private shiftDirection: number;
  private instance: GameInstance;

  constructor(instance: GameInstance) {
    this.instance = instance;
    const colours = ["#fde132", "#009bde", "#ff6b00"];

    this.x = Math.round(Math.random() * instance.gameCanvas.width);
    this.y =
      Math.round(Math.random() * instance.gameCanvas.height) -
      instance.gameCanvas.height / 2;
    this.rotation = Math.random() * 360;

    const size = Math.random() * (instance.gameCanvas.width / 60);
    this.size = size < 15 ? 15 : size;

    this.color = colours[Math.floor(colours.length * Math.random())];
    this.speed = this.size / 7;
    this.opacity = Math.random();
    this.shiftDirection = Math.random() > 0.5 ? 1 : -1;
  }

  private border(): void {
    if (this.y >= this.instance.gameCanvas.height) {
      this.y = this.instance.gameCanvas.height;
    }
  }

  public update(): void {
    this.y += this.speed;

    if (this.y <= this.instance.gameCanvas.height) {
      this.x += this.shiftDirection / 3;
      this.rotation += (this.shiftDirection * this.speed) / 100;
    }

    if (this.y > this.instance.gameCanvas.height) {
      this.border();
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.size,
      this.rotation,
      this.rotation + Math.PI / 2
    );
    ctx.lineTo(this.x, this.y);
    ctx.closePath();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export default Confetti;
