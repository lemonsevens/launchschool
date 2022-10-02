const readline = require("readline-sync");
const MESSAGES = require("./rock_paper_scissor_messages.json")
const CHOICES_AND_WINNERS = {
  rock: { validChoices: ['r', 'rock'], defeats: ['scissors'] },
  paper: { validChoices: ['p', 'paper'], defeats: ['rock'] },
  scissors: { validChoices: ['s', 'scissors'], defeats: ['paper'] }
}
const CHOICES = Object.keys(CHOICES_AND_WINNERS);
// const WINNING_SCORE = 3;
// let userScore = 0;
// let cpuScore = 0;

function prompt(key) {
  let message = messages(key)
  console.log(`=> ${message}`);
}

function messages(value) {
  return MESSAGES[value];
}

function validate(str) {
  let validated;
  for (const key in CHOICES_AND_WINNERS) {
    if (validated === undefined || validated === false) {
        validated = (CHOICES_AND_WINNERS[key]['validChoices'].includes(str));
    }
  }
  return validated;
}

function userChoice() {
  let userChoice = readline.question();
  while (validate(userChoice) === false) {
    prompt('validChoiceError') + CHOICES.join(', ');
    userChoice = readline.question();  
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
  let randomIndex = Math.floor(Math.random() * CHOICES.length);
  let cpuChoice = CHOICES[randomIndex];
  return cpuChoice;
}

function winnerCalc(user, cpu) {
  let winner;
  if (CHOICES_AND_WINNERS[user]['defeats'].includes(cpu)) {
    winner = "user";
  } else if (user === cpu) {
    winner = "tie";
  } else {
    winner = "cpu";
  }
  return winner;
}

function playAgain() {
  prompt('playAgain');
  let playAgain = readline.question();
  while (playAgain[0] !== 'n' && playAgain[0] !== 'y') {
    prompt('playAgainError');
    playAgain = readline.question();
  }
  return playAgain;
}

let playAgainResult;

do {
  prompt('welcome');
  prompt('makeChoice');

  let userResult = userChoice();
  let cpuResult = cpuChoice();
  let winnerCalcResult = winnerCalc(userResult, cpuResult);

  console.log(`User: ${userResult}`);
  console.log(`CPU: ${cpuResult}`);
  console.log(`Winner: ${winnerCalcResult}`);

  playAgainResult = playAgain();
  console.clear();

} while (playAgainResult[0] !== 'n')

