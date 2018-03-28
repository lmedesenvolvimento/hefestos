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
