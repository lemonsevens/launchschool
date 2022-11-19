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
/*
DESCRIPTION:
 - Write a function that replaces the last delimiter in a string returned from .join()

INPUT: array
OUTPUT: string
RULES:
  - takes in array, delimiter and last delimiter
    - ([1, 2, 3], ', ', 'or')
  - delimiter can be any string character
  - last delimiter can be any string

EXAMPLES:
joinOr([1, 2, 3]);               // => "1, 2, or 3"
joinOr([1, 2, 3], '; ');         // => "1; 2; or 3"
joinOr([1, 2, 3], ', ', 'and');  // => "1, 2, and 3"
joinOr([]);                      // => ""
joinOr([5]);                     // => "5"
joinOr([1, 2]);                  // => "1 or 2"

DATA STRUCTURE:
  array -> string 

ALGORITHM:
  - take in parameters
    - (array, delimiter, lastDelimiter)
  - SET result = '';
  - WHILE index < array.length
    - add array[index] to result
    - IF next to last element in array
      - add lastDelimiter to result
    - ELSE IF not last element in array
      - add delimiter to result
  - return result

*/
/*
DESCRIPTION: 
  - Keep track of how many times the player and computer each win, and report the scores after each game. The first player to win 5 games wins the overall match (a series of 2 or more games). The score should reset to 0 for each player when beginning a new match. Don't use any global variables. However, you may want to use a global constant to represent the number of games needed to win the match.

INPUT: string
OUTPUT: string
RULES:
  - print score after each game
  - first to 5 wins
  - score resets to 0 when starting new match
  - no global variables except:
    - games in a match

ALGORITHM:
  - SET user counter
  - SET cpu counter
  - 
*/

const readline = require("readline-sync");
const EMPTY_SPACE = " ";
const USER_MARK = "X";
const CPU_MARK = "O";
const WIN_MATCH = 5;

function prompt(message) {
  console.log(`=> ${message}`);
}

function joinOr(array, delimiter = ', ', lastDelimiter = 'or') {
  let result = "";

  if (array.length === 0) return '';
  if (array.length === 1) return String(array);

  for (let i = 0; i < array.length; i++) {
    result += array[i];

    if (i === array.length - 2 && array.length !== 2) {
      result += `${delimiter}${lastDelimiter} `;
    } else if (i !== array.length - 1 && array.length !== 2) {
      result += `${delimiter} `;
    } else if (i === array.length - 2 && array.length === 2) {
      result += ` ${lastDelimiter} `
    }
  }

  return result;
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
      `Enter a square (${joinOr(emptySquares(board))}): `
    );

    if (emptySquares(board).includes(userMark)) break;

    prompt("Sorry that's not a valid choice!");
    userMark = readline.question(
      `Choose another square (${joinOr(emptySquares(board))}): `
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

    // single gameplay
    while (true) {
      displayBoard(board);

      userSelect(board);
      if (someoneWon(board) || isTie(board)) break;

      cpuSelect(board);
      if (someoneWon(board) || isTie(board)) break;
    }

    // display board after win or tie
    displayBoard(board);

    // print winner or tie message
    if (someoneWon(board)) {
      prompt(`${detectWinner(board)} won!`);
    } else {
      prompt("It's a tie!");
    }

  // ask to play again
  prompt("Play again? (y or n)");
  let answer = readline.question().toLowerCase()[0];
  if (answer !== "y") break;
}

prompt("Thanks for playing Tic Tac Toe!");
