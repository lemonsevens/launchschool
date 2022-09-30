/* eslint-disable no-debugger */
/* 
INPUT: 
  -- string with 0 to many words
  -- separated with dashes or underscores
  -- 
OUTPUT: 
  -- string in camelCase or PascalCase
  -- first word only capitalized (PascalCase) if original is
  -- if input is empty return empty string
  
*/


function toCamelCase(str) {
  let arr = str.split(/-|_/);
  debugger;
  console.log(arr);
  for (let i = 1; i <= arr.length; i++) {
    debugger
    return arr[i][0].toUpperCase() + arr[i].slice('1');
  }
}

console.log(toCamelCase("the-stealth-warrior"));