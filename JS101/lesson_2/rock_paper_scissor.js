const readline = require('readline-sync');
const MESSAGES = require('./rock_paper_scissor_messages.json');

const CHOICES_AND_WINNERS = {
  rock: { validChoices: ['r', 'rock'], defeats: ['scissors'] },
  paper: { validChoices: ['p', 'paper'], defeats: ['rock'] },
  scissors: { validChoices: ['s', 'scissors'], defeats: ['paper'] },
};
const CHOICES = Object.keys(CHOICES_AND_WINNERS);
const WINNING_SCORE = 3;
let userScore = 0;
let cpuScore = 0;

// Helper Functions

function messages(value) {
  return MESSAGES[value];
}

function prompt(key, str) {
  const message = messages(key);
  if (str) {
    console.log(`=> ${message} ${str}`);
  } else {
    console.log(`=> ${message}`);
  }
}

function validateChoice(str) {
  for (let choice in CHOICES_AND_WINNERS) {
    if (CHOICES_AND_WINNERS[choice].validChoices.includes(str)) {
      return choice;
    }
  }
  return false;
}

// Core Functions
function userChoice() {
  prompt('makeChoice');
  let userChoice = readline.question().toLowerCase();
  while (!validateChoice(userChoice)) {
    prompt('validChoiceError', CHOICES.join(', '));
    userChoice = readline.question().toLowerCase();
  }
  userChoice = validateChoice(userChoice);
  return userChoice;
}

function cpuChoice() {
  const randomIndex = Math.floor(Math.random() * CHOICES.length);
  const cpuChoice = CHOICES[randomIndex];
  return cpuChoice;
}

function winnerCalc(user, cpu) {
  let winner;
  if (CHOICES_AND_WINNERS[user]['defeats'].includes(cpu)) {
    winner = 'User';
    userScore += 1;
  } else if (user === cpu) {
    winner = 'Tie';
  } else {
    winner = 'CPU';
    cpuScore += 1;
  }
  return winner;
}

function weGotAWinner() {
  if (userScore === WINNING_SCORE) {
    return ('User won the match!');
  }
  if (cpuScore === WINNING_SCORE) {
    return ('CPU won the match!');
  }
  return false;
}

function displayWinner() {
  console.log('-----------------------------');
  console.log(weGotAWinner());
  console.log('-----------------------------');
}

function playAgain() {
  prompt('playAgain');
  let playAgain = readline.question().toLowerCase();
  while (playAgain !== 'n' && playAgain !== 'y' && playAgain !== 'yes' && playAgain !== 'no') {
    prompt('playAgainError');
    playAgain = readline.question().toLowerCase();
  }
  return playAgain;
}

function updateScore(user, cpu, winner) {
  console.log(' ');
  console.log(`User: ${user}`);
  console.log(`CPU: ${cpu}`);
  console.log(`Won Round: ${winner}`);
  console.log(`Match Score: ${userScore} - ${cpuScore}`);
  console.log(' ');
}

function resetGame() {
  console.clear();
  userScore = 0;
  cpuScore = 0;
}

// Core Program
let playAgainResult;

do {
  prompt('welcome');
  do {
    const userResult = userChoice();
    const cpuResult = cpuChoice();
    const winnerCalcResult = winnerCalc(userResult, cpuResult);

    updateScore(userResult, cpuResult, winnerCalcResult);

  } while (weGotAWinner() === false);

  displayWinner();

  playAgainResult = playAgain();

  resetGame();

} while (playAgainResult[0] !== 'n');