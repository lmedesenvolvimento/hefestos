var Router = {
    onStateChangeStart: function(templateCache, event, toState, toParams, fromState, fromParams){
        GLOBAL.current_topic = _.find(GLOBAL.manifest.topicos, {slug: toState.name})
    }
};
