const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const game = new Game(ctx);

const btnStart = document.getElementById("start-text");
btnStart.onclick = () => {
  const startScreen = document.getElementById("startScreen");
  startScreen.remove();
  canvas.style.display = "block";
  game.start();
};
