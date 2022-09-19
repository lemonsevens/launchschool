function lowerInitial(word) {
  let trimWord = word.trim();
  if (trimWord.length === 0) {       
    return '-';                  
  }

  return trimWord[0].toLowerCase();  
}                                
                                 
console.log(lowerInitial('    '));