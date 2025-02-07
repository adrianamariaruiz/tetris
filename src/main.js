import './style.css'

//inicializar el canvas
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

//Pieza del jugador
const piece = {
  position: {x: 5, y:5},
  shape: [
    [1,1],
    [1,1]
  ]
}

//game loop
function update (){
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

//position de la pieza
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
    }
  }
})

//colisiones
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

//solidificar las piezas en el tablero
function solidifyPiece() {
  piece.shape.forEach((row, x)=>{
    row.forEach((value, y) => {
      if(value === 1){
        board[y + piece.position.y][x + piece.position.x] = 1
      }
    })
  })

  piece.position.x = 0
  piece.position.y = 0
}

update()

