var inquirer = require('inquirer');
var isLetter = require('is-letter');
var Word = require('./word.js');
var listOfWords = ["BANANA", "APPLE", "MANGO", "ORANGE", "STARFRUIT", "WATERMELON", "KIWI", "CHERRY", "RASPBERRY", "BLUEBERRY"];
var guessesRemaining = 10;
var guessedLetters = [];
var currentWord = null;

function startGame() {
    inquirer.prompt([{
        name: "play",
        type: "confirm",
        message: "Do you want to guess a word?"
    }]).then(function (user) {
        if (user.play) {
            newGame();
        } else {
            console.log("No worries. Come back when you're ready.");
        }
    })
};

function newGame() {
    console.log("See if you can guess this word!");
    var randNum = Math.floor(Math.random() * listOfWords.length);
    currentWord = new Word(listOfWords[randNum]);
    currentWord.getLetters();
    console.log(currentWord.showWord());
    keepPromptingUser();
};

function keepPromptingUser() {
    //asks player for a letter
    inquirer.prompt([{
        name: "chosenLetter",
        type: "input",
        message: "Choose a letter:",
        validate: function (value) {
            if (isLetter(value)) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function (letter) {
        //toUpperCase because words in word bank are all caps
        var letterReturned = (letter.chosenLetter).toUpperCase();
        //adds to the guessedLetters array if it isn't already there
        var guessedAlready = false;
        for (var i = 0; i < guessedLetters.length; i++) {
            if (letterReturned === guessedLetters[i]) {
                guessedAlready = true;
            }
        }
        //if the letter wasn't guessed already run through entire function, else reprompt user
        if (guessedAlready === false) {
            guessedLetters.push(letterReturned);

            var found = currentWord.checkIfLetterFound(letterReturned);
            //if none were found tell user they were wrong
            if (found === 0) {
                console.log('Nope! You guessed wrong.');
                guessesRemaining--;
                console.log('Guesses remaining: ' + guessesRemaining);
                console.log('\n*******************');
                console.log(currentWord.showWord());
                console.log('\n*******************');

                console.log("Letters guessed: " + guessedLetters);
            } else {
                console.log('Yes! You guessed right!');
                //checks to see if user won
                if (currentWord.wordComplete() === true) {
                    console.log(currentWord.showWord());
                    console.log('Congratulations! You won the game!!!');
                    // that.startGame();
                } else {
                    // display the user how many guesses remaining
                    console.log('Guesses remaining: ' + guessesRemaining);
                    console.log(currentWord.showWord());
                    console.log('\n*******************');
                    console.log("Letters guessed: " + guessedLetters);
                }
            }
            if (guessesRemaining > 0 && currentWord.wordFound === false) {
                keepPromptingUser();
            } else if (guessesRemaining === 0) {
                console.log('Game over!');
                console.log('The word you were guessing was: ' + currentWord.word);
            }
        } else {
            console.log("You've guessed that letter already. Try again.")
            keepPromptingUser();
        }
    });
}
startGame();