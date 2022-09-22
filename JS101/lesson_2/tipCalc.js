// INPUT: user input bill amount and tip rate
// OUTPUT: tip amount and total bill amount with tip

const READLINE = require('readline-sync');

console.log("How much is the bill: ");
let billAmount = Number(READLINE.question());

console.log("What is the tip percentage");
let tipPercentage = READLINE.question();
tipPercentage /= 100;

let tipAmount = Number(billAmount * tipPercentage);
let billTotal = Number(billAmount + tipAmount);
console.log(billTotal);

console.log(`Your tip amount is $${tipAmount.toFixed(2)} and your total bill (with tip) is $${billTotal.toFixed(2)}`);