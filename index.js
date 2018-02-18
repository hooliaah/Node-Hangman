// require inquirer
var inquirer = require('inquirer');
// requre is-letter
var isLetter = require('is-letter');
// require objects/exports
var Word = require('./word.js');
var listOfWords = ["WORDS", "HELLO WORLD", "ANOTHER ANSWER"];
var wordBank = listOfWords;
var guessesRemaining = 10;
// empty array to hold letters guessed by user. And checks if the user guessed the letter already
var guessedLetters = [];
var currentWord = null;
// asks user if they are ready to play
function startGame() {

    // clears guessedLetters before a new game starts if it's not already empty.
    if (guessedLetters.length > 0) {
        guessedLetters = [];
    }

    inquirer.prompt([{
        name: "play",
        type: "confirm",
        message: "Ready to play?"
    }]).then(function (answer) {
        if (answer.play) {
            newGame();
        } else {
            console.log("Fine, I didn't want to play anyway..");
        }
    })
};
//if they want to play starts new game.
function newGame() {
    if (guessesRemaining === 10) {
        console.log("Okay! Here we go!");
        console.log('*****************');
        //generates random number based on the wordBank
        var randNum = Math.floor(Math.random() * wordBank.length);
        currentWord = new Word(wordBank[randNum]);
        currentWord.getLets();
        //displays current word as blanks.
        console.log(currentWord.wordRender());
        keepPromptingUser();
    } else {
        resetGuessesRemaining();
        newGame();
    }
};
function resetGuessesRemaining() {
    this.guessesRemaining = 10;
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
                console.log(currentWord.wordRender());
                console.log('\n*******************');

                console.log("Letters guessed: " + guessedLetters);
            } else {
                console.log('Yes! You guessed right!');
                //checks to see if user won
                if (currentWord.didWeFindTheWord() === true) {
                    console.log(currentWord.wordRender());
                    console.log('Congratulations! You won the game!!!');
                    // that.startGame();
                } else {
                    // display the user how many guesses remaining
                    console.log('Guesses remaining: ' + guessesRemaining);
                    console.log(currentWord.wordRender());
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