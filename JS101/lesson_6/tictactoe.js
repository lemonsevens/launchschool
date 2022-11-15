/*
DESCRIPTION:
  - Tic Tac Toe is a 2-player game played on a 3x3 grid called the board. Each player takes a turn and marks a square on the board. The first player to get 3 squares in a row–horizontal, vertical, or diagonal–wins. If all 9 squares are filled and neither player has 3 in a row, the game is a tie.

RULES:
  - two players (user vs cpu)
  - three-by-three grid
  - X and O marks
  - winner = three consecutive marks in a horizontal, vertical or diagonal row
  - tie = all 9 squares filled with no winner



ALGORITHM:
  High-Level:
    - Display the initial empty 3x3 board.
    - Ask the user to mark a square.
    - Computer marks a square.
    - Display the updated board state.
    - If it's a winning board, display the winner.
    - If the board is full, display tie.
    - If neither player won and the board is not full, go to #2
    - Play again?
    - If yes, go to #1
    - Goodbye!
*/

const readline = require("readline-sync");
const EMPTY_SPACE = " ";
const USER_MARK = "X";
const CPU_MARK = "O";

function prompt(message) {
  console.log(`=> ${message}`);
}

function displayBoard(board) {
  console.clear();

  console.log(`You are ${USER_MARK} and CPU is ${CPU_MARK}`);

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

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[square] = EMPTY_SPACE;
  }

  return board;
}

function emptySquares(board) {
  return Object.keys(board).filter((key) => board[key] === EMPTY_SPACE);
}

function userSelect(board) {
  let userMark;

  while (true) {
    userMark = readline.question(
      `Enter a square (${emptySquares(board).join(", ")}): `
    );

    if (emptySquares(board).includes(userMark)) break;

    prompt("Sorry that's not a valid choice!");
    userMark = readline.question(
      `Choose another square (${emptySquares(board).join(", ")}): `
    );
  }

  board[userMark] = USER_MARK;

  return board;
}

function cpuSelect(board) {
  let randNum;

  randNum = Math.floor(Math.random() * emptySquares(board).length);

  let square = emptySquares(board)[randNum];

  board[square] = CPU_MARK;

  return board;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

function detectWinner(board) {
  const WINNING_LINES = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

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

function isTie(board) {
  return emptySquares(board).length === 0;
}

// Main Program

while (true) {
  let board = initializeBoard();

  while (true) {
    displayBoard(board);

    userSelect(board);
    if (someoneWon(board) || isTie(board)) break;

    cpuSelect(board);
    if (someoneWon(board) || isTie(board)) break;
  }

  displayBoard(board);

  if (someoneWon(board)) {
    prompt(`${detectWinner(board)} won!`);
  } else {
    prompt("It's a tie!");
  }

  prompt("Play again? (y or n)");
  let answer = readline.question().toLowerCase()[0];
  if (answer !== "y") break;
}

prompt("Thanks for playing Tic Tac Toe!");
