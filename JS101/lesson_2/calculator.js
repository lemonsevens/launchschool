// Ask user for first number
// Ask user for second number
// Ask user for operator type
// Perform operation
// Print operation result to terminal 
// Ask user if they want to do another calculation

const READLINE = require("readline-sync");

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trim() === '' || Number.isNaN(Number(number));
}

let restartCalc;

prompt("Welcome to Calculator!");

do {
  prompt("What's your first number?");
  let num1 = READLINE.question();

  while (invalidNumber(num1)) {
    prompt("Hmm... that doesn't look like a valid number. Please try again:");
    num1 = READLINE.question();
  }

  prompt("What's your second number?");
  let num2 = READLINE.question();

  while (invalidNumber(num2)) {
    prompt("Hmm... that doesn't look like a valid number. Please try again:");
    num2 = READLINE.question();
  }

  prompt("What kind of operation do you want to do? (add|subtract|multiply|divide)");
  let operator = READLINE.question();

  while (!['add', 'subtract', 'multiply', 'divide'].includes(operator)) {
    prompt('Must choose: add, subtract, multiply or divide');
    operator = READLINE.question();
  }

  // Perform operation
  let output;
  switch (operator) {
    case 'add':
      output = (Number(num1) + Number(num2));
      break;
    case 'subtract':
      output = (Number(num1) - Number(num2));
      break;
    case 'multiply':
      output = (Number(num1) * Number(num2));
      break;
    case 'divide':
      output = (Number(num1) / Number(num2));
      break;
    default:
      output = "error: invalid operator type";
      break;
  }

  prompt(`The result equals ${output}`);

  prompt(`Do you want to do another calculation? (y/n) `)
  restartCalc = READLINE.question();

  while (!['y', 'n'].includes(restartCalc)) {
    prompt(`Hmmmm... please answer with y/n: `)
    restartCalc = READLINE.question();
  }

} while (restartCalc === 'y')

prompt(`Thanks for using Calculator!`)