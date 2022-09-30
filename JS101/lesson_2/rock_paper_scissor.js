/*
Rock, Paper, Scissors Game

INPUT: user chooses between rock, paper or scissors
OUTPUT: winner between user vs cpu is displayed

START
SET - const choiceArr = ["rock", "paper", "scissor"]
GET and SET - let userChoice = readline.question("Select rock (r), paper (p) or scissor (s): ")
IF/ELSE - 
  -- If user inputs 1, reassign userChoice to choiceArr[0] ("rock")
  -- If user inputs 2, reassign userChoice to choiceArr[1] ("paper")
  -- If user inputs 3, reassign userChoice to choiceArr[2] ("scissor")
SUBPROCESS - randomly generate cpuChoice
IF/ELSE - 
  -- If player a chooses rock and player b chooses scissors, player a wins.
  -- If player a chooses paper and player b chooses rock, player a wins.
  -- If player a chooses scissors and player b chooses paper, player a wins.
  -- If both players choose the same item, neither player wins. It's a tie.
PRINT winner
END
*/


const READLINE = require("readline-sync");
const VALID_CHOICES = ["rock", "paper", "scissors"];

function prompt(message) {
  console.log(`=> ${message}`);
}

while (true) {
  prompt(`Choose one: ${VALID_CHOICES.join(', ')}`)
  let userChoice = READLINE.question();

  while (!VALID_CHOICES.includes(userChoice)) {
    prompt(`That's not a valid choice, please choose: ${VALID_CHOICES.join(', ')}`)
    userChoice = READLINE.question();  
  }

  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let cpuChoice = VALID_CHOICES[randomIndex];


  let winner;
  if ((userChoice === "rock" && cpuChoice === "scissors") || (userChoice === "paper" && cpuChoice === "rock") || (userChoice === "scissors" && cpuChoice === "paper")) {
    winner = "User";
  } else if (userChoice === cpuChoice) {
    winner = "Tie!";
  } else {
    winner = "CPU";
  }

  prompt(`User: ${userChoice}`);
  prompt(`CPU: ${cpuChoice}`);
  prompt(`Winner: ${winner}`);

  prompt("Do you want to play again? (y/n)");
  let playAgain = READLINE.question();
  while (playAgain[0] !== 'n' && playAgain[0] !== 'y') {
    prompt("Please enter 'y' if you want to play again, or 'n' if you do not want to play again: ");
    playAgain = READLINE.question();
  }

  if (playAgain[0] !== 'y') break;
}

