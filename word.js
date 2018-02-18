var Letter = require('./letter.js');

function Word(word) {
    this.word = word;
    this.letters = [];
    this.wordFound = false;
}

Word.prototype.getLetters = function () {
    for (var i = 0; i < this.word.length; i++) {
        var newLetter = new Letter(this.word[i]);
        this.letters.push(newLetter);
    }
};

Word.prototype.wordComplete = function () {
    if (this.letters.every(function (lttr) {
        return lttr.appear === true;
    })) {
        this.wordFound = true;
        return true;
    }
};

Word.prototype.checkIfLetterFound = function (guessedLetter) {
    var showLetter = 0;
    this.letters.forEach(function (lttr) {
        if (lttr.letter === guessedLetter) {
            lttr.appear = true;
            showLetter++;
        }
    })
    return showLetter;
};

Word.prototype.showWord = function () {
    var display = '';
    this.letters.forEach(function (lttr) {
        var currentLetter = lttr.letterOrSpace();
        display += currentLetter;
    });
    return display;
};

module.exports = Word;