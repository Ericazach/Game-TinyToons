const states = {
  runningPlayer: 0,
  endingPlayer: 0,
};

class State {
  constructor(state) {
    this.state = state;
  }
}

class running extends State {
  constructor(player) {
    super("running");
    this.player = player;

    this.img = new Image();
    this.img.src = "/assets/images/Buster/Run bunny.png";
  }

  }

