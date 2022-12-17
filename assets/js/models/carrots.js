class Carrots {
  constructor(ctx) {
    this.ctx = ctx;

    this.x = 1000;
    this.y = 300;
    this.w = 50;
    this.h = 50;
    this.y0 = 400;
    this.vx = -2;
    this.vy = 0;
    this.ax = 0;
    this.ay = 1;

    this.img = new Image();
    this.img.src = '/assets/images/extra/carrot.png'
  }

  draw() {
    this.ctx.drawImage(
		this.img,
		this.img.frameIndex * this.img.width / this.img.frames,
		0,
		this.img.width / this.img.frames,
		this.img.height,
		this.x,
		this.y,
		this.w,
		this.h,
		)
  }
}