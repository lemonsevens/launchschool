// function factors(number) {
//   let divisor = number;
//   let factors = [];
//   do {
//     if (number % divisor === 0) {
//       factors.push(number / divisor);
//     }
//     divisor -= 1;
//   } while (divisor !== 0);
//   return factors;
// }

// factors(20);

function factorsTwo(number) {
  let divisor = number;
  let factors = [];
  if (number !== 0 && number > 0) {
    for (let i = number; i > 0; i--) {
      if (number % divisor === 0) {
        factors.push(number / divisor);
      }
      divisor -= 1;
    }
  }
  return factors;
}

factorsTwo(0);