class Heart {
  constructor(ctx, x) {
    this.ctx = ctx;

    this.x = x;
    this.y = 100;
    this.w = 50;
    this.h = 50;

    this.img = new Image();
    this.img.src = "assets/images/extra/heart.png";
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
}
