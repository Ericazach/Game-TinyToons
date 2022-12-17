class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 50;
    this.y = 470;
    this.y0 = 500;
    this.w = 130;
    this.h = 130;
    this.vx = 0;
	  this.vy = 0;
	  this.ax = 0;
	  this.ay = 0.3;

    this.img = new Image();
    this.img.src = '/assets/images/Buster/Run bunny.png'
    this.img.frames = 6;
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
		this.tick++;
		if (this.tick > 7) {
			this.tick = 0;
			this.img.frameIndex++;
		}

		if (this.img.frameIndex > this.img.frames - 1) {
			this.img.frameIndex = 0;
    }
	}

	move() {
		this.vx += this.ax;
		this.vy += this.ay;
		this.x += this.vx;
		this.y += this.vy;

		if (this.y >= this.y0) {
      this.y = this.y0
      this.vy = 0
    }

    if (this.x <= 0) {
      this.vx = 0
      this.x = 0
    }

    if (this.x + this.w >= this.ctx.canvas.width) {
			this.vx = 0;
			this.x = this.ctx.canvas.width - this.w;
    }
	}
	
	jump() {
		if (this.y === this.y0) {
			this.vy = -10;
		}
	}

	moveKeyDown(key) {
		if (key === RIGHT) {
			this.vx = 5;
		} else if (key === LEFT) {
			this.vx = -5;
		} else if (key === UP) {
			this.jump();
		}
	}

	moveKeyUp(key) {
		if (key === RIGHT || key === LEFT) {
			this.vx = 0;
    }
	}
}