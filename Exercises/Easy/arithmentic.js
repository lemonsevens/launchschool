/*
DESCRIPTION:
Write a program that prompts the user for two positive integers, and then prints the results of the following operations on those two numbers: addition, subtraction, product, quotient, remainder, and power. Do not worry about validating the input.

INPUT: two integers
OUTPUT: six strings
RULES:
  - take in two positive integers from user input
  - inputs do not need validation
  - calculate addition
  - calculate subtraction
  - calculate product
  - calculate quotient
    - round result
  - calculate remainder
  - calculate power
  - print result of each calculation in following format:
    - num1 (operator) num2 = result

ALGORITHM:
  - initialize readline-sync to variable readline
  - initialize readline.question("Enter the first number: ") to variable numberOne
  - initialize readline.question("Enter the second number: ") to variable num2
  - declare addition and initialize to num1 + num2
  - declare subtraction and initialize to num1 - num2
  - declare product and initialize to num1 * num2
  - declare quotient and initialize to num1 / num2
  - declare remainder and initialize to num1 % num2
  - declare power and initialize to num1 ** num2
  - print string for each calculation
*/

const readline = require('readline-sync');

let num1 = Number(readline.question("Enter the first number: "));
let num2 = Number(readline.question("Enter the second number: "));

let addition = num1 + num2;
let subtraction = num1 - num2;
let product = num1 * num2;
let quotient = Math.round(num1 / num2);
let remainder = num1 % num2;
let power = num1 ** num2;

console.log(`${num1} + ${num2} = ${addition}`);
console.log(`${num1} - ${num2} = ${subtraction}`);
console.log(`${num1} * ${num2} = ${product}`);
console.log(`${num1} / ${num2} = ${quotient}`);
console.log(`${num1} % ${num2} = ${remainder}`);
console.log(`${num1} ** ${num2} = ${power}`);






// ==> Enter the first number:
// 23
// ==> Enter the second number:
// 17
// ==> 23 + 17 = 40
// ==> 23 - 17 = 6
// ==> 23 * 17 = 391
// ==> 23 / 17 = 1
// ==> 23 % 17 = 6
// ==> 23 ** 17 = 1.4105003956066297e+23