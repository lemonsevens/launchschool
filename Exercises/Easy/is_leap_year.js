// DESCRIPTION:
// leap years occur in every year that is evenly divisible by 4, unless the year is also divisible by 100. 
// If the year is evenly divisible by 100, then it is not a leap year, unless the year is also evenly divisible by 400.
// Assume this rule is valid for any year greater than year 0. Write a function that takes any year greater than 0 as input and returns true if the year is a leap year, or false if it is not a leap year.

// INPUT: integer 
// OUTPUT: boolean
// RULES:
// - a leap year is evenly divisible by 4
//    - unless, it is also divisible by 100 (not leap year)
//        - unless, it is also evenly divisible by 400 (is leap year)
// - given integer will be greater than 0
// - return true if leap year
// - return false if not leap year

// ALGORITHM:
// - take in an integer and initialize it to variable year
// - if year is evenly divisible by 4 but not by 100, return true
// - if year is evenly divisible by 4 and 100, 
//      - check if year is also evenly divisible by 400, 
//          - if yes, return true
// - else return false

// < 1752 && (year % 4 === 0) === true
// (year % 400 === 0) === true
// (year % 100 !== 0) === false
// (year % 4 === 0) === true

function isLeapYear(year) {
  if (year < 1752 && (year % 4 === 0)) {
    return true;
  } else if ((year % 400 === 0)) {
    return true;
  } else if ((year % 100 === 0)) {
    return false;
  } else {
    return (year % 4 === 0);
  }
}

// EXAMPLES:

console.log(isLeapYear(2016));      // true
console.log(isLeapYear(2015));      // false
console.log(isLeapYear(2100));      // false
console.log(isLeapYear(2400));      // true
console.log(isLeapYear(240000));    // true
console.log(isLeapYear(240001));    // false
console.log(isLeapYear(2000));      // true
console.log(isLeapYear(1900));      // false
console.log(isLeapYear(1752));      // true
console.log(isLeapYear(1700));      // true
console.log(isLeapYear(1));         // false
console.log(isLeapYear(100));       // true
console.log(isLeapYear(400));       // true