/*
DESCRIPTION:
Write a function that computes the sum of all numbers between 1 and some other number, inclusive, that are multiples of 3 or 5. For instance, if the supplied number is 20, the result should be 98 (3 + 5 + 6 + 9 + 10 + 12 + 15 + 18 + 20).

You may assume that the number passed in is an integer greater than 1.

INPUT:
OUTPUT:
RULES:
  - input is an integer 
  - input integer will be > 1
  - compute sum of all numbers between 1 and input number
  - input number should be included in sum
  - only sum numbers that are multiples of 3 or 5
  - if the supplied number is 20, the result should be 98 (3 + 5 + 6 + 9 + 10 + 12 + 15 + 18 + 20)

QUESTIONS:
  - 

DS:
  - integer -> integer

ALGORITHM:
  - take in integer as a parameter initialized to "inputNum"
  - declare variable "totalSum" and initialize to 0
  - loop from given number down to 3
    - check if each decrement number is evenly divisible by 3 or 5
      - if yes, add current number to "totalSum"
      - if no, continue loop 
  - return totalSum
*/


function multisum(inputNum) {
  let totalSum = 0;

  for (let i = inputNum; i >= 3; i--) {
    if ((i % 5 === 0) || (i % 3 === 0)) {
      totalSum += i;
    }
  }

  return totalSum;
}



console.log(multisum(3)); // 3
console.log(multisum(5)); // 8
console.log(multisum(10)); // 33
console.log(multisum(1000)); // 234168