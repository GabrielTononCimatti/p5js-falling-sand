const COLS = 80;
const ROWS = 60;
let matrix = new Array(COLS);
let gravityDown = true
let sandColor = [255, 255, 255]
let bgColor = [50, 50, 50]
function setup() {
  frameRate(20)

  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(ROWS);
  }
  for (i = 0; i < ROWS; i++)
    for (j = 0; j < COLS; j++)
      matrix[i][j] = 0

  let canvas = createCanvas(800, 600);
  canvas.parent('canvas-wrapper')

  let sandPicker = document.getElementById('sand-color')
  let sandHex = document.getElementById('sand-hex')
  let bgPicker = document.getElementById('bg-color')
  let bgHex = document.getElementById('bg-hex')
  let clearBtn = document.getElementById('clear-btn')

  sandPicker.addEventListener('input', function () {
    sandHex.value = sandPicker.value
    sandColor = hexToRgb(sandPicker.value)
  })
  sandHex.addEventListener('input', function () {
    if (/^#[0-9a-fA-F]{6}$/.test(sandHex.value)) {
      sandPicker.value = sandHex.value
      sandColor = hexToRgb(sandHex.value)
    }
  })

  bgPicker.addEventListener('input', function () {
    bgHex.value = bgPicker.value
    bgColor = hexToRgb(bgPicker.value)
  })
  bgHex.addEventListener('input', function () {
    if (/^#[0-9a-fA-F]{6}$/.test(bgHex.value)) {
      bgPicker.value = bgHex.value
      bgColor = hexToRgb(bgHex.value)
    }
  })

  clearBtn.addEventListener('click', function () {
    for (i = 0; i < ROWS; i++)
      for (j = 0; j < COLS; j++)
        matrix[i][j] = 0
  })

}

function draw() {
  for (i = 0; i < ROWS; i++)
    for (j = 0; j < COLS; j++) {
      if (matrix[i][j] == 2) {
        matrix[i][j] = 1
      }
    }
  stroke(1)
  background(bgColor[0], bgColor[1], bgColor[2]);
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
        fill(sandColor[0], sandColor[1], sandColor[2])
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
  let r = Math.floor(mouseY / 10)
  let c = Math.floor(mouseX / 10)
  if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
    matrix[r][c] = 1
  }
}
function keyPressed() {
  if (keyCode === UP_ARROW) {
    gravityDown = false
  }
  if (keyCode === DOWN_ARROW) {
    gravityDown = true
  }
}
function hexToRgb(hex) {
  let r = parseInt(hex.substring(1, 3), 16)
  let g = parseInt(hex.substring(3, 5), 16)
  let b = parseInt(hex.substring(5, 7), 16)
  return [r, g, b]
}