let Letters = function(character){
    this.character = character;
    this.guessed = false;
    this.toString = function(){
        if (this.guessed === true) {
            display = this.character;
            return display;
        } else if (this.guessed === false){
            display = "_"
            return display;
        }
    };
    this.guess = function(letter){
        if(letter === character){
            this.guessed = true;
        }
    };
};

module.exports = Letters;