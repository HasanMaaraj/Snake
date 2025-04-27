// Global Variables

// Select the board
const boardContainer = document.querySelector('.board-container')
// Make cell divs
console.log(boardContainer)
// Append div cells to the board
// Select the difficulty buttons
// Select the restart button
// Select the score display
// Make snake object with attributes (length: number, speed: number, cells: array) and methods eat and move
// Make Food object with method changeLocation
// Make string variable for difficulty
// Make variable for score

// Functions

// Write a function that changes the difficulty variable and the snake speed
// Write a function that starts game
const startGame = () => {
if (boardContainer.firstChild) boardContainer.removeChild(boardContainer.firstChild)
  const board = document.createElement('div')
  board.classList.add('board')
  for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 50; j++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.dataset.location = `${i+1},${j+1}`
      board.appendChild(cell)
    }
  }
  boardContainer.appendChild(board)
}
// Write a function that updates score
// write a function that displays lost
// Write function that resets the length of the snake and score and restarts the game

// Event Listeners

// Enable changing snake direction to by arrow keyboard clicks
// Display the snake on the board by taking the cells in the snake object and changing the colors of the corresponding cells on the board cells
// Add restart function event listeners in to the restart button
// Add event listener to the difficulty button
// Add event listener that displays lost win snake hits the wall or itself

startGame()
