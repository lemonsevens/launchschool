// Ask user for first number
// Ask user for second number
// Ask user for operator type
// Perform operation
// Print operation result to terminal 
// Ask user if they want to do another calculation

const READLINE = require("readline-sync");
const MESSAGES = require("./calculator_messages.json");
const LANGUAGE = 'en';

function prompt(key) {
  let message = messages(key, LANGUAGE)
  console.log(`=> ${message}`);
}

function messages(message, lang) {
  return MESSAGES[lang][message];
}

function invalidNumber(number) {
  return number.trim() === '' || Number.isNaN(Number(number));
}

let restartCalc;

prompt('welcome');

do {
  prompt('firstNum');
  let num1 = READLINE.question();

  while (invalidNumber(num1)) {
    prompt('invalidNum');
    num1 = READLINE.question();
  }

  prompt('secondNum');
  let num2 = READLINE.question();

  while (invalidNumber(num2)) {
    prompt('invalidNum');
    num2 = READLINE.question();
  }

  prompt('operator');
  let operator = READLINE.question();

  while (!['add', 'subtract', 'multiply', 'divide'].includes(operator)) {
    prompt('invalidOperator');
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

  console.log(`=> The result equals ${output}`);

  prompt('newCalculation')
  restartCalc = READLINE.question();

  while (!['y', 'n'].includes(restartCalc)) {
    prompt('invalidNewCalculation')
    restartCalc = READLINE.question();
  }

} while (restartCalc === 'y')

prompt('thanks')