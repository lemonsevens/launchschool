// INPUT: user enters an integer greater than 0, then decides between "sum" or "product"
// OUTPUT: the sum or product of all number between 1 and the integer provided

/*
START
GET and SET let int = any integer greater than 0 from user input
GET and SET let type = string of "s" for sum or "p" for product from user input
SET arr = empty array
SUBPROCESS for loop every integer from 1 to "int" and push into an array 
IF type === "s" then run the .reduce array method with previousValue + currentValue and console.log the result
ELSE type === "p" then run the .reduce array method with previousValue * currentValue and console.log the result
END
*/ 

const READLINE = require ('readline-sync');

let int = READLINE.question("Enter any integer greater than 0: ");
let type = READLINE.question("Enter 's' for the sum or 'p' for the product: ")
let arr = [];

for (let i = 1; i <= int; i++) {
  arr.push(i);
}


if (type === "s") {
  const initialValue = 0;
  const sumWithInitial = arr.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );
  console.log(`The sum is: ${sumWithInitial}`);
} else if (type === "p") {
  const initialValue = 1;
  const productWithInitial = arr.reduce(
    (previousValue, currentValue) => previousValue * currentValue,
    initialValue
  );
  console.log(`The product is: ${productWithInitial}`);
}