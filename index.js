// Refer to the online book to access detailed instructions for this project.
const input = require('readline-sync');
// URL = https://education.launchcode.org/intro-to-professional-web-dev/assignments/scrabble-scorer.html
let scrabble = {
  name: 'Scrabble',
  description : 'The traditional scoring algorithm.',
  scoreFunction : function scrabbleScore (word, newPointStructure){
    word = word.toUpperCase();
    let score = 0;
    for (let i = 0; i < word.length; i++){
      score += Number(newPointStructure[word[i]]);
    }
    return score;
  }
}

let simple = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scoreFunction : function simpleScore(word){
    return word.length;
  }
}

let vowelsAre3 = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scoreFunction: function bonusVowels(word){
    word = word.toUpperCase();
    let vowels = ['A', 'E', 'I', 'O', 'U'];
    let score = 0;
    for (let i = 0; i < word.length; i++){
      if (vowels.includes(word[i])){
        score += 3;
      } else {
        score += 1;
      }
    }
    return score;
  }

}

function isValidWord(word, newPointStructure){
  let okSoFar = 0;
  for (let i = 0; i < word.length; i++){
    for (item in newPointStructure){
      if (item === (word[i]).toUpperCase()){
        okSoFar += 1;
      } else {
        okSoFar += 0;
      }
    }
  }
  okSoFar = okSoFar - word.length;
  if (okSoFar === 0){
    return true;
  } else {
    return false;
  }
}

// Code your transform function here:
function transform(oldObj){
  let newObj = {};
  for (k in oldObj){
    for (let i = 0; i < oldObj[k].length; i++){
      newObj[oldObj[k][i]] = k;
    }
  }
  return newObj;
}

// Code your initialPrompt function here:
function initialPrompt(){
  console.log("Welcome to the Scrabble score calculator!\n");
  return input.question('Which scoring algorithm would you like to use?\n\n0 - Scrabble: The traditional scoring algorithm.\n1 - Simple Score: Each letter is worth 1 point.\n2 - Bonus Vowels: Vowels are worth 3 pts, and consonants are 1 pt.\n\nEnter 0, 1, or 2: ');
}


// Code your runProgram function here:
function runProgram (scoringAlgs){
  let valids = ['0','1','2'];
  let userResponse = initialPrompt();
  while(!valids.includes(userResponse)){
    console.log("No, that's not a valid choice.\n")
    userResponse = input.question('Enter 0, 1, or 2: ');
  }
  console.log(`\nUsing algorithm: ${scoringAlgorithms[userResponse].name}\n`)
  let wordToScore = ' ';
  while(true){
    wordToScore = input.question(`Enter a word to be scored, or 'Stop' to quit: `);
    while(isValidWord(wordToScore, newPointStructure) === false){
      wordToScore = input.question(`Not a valid word. Enter a word to be scored, or 'Stop' to quit: `);
    }
    if (wordToScore.toUpperCase() === 'STOP'){
      return;
    } else {
      console.log(`Score for '${wordToScore}': ${scoringAlgs[userResponse].scoreFunction(wordToScore, newPointStructure)}
    `)
    }
  }
}

// Here is the oldPointStructure object:
const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

// Use the transform function to create the newPointStructure object here:
newPointStructure = transform(oldPointStructure);
newPointStructure[' ']= 0;

// Create your scoringAlgorithms array here:
let scoringAlgorithms = [scrabble, simple, vowelsAre3];

// Call the runProgram function here:
runProgram(scoringAlgorithms);