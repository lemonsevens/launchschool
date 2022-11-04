/*
DESCRIPTION:
Create a function that takes two arguments, multiplies them together, and returns the result.

INPUT: two integers
OUTPUT: integer
RULES:
  - two arguments, both integers
  - multiply them together
  - return result

ALGORITHM:
  - take in two integers 
  - initialize inputs to num1 and num2
  - return num1 multiplied by num2

*/

function multiply(num1, num2) {
  return num1 * num2
}

console.log(multiply(5, 3) === 15); // logs true