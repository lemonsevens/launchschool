// DESCRIPTION
// Write a function that takes two strings as arguments, determines the length of the two strings, and then returns the result of concatenating the shorter string, the longer string, and the shorter string once again. You may assume that the strings are of different lengths.

// EXPLICIT REQUIREMENTS
// - INPUT: two strings
// - OUTPUT: string
// - RULES:
// -- takes two strings as arguments
// -- determine length of both strings
// -- return concatenated string
// -- concatenate in this order: shorter string -> longer string -> same shorter string again
// -- input strings will always be different lengths

// EXAMPLES:
// shortLongShort('abc', 'defgh');    // "abcdefghabc"
// shortLongShort('abcde', 'fgh');    // "fghabcdefgh"
// shortLongShort('', 'xyz');         // "xyz"

// IMPLICIT REQUIREMENTS
// - if one string is empty, only return other string

// QUESTIONS:
// - what happens if there is a space in one or both strings?

// ALGORITHM:
// - take two string arguments
// - determine length of each string
// - if str1 is shorter, concatenate with str2 and again with str1
// - else if str2 is shorter, concatenate with str1 and again with str2
// - return concatenated string

function shortLongShort(str1, str2) {

  if (str1.length < str2.length) {
    return str1.concat(str2, str1);
  } else if (str1.length > str2.length) {
    return str2.concat(str1, str2)
  }
  
}

console.log(shortLongShort('abc', 'defgh'));
console.log(shortLongShort('abcde', 'fgh'));
console.log(shortLongShort('', 'xyz'));