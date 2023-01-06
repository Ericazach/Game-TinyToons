class OverText {
  constructor(ctx) {
    this.ctx = ctx;

    this.x = 350;
    this.y = 100;
    this.w = 650;
    this.h = 250;

    this.img = new Image();
    this.img.src = "/assets/images/extra/OverFinal.png";
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

class TryAgain {
  constructor(ctx) {
    this.ctx = ctx;

    this.x = 550;
    this.y = 310;
    this.w = 250;
    this.h = 60;

    this.img = new Image();
    this.img.src = "/assets/images/extra/try Again.png";
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
