const grid = document.querySelector(".grid");
const flagsLeft = document.querySelector("#flags-left");
const resultWin = document.querySelector(".result__win");
const resultLose = document.querySelector(".result__lose");
const again = document.querySelectorAll(".again");

const begginer = document.querySelector(".beginner");
const medium = document.querySelector(".medium");
const expert = document.querySelector(".expert");

begginer.addEventListener("click", () => {
  init();
  width = 9;
  height = 9;
  bombAmount = 10;
  createBoard(width, height, bombAmount);
});

medium.addEventListener("click", () => {
  init();
  width = 16;
  height = 16;
  bombAmount = 40;
  createBoard(width, height, bombAmount);
});
expert.addEventListener("click", () => {
  init();
  width = 30;
  height = 16;
  bombAmount = 99;
  createBoard(width, height, bombAmount);
});

let squares = [];
let width = 9;
let height = 9;
let bombAmount = 10;
let flags = 0;

let isGameOver = false;

let numberColors = [
  "blue",
  "green",
  "red",
  "purple",
  "maroon",
  "turquoise",
  "black",
  "gray",
];

function createBoard(w, h, b) {
  flagsLeft.innerHTML = b;
  grid.style.width = w * 30 + "px";
  grid.style.height = h * 30 + "px";

  const bombsArray = Array(b).fill("bomb");
  const emptyArray = Array(w * h - b).fill("valid");
  const gameArray = emptyArray.concat(bombsArray);
  const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

  for (let j = 0; j < w * h; j++) {
    const square = document.createElement("div");
    square.setAttribute("id", j);
    square.classList.add(shuffledArray[j]);
    grid.appendChild(square);
    squares.push(square);

    // normal click
    square.addEventListener("click", () => {
      click(square);
    });

    // left click
    square.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      addFlag(square, b);
    });
  }

  // add numbers
  for (let i = 0; i < squares.length; i++) {
    let total = 0;
    const isLeftEdge = i % w == 0;
    const isRightEdge = i % w == w - 1;

    if (squares[i].classList.contains("valid")) {
      // left check
      if (!isLeftEdge && squares[i - 1].classList.contains("bomb")) total++;

      // right check
      if (!isRightEdge && squares[i + 1].classList.contains("bomb")) total++;

      // top check
      if (i > w - 1 && squares[i - w].classList.contains("bomb")) total++;

      // bottom check
      if (i < w * h - w - 1 && squares[i + w].classList.contains("bomb"))
        total++;

      // top left
      if (i > w && !isLeftEdge && squares[i - w - 1].classList.contains("bomb"))
        total++;

      // top right
      if (
        i > w - 1 &&
        !isRightEdge &&
        squares[i - w + 1].classList.contains("bomb")
      )
        total++;

      // bottom left
      if (
        i < w * h - w &&
        !isLeftEdge &&
        squares[i + w - 1].classList.contains("bomb")
      )
        total++;

      // bottom right
      if (
        i < w * h - w &&
        !isRightEdge &&
        squares[i + w + 1].classList.contains("bomb")
      )
        total++;
    }
    squares[i].setAttribute("data", total);
  }
}

createBoard(width, height, bombAmount);

function addFlag(square, bombs) {
  if (isGameOver) return;
  if (!square.classList.contains("checked")) {
    if (!square.classList.contains("flag")) {
      square.classList.add("flag");
      square.innerHTML = " 🚩";
      flags++;
      flagsLeft.innerHTML = bombs - flags;
      checkForWin();
    } else {
      square.classList.remove("flag");
      square.innerHTML = "";
      flags--;
      flagsLeft.innerHTML = bombs - flags;
    }
  }
  console.log(width);
}

function click(square) {
  let currentId = +square.id;
  if (isGameOver) return;
  if (square.classList.contains("checked") || square.classList.contains("flag"))
    return;
  if (square.classList.contains("bomb")) {
    gameOver();
  } else {
    let total = square.getAttribute("data");
    if (total != 0) {
      square.classList.add("checked");
      square.style.color = numberColors[total - 1];
      square.innerHTML = total;
      return;
    }
    checkSquare(currentId);
  }
  square.classList.add("checked");
}

function checkSquare(currentId) {
  const isLeftEdge = +currentId % width === 0;
  const isRightEdge = +currentId % width === width - 1;
  setTimeout(() => {
    // left right
    if (currentId > 0 && !isLeftEdge) {
      const newId = squares[currentId - 1].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId < width * height - 1 && !isRightEdge) {
      const newId = squares[currentId + 1].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    // up down
    if (currentId > width) {
      const newId = squares[currentId - width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId < width * height - width - 1) {
      const newId = squares[+currentId + width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    // others
    if (currentId > width - 1 && !isRightEdge) {
      const newId = squares[+currentId + 1 - width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId > width + 1 && !isLeftEdge) {
      const newId = squares[currentId - 1 - width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId < width * height - width && !isLeftEdge) {
      const newId = squares[currentId - 1 + width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId < width * height - width - 2 && !isRightEdge) {
      const newId = squares[currentId + 1 + width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
  }, 1);
}

function gameOver() {
  resultLose.classList.add("active");
  isGameOver = true;
  squares.forEach((square) => {
    if (square.classList.contains("bomb")) {
      square.innerHTML = "💣";
      square.classList.remove("bomb");
      square.classList.add("checked");
    }
  });
}

function checkForWin() {
  let matches = 0;
  for (let i = 0; i < squares.length; i++) {
    if (
      squares[i].classList.contains("flag") &&
      squares[i].classList.contains("bomb")
    ) {
      matches++;
    }
    if (matches === bombAmount) {
      isGameOver = true;
      resultWin.classList.add("active");
    }
  }
}

again.forEach((btn) =>
  btn.addEventListener("click", () => {
    init();
    createBoard(width, height, bombAmount);
  })
);
function init() {
  resultWin.classList.remove("active");
  resultLose.classList.remove("active");
  grid.innerHTML = "";
  isGameOver = false;
  squares = [];
  flags = 0;
}
