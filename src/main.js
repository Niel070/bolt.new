import { Game } from './game.js';

const canvas = document.getElementById('gameCanvas');
const game = new Game(canvas);

function gameLoop() {
  game.update();
  game.draw();
  setTimeout(() => requestAnimationFrame(gameLoop), 100);
}

gameLoop();

window.restartGame = function() {
  game.reset();
};