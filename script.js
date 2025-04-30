// Global Variables

// Select the board
const board = document.querySelector('.board')
// Select the difficulty buttons
const easyBtn = document.querySelector('.easy-btn')
const mediumBtn = document.querySelector('.medium-btn')
const hardBtn = document.querySelector('.hard-btn')
// Make string variable for difficulty
let difficulty = 'easy'
let speed = 100
// Select the restart button
const restartBtn = document.querySelector('.restart-btn')
// Select the score display
const scoreDisplay = document.querySelector('.score-display')
// Make variable for score
let score = 0
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
      this.hasEaten = true
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

// Functions

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

// Write a function that starts
const game = {
  moveInterval: null,
  // Write a function that clears the board
  clearBoard() {
    board.innerHTML = ''
  },
  // Write a function that updates score
  updateScore() {
    scoreDisplay.innerText = `Score: ${score}`
  },
  // Write a function that checks whether the player lost or not
  checkLost() {
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
  },
  startGame() {
    this.clearBoard()
    this.updateScore()
    // Make cell divs
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 50; j++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        cell.dataset.location = `${i + 1},${j + 1}`
        // Append div cells to the board
        board.appendChild(cell)
      }
    }
    food.displayLocation()
    this.moveInterval = setInterval(() => {
      snake.move()
      if (snake.hasEaten) {
        score++
        this.updateScore()
        snake.hasEaten = false
      }
      if (this.checkLost()) {
        clearInterval(this.moveInterval)
        board.innerHTML = '<div class="loose-screen">You Lost!</div>'
      } else {
        displaySnake()
      }
    }, speed)
  }
}
// Write function that resets the length of the snake and score and restarts the game
const restartGame = () => {
  score = 0
  food.location = [30, 30]
  snake.locations = [
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
  ]
  snake.direction = 'left'
  clearInterval(game.moveInterval)
  game.startGame()
}

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
game.startGame()
// Add restart function event listeners in to the restart button
restartBtn.addEventListener('click', restartGame)
// Add event listener to the difficulty buttons
easyBtn.addEventListener('click', () => {
  difficulty = 'Easy'
  speed = 100
})
mediumBtn.addEventListener('click', () => {
  difficulty = 'Medium'
  speed = 80
})
hardBtn.addEventListener('click', () => {
  difficulty = 'Hard'
  speed = 40
})
