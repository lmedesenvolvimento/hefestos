var ApplicationConfig = function($stateProvider, $urlRouterProvider){
    $.get("config.json").then(angular.bind(this, Loader.onLoadManifest, $stateProvider, $urlRouterProvider))
}

ApplicationConfig.$inject = ['$stateProvider','$urlRouterProvider']

var ApplicationRun = function($rootScope, DrawerMenu){
    $rootScope.$global = GLOBAL

    var speaks = [
      "Olá,",
      "qual é o seu nome?",
      "site chibata",
      "fabinho developer faz delação premiada, cita bishedson"
    ]

    var speaks_position = 0

    function onspeakend(){
      speaks_position++;

      var text = speaks[speaks_position];

      return angular.isDefined(text) ? tts.speak(text, onspeakend) : false
    }

    tts.speak(speaks[speaks_position], onspeakend);

    $rootScope.$on('$stateChangeStart', angular.bind(this, Router.onStateChangeStart, $rootScope, DrawerMenu));
}

ApplicationRun.$inject = ['$rootScope', 'DrawerMenu']

angular.module('application', [
  'ngAnimate',
  'ui.router',
  'ui.router.state.events'
])
  .config(ApplicationConfig)
  .run(ApplicationRun)
