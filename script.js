// Global Variables

// Select the board
const board = document.querySelector('.board')
// Make cell divs
// Append div cells to the board
// Select the difficulty buttons
// Select the restart button
// Select the score display
// Make Food object with method changeLocation
const food = {
  location: [30, 30],
  displayLocation() {
    board
      .querySelector(
        `[data-location="${food.location[0]},${food.location[1]}"]`
      )
      .classList.add('food-cell')
  },
  changeLocation(newLocation) {
    board
      .querySelector(
        `[data-location="${this.location[0]},${this.location[1]}"]`
      )
      .classList.remove('food-cell')
    this.location = newLocation
    this.displayLocation()
  },
  getLocation() {
    return this.location
  }
}
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
    [22, 38]
  ],
  direction: 'left',
  hasEaten: false,
  move() {
    let newLocation
    switch (this.direction) {
      case 'left':
        newLocation = [this.locations[0][0], this.locations[0][1] - 1]
        break
      case 'up':
        newLocation = [this.locations[0][0] - 1, this.locations[0][1]]
        break
      case 'right':
        newLocation = [this.locations[0][0], this.locations[0][1] + 1]
        break
      case 'down':
        newLocation = [this.locations[0][0] + 1, this.locations[0][1]]
        break
    }
    this.locations.unshift(newLocation)
    let foodLocation = food.getLocation()
    if (
      !(
        newLocation[0] === foodLocation[0] && newLocation[1] === foodLocation[1]
      )
    ) {
      this.locations.pop()
    } else {
      let newFoodLocation = [
        Math.ceil(Math.random() * 50),
        Math.ceil(Math.random() * 50)
      ]
      while (
        this.locations.reduce((acc, location) => {
          return (
            acc ||
            (newFoodLocation[0] == location[0] &&
              newFoodLocation[1] === location[1])
          )
        }, false)
      ) {
        newFoodLocation = [
          Math.ceil(Math.random() * 50),
          Math.ceil(Math.random() * 50)
        ]
      }
      food.changeLocation(newFoodLocation)
    }
  }
}
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
    const cell = board.querySelector(
      `[data-location="${location[0]},${location[1]}"]`
    )
    cell.classList.add('snake-cell')
    if (i === snake.locations.length - 1) {
      setTimeout(() => {
        board
          .querySelector(`[data-location="${location[0]},${location[1]}"]`)
          .classList.remove('snake-cell')
      }, 100)
    }
  }
}
// Write a function that updates score
// write a function that displays lost
const checkLost = () => {
  let snakeHead = snake.locations[0]
  let snakeHasCollided = false
  for (let i = 1; i < snake.locations.length; i++) {
    if (
      snakeHead[0] === snake.locations[i][0] &&
      snakeHead[1] === snake.locations[i][1]
    )
      snakeHasCollided = true
  }
  return (
    snakeHead[0] < 1 ||
    snakeHead[0] > 50 ||
    snakeHead[1] < 1 ||
    snakeHead[1] > 50 ||
    snakeHasCollided
  )
}
// Write a function that starts game
const startGame = () => {
  clearBoard()
  for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 50; j++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.dataset.location = `${i + 1},${j + 1}`
      board.appendChild(cell)
    }
  }
  food.displayLocation()
  let moveInterval = setInterval(() => {
    snake.move()
    if (checkLost()) {
      clearInterval(moveInterval)
    } else {
      displaySnake()
    }
  }, 100)
}
// Write function that resets the length of the snake and score and restarts the game

// Event Listeners
// Enable changing snake direction to by arrow keyboard clicks
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault()
      if (snake.locations[0][0] !== snake.locations[1][0])
        snake.direction = 'left'
      break
    case 'ArrowUp':
      e.preventDefault()
      if (snake.locations[0][1] !== snake.locations[1][1])
        snake.direction = 'up'
      break
    case 'ArrowRight':
      e.preventDefault()
      if (snake.locations[0][0] !== snake.locations[1][0])
        snake.direction = 'right'
      break
    case 'ArrowDown':
      e.preventDefault()
      if (snake.locations[0][1] !== snake.locations[1][1])
        snake.direction = 'down'
      break
  }
})
// Display the snake on the board by taking the cells in the snake object and changing the colors of the corresponding cells on the board cells
// Add restart function event listeners in to the restart button
// Add event listener to the difficulty button
// Add event listener that displays lost win snake hits the wall or itself

startGame()
