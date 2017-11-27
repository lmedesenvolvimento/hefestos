var tts = {
  utterance: {},

  speak: function(text, onend){
    tts.utterance = new SpeechSynthesisUtterance(text);
    this.tts_config_defaults(tts.utterance, onend);
    this.play(tts.utterance);
  },

  clear: function(){
    tts.utterance.onend = null
    window.speechSynthesis.cancel();
  },

  play: function(speech){
    window.speechSynthesis.speak(speech);
  },

  tts_config_defaults: function(speech, onend){
    speech.lang = "pt-BR";
    speech.rate = 1;
    speech.onerror = function(){
      tts.clear();
    }
    speech.onend = onend;
  }
};
