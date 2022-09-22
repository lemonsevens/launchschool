// INPUT: user input of length and width of room in meters
// OUTPUT: log the area of the room in square meters and square feet
// UPDATE: allow user to decide calculation metric (meters or feet)

const READLINE = require('readline-sync');

console.log("What measurement type would you like to calculate: meters or feet?");
let unitType = READLINE.question().toLowerCase();

while (!["feet", "meters"].includes(unitType)) {
  console.log("Hmmm... that's not a correct answer. What measurement type would you like to calculate: meters or feet?");
  unitType = READLINE.question().toLowerCase();
}

if (unitType === "meters") {
  console.log("Enter the length of the room in meters: ");
  let lengthMeters = Number(READLINE.question());

  console.log("Enter the width of the room in meters: ");
  let widthMeters = Number(READLINE.question());

  let areaSquareMeters = (lengthMeters * widthMeters);
  let areaSquareFeet = (areaSquareMeters * 10.764);

  console.log(`The area of the room is ${areaSquareMeters.toFixed(2)} square meters (${areaSquareFeet.toFixed(2)} square feet).`);
} else if (unitType === "feet") {
  console.log("Enter the length of the room in feet: ");
  let lengthFeet = Number(READLINE.question());

  console.log("Enter the width of the room in feet: ");
  let widthFeet = Number(READLINE.question());

  let areaSquareFeet = (lengthFeet * widthFeet);
  let areaSquareMeters = (areaSquareFeet / 3.281);

  console.log(`The area of the room is ${areaSquareFeet.toFixed(2)} square feet (${areaSquareMeters.toFixed(2)} square meters).`);
}