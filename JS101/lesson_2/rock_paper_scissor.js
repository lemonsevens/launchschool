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

function validate(str) {
  let validated;
  // eslint-disable-next-line no-restricted-syntax
  for (const key in CHOICES_AND_WINNERS) {
    if (validated === undefined || validated === false) {
      validated = (CHOICES_AND_WINNERS[key].validChoices.includes(str));
    }
  }
  return validated;
}

// Core Functions
function userChoice() {
  let userChoice = readline.question().toLowerCase();
  while (validate(userChoice) === false) {
    prompt('validChoiceError', CHOICES.join(', '));
    userChoice = readline.question().toLowerCase();
  }
  if (userChoice === 'r') {
    userChoice = 'rock';
  } else if (userChoice === 'p') {
    userChoice = 'paper';
  } else if (userChoice === 's') {
    userChoice = 'scissors';
  }
  return userChoice;
}

function cpuChoice() {
  const randomIndex = Math.floor(Math.random() * CHOICES.length);
  const cpuChoice = CHOICES[randomIndex];
  return cpuChoice;
}

function winnerCalc(user, cpu) {
  let winner;
  if (CHOICES_AND_WINNERS[user].defeats.includes(cpu)) {
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

function playAgain() {
  prompt('playAgain');
  let playAgain = readline.question().toLowerCase();
  while (playAgain[0] !== 'n' && playAgain[0] !== 'y') {
    prompt('playAgainError');
    playAgain = readline.question().toLowerCase();
  }
  return playAgain;
}

// Core Program
let playAgainResult;

do {
  prompt('welcome');
  do {
    prompt('makeChoice');

    const userResult = userChoice();
    const cpuResult = cpuChoice();
    const winnerCalcResult = winnerCalc(userResult, cpuResult);

    console.log(' ');
    console.log(`User: ${userResult}`);
    console.log(`CPU: ${cpuResult}`);
    console.log(`Won Round: ${winnerCalcResult}`);
    console.log(`Match Score: ${userScore} - ${cpuScore}`);
    console.log(' ');
  } while (weGotAWinner() === false);

  console.log('-----------------------------');
  console.log(weGotAWinner());
  console.log('-----------------------------');

  playAgainResult = playAgain();

  console.clear();
  userScore = 0;
  cpuScore = 0;
} while (playAgainResult[0] !== 'n');
