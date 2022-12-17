class Game {
  constructor(ctx) {
    this.ctx = ctx;

		this.interval = null;
		this.bg = new Background(ctx);
	  this.player = new Player(ctx);
		this.enemyGirl = new EnemyGirl(ctx);
		this.enemyTaz = new EnemyTaz(ctx);
  }

	start() {
		this.startListeners();
		this.interval = setInterval(() => {
		this.clear();
		this.draw();
		this.move();
    }, 1000 / 60);
  }

	draw() {
		this.bg.draw();
		this.player.draw();
		this.enemyGirl.draw();
		this.enemyTaz.draw();
  }   

  move() {		
		this.bg.move();
		this.player.move();
		this.enemyGirl.move();
		this.enemyTaz.move();
  }

  clear() {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); 
	}
	
	checkCollitions() {

	}

	checkEndGame() {

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