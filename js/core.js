var GLOBAL = {
    manifest: null
}
var Loader = {
    onLoadManifest: function(stateProvider, mdThemingProvider, urlRouterProvider, manifest){
        GLOBAL.manifest = manifest;

        // Set document settings
        document.title = GLOBAL.manifest.nome

        manifest.topicos.forEach(function(t, position){
          t.slug = S(t.nome).slugify().s;
          t.position = position;

          stateProvider.state({
              name: t.slug,
              url: "/" + t.slug,
              templateUrl: t.local,
              cache: false
          });
        });

        // Configurando Tema

        mdThemingProvider
          .theme('default')
          .primaryPalette(manifest.tema.primario)
          .accentPalette(manifest.tema.contraste);


        // Configurando o tópico inicial
        var defaultTopic = _.find(manifest.topicos, { default: true });

        urlRouterProvider.otherwise("/" + defaultTopic.slug );
    }
}

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

var Router = {
    onStateChangeStart: function(root, event, toState, toParams, fromState, fromParams){
      // Limpando fila leitor de aulas
      tts.clear();
      GLOBAL.current_topic = _.find(GLOBAL.manifest.topicos, {slug: toState.name})
      // Notify application
      root.$emit('topic:change', GLOBAL.current_topic)
      // Configure Fancybox
      $("[data-fancybox]").fancybox();
    },
    onStateChangeSuccess: function(root, event, toState, toParams, fromState, fromParams){
      // setTimeout(angular.bind(this, Reader.readTopicAsVoice), 500)
    }
};

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

var View = {
  configure: function($provide){
    $provide.decorator('$uiViewScroll', function ($delegate) {
      return function (uiViewElement) {
        var content = $(uiViewElement).closest("md-content")
        // Return to top from md-content every change route
        $(content).scrollTop(0)
        // Focus in content
        $(content).focus()
      };
    });

    // Observe content scroll
    $('.main').on('scroll', function(e){
      var element = $(e.target);
      var body = $('body');

      // $('.main').scrollTop() >= 200 
      //   ? $('uab-header-titles').addClass('hidden') 
      //   : $('uab-header-titles').removeClass('hidden')
      
      $('.main').scrollTop() >= 200 
        ? $('uab-header').addClass('hidden') 
        : $('uab-header').removeClass('hidden')
    })
  }
}
