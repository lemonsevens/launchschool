// PROBLEM: 
// Write a function that calculates and returns the index of the first Fibonacci number that has the number of digits specified by the argument. (The first Fibonacci number has an index of 1.)
// You may assume that the argument is always an integer greater than or equal to 2.
//
// EXPLICIT REQUIREMENTS:
// - Input: BigInt integer
// - Output: BigInt integer
// - Rules:
//    - Return index number of first integer with same number digits as argument input
//    - Fibonacci numbers begin at index 1
//    - Argument is always an integer >= 2
//
// QUESTIONS:
// - What does "index" mean in this context? (array/string/etc)
// - What are Fibonacci numbers?
// - How large will the Fibonacci array be?
//
// EXAMPLES:
// findFibonacciIndexByLength(2n) === 7n;    // 1 1 2 3 5 8 13
// findFibonacciIndexByLength(3n) === 12n;   // 1 1 2 3 5 8 13 21 34 55 89 144
// findFibonacciIndexByLength(10n) === 45n;
// findFibonacciIndexByLength(16n) === 74n;
// findFibonacciIndexByLength(100n) === 476n;
// findFibonacciIndexByLength(1000n) === 4782n;
// findFibonacciIndexByLength(10000n) === 47847n;
//
// IMPLICIT REQUIREMENTS:
// - Input argument is a BigInt integer (delineated by "n" next to integer === 3n) 
// - Ouput is also a BigInt integer
//
// DATA STRUCTURE:
// - Array of Fibonacci numbers
//
// ALGORITHM:
//      - Main function (findFibonacciIndexByLength) takes a BigInt integer as an argument
//      - Parameter is converted from BigInt to Number and digitLength variable is decalred to its value
//      - create an array of Fibonacci numbers 
//      - map array of Fibonacci numbers to an array of digit length
//      - Loop through digit array comparing digitLength integer to array elements
//      - Return index position of first element that matches comparison criteria
// 
// =======================================================================================


function createFibonacciArray() {
  const fibonacciArray = [0, 1, 1];
  let newNumber;

  for (let i = 2; i < 50000; i++) {
    newNumber = BigInt(fibonacciArray[i]) + BigInt(fibonacciArray[i - 1]);
    fibonacciArray.push(newNumber);
  }

  return fibonacciArray;
}

function numbersToDigits(arr) {
  let fibonacciDigits = [];

  arr.map((number) => {
    fibonacciDigits.push(number.toString().length)
  })

  return fibonacciDigits;
}

function findFibonacciIndexByLength(digitLengthBigInt) {
  const digitLength = Number(digitLengthBigInt);

  let fibonacciArray = createFibonacciArray();
  let fibonacciDigits = numbersToDigits(fibonacciArray);

  for (let i = 0; i < fibonacciDigits.length; i++) {
    if (digitLength === fibonacciDigits[i]) {
      return BigInt(i);
    }
  }

}


// console.log(findFibonacciIndexByLength(2n) === 7n);
// console.log(findFibonacciIndexByLength(3n) === 12n);
// console.log(findFibonacciIndexByLength(10n) === 45n);
// console.log(findFibonacciIndexByLength(16n) === 74n);
// console.log(findFibonacciIndexByLength(100n) === 476n);
// console.log(findFibonacciIndexByLength(1000n) === 4782n);
// console.log(findFibonacciIndexByLength(10000n) === 47847n);
