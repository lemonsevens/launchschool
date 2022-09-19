// Ask user for first number
// Ask user for second number
// Ask user for operator type
// Perform operation
// Print operation result to terminal 
// Ask user if they want to do another calculation

const READLINE = require("readline-sync");
const MESSAGES = require("./calculator_messages.json");

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trim() === '' || Number.isNaN(Number(number));
}

let restartCalc;

prompt(MESSAGES.welcome);

do {
  prompt(MESSAGES.first_num);
  let num1 = READLINE.question();

  while (invalidNumber(num1)) {
    prompt(MESSAGES.invalid_num);
    num1 = READLINE.question();
  }

  prompt(MESSAGES.second_num);
  let num2 = READLINE.question();

  while (invalidNumber(num2)) {
    prompt(MESSAGES.invalid_num);
    num2 = READLINE.question();
  }

  prompt(MESSAGES.operator);
  let operator = READLINE.question();

  while (!['add', 'subtract', 'multiply', 'divide'].includes(operator)) {
    prompt(MESSAGES.invalid_operator);
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

  prompt(MESSAGES.new_calculation)
  restartCalc = READLINE.question();

  while (!['y', 'n'].includes(restartCalc)) {
    prompt(MESSAGES.invalid_new_calculation)
    restartCalc = READLINE.question();
  }

} while (restartCalc === 'y')

prompt(MESSAGES.thanks)