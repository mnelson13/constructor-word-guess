let inquirer = require("inquirer");
let Words = require("./word.js");
let chalk = require("chalk");

let wordsArray = ["cat", "dog", "tiger", "cougar", "bear", "orangutan", "lemur", "giraffe", "zebra", "gibbon", "leopard", "alligator"]

let guessesRemaining = 9;
let currentWordString = "";
let currentWord = "";
let wordGuessed = false;

console.log(chalk.bgCyan("Animals Word Guess!"))
//function to choose a new current word and make a new Words constructor instance
let newCurrentWord = function(){
    let num = Math.floor(Math.random() * wordsArray.length);
    currentWordString = wordsArray[num];
    currentWord = new Words(currentWordString);
    currentWord.wordString();
    // console.log(currentWord);
};


newCurrentWord();

//function to check if the current word has been guessed
function wordGuessedChecker(){
    function isGuessed(letter){
            return (letter.guessed === true)
        };

    let array = currentWord.letters;
        let test = array.every(isGuessed);
        // console.log(test);

    if (test === true){
        wordGuessed = true;
    }
}

//reset function to run when word is guessed or you run out of guesses
function reset(){
    inquirer.prompt([
        {
            type: "list",
            name: "continue",
            message: "Would you like a new word?",
            choices: ["Yes", "No"]
        }
    ]).then(function(answer){
        if(answer.continue === "Yes"){
            guessesRemaining = 9;
            wordGuessed = false;
            newCurrentWord();
            askLetter();
        } else if(answer.continue === "No"){
            console.log("See you next time!")
        }
    })
}

//function to prompt for a letter guess
let askLetter = function(){
    wordGuessedChecker();
    if(guessesRemaining > 0 && wordGuessed === false ){
        inquirer.prompt([
            {
                name: "guess",
                message: "Guess a Letter! "
            }
        ]).then(function(answer){
            if (currentWordString.indexOf(answer.guess) !== -1) {
                currentWord.letterCheck(answer.guess);
                console.log(chalk.green("CORRECT!"))
                console.log("Guesses Remaining: " + guessesRemaining)
                currentWord.wordString();
                askLetter();
            } else if (currentWordString.indexOf(answer.guess) === -1){
                guessesRemaining--
                console.log(chalk.red("INCORRECT!"));
                console.log("Guesses Remaining: " + guessesRemaining);
                currentWord.wordString();
                askLetter();
            }
        })
    } else if (guessesRemaining <= 0 && wordGuessed === false){
        console.log(chalk.red("Out of guesses!"));
        reset();

    } else if (guessesRemaining > 0 && wordGuessed === true){
        console.log(chalk.green("You got it right! 😎"));
        reset();
    }
}

askLetter();




