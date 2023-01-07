const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const game = new Game(ctx);

const Start = document.getElementById("start-text");

Start.onclick = () => {
  const startScreen = document.getElementById("container-screen-items");
  startScreen.remove();
  canvas.style.display = "block";
  game.start();
};
