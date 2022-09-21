/*
# Car Loan Calculator
## INPUT: loan amount, Annual Percentage Rate (APR), loan duration
## OUTPUT: monthly payment in dollars and cents ($325.54), total loan cost, total interest paid
---
FORMULA: let m = p * (j / (1 - Math.pow((1 + j), (-n))));
m = monthly payment
p = loan amount
j = monthly interest rate
n = loan duration in months
---
START
SET READLINE = require('readline-sync') for user inputs
SUBPROCESS to abstract and stylize console.log messages
SUBPROCESS to check for invalid numbers (NaN)
SUBPROCESS to process numbers with special characters ($, %, ",")
DO
  PRINT Welcome user to the Loan Calculator
  GET and SET loanAmount 
  GET and SET APR
  -- How will you handle different input formats: 5%, 5, .05
  -- -- remove the "%" character with above SUBPROCESS
  -- -- assume if input > 1 it needs to be divided by 100
  -- -- assume if input < 1 it can be left as is
  GET and SET loanDurationYears
  SET loanDurationMonths = (loanDurationYears * 12)
  SET monthlyInterestRate = (annualPercentageRate / 12)
  SET monthlyPayment = loanAmount * (monthlyInterestRate / (1 - Math.pow((1 + monthlyInterestRate), (-loanDurationMonths))))
  SET totalPayment = (loanDurationMonths * monthlyPayment)
  SET totalInterest = (totalPayment - loanAmount)
  PRINT monthlyPayment
  PRINT totalPayment
  PRINT totalInterest
  GET and SET anotherCalculation
WHILE Yes to anotherCalculation
END
*/

const READLINE = require('readline-sync');


// Helper functions

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trim() === '' || Number.isNaN(Number(number));
}

function numberPrompt(message) {
  prompt(message);
  let answer = READLINE.question().replace(',',"").replace('%',"").replace('$',"");
  while (invalidNumber(answer)) {
    prompt('That is an invalid number, please try again: ');
    answer = READLINE.question().replace(',',"").replace('%',"").replace('$',"");
  }
  return Number(Math.abs(answer));
}

function currencyFormatter(num) {
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(num)
}


let startOver;
do {  
  prompt("--------------------------------------------------");
  prompt("Welcome to the Best Loan Calculator!");
  prompt("--------------------------------------------------");

  let loanAmount = numberPrompt("What is the amount of your loan: ");

  let annualPercentageRate = numberPrompt("What is the APR of your loan: ");
  if (annualPercentageRate > 1) {
    annualPercentageRate /= 100;
  }

  let loanDurationYears = numberPrompt("What is the length of the loan (in years): ");

  let loanDurationMonths = loanDurationYears * 12;

  let monthlyInterestRate = (annualPercentageRate / 12);

  let monthlyPayment = (loanAmount * (monthlyInterestRate / (1 - Math.pow((1 + monthlyInterestRate), (-loanDurationMonths)))));

  let totalPayment = (loanDurationMonths * monthlyPayment);

  let totalInterest = (totalPayment - loanAmount);
  
  prompt("--------------------------------------------------");
  prompt(`Your monthly payment would be: ${currencyFormatter(monthlyPayment)}`);
  prompt(`You'd have a total of ${loanDurationMonths} payments for a grand total of: ${currencyFormatter(totalPayment)}`)
  prompt(`The total interest you will pay is: ${currencyFormatter(totalInterest)}`);
  prompt("--------------------------------------------------");
  
  prompt("Would you like to calculate another loan (y/n): ")
  startOver = READLINE.question().toLowerCase();
  while (["n", "y", "no", "yes"].indexOf(startOver) === -1) {
    prompt("Hmmmm... that's not a correct answer. Would you like to calculate another loan (y/n): ")
    startOver = READLINE.question().toLowerCase();
  }

} while (startOver === 'y' || startOver === 'yes');

prompt("Thanks for using the Best Loan Calculator!");