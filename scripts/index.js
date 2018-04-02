var manifest = {};

// Get Manifest
$.get("config.json").then(bootstrapApplication)

var ApplicationConfig = function($stateProvider, $mdThemingProvider, $urlRouterProvider, $provide){
  // Configurando o comportamento das roteador
  View.configure($provide)
  // Configurando a aula de acordo com seus meta dados
  Loader.onLoadManifest($stateProvider, $mdThemingProvider, $urlRouterProvider, manifest)
}

ApplicationConfig.$inject = ['$stateProvider', '$mdThemingProvider','$urlRouterProvider','$provide']

var ApplicationRun = function($rootScope){
    $rootScope.$global = GLOBAL
    // Eventos de Rotas
    $rootScope.$on('$stateChangeStart', angular.bind(this, Router.onStateChangeStart, $rootScope));
    $rootScope.$on('$stateChangeSuccess', angular.bind(this, Router.onStateChangeSuccess, $rootScope));

    // Init Fancybox
    $().fancybox({
      selector: '[data-fancybox]',
      buttons: [
        'slideShow',
        'zoom',
        'close'
      ],
      loop: false,
    });
}

ApplicationRun.$inject = ['$rootScope']

var app = angular.module('application', [
  'ngAnimate',
  'ngMaterial',
  'angular-carousel',
  'ui.router',
  'ui.router.state.events'
])

app.config(ApplicationConfig).run(ApplicationRun)

function bootstrapApplication(response){
  angular.element(document).ready(function(){
    manifest = response;
    angular.bootstrap(document, ['application']);
  })
}
