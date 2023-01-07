class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.interval = null;
    this.bg = new Background(ctx);
    this.player = new Player(ctx);
    this.scoreCarrot = [new Carrot(this.ctx)];
    this.hearts = [
      new Heart(this.ctx, 50),
      new Heart(this.ctx, 100),
      new Heart(this.ctx, 150),
    ];
    this.enemyGirls = [];
    this.enemyTazs = [];
    this.carrots = [];
    this.overText = new OverText(ctx);
    this.tryText = new TryAgain(ctx);
    this.tick = 0;
    this.tickTaz = 50 * 5;
    this.tickGirl = 0;
    this.tickHeart = 0;
    this.bgCounter = 0;
    this.score = 0;
    this.loseLiveDelayCounter = 0;
    this.loseLive = false;
    this.counterLimit = 4;
    this.deadStatus = false;
    this.audioIntro = new Audio("assets/Music/Intro.mp3");
    this.audioDeath = new Audio("assets/Music/Death (Lost Life).mp3");
    this.audioJump = new Audio("assets/Music/jump.wav");
    this.audioStageClear = new Audio("assets/Music/Stage Clear.mp3");
    this.audioCoin = new Audio("assets/Music/coin.wav");
  }

  start() {
    this.startListeners();
    this.audioIntro.play();
    this.audioIntro.volume = 0.7;
    this.interval = setInterval(() => {
      this.clear();
      this.draw();
      this.move();
      if (this.bgCounter < this.counterLimit) {
        this.checkCollitionsCarrot();
        this.checkCollitionsTaz();
        this.checkCollitionsGirl();
        this.addCarrots();
        this.addEnemyTaz();
        this.addEnemyGirl();
      }
      if (this.loseLive) {
        this.loseLiveDelayCounter++;
        if (this.loseLiveDelayCounter > 50) {
          this.normalState();
          this.loseLive = false;
          this.loseLiveDelayCounter = 0;
        }
      }
      this.endBg();
      this.drawCounter();
      this.counterIncreaser();
      this.checkEndGame();
    }, 1000 / 60);
  }

  addCarrots() {
    this.tick++;
    if (this.bg.vx <= -1) {
      if (this.tick % 100 === 25) {
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
      this.bgCounter++;
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
    this.hearts.forEach((heart) => heart.draw());
    this.enemyTazs.forEach((taz) => taz.draw());
    this.carrots.forEach((carrot) => {
      carrot.draw();
      carrot.vx = this.bg.vx;
    });
    this.scoreCarrot.forEach((carrot) => {
      carrot.draw();
      carrot.x = 60;
      carrot.y = 30;
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
        this.audioCoin.play();
        this.audioCoin.volume = 0.2;
        this.score++;
        this.carrots.splice(index, 1);
      }
    });
  }

  checkCollitionsTaz() {
    this.enemyTazs.forEach((taz) => {
      if (isCollition(this.player, taz)) {
        if (this.player.vy > 0) {
          this.audioJump.play();
          this.audioJump.volume = 0.2;
          this.player.vy = -7;
          taz.y0 = 900;
        } else if (!this.loseLive) {
          this.loseLive = true;
          this.hearts.pop();
          this.hitState();
        }
      }
    });
  }

  checkCollitionsGirl() {
    this.enemyGirls.forEach((girl) => {
      if (isCollition(this.player, girl)) {
        if (this.player.vy > 0) {
          this.audioJump.play();
          this.audioJump.volume = 0.2;
          this.player.vy = -7;
          girl.y0 = 900;
        } else if (!this.loseLive) {
          this.loseLive = true;
          this.hearts.pop();
          this.hitState();
        }
      }
    });
  }

  endBg() {
    if (this.bgCounter >= this.counterLimit) {
      const rightPlayer = this.player.x + this.player.w;
      this.bg.vx = 0;
      if (rightPlayer >= this.ctx.canvas.width / 2) {
        this.audioIntro.pause();
        this.audioStageClear.play();
        this.preEndState();
      }
    }
  }

  hitState() {
    this.audioDeath.play();
    this.audioDeath.volume = 0.7;
    this.bg.vx = 0;
    this.player.vx = 0;
    this.player.ax = 0;
    this.player.y0 = 470;
    this.player.img.frames = 2;
    this.player.img.src = "assets/images/Buster/hitFinal.png";
    this.player.w = 135;
    this.player.buffer = 9;
  }

  preEndState() {
    this.player.vx = 3;
    this.player.y0 = 470;
    this.player.img.frames = 6;
    this.player.img.src = "assets/images/Buster/walkFinal.png";
    this.player.buffer = 9;
  }

  KOState() {
    this.bg.vx = 0;
    this.player.vx = 0;
    this.player.ax = 0;
    this.player.y0 = 470;
    this.player.img.frames = 4;
    this.player.img.src = "assets/images/Buster/KOfinal.png";
    this.player.w = 110;
    this.player.buffer = 9;
  }

  normalState() {
    this.player.vx = 0;
    this.player.ax = 0;
    this.player.img.src = "assets/images/Buster/FinalStanding.png";
    this.player.img.frames = 7;
    this.player.buffer = 15;
  }

  checkEndGame() {
    if (this.player.x > this.ctx.canvas.width || this.hearts.length <= 0) {
      this.KOState();
      this.deadStatus = true;
      this.audioIntro.pause();
      if (this.loseLiveDelayCounter >= 50) {
        clearInterval(this.interval);
        this.overText.draw();
        this.tryText.draw();
      }
    }
    if (this.audioStageClear.currentTime >= 5.56) {
      this.audioStageClear.pause();
      clearInterval(this.interval);
    }
  }

  drawCounter() {
    this.ctx.font = "35px Arial";
    this.ctx.fillStyle = "rgb(217, 217, 217)";
    this.ctx.fillText(`x ${this.score}`, 130, 70);
  }

  changeState(state) {
    if (state === RIGHT) {
      this.player.img.frames = 6;
      this.player.img.src = "assets/images/Buster/NormaRun.png";
      this.player.buffer = 9;
    } else if (state === LEFT) {
      this.player.img.frames = 6;
      this.player.img.src = "assets/images/Buster/NormaRunLeft.png";
      this.player.buffer = 9;
    } else if (state === UP && state !== LEFT && this.player.vx < 0) {
      this.player.img.frames = 1;
      this.player.img.src = "assets/images/Buster/jumpUp.png";
      this.player.buffer = 9;
    } else if (state === UP && state !== RIGHT && this.player.vx >= 0) {
      this.player.img.frames = 1;
      this.player.img.src = "assets/images/Buster/jumpUpRight.png";
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
    if (
      this.bgCounter < this.counterLimit &&
      !this.deadStatus &&
      !this.loseLive
    ) {
      if (key === RIGHT) {
        this.player.vx = 5;
        this.changeState(RIGHT);
        this.shouldMoveCamera();
      } else if (key === LEFT) {
        this.player.vx = -5;
        this.changeState(LEFT);
      } else if (key === UP) {
        this.changeState(UP);
        this.audioJump.play();
        this.audioJump.volume = 0.2;
        this.player.jump();
      }
    }
  }

  moveKeyUp(key) {
    if (
      this.bgCounter < this.counterLimit &&
      !this.deadStatus &&
      !this.loseLive
    ) {
      if (key === RIGHT || key === LEFT || key === UP) {
        this.normalState();
        this.bg.vx = 0;
      }
    }
  }
}
