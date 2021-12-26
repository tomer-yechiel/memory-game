import { createArrayWithRandomNumber } from "./utils.js";

import { MemoryGame } from "./game/MemoryGame.js";
import { Timer } from "./components/Timer.js";

let curLevel = 12;

const boardElm = document.getElementById("board");

let game = new MemoryGame(boardElm, { level: curLevel, onEnd: showModal });
game.start();
const timer = new Timer(document.getElementById("timer"))

const elms = Array.from(document.getElementsByClassName('level-change'));
elms.forEach(elm => elm.addEventListener('click', onLevelChange));

const newGameFromModalElm = document.getElementById("new-game-btn-modal");
newGameFromModalElm.addEventListener("click", closeModalAndStartNewGame);

function showModal(){
  const modalElm = document.getElementById("modal");
  modalElm.style.display = 'block';
}

function closeModalAndStartNewGame(){
  const modalElm = document.getElementById("modal");
  modalElm.style.display = 'none';
  restartGame();
}

function onLevelChange(e) {
  curLevel = parseInt(e.target.value);
  restartGame();
}

function restartGame(){
  game.destroy();
  game = new MemoryGame(boardElm, {level: curLevel, onEnd: showModal})
  game.start();
  timer.restart();
}