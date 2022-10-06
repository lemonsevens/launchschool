function foo(number) {
  return number;
}

let number = 1;
let newNumber = foo(number);
console.log(number);    // 1
console.log(newNumber); // 1

number = 3;
console.log(number);    // 3
console.log(newNumber); // 1