const COLS = 80;
const ROWS = 60;
let matrix = new Array(COLS);
let gravityDown = true
function setup() {
  frameRate(20)

  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(ROWS);
  }
  for (i = 0; i < ROWS; i++)
    for (j = 0; j < COLS; j++)
      matrix[i][j] = 0

  createCanvas(800, 600);

}

function draw() {
  for (i = 0; i < ROWS; i++)
    for (j = 0; j < COLS; j++) {
      if (matrix[i][j] == 2) {
        matrix[i][j] = 1
      }
    }
  stroke(1)
  background(50);
  for (i = 0; i < 600; i += 10) {
    line(0, i, 800, i)
  }
  for (i = 0; i < 800; i += 10) {
    line(i, 0, i, 600)
  }
  let startI, endI, stepI
  if (gravityDown) {
    startI = ROWS - 1
    endI = -1
    stepI = -1
  } else {
    startI = 0
    endI = ROWS
    stepI = 1
  }
  for (i = startI; i !== endI; i += stepI) {
    let startJ, endJ, stepJ
    if (Math.random() > 0.5) {
      startJ = 0
      endJ = COLS
      stepJ = 1
    } else {
      startJ = COLS - 1
      endJ = -1
      stepJ = -1
    }

    for (j = startJ; j !== endJ; j += stepJ) {
      if (matrix[i][j] == 1) {
        fill(255)
        noStroke()
        square(10 * j, 10 * i, 10)
        fill(0)
        stroke(1)
        if (gravityDown) {
          if (i != ROWS - 1 && matrix[i + 1][j] == 0) {
            matrix[i][j] = 0
            matrix[i + 1][j] = 2
          }
          if (i == ROWS - 1 || matrix[i + 1][j] == 1) {
            if (j < COLS - 1 && i < ROWS - 1 && matrix[i][j + 1] == 0 && matrix[i + 1][j + 1] == 0) {
              matrix[i][j] = 0
              matrix[i + 1][j + 1] = 2
            }
            if (j > 0 && i < ROWS - 1 && matrix[i][j - 1] == 0 && matrix[i + 1][j - 1] == 0) {
              matrix[i][j] = 0
              matrix[i + 1][j - 1] = 2
            }
          }
        }
        else {
          if (i != 0 && matrix[i - 1][j] == 0) {
            matrix[i][j] = 0
            matrix[i - 1][j] = 2
          }
        }
      }
    }
  }


}
function mouseDragged() {
  matrix[Math.floor(mouseY / 10)][Math.floor(mouseX / 10)] = 1;

}
function keyPressed() {
  if (keyCode === UP_ARROW) {
    gravityDown = false
  }
  if (keyCode === DOWN_ARROW) {
    gravityDown = true
  }
}