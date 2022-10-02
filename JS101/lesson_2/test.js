const CHOICES_AND_WINNERS = {
  rock: { validChoices: ['r', 'rock'], defeats: ['scissors'] },
  paper: { validChoices: ['p', 'paper'], defeats: ['rock'] },
  scissors: { validChoices: ['s', 'scissors'], defeats: ['paper'] }
}
const CHOICES = Object.keys(CHOICES_AND_WINNERS);


let userChoice = prompt();

function validate(str) {
  let validated;
  for (const obj in CHOICES_AND_WINNERS) {
    if (validated === undefined || validated === false) {
        validated = (CHOICES_AND_WINNERS[obj]['validChoices'].includes(str));
    }
  }
  return validated;
}



while (validate(userChoice) === false) {
  console.log("not valid");
  userChoice = prompt();
}







// let cpuChoice = 'scissors';

// if (CHOICES_AND_WINNERS[userChoice]['defeats'].includes(cpuChoice)) {
//   console.log("you win!");
// } else {
//   console.log("you lose");
// }
// console.log(CHOICES_AND_WINNERS[userChoice]['validChoices'].includes(userChoice));

// for (const obj in CHOICES_AND_WINNERS) {
//   console.log(obj);
//   console.log(CHOICES_AND_WINNERS[obj]['validChoices'].includes(userChoice));
// }
