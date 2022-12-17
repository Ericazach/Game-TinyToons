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
  }

	start() {
		this.startListeners();
		this.interval = setInterval(() => {
			this.clear();
			this.draw();
			this.checkCollitionsCarrot();
			this.checkCollitionsTaz()
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
/* 		this.enemyGirls.forEach(girl =>{
			if (!girl.inCanvas()) {
				girl.draw();
			}
		}); */
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
			const colX = (this.player.x + this.player.w) >= taz.x && (taz.x + taz.w) >= this.player.x;
			const colY = (taz.y + taz.h) >= this.player.y && taz.y <= (this.player.y + this.player.h);

			if (colX) {
				taz.y0 = 900;
			} else if (colY) {
				
			}
		})
	}

	checkEndGame() {

	}

	drawCounter() {
		this.ctx.font = "35px Arial";
  	this.ctx.fillStyle = "white";
  	this.ctx.fillText(`Carrots: ${this.score}`, 10, 50);
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