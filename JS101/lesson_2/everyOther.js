let arr = [1,4,7,2,5]

function everyOther(arr) {
  let newArr = []
  for (let el = 0; el <= arr.length; el += 2) {
    newArr.push(arr[el]);
  }
  console.log(newArr);
}

everyOther(arr);
