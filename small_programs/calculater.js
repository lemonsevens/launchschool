// Ask the user for the first number.
// Ask the user for the second number.
// Ask the user for an operation to perform.
// Perform the operation on the two numbers.
// Print the result to the terminal.

console.log("Welcome to the Command Line Calculater!");

const readline = require("readline-sync");

let userInputFirstNum = readline.question("Enter first number: ");
let userInputSecondNum = readline.question("Enter second number: ");
let userInputOperationType = readline.question("Enter operation type: ");

function calculaterProcess(firstNum, secondNum, operationType) {
  switch (operationType) {
    case "+":
      return firstNum + secondNum;
    case "-":
      return firstNum - secondNum;
    case "*":
      return firstNum * secondNum;
    case "/":
      return firstNum / secondNum;
  }
}

console.log(
  `Your calculation result is: ${calculaterProcess(
    userInputFirstNum,
    userInputSecondNum,
    userInputOperationType
  )}`
);
