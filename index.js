let arr = [];
let gridrow = 5;
let gridcol = 6;
let totalcol = gridcol * gridrow;
let score = 0;
let clickcount = 0;
let gameOver = false;
let nearby = [];
let noOfRandomBombs = 7;
document.getElementById("score").innerHTML = "Score : " + score;

const generateRandomArray = () => {
  for (let i = 0; i < noOfRandomBombs; i++) {
    while (arr[i] === undefined) {
      let random = parseInt(Math.random() * totalcol);
      if (!arr.includes(random)) {
        arr[i] = random;
      }
    }
  }
  console.log(arr);
};
generateRandomArray();

/* ******bombcalculate start****/
const calculateBomb = (id) => {
  let noOfBombs = 0;

  let top = [];
  for (let i = 1; i < gridcol - 2; i++) {
    top.push(i);
  }
  let bottom = [];
  for (let i = totalcol - gridcol; i < totalcol - 2; i++) {
    bottom.push(i);
  }
  if (id % gridcol === 0) {
    nearby = [
      id - gridcol,
      id - gridcol + 1,
      +id + 1,
      +id + gridcol,
      +id + gridcol + 1
    ];
  } else if (id % gridcol === 8) {
    nearby = [
      id - gridcol,
      id - gridcol - 1,
      id - 1,
      +id + gridcol,
      +id + gridcol - 1
    ];
  } else if (top.includes(id)) {
    nearby = [
      id - 1,
      +id + 1,
      +id + gridcol - 1,
      +id + gridcol,
      +id + gridcol + 1
    ];
  } else if (bottom.includes(id)) {
    nearby = [
      id - 1,
      id - gridcol + 1,
      id - gridcol,
      id - gridcol - 1,
      +id + 1
    ];
  } else {
    nearby = [
      id - 1,
      id - gridcol + 1,
      id - gridcol,
      id - gridcol - 1,
      +id + 1,
      +id + gridcol - 1,
      +id + gridcol,
      +id + gridcol + 1
    ];
  }
  let length = nearby.length;
  for (let i = 0; i < length; i++) {
    if (arr.includes(nearby[i])) {
      noOfBombs++;
    }
  }
  console.log(nearby);
  console.log(noOfBombs);
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
