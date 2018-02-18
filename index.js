var inquirer = require('inquirer');
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
    guessesRemaining = 10;
    guessedLetters = [];
    var randNum = Math.floor(Math.random() * listOfWords.length);
    currentWord = new Word(listOfWords[randNum]);
    currentWord.getLetters();
    console.log("See if you can guess this word!");
    console.log(currentWord.showWord());
    keepPromptingUser();
};

function keepPromptingUser() {
    inquirer.prompt([{
        name: "chosenLetter",
        type: "input",
        message: "Pick a letter: ",
        validate: function (value) {
            if (value.match(/[a-zA-Z]/)) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function (letter) {
        var letterGuessed = (letter.chosenLetter).toUpperCase();
        var guessedAlready = false;
        for (var i = 0; i < guessedLetters.length; i++) {
            if (letterGuessed === guessedLetters[i]) {
                guessedAlready = true;
            }
        }
        if (guessedAlready === false) {
            guessedLetters.push(letterGuessed);
            var found = currentWord.checkIfLetterFound(letterGuessed);
            if (found === 0) {
                guessesRemaining--;
                console.log('Wrong guess. Try again!');
                console.log('Guesses remaining: ' + guessesRemaining);
                console.log('*******************');
                console.log(currentWord.showWord());
                console.log('\n*******************');
                console.log("Letters guessed: " + guessedLetters);
            } else {
                console.log('Yay! Nice guess.');
                if (currentWord.wordComplete() === true) {
                    console.log(currentWord.showWord());
                    console.log('Congratulations! You won the game!!!');
                    startGame();
                } else {
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
                console.log('The word was: ' + currentWord.word);
                startGame();
            }
        } else {
            console.log("That letter was already guessed. Try again.")
            keepPromptingUser();
        }
    });
}
startGame();