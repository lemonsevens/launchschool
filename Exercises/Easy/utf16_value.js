/*
DESCRIPTION:
Write a function that determines and returns the UTF-16 string value of a string passed in as an argument. The UTF-16 string value is the sum of the UTF-16 values of every character in the string. (You may use String.prototype.charCodeAt() to determine the UTF-16 value of a character.)

INPUT: string
OUTPUT: UTF-16 string
RULES:
  - UTF-16 string value is sum of UTF-16 character values
  - use .charCodeAt() to get UTF-16 value of char

ALOGRITHM:
  - takes in UTF-16 string as argument and initialize it to "str"
  - initialize "totalValue" variable
  - iterate over str
    - declare currentCodeValue and initialize to charCodeAt of current char
    - assign current char value (charCodeAt) to totalValue
  - return totalValue
*/


function utf16Value(str) {
  let totalValue = 0;

  for (let i = 0; i < str.length; i ++) {
    let currentCodeValue = str.charCodeAt(i);
    totalValue += currentCodeValue;
  }

  return totalValue;
}


console.log(utf16Value('Four score'));         // 984
console.log(utf16Value('Launch School'));      // 1251
console.log(utf16Value('a'));                  // 97
console.log(utf16Value(''));                   // 0

// The next three lines demonstrate that the code
// works with non-ASCII characters from the UTF-16
// character set.
const OMEGA = "\u03A9";                         // UTF-16 character 'Ω' (omega)
console.log(utf16Value(OMEGA));                 // 937
console.log(utf16Value(OMEGA + OMEGA + OMEGA));  // 2811