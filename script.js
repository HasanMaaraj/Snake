// Global Variables

// Select the board
const board = document.querySelector('.board')
// Make cell divs
// Append div cells to the board
// Select the difficulty buttons
// Select the restart button
// Select the score display
// Make snake object with attributes (locations: array, direction: string, hasEaten: boolean) and method move
const snake = {
  locations: [
    [22, 29],
    [22, 30],
    [22, 31],
    [22, 32],
    [22, 33],
    [22, 34],
    [22, 35],
    [22, 36],
    [22, 37],
    [22, 38],
  ],
  direction: 'left',
  hasEaten: false,
  move() {
    let newLocation
    switch (this.direction) {
      case 'left':
        newLocation = [this.locations[0][0], this.locations[0][1]-1]
        break
      case 'up':
        newLocation = [this.locations[0][0]-1, this.locations[0][1]]
        break
      case 'right':
        newLocation = [this.locations[0][0], this.locations[0][1]+1]
        break
      case 'down':
        newLocation = [this.locations[0][0]+1, this.locations[0][1]]
        break
    }
    this.locations.unshift(newLocation)
    this.locations.pop()
  }
}
// Make Food object with method changeLocation
// Make string variable for difficulty
// Make variable for score

// Functions

// Write a function that changes the difficulty variable and the snake speed
// Write a function that clears the board
const clearBoard = () => {
  board.innerHTML = ''
}

// Write a function that displays the snake
const displaySnake = () => {
  for (let i = 0; i < snake.locations.length; i++) {
    const location = snake.locations[i]
    const cell = board.querySelector(`[data-location="${location[0]},${location[1]}"]`)
    cell.classList.add('snake-cell')
    if (i === snake.locations.length-1)
    setTimeout(() => {
      board.querySelector(`[data-location="${location[0]},${location[1]}"]`).classList.remove('snake-cell')
    }, 1000)
  }
}
// Write a function that updates score
// write a function that displays lost
// Write a function that starts game
const startGame = () => {
  clearBoard()
  for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 50; j++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.dataset.location = `${i+1},${j+1}`
      board.appendChild(cell)
    }
  }
  setInterval(()=> {
    snake.move()
    displaySnake()
  }, 1000)
}
// Write function that resets the length of the snake and score and restarts the game

// Event Listeners
// Enable changing snake direction to by arrow keyboard clicks
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault()
      if (snake.direction !== 'right') snake.direction = 'left'
      break
    case 'ArrowUp':
      e.preventDefault()
      if (snake.direction !== 'down') snake.direction = 'up'
      break
    case 'ArrowRight':
      e.preventDefault()
      if (snake.direction !== 'left') snake.direction = 'right'
      break
    case 'ArrowDown':
      e.preventDefault()
      if (snake.direction !== 'up') snake.direction = 'down'
      break
  }
})
// Display the snake on the board by taking the cells in the snake object and changing the colors of the corresponding cells on the board cells
// Add restart function event listeners in to the restart button
// Add event listener to the difficulty button
// Add event listener that displays lost win snake hits the wall or itself

startGame()
