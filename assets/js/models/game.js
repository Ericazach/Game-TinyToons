class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.interval = null;
    this.bg = new Background(ctx);
    this.player = new Player(ctx);
    this.enemyGirls = [];
    this.enemyTazs = [];
    this.carrots = [];
    this.tick = 0;
    this.tickTaz = 50 * 5;
    this.tickGirl = 0;
    this.counter = 0;
    this.score = 0;
    this.touch = 10000;

    this.camera = {
      position: {
        x: 0,
        y: 0,
      },
    };
  }

  start() {
    this.startListeners();
    this.interval = setInterval(() => {
      this.clear();
      this.draw();
      this.checkCollitionsCarrot();
      this.checkCollitionsTaz();
      this.checkCollitionsGirl();
      this.move();
      this.addCarrots();
      this.addEnemyTaz();
      this.addEnemyGirl();
      this.drawCounter();
      this.counterIncreaser();
      this.endBg();
      this.checkEndGame();
    }, 1000 / 60);
  }

  addCarrots() {
    this.tick--;
    if (this.bg.vx <= -1) {
      if (this.tick <= 0) {
        this.tick = 200 + Math.random() * 80;
        this.carrots.push(new Carrot(this.ctx));
      }
    }
  }

  addEnemyTaz() {
    this.tickTaz++;

    if (this.tickTaz % 500 === 25) {
      this.enemyTazs.push(new EnemyTaz(this.ctx));
    }
  }

  counterIncreaser() {
    let widthBg = this.bg.x + this.bg.w;
    if (widthBg <= 5) {
      this.counter++;
    }
  }

  addEnemyGirl() {
    this.tickGirl++;

    if (this.tickGirl % 500 === 25) {
      this.enemyGirls.push(new EnemyGirl(this.ctx));
    }
  }

  shouldMoveCamera() {
    const leftSidePlayer = this.player.x + this.player.w;

    if (leftSidePlayer >= this.ctx.canvas.width / 2) {
      this.bg.vx = -5;
      this.player.vx = 0;
    } else {
      this.bg.vx = 0;
    }
  }

  draw() {
    this.bg.draw();
    this.player.draw();
    this.enemyGirls.forEach((girl) => girl.draw());
    this.enemyTazs.forEach((taz) => taz.draw());
    this.carrots.forEach((carrot) => {
      carrot.draw();
      carrot.vx = this.bg.vx;
    });
  }

  move() {
    this.bg.move();
    this.player.move();
    this.enemyGirls.forEach((girl) => girl.move());
    this.enemyTazs.forEach((taz) => taz.move());
    this.carrots.forEach((carrot) => carrot.move());
  }

  clear() {
    this.carrots = this.carrots.filter((carrot) => carrot.inCanvas());
    this.enemyGirls = this.enemyGirls.filter((girl) => girl.inCanvas());
    this.enemyTazs = this.enemyTazs.filter((taz) => taz.inCanvas());
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  checkCollitionsCarrot() {
    this.carrots.forEach((carrot, index) => {
      const colX =
        this.player.x + this.player.w >= carrot.x &&
        carrot.x + carrot.w >= this.player.x;
      const colY =
        carrot.y + carrot.h >= this.player.y &&
        carrot.y <= this.player.y + this.player.h;

      if (colX && colY) {
        this.score++;
        this.carrots.splice(index, 1);
      }
    });
  }

  checkCollitionsTaz() {
    this.enemyTazs.forEach((taz) => {
      if (
        isCollition({
          object1: this.player,
          object2: taz,
        })
      ) {
        if (this.player.vy > 0) {
          this.player.vy = 3;
          taz.y0 = 900;
        }

        if (this.player.vx >= 0) {
          this.touch--;
        }
      }
    });
  }

  checkCollitionsGirl() {
    this.enemyGirls.forEach((girl) => {
      if (
        isCollition({
          object1: this.player,
          object2: girl,
        })
      ) {
        if (this.player.vy > 0) {
          this.player.vy = 3;
          girl.y0 = 900;
        }

        if (this.player.vx >= 0) {
          this.touch--;
        }
      }
    });
  }

  endBg() {
    if (this.counter >= 2) {
      const rightPlayer = this.player.x + this.player.w;
      this.bg.vx = 0;
      if (rightPlayer >= this.ctx.canvas.width / 2) {
        this.preEndState();
      }
      this.enemyGirls.forEach((girl) => {
        girl.vx = 0;
        girl.x = 1400;
      });
      this.enemyTazs.forEach((taz) => {
        taz.vx = 0;
        taz.x = 1400;
      });
    }
    console.log(this.counter);
  }

  preEndState() {
    this.player.vx = 2;
    this.player.img.frames = 6;
    this.player.img.src = "/assets/images/Buster/walkFinal.png";
    this.player.w = 135;
    this.player.h = 155;
    this.player.y0 = 470;
    this.player.buffer = 9;
  }

  checkEndGame() {
    if (this.player.x > this.ctx.canvas.width) {
      clearInterval(this.interval);
    }
  }

  drawCounter() {
    this.ctx.font = "35px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`Carrots: ${this.score}`, 10, 50);
    this.ctx.fillText(`Damage: ${this.touch}`, 10, 100);
  }

  changeState(state) {
    if (state === RIGHT) {
      this.player.img.frames = 6;
      this.player.img.src = "/assets/images/Buster/NormaRun.png";
      this.player.w = 135;
      this.player.h = 155;
      this.player.y0 = 470;
      this.player.buffer = 9;
    } else if (state === LEFT) {
      this.player.img.frames = 6;
      this.player.img.src = "/assets/images/Buster/NormaRunLeft.png";
      this.player.w = 135;
      this.player.h = 155;
      this.player.y0 = 470;
      this.player.buffer = 9;
    } else if (state === UP && state !== LEFT && this.player.vx < 0) {
      this.player.img.frames = 1;
      this.player.img.src = "/assets/images/Buster/jumpUp.png";
      this.player.w = 135;
      this.player.h = 155;
      this.player.y0 = 470;
      this.player.buffer = 9;
    } else if (state === UP && state !== RIGHT && this.player.vx >= 0) {
      this.player.img.frames = 1;
      this.player.img.src = "/assets/images/Buster/jumpUpRight.png";
      this.player.w = 135;
      this.player.h = 155;
      this.player.y0 = 470;
      this.player.buffer = 9;
    }
  }

  startListeners() {
    document.onkeydown = (e) => {
      this.moveKeyDown(e.keyCode);
    };

    document.onkeyup = (e) => {
      this.moveKeyUp(e.keyCode);
    };
  }

  moveKeyDown(key) {
    if (key === RIGHT) {
      this.player.vx = 5;
      this.changeState(RIGHT);
      this.shouldMoveCamera();
    } else if (key === LEFT) {
      this.player.vx = -5;
      this.changeState(LEFT);
    } else if (key === UP) {
      this.changeState(UP);
      this.player.jump();
    }
  }

  moveKeyUp(key) {
    if (key === RIGHT || key === LEFT || key === UP) {
      this.player.img.src = "/assets/images/Buster/FinalStandin.png";
      this.player.img.frames = 7;
      this.player.buffer = 18;
      this.player.vx = 0;
      this.bg.vx = 0;
    }
  }
}
