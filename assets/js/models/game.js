class Game {
  constructor(ctx) {
    this.ctx = ctx;

		this.interval = null;
		this.bg = new Background(ctx);
	  this.player = new Player(ctx);
		this.enemyGirl = new EnemyGirl(ctx);
		this.enemyTaz = new EnemyTaz(ctx);
		this.carrots = [];
		this.tick = 0;
		this.score = 0;
  }

	start() {
		this.startListeners();
		this.interval = setInterval(() => {
			this.clear();
			this.draw();
			this.checkCollitionsCarrot()
			this.move();
			this.addCarrots();
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

	draw() {
		this.bg.draw();
		this.player.draw();
		this.enemyGirl.draw();
		this.enemyTaz.draw();
		this.carrots.forEach(carrot => carrot.draw());
  }   

  move() {		
		this.bg.move();
		this.player.move();
		this.enemyGirl.move();
		this.enemyTaz.move();
		this.carrots.forEach(carrot => carrot.move());
	}

	clear() {
		this.carrots = this.carrots.filter(carrot => carrot.inCanvas());
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); 
	}
	
	checkCollitionsCarrot() {
		this.carrots.forEach((carrot, index) => {
      const colX = (this.player.x + this.player.w) >= carrot.x && (carrot.x + carrot.w) >= this.player.x
			const colY = (carrot.y + carrot.h) >= this.player.y && carrot.y <= (this.player.y + this.player.h);

      if (colX && colY) {
				this.score++;
				this.carrots.splice(index, 1);
			}
			console.log(this.score)
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
			console.log(e);
			this.player.moveKeyUp(e.keyCode);
		}
	}
}