const readline = require("readline-sync");

const EMPTY_SPACE = " ";
const USER_MARK = "X";
const CPU_MARK = "O";
const WIN_MATCH = 5;
const WINNING_LINES = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9], // rows
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9], // columns
  [1, 5, 9],
  [3, 5, 7], // diagonals
];

/**********************
 *
 * AI CPU DEFENSE
 *
 * DESCRIPTION:
 *  defend the 3rd square if user is about to win, otherwise pick random square
 *
 * INPUT: array, object
 * OUTPUT: object
 * RULES:
 *  - only defend if user is about to win
 *  - otherwise pick random square
 *
 * ALGORITHM:
 *  - Get array of empty squares
 *  - Loop over WINNING_LINES
 *    - Set sq1, sq2, sq3 to elements of each subArr
 *    - IF two of the squares are USER_MARK
 *      - Place CPU_MARK in empty square
 *    - ELSE place CPU_MARK in random empty square
 *
 * *******************/

let userScore = 0;
let cpuScore = 0;
let lastWinner = "";

/**********************
 *
 * Helper Functions
 *
 **********************/

function prompt(message) {
  console.log(`=> ${message}`);
}

// *************************************************   refactor to switch
function joinOr(array, delimiter = ", ", lastDelimiter = "or") {
  let result = "";

  if (array.length === 0) return "";
  if (array.length === 1) return String(array);

  for (let i = 0; i < array.length; i++) {
    result += array[i];

    if (i === array.length - 2 && array.length !== 2) {
      result += `${delimiter}${lastDelimiter} `;
    } else if (i !== array.length - 1 && array.length !== 2) {
      result += `${delimiter} `;
    } else if (i === array.length - 2 && array.length === 2) {
      result += ` ${lastDelimiter} `;
    }
  }

  return result;
}

function findAtRiskSquare(line, board, marker) {
  let markersInLine = line.map((square) => board[square]); // [' ', 'O', ' '], ['X', 'X', ' ']

  if (markersInLine.filter((val) => val === marker).length === 2) {
    let unusedSquare = line.find((square) => board[square] === EMPTY_SPACE);
    if (unusedSquare !== undefined) {
      return unusedSquare;
    }
  }

  return null;
}

function findEmptySquares(board) {
  // return an array of keys associated with an empty space
  return Object.keys(board).filter((key) => board[key] === EMPTY_SPACE);
}

function cpuAICheck(board, marker) {
  let square;

  for (let idx = 0; idx < WINNING_LINES.length; idx++) {
    let line = WINNING_LINES[idx];
    square = findAtRiskSquare(line, board, marker);
    if (square) break;
  }

  return square;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

function isTie(board) {
  // check if board is full
  return findEmptySquares(board).length === 0;
}

function boardStructure(board) {
  console.log("");
  console.log(`     |     |`);
  console.log(`  ${board["1"]}  |  ${board["2"]}  |  ${board["3"]}`);
  console.log(`     |     |`);
  console.log("-----+-----+-----");
  console.log(`     |     |`);
  console.log(`  ${board["4"]}  |  ${board["5"]}  |  ${board["6"]}`);
  console.log(`     |     |`);
  console.log("-----+-----+-----");
  console.log(`     |     |`);
  console.log(`  ${board["7"]}  |  ${board["8"]}  |  ${board["9"]}`);
  console.log(`     |     |`);
  console.log("");
}

/**********************
 *
 * Main Functions
 *
 **********************/

function initializeBoard() {
  // initialize an object with 9 properties, each associated with an empty space
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[square] = EMPTY_SPACE;
  }

  return board;
}

function displayBoard(board) {
  console.clear();

  console.log(`You are ${USER_MARK} and CPU is ${CPU_MARK}`);
  if (userScore !== 0 || cpuScore !== 0) {
    prompt(`${lastWinner} won last round!`);
  }
  prompt(`Match score is: User ${userScore} and CPU ${cpuScore}`);
  boardStructure(board);
}

function userSelect(board) {
  let userMark = readline.question(
    `Enter a square (${joinOr(findEmptySquares(board))}): `
  );

  while (!findEmptySquares(board).includes(userMark)) {
    prompt("Sorry that's not a valid choice!");
    userMark = readline.question(
      `Choose another square (${joinOr(findEmptySquares(board))}): `
    );
  }

  board[userMark] = USER_MARK;

  return board;
}

function cpuSelect(board) {
  let square;

  // offense AI
  square = cpuAICheck(board, CPU_MARK);

  // defense AI
  if (!square) {
    square = cpuAICheck(board, USER_MARK);
  }

  // pick square 5 if open
  if (!square && board[5] === " ") square = 5;

  // random pick
  if (!square) {
    let randNum = Math.floor(Math.random() * findEmptySquares(board).length);
    square = findEmptySquares(board)[randNum];
  }

  board[square] = CPU_MARK;
}

function detectWinner(board) {
  // check board for winning lines
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let [sq1, sq2, sq3] = WINNING_LINES[line];

    if (
      board[sq1] === USER_MARK &&
      board[sq2] === USER_MARK &&
      board[sq3] === USER_MARK
    ) {
      return "User";
    } else if (
      board[sq1] === CPU_MARK &&
      board[sq2] === CPU_MARK &&
      board[sq3] === CPU_MARK
    ) {
      return "CPU";
    }
  }

  return null;
}

function chooseSquare(board, currentPlayer) {
  if (currentPlayer === "user") return userSelect(board);
  if (currentPlayer === "cpu") return cpuSelect(board);

  return null;
}

function alternatePlayer(currentPlayer) {
  if (currentPlayer === "user") return "cpu";
  if (currentPlayer === "cpu") return "user";

  return null;
}

/*************************
 Main Program
*************************/
let currentPlayer = readline.question("Who goes first (user, cpu, random): ");

while (true) {
  // single game loop
  let board = initializeBoard();

  // single game next turn loop
  while (true) {
    displayBoard(board);
    chooseSquare(board, currentPlayer);
    currentPlayer = alternatePlayer(currentPlayer);
    if (someoneWon(board) || isTie(board)) break;
  }

  if (detectWinner(board) === "User") {
    userScore += 1;
    lastWinner = `User`;
  }
  if (detectWinner(board) === "CPU") {
    cpuScore += 1;
    lastWinner = `CPU`;
  }

  displayBoard(board);
  currentPlayer = alternatePlayer(currentPlayer);

  if (userScore === WIN_MATCH || cpuScore === WIN_MATCH) {
    prompt(`${detectWinner(board)} won the match!`);
    prompt("Play again? (y or n)");
    let answer = readline.question().toLowerCase()[0];
    [userScore, cpuScore] = [0, 0];
    if (answer !== "y") break;
  }
}

prompt("Thanks for playing Tic Tac Toe!");
