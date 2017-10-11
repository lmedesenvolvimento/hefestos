var Router = {
    onStateChangeStart: function(root, DrawerMenu, event, toState, toParams, fromState, fromParams){
        GLOBAL.current_topic = _.find(GLOBAL.manifest.topicos, {slug: toState.name})        
        return DrawerMenu.cancel();
    }
};
