class EnemyTaz {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 500;
    this.y = 470;
    this.y0 = 520;
    this.w = 130;
    this.h = 130;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
  	this.ay = 0.4;

  	this.img = new Image();
  	this.img.src = '/assets/images/Enemy/taz-run.png'
  	this.img.frames = 9;
  	this.img.frameIndex = 0;
  	this.tick = 0;
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

  this.animate();
}

animate() {
	this.vx += this.ax;
	this.vy += this.ay;
	this.x += this.vx;
	this.y += this.vy;
  
  if (this.y >= this.y0) {
    this.y = this.y0
    this.vy = 0
  }
}

move() {
	this.tick++;
	if (this.tick > 10) {
		this.tick = 0;
		this.img.frameIndex++;
	}

	if (this.img.frameIndex > this.img.frames - 1) {
		this.img.frameIndex = 0;
  }
}


}