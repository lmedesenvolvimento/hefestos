var tts = {
  speak: function(text, onend){
    var speechSynthesis = new SpeechSynthesisUtterance(text);

    this.tts_config_defaults(speechSynthesis, onend)

    this.play(speechSynthesis)
  },
  play: function(speech){
    window.speechSynthesis.speak(speech);
  },
  tts_config_defaults: function(speech, onend){
    speech.lang = "pt-BR"
    speech.rate = 1
    speech.onend = onend
    speech.onstart = function(event) {
      return event
    };
  }
};
