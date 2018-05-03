var Loader = {
    onLoadManifest: function(stateProvider, mdThemingProvider, urlRouterProvider, manifest){
        GLOBAL.manifest = manifest;

        // Set document settings
        document.title = GLOBAL.manifest.academico.curso

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

        var primaryPalette = manifest.tema.primario.split('-')
        var accentPalette = manifest.tema.contraste.split('-')

        mdThemingProvider
          .theme('default')
          .primaryPalette(primaryPalette[0], {
            'default': primaryPalette.length > 1 ? primaryPalette[1] : '500'
          })
          .accentPalette(accentPalette[0], {
            'default': accentPalette.length > 1 ? accentPalette[1] : '500'
          });


        // Configurando o tópico inicial
        var defaultTopic = _.find(manifest.topicos, { default: true });

        urlRouterProvider.otherwise("/" + defaultTopic.slug );
    }
}
