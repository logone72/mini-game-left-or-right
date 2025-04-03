interface ControlManagerOptions {
  canvas: HTMLCanvasElement;
  onLeft: () => void;
  onRight: () => void;
}

class ControlManager {
  canvas: HTMLCanvasElement;
  onLeft: () => void;
  onRight: () => void;
  isEnabled: boolean;

  constructor(options: ControlManagerOptions) {
    this.canvas = options.canvas;
    this.isEnabled = false;
    this.onLeft = options.onLeft;
    this.onRight = options.onRight;
  }

  init() {
    window.addEventListener("keydown", this._onKeyDown.bind(this));
    this.canvas.addEventListener("click", this._onClick.bind(this));
  }

  enable() {
    this.isEnabled = true;
    window.focus();
    this.canvas.focus();
  }

  disable() {
    this.isEnabled = false;
  }

  clear() {
    window.removeEventListener("keydown", this._onKeyDown);
    this.canvas.removeEventListener("click", this._onClick);
  }

  _onKeyDown(event: KeyboardEvent) {
    if (!this.isEnabled) return;

    event.preventDefault();
    event.stopPropagation();

    if (event.key === "ArrowLeft") {
      this.onLeft();
    } else if (event.key === "ArrowRight") {
      this.onRight();
    }
  }

  _onClick(event: MouseEvent) {
    if (!this.isEnabled) return;

    event.preventDefault();
    event.stopPropagation();

    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (y > this.canvas.height / 2) return;

    if (x < this.canvas.width / 2) {
      this.onLeft();
    } else {
      this.onRight();
    }
  }
}

export default ControlManager;
