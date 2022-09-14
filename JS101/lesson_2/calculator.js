// Ask user for first number
// Ask user for second number
// Ask user for operator type
// Perform operation
// Print operation result to terminal 

const READLINE = require("readline-sync");

console.log("Welcome to Calculator!");

// Ask user for first number
console.log("What's your first number?");
let num1 = READLINE.question();

// Ask user for second number
console.log("What's your second number?");
let num2 = READLINE.question();

// Ask user for operator type
console.log("What kind of operation do you want to do? (add|subtract|multiply|divide)");
let operator = READLINE.question();

// Perform operation
let result;
if (operator === "add") {
  result = (Number(num1) + Number(num2));
} else if (operator === "subtract") {
  result = (Number(num1) - Number(num2));
} else if (operator === "multiply") {
  result = (Number(num1) * Number(num2));
} else if (operator === "divide") {
  result = (Number(num1) / Number(num2));
} else {
  result = "error: invalid operator type";
}

// Print operation result to terminal 
console.log(`The result equals ${result}`);