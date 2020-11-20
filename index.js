let arr = [];
let gridrow = 9;
let gridcol = 9;
let totalcol = 81;
let score = 0;
let clickcount = 0;
let gameOver = false;
let nearby = [];
let noOfRandomBombs = 10;
document.getElementById("score").innerHTML = "Score : " + score;

const generateRandomArray = () => {
  for (let i = 0; i < noOfRandomBombs; i++) {
    while (arr[i] === undefined) {
      let random = parseInt(Math.random() * 81);
      if (!arr.includes(random)) {
        arr[i] = random;
      }
    }
  }
};
generateRandomArray();

/* ******bombcalculate start****/
const calculateBomb = (id) => {
  let noOfBombs = 0;

  let top = [1, 2, 3, 4, 5, 6, 7];
  let bottom = [72, 73, 74, 75, 76, 77, 78, 78];
  if (id % gridrow === 0) {
    nearby = [id - 9, id - 8, +id + 1, +id + 9, +id + 10];
  } else if (id % gridrow === 8) {
    nearby = [id - 9, id - 10, id - 1, +id + 9, +id + 8];
  } else if (top.includes(id)) {
    nearby = [id - 1, +id + 1, +id + 8, +id + 9, +id + 10];
  } else if (bottom.includes(id)) {
    nearby = [id - 1, id - 8, id - 9, id - 10, +id + 1];
  } else {
    nearby = [
      id - 1,
      id - 8,
      id - 9,
      id - 10,
      +id + 1,
      +id + 8,
      +id + 9,
      +id + 10
    ];
  }
  let length = nearby.length;
  for (let i = 0; i < length; i++) {
    if (arr.includes(nearby[i])) {
      noOfBombs++;
    }
  }

  return noOfBombs;
};
/* ******bombcalculate end****/

/**********handle clcik start */
const handleClick = (input) => {
  let id = parseInt(input.id);
  if (input.classList.contains("green") || gameOver) {
    return;
  }
  if (clickcount === totalcol - noOfRandomBombs) {
    swal("Game Over!", " Congratulations You Win", "success").then(() => {
      window.location.href = "index.html";
    });
  }
  if (arr.includes(id)) {
    input.classList.add("red");
    gameOver = true;
    for (let i = 0; i < noOfRandomBombs; i++) {
      document.getElementById(arr[i]).classList.add("red");
      document.getElementById(arr[i]).classList.remove("rightclick");
    }
    document.getElementById("restart").classList.remove("hide");
  } else {
    score += 10;
    clickcount++;
    let noOfBombs = calculateBomb(input.id);
    if (noOfBombs > 0) {
      input.innerHTML = noOfBombs;
    }

    document.getElementById("score").innerHTML = "Score : " + score;
    input.classList.add("green");
  }
};
/***********handle click end***********/

/***right click mouse */
const righClickMouse = (input) => {
  if (gameOver) {
    return;
  }
  if (input.classList.contains("rightclick")) {
    input.classList.remove("rightclick");
  } else {
    input.classList.add("rightclick");
  }
};

/*******grid ********/
let k = 0;
for (let i = 0; i < gridrow; i++) {
  let rows = document.createElement("div");
  rows.classList.add("rows");
  for (let j = 0; j < gridcol; j++) {
    let col = document.createElement("div");
    col.classList.add("col");
    col.setAttribute("id", k);
    col.addEventListener("click", () => handleClick(col));
    col.addEventListener("contextmenu", () => righClickMouse(col));
    k++;
    rows.appendChild(col);
  }
  document.getElementById("grid").appendChild(rows);
}
const startGame = () => {
  document.getElementById("grid").classList.remove("hide");
  document.getElementById("start").classList.add("hide");
  document.getElementById("score").classList.remove("hide");
};
const restart = () => {
  window.location.href = "index.html";
};
document.getElementById("start").addEventListener("click", startGame);
document.getElementById("restart").addEventListener("click", restart);

document.getElementById("grid").addEventListener(
  "contextmenu",
  function (e) {
    e.preventDefault();
  },
  false
);
