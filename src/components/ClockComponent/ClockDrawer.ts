type ClockDrawerArgs = {
  ctx: CanvasRenderingContext2D;
  height: number;
  width: number;
  colors: Colors;
};

type Colors = {
  escape: string;
  chase: string;
  center: string;
  text: string;
};

type DrawArgs = {
  time: number;
  percentage: number;
};

export class ClockDrawer {
  private readonly ctx;
  private readonly height;
  private readonly width;
  private readonly colors;

  constructor({ ctx, height, width, colors }: ClockDrawerArgs) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.colors = colors;
  }

  setColors(colors: Colors) {
    Object.assign(this.colors, colors);
  }

  drawClock({ time, percentage }: DrawArgs) {
    const xCenter = this.width / 2;
    const yCenter = this.height / 2;
    const radius = Math.min(xCenter, yCenter);
    const innerRadius = radius / 2.5;
    const fontSize = radius / 5.5;

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.beginPath();
    this.ctx.fillStyle = this.colors.escape;
    this.ctx.arc(xCenter, yCenter, radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.fillStyle = this.colors.chase;
    this.ctx.moveTo(xCenter, yCenter);
    this.ctx.arc(xCenter, yCenter, radius, -Math.PI / 2, Math.PI * (2 * percentage - 0.5));
    this.ctx.lineTo(xCenter, yCenter);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.fillStyle = this.colors.center;
    this.ctx.arc(xCenter, yCenter, innerRadius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.fillStyle = this.colors.text;
    this.ctx.textAlign = 'center';
    this.ctx.font = `${fontSize}px "Share Tech Mono", monospace`;
    this.ctx.fillText(this.getTime(time), xCenter, yCenter + fontSize / 4);
    this.ctx.closePath();
  }

  private getTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return minutes > 0
      ? `${minutes}m ${seconds.toFixed(0).padStart(2, '0')}s`
      : `${seconds.toFixed(2).padStart(5, '0')}s`;
  }
}
