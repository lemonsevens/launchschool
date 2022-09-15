/* a function that determines the index of the 3rd occurrence of a given character in a string. For instance, if the given character is 'c' and the string is 'abcabcabc', the function should return 8 (the index of the 3rd 'c'). 
- INPUT: a character and a string
- OUTPUT: print index of third occurrence of given character within string
*/ 

let string = "abcabcabca"
let char = "c"

function thirdOcc(string, char) {
  let strArr = string.split('');
  let indices = [];
  let idx = strArr.indexOf(char)
  while (idx != -1) { // what does the -1 mean here?
    indices.push(idx);
    idx = strArr.indexOf(char, idx + 1); // what is happening here?
  }
  console.log(indices[2]); // 8
}

thirdOcc(string, char)