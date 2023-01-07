class Carrot {
  constructor(ctx) {
    this.ctx = ctx;

    this.x = 1280;
    this.y = 400;
    this.w = 50;
    this.h = 50;
    this.y0 = 350 + Math.random() * 80;
    this.vx = -2;
    this.vy = 0;
    this.ax = 0;
    this.ay = 1;

    this.img = new Image();
    this.img.src = "assets/images/extra/carrot.png";
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      0,
      0,
      this.img.width,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }

  move() {
    this.vx += this.ax;
    this.vy += this.ay;
    this.x += this.vx;
    this.y += this.vy;

    if (this.y >= this.y0) {
      this.y = this.y0;
      this.vy = 0;
    }
  }

  inCanvas() {
    return this.x + this.w >= 0 && this.x <= this.ctx.canvas.width;
  }
}
