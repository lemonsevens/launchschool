/* Write a function that takes one integer argument, which may be positive, negative, or zero. This method returns true if the number's absolute value is odd. You may assume that the argument is a valid integer value.

console.log(isOdd(2)); // => false
console.log(isOdd(5)); // => true
console.log(isOdd(-17)); // => true
console.log(isOdd(-8)); // => false
console.log(isOdd(0)); // => false
console.log(isOdd(7)); // => true

INPUT: one integer that is positive, negative or zero
OUTPUT: return a boolean value of true if the number's absolute value is odd

START
SET function isOdd(num) {
  Math.abs(num);
  IF/ELSE (num % 2 === 0) {
    return false;
  } else {
    return true;
  }
}
*/

function isOdd(num) {
  return Math.abs(num) % 2 === 1;
}

console.log(isOdd(2)); // => false
console.log(isOdd(5)); // => true
console.log(isOdd(-17)); // => true
console.log(isOdd(-8)); // => false
console.log(isOdd(0)); // => false
console.log(isOdd(7)); // => true