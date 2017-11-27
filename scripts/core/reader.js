CHROME_MAX_LENGTH = 200

var Reader = {
  getCurrentTopicTexts: function(){
    var texts = []
    var mainContent = document.querySelector("main");

    var contentTags = $(mainContent).children()

    for (var i=0, max=contentTags.length; i < max; i++) {
      texts.push(contentTags[i].outerText || contentTags[i].textContent);
    }

    return texts
  },

  readTopicAsVoice: function(){
    var complete_sentence = Reader.getCurrentTopicTexts().join("");
    var queue_position = 0;

    var sentences = complete_sentence.split(/[\.\,\;\:\n\)\(]/);

    // removendo sentenças em branco
    sentences = _.remove(sentences, function(s){
      return s.length
    })

    _.each(sentences, function(s){
      console.log(s.length)
    })

    // @private
    function onspeakend(){
      queue_position++;

      var text = sentences[queue_position];

      return angular.isDefined(text) ? tts.speak(text, onspeakend) : false
    }

    tts.speak(sentences[queue_position], onspeakend);
  },
}
