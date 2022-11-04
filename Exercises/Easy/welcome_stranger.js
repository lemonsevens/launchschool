/*
Create a function that takes 2 arguments, an array and an object. The array will contain 2 or more elements that, when combined with adjoining spaces, will produce a person's name. The object will contain two keys, "title" and "occupation", and the appropriate values. Your function should return a greeting that uses the person's full name, and mentions the person's title.

INPUT: array and object
OUTPUT: string interpolation
RULES:
  - takes in 2 arguments, an array and an object
  - array will contain 2 or more elements 
    - first name
    - last name
  - object will contain two properties
    - title
    - occupation
  - return a greeting using the full name and title

ALGORITHM:
  - take in two arguments and initialize to:
    - arr
    - obj
  - declare "fullName" and initialize to arr.join(" ")
  - declare "title" and initialize to object value of title property
  - declare "occ" and initialize to object value of occupation property
  - declare "titleOcc" and concat title and occ
  - declare "greeting" and initialize to string interpolation matching example case
  - return greeting
*/

function greetings(arr, obj) {
  return `Hello, ${arr.join(" ")}! Nice to have a ${obj.title} ${obj.occupation} around.`
}


console.log(
  greetings(["John", "Q", "Doe"], { title: "Master", occupation: "Plumber" })
);
// logs Hello, John Q Doe! Nice to have a Master Plumber around.