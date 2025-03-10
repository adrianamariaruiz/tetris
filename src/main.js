import './style.css'

//initialice canvas
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const BLOCK_SIZE = 20
const BOARD_WIDTH = 14
const BOARD_HEIGHT = 30

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

context.scale(BLOCK_SIZE, BLOCK_SIZE)

//board
const board = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,1,1,0,0,0,1,1,1],
]

//gamer piece
const piece = {
  position: {x: 5, y:5},
  shape: [
    [1,1],
    [1,1]
  ]
}

// Random piece
const PIECES = [
  [
    [1,1],
    [1,1]
  ],
  [
    [1,1,1,1]
  ],
  [
    [0,1,0],
    [1,1,1]
  ],
  [
    [1,1,0],
    [0,1,1]
  ],
  [
    [0,1,1],
    [1,1,0]
  ],
  [
    [1,0],
    [1,0],
    [1,1]
  ]
]

//game loop
let lastTime = 0
let dropCounter = 0
let dropInterval = 1000

function update (time = 0){
  const deltaTime = time - lastTime
  lastTime = time
  
  dropCounter += deltaTime

  if(dropCounter > dropInterval){
    piece.position.y++
    if(checkCollision()){
      piece.position.y--
      solidifyPiece()
      removeRows()
    }
    dropCounter = 0
  }

  draw()
  window.requestAnimationFrame(update)
}

function draw() {
  context.fillStyle = '#0129'
  context.fillRect(0, 0, canvas.width, canvas.height)

  board.forEach((row, y)=> {
    row.forEach((value, x)=>{
      if(value === 1){
        context.fillStyle = 'yellow'
        context.fillRect(x, y, 1, 1)
      }
    })
  })

  piece.shape.forEach((row, y)=>{
    row.forEach((value, x)=>{
      if(value === 1){
        context.fillStyle = 'red'
        context.fillRect(x+piece.position.x, y+piece.position.y, 1, 1)
      }
    })
  })
}

//position piece
document.addEventListener('keydown', event =>{
  if(event.key === 'ArrowLeft') {
    piece.position.x--
    if(checkCollision()){
      piece.position.x++
    }
  }
  if(event.key === 'ArrowRight'){
    piece.position.x++
    if(checkCollision()){
      piece.position.x--
    }
  } 
  if(event.key === 'ArrowDown') {
    piece.position.y++
    if(checkCollision()){
      piece.position.y--
      solidifyPiece()
      removeRows()
    }
  }

})

// rotate piece
document.addEventListener("keydown", (event) => {
  if(event.key === 'ArrowUp'){
    const rotated = []

    for(let i = 0; i < piece.shape[0].length; i++){
      const row = []
      for(let j = piece.shape.length - 1; j >= 0; j--){
        row.push(piece.shape[j][i])
      }
      rotated.push(row)
    }

    const previousShape = piece.shape
    piece.shape = rotated

    if(checkCollision()){
      piece.shape = previousShape
    }
  }
})

//collisions
function checkCollision() {
  return piece.shape.find((row, y)=>{
    return row.find((value, x)=>{
      return (
        value !== 0 &&
        board[y + piece.position.y]?.[x + piece.position.x] !== 0
      )
    })
  })
}

//solidify the board pieces
function solidifyPiece() {
  piece.shape.forEach((row, y)=>{
    row.forEach((value, x) => {
      if(value === 1){
        board[y + piece.position.y][x + piece.position.x] = 1
      }
    })
  })

  // random piece
  piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)]
  
  // reset the position of the piece
  piece.position.x = Math.floor(BOARD_WIDTH / 2) - 1
  piece.position.y = 0

  // Game Over
  if(checkCollision()){
    window.alert('Game Over')
    board.forEach(row => row.fill(0))
  }
}

//delete entire lines
function removeRows() {
  const rowsToRemove = []

  board.forEach((row, y) => {
    if(row.every(value => value === 1)){
      rowsToRemove.push(y)
    }
  })

  rowsToRemove.forEach(y => {
    board.splice(y, 1)
    const newRow = Array(BOARD_WIDTH).fill(0)
    board.unshift(newRow)
  })
}

update()

