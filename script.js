winningPossibilities = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [3, 5, 7],
  [2, 5, 8],
  [3, 6, 9],
  [4, 5, 6],
  [7, 8, 9],
];

let playedCases = 0;

let win = false;

let playerNumber = 1;

let playerOneArray = [];

let playerTwoArray = [];

const cases = document.querySelectorAll(".div");

const reset = document.querySelector("button");

let message = document.getElementById("winner");

let body = document.querySelector('body');
let toggle = document.getElementById('toggle');


toggle.onclick = function() {
  body.classList.toggle('active');
  reset.classList.toggle('active');
}


cases.forEach((brick) => {
  brick.addEventListener("click", casesClick);
});

function casesClick(e) {
  if (e.target.classList.length !== 1) {
    return;
  }
  if (playerNumber === 1) {
    e.target.classList.add("cross");
    playerOneArray.push(parseInt(e.target.id));
    checkWin(playerOneArray);
    playerNumber = 2;
  } else {
    e.target.classList.add("circle");
    playerTwoArray.push(parseInt(e.target.id));
    checkWin(playerTwoArray);
    playerNumber = 1;
  }
}

reset.addEventListener("click", () => {
  cases.forEach((e) => {
    e.style.backgroundColor = "";
    e.classList.remove("circle");
    e.classList.remove("cross");
  });
  playerOneArray = [];
  playerTwoArray = [];
  message.textContent = "";
  playerNumber = 1;
  playedCases = 0;
  win = false;
  cases.forEach((brick) => {
    brick.addEventListener("click", casesClick);
  });
});

function freeze() {
  cases.forEach((brick) => {
    brick.removeEventListener("click", casesClick);
  });
}

function checkWin(playerArray) {
  winningPossibilities.forEach((possibilities) => {
    if (
      possibilities.every((element) => {
        return playerArray.includes(element);
      })
    ) {
      win = true;
    }
  });

  playedCases++;
  if (win === false && playedCases >= 9) {
    freeze();
    message.textContent = "Egalité";
  }

  if (win) {
    message.textContent = `Le joueur ${playerNumber} a gagné`;
    freeze();
  }
}
