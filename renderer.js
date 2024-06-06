// renderer.js
const cells = document.querySelectorAll('[data-cell]');
const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const turnIndicator = document.getElementById('turnIndicator');

let oTurn;

startGame();

function startGame() {
  oTurn = false;
  updateTurnIndicator();
  cells.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.textContent = ''; // Clear cell content
    cell.removeEventListener('click', handleClick); // Remove any existing listeners
    cell.addEventListener('click', handleClick, { once: true });
    console.log('Event listener attached');
  });
}

function handleClick(e) {
  const cell = e.target;
  console.log('Cell clicked');
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    setTimeout(
      () => alert(`${currentClass.toUpperCase()} Wins!`),
      200
    );
    startGame();
  } else if (isDraw()) {
    setTimeout(() => alert('Draw!'), 200);
    startGame();
  } else {
    swapTurns();
    updateTurnIndicator();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase(); // Add X or O to cell
  console.log(`Placed ${currentClass} on cell`);
}

function swapTurns() {
  oTurn = !oTurn;
}

function updateTurnIndicator() {
  turnIndicator.textContent = `Turn is: ${oTurn ? 'O' : 'X'}'s`;
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) ||
      cell.classList.contains(O_CLASS)
    );
  });
}
