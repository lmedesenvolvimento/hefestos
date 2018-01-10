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
