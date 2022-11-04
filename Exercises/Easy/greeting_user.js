/*
DESCRIPTION:
Write a program that will ask for user's name. The program will then greet the user. If the user writes "name!" then the computer yells back to the user.

INPUT: user input 
OUTPUT: console.log string
RULES:
  - ask for user name
  - return greeting using input name
  - if "!" special characte is used, return special greeting
    - special greeting is UPPERCASE


EXAMPLES:
What is your name? Bob
Hello Bob.

What is your name? Bob!
HELLO BOB. WHY ARE WE SCREAMING?


ALGORITHM:
  - declare readline and initialize to require("readline-sync")
  - declare "name" and initialize to value from readline.question("What is your name? ")
  - if name includes ! then:
    - assign name to name.toUpperCase()
    - return `HELLO ${name}. WHY ARE WE SCREAMING?`
  - else return `Hello ${name}`

*/

// const readline = require("readline-sync");
// let name = readline.question("What is your name? ");

// function greeting(str) {
//   if (str.includes("!")) {
//     return `HELLO ${str.toUpperCase()} WHY ARE WE SCREAMING?`;
//   }
//   return `Hello ${str}.`
// }

// console.log(greeting(name));

let readlineSync = require("readline-sync");

let name = readlineSync.question("What is your name?\n");

if (name[name.length - 1] === "!") {
  name = name.slice(0, -1);
  console.log(`HELLO ${name.toUpperCase()}. WHY ARE YOU SCREAMING?`);
} else {
  console.log(`Hello ${name}.`);
}