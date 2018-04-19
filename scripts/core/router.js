var Router = {
    onStateChangeStart: function(root, event, toState, toParams, fromState, fromParams){
      GLOBAL.current_topic = _.find(GLOBAL.manifest.topicos, {slug: toState.name})
      // Notify application
      root.$emit('topic:change', GLOBAL.current_topic)      
    },
    onStateChangeSuccess: function(root, event, toState, toParams, fromState, fromParams){
      // setTimeout(angular.bind(this, Reader.readTopicAsVoice), 500)
    }
};
