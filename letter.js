// A function that takes a character as an argument and checks it against the underlying character, 
// updating the stored boolean value to true if it was guessed correctly


var Letter = function (letter) {
    // property to store the actual letter
    this.letter = letter;
    // property/boolean if the letter can be shown
    this.appear = false;
};

Letter.prototype.letterRender = function () {
    if (this.letter == ' ') { /*renders a blank as it is*/
        //makes sure that when the function checks if the word is found doesn't read the blank as false.
        this.appear = true;
        return '  ';
    } if (this.appear === false) { /*if it doesn't appear, it returns a ' _ '*/
        return ' _ ';
    } else { /*otherwise it just appears as itself*/
        return this.letter;
    }
}

// export to use in word.js
module.exports = Letter;