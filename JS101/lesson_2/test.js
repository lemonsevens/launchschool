Wondering how this works:

let arr = [1, 2, 3, 4, 5, 6, 7];

console.log(arr.forEach(elem => {
  arr.splice(0, 1);
  console.log(elem);
})); // 1, 3, 5, 7