/*
 Using the multiply() function from the "Multiplying Two Numbers" problem,write a function that computes the square of its argument (the square is the result of multiplying a number by itself).
 
 INPUT: integer
 OUTPUT: integer
 RULES:
  - multiply input integer by itself
  - return result
 
 */

// function multiply(num1, num2) {
//   return num1 * num2
// }

// const square = num => multiply(num, num);

// function powerToN(num, power) {
//   return Math.pow(num, power);
// }

// console.log(powerToN(5, 3));

const multiply = (num1, num2) => num1 * num2;

function square(num, power = 2) {
  let accum = num;
  for (let iterator = 1; iterator < power; iterator++) {
    accum = multiply(accum, num);
  }
  return accum;
}


// console.log(square(5) === 25); // logs true
// console.log(square(-8) === 64); // logs true
console.log(square(5, 3));