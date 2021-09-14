let playButton = document.getElementById("play");
let restartButton = document.getElementById("restart");
let exitButton = document.getElementById("exit");
let board = document.getElementById("board");
let player = document.getElementById("player");
let pNum = document.getElementById("p-num");
let boxes = document.getElementsByClassName("box");
let closeButton = document.getElementById("close");
let popup = document.getElementById("popup");
let popupText = document.getElementById("popup-text");
let clicks = 0;
let matrix = [];
const winSound = new Audio("./mixkit-video-game-win-2016.wav");
const cross = `<svg class="svg" viewBox="0 0 130 130"  fill="none">
        <g id="cross" >
        <path id="xp1" d="M18 18L112.045 112.045" stroke="white" stroke-width="18" stroke-linecap="round"/>
        <path id="xp2" d="M112.045 18L18 112.045" stroke="white" stroke-width="18" stroke-linecap="round"/>
        </g>
</svg>`;
const circle = `<svg class="svg" viewBox="0 0 130 130">
  <circle id="cp" cx="65" cy="65" r="49.5" stroke-linecap="round" stroke="white" stroke-width="15" fill="none" /> 
</svg>`;

playButton.addEventListener("click", () => {
  restartButton.style.display = "unset";
  exitButton.style.display = "unset";
  playButton.style.display = "none";
  board.style.display = "grid";
  player.style.display = "flex";
  pNum.textContent = "P1";
});

exitButton.addEventListener("click", () => {
  location.reload();
});

restartButton.addEventListener("click", () => {
  clicks = 0;
  pNum.textContent = "P1";
  popupText.textContent = undefined;
  popup.style.display = "none";
  board.style.pointerEvents = "unset";
  matrix = [];
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = null;
    boxes[i].style.pointerEvents = "unset";
  }
});

closeButton.addEventListener("click", () => {
  popup.style.display = "none";
});

for (let i = 0; i < 9; i++) {
  boxes[i].addEventListener("click", () => {
    clicks += 1;
    if (clicks % 2 === 1) {
      setTimeout(() => {pNum.textContent = "P2";}, 600);
      document.getElementById(`box${i + 1}`).innerHTML = cross;
      boxes[i].style.pointerEvents = "none";
      matrix[i] = 1;
      checkWin(1);
    } else {
      setTimeout(()=>{pNum.textContent = "P1";},600);
      document.getElementById(`box${i + 1}`).innerHTML = circle;
      boxes[i].style.pointerEvents = "none";
      matrix[i] = 2;
      checkWin(2);
    }
  });
}

function endGame(winner) {
  setTimeout(()=>{pNum.textContent = "";},600);
  winSound.play();
  if (winner === 0) {
    popupText.textContent = `It's a draw!`;
  } else {
    popupText.textContent = `PLAYER ${winner} is the winner!`;
  }
  popup.style.display = "grid";
  board.style.pointerEvents = "none";
}
function checkWin(x) {
  if (
    (matrix[0] === x && matrix[3] === x && matrix[6] === x) ||
    (matrix[1] === x && matrix[4] === x && matrix[7] === x) ||
    (matrix[2] === x && matrix[5] === x && matrix[8] === x) ||
    (matrix[0] === x && matrix[1] === x && matrix[2] === x) ||
    (matrix[3] === x && matrix[4] === x && matrix[5] === x) ||
    (matrix[6] === x && matrix[7] === x && matrix[8] === x) ||
    (matrix[0] === x && matrix[4] === x && matrix[8] === x) ||
    (matrix[2] === x && matrix[4] === x && matrix[6] === x)) {
    if (clicks % 2 === 0) {
      endGame(2);
    } else {
      endGame(1);
    }
  } else if (clicks === 9) {
    endGame(0);
  }
}
