var manifest = {};

var ApplicationConfig = function($stateProvider, $mdThemingProvider, $urlRouterProvider){
  Loader.onLoadManifest($stateProvider, $mdThemingProvider, $urlRouterProvider, manifest)
}

ApplicationConfig.$inject = ['$stateProvider', '$mdThemingProvider','$urlRouterProvider']

var ApplicationRun = function($rootScope){
    $rootScope.$global = GLOBAL
    // Limpando fila leitor de aulas
    tts.clear();
    // Eventos de Rotas
    $rootScope.$on('$stateChangeStart', angular.bind(this, Router.onStateChangeStart, $rootScope));
    $rootScope.$on('$stateChangeSuccess', angular.bind(this, Router.onStateChangeSuccess, $rootScope));
}

ApplicationRun.$inject = ['$rootScope']

var app = angular.module('application', [
  'ngAnimate',
  'ngMaterial',
  'ui.router',
  'ui.router.state.events'
])

app.config(ApplicationConfig).run(ApplicationRun)

$(window).on('load', function(){
  $.get("config.json").then(function(response){
    manifest = response;
    angular.bootstrap(document, ['application']);
  })
})
