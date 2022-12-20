class Game {
  constructor(ctx) {
    this.ctx = ctx;

		this.interval = null;
		this.bg = new Background(ctx);
	  this.player = new Player(ctx);
		this.enemyGirls =[];
		this.enemyTazs = [];
		this.carrots = [];
		this.tick = 0;
		this.tickTaz = 0;
		this.tickGirl = 0;
		this.score = 0;
		this.touch = 10000;
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
	}, 1000 / 60);


	}
	
	addCarrots() {
		this.tick--;

		if (this.tick <= 0) {
			this.tick = 200 + Math.random() * 40;
			this.carrots.push(new Carrot(this.ctx));
		}
	}

	addEnemyTaz() {
		this.tickTaz--;

		if (this.tickTaz <= 0) {
			this.tickTaz = 200 + Math.random() * 40;
			this.enemyTazs.push(new EnemyTaz(this.ctx));
		}
	}

	addEnemyGirl() {
		this.tickGirl--;

		if (this.tickGirl <= 0) {
			this.tickGirl = 200 + Math.random() * 40;
			this.enemyGirls.push(new EnemyGirl(this.ctx));
		}
	}

	draw() {
		this.bg.draw();
		this.player.draw();
		this.enemyGirls.forEach(girl => girl.draw())
		this.enemyTazs.forEach(taz => taz.draw());
		this.carrots.forEach(carrot => carrot.draw());
  }   

  move() {		
		this.bg.move();
		this.player.move();
		this.enemyGirls.forEach(girl => girl.move())
		this.enemyTazs.forEach(taz => taz.move())
		this.carrots.forEach(carrot => carrot.move());
	}

	clear() {
		this.carrots = this.carrots.filter(carrot => carrot.inCanvas());
		this.enemyGirls = this.enemyGirls.filter(girl => girl.inCanvas());
		this.enemyTazs = this.enemyTazs.filter(taz => taz.inCanvas());
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); 
	}
	
	checkCollitionsCarrot() {
		this.carrots.forEach((carrot, index) => {
			const colX = (this.player.x + this.player.w) >= carrot.x && (carrot.x + carrot.w) >= this.player.x;
			const colY = (carrot.y + carrot.h) >= this.player.y && carrot.y <= (this.player.y + this.player.h);

      if (colX && colY) {
				this.score++;
				this.carrots.splice(index, 1);
			}
    })
	}

	checkCollitionsTaz() {
		this.enemyTazs.forEach((taz) => {
			if (isCollition({
				object1: this.player,
				object2: taz
			})) {

				if (this.player.vy > 0) {
					this.player.vy = 3;
					taz.y0 = 900;
				}
 
				if (this.player.vx > 0) {
					this.player.vx = 0;
					this.touch--;
				}
			}
		})
	}

		checkCollitionsGirl() {
		this.enemyGirls.forEach((girl) => {
			if (isCollition({
				object1: this.player,
				object2: girl
			})) {

				if (this.player.vy > 0) {
					this.player.vy = 3;
					girl.y0 = 900;
				}
 
				if (this.player.vx > 0) {
					this.player.vx = 0;
					this.touch--;
				}
			}
		})
	}

	checkEndGame() {

	}

	drawCounter() {
		this.ctx.font = "35px Arial";
  	this.ctx.fillStyle = "white";
		this.ctx.fillText(`Carrots: ${this.score}`, 10, 50);
		this.ctx.fillText(`Carrots: ${this.touch}`, 10, 100);
	}

	startListeners() {
		document.onkeydown = (e) => {
			this.player.moveKeyDown(e.keyCode); 
		}

		document.onkeyup = (e) => {
			this.player.moveKeyUp(e.keyCode);
		}
	}
}