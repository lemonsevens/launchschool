// Log all odd numbers from 1 to 99, inclusive, to the console, with each number on a separate line.
// INPUT: nothing
// OUTPUT: console.log odd numbers only (1-99 inclusive) with each number on a separate line

const READLINE = require('readline-sync');

console.log("What number should we limit the logging to? ");
let answer = READLINE.question();

for (let i = 1; i <= answer; i += 2) {
    console.log(i);
}