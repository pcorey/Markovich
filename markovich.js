function Markovich() {
   this.chain = {};
}

Markovich.prototype.analyze = function(text) {
   var words = text.split(/\s+/),
       chain = this.chain;
   words.reduce(function(last, curr) {
      if (last.indexOf('.') != -1) {
         last = '';
      }
      if (!chain[last]) {
         chain[last] = [];
      }
      chain[last].push(curr);
      return curr;
   }, '');
};

Markovich.prototype.gibberish = function(numSentences) {
   var text = '';
   for (var i = 0; i < numSentences; i++) {
      var lastWord = '';
      do {
         var idx = Math.floor(Math.random() *
                              this.chain[lastWord].length);
         lastWord = this.chain[lastWord][idx];
         text += " " + lastWord;
      } while (lastWord.indexOf('.') == -1);
   } 
   return text;
};

var markov = new Markovich();
markov.analyze("He is a boy. She is a girl. He is young. She is younger.");
console.log(markov.chain);
console.log(markov.gibberish(5));
