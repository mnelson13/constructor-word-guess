let Letters = require("./letter.js");

let Words = function(word){
    this.letters = [];
    for (i in word){
        this.letters.push(new Letters(word[i]))
    };
    this.wordString = function(){
        let display = [];
        for (i in this.letters){
            display.push(" " + this.letters[i].toString() + " ");
        }
        console.log(display.join(""));
    };
    this.letterCheck = function(letter){
        for (i in this.letters){
            this.letters[i].guess(letter);
        }
    }
};

module.exports = Words;