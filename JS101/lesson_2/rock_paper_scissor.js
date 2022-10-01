/*
Rock, Paper, Scissors Game

INPUT: user chooses between rock, paper or scissors
OUTPUT: winner between user vs cpu is displayed

*/


const readline = require("readline-sync");
const VALID_CHOICES = ["rock", "paper", "scissors"];

function prompt(message) {
  console.log(`=> ${message}`);
}

function userChoice() {
  let userChoice = readline.question();
  while (!VALID_CHOICES.includes(userChoice)) {
    prompt(`That's not a valid choice, please choose: ${VALID_CHOICES.join(', ')}`)
    userChoice = readline.question();  
  }
  return userChoice;
}

function cpuChoice() {
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let cpuChoice = VALID_CHOICES[randomIndex];
  return cpuChoice;
}

function winnerCalc(user, cpu) {
  let winner;
  if ((user === "rock" && cpu === "scissors") || (user === "paper" && cpu === "rock") || (user === "scissors" && cpu === "paper")) {
    winner = "User";
  } else if (user === cpu) {
    winner = "Tie!";
  } else {
    winner = "CPU";
  }
  return winner;
}

function playAgain() {
  prompt("Do you want to play again? (y/n)");
  let playAgain = readline.question();
  while (playAgain[0] !== 'n' && playAgain[0] !== 'y') {
    prompt("Please enter 'y' if you want to play again, or 'n' if you do not want to play again: ");
    playAgain = readline.question();
  }
  return playAgain;
}

let playAgainResult;

do {
  prompt(`Choose one: ${VALID_CHOICES.join(', ')}`)

  let userResult = userChoice();
  let cpuResult = cpuChoice();
  let winnerResult = winnerCalc(userResult, cpuResult);

  prompt(`User: ${userResult}`);
  prompt(`CPU: ${cpuResult}`);
  prompt(`Winner: ${winnerResult}`);

  playAgainResult = playAgain();
  console.clear();

} while (playAgainResult[0] !== 'n')

