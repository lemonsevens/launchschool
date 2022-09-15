/* a function that takes two arrays of numbers and returns the result of merging the arrays. The elements of the first array should become the elements at the even indexes of the returned array, while the elements of the second array should become the elements at the odd indexes. For example:
merge([1, 2, 3], [4, 5, 6]); // => [1, 4, 2, 5, 3, 6]

- INPUT: two arrays of numbers
- OUTPUT: a single array with the two input arrays merged, with the elements of the first array placed at even indexes and elements of the second array placed at odd indexes
---
START
SET arr1 = [1, 2, 3]
SET arr2 = [4, 5, 6]
SET mergedArr = []
WHILE forEach pass element and index of arr1, push element from arr1 and element arr2 with same index position
PRINT mergedArr
*/

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

function mergedArr(arr1, arr2) {
  let mergedArr = [];
  arr1.forEach((el, index)=>{
    mergedArr.push(el, arr2[index])
  })
  console.log(mergedArr);
}

mergedArr(arr1, arr2);