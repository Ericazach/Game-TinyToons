class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height;
    this.vx = 0;
    this.vy = 0;
    this.img = new Image();
    this.img.src = "assets/images/extra/illustration.png";
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    this.ctx.drawImage(this.img, this.x + this.w, this.y, this.w, this.h);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x <= -this.w) {
      this.x = 0;
    }
  }
}
