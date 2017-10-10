var ApplicationConfig = function($stateProvider, $urlRouterProvider){
    $.get("config.json").then(angular.bind(this, Loader.onLoadManifest, $stateProvider, $urlRouterProvider))
}

ApplicationConfig.$inject = ['$stateProvider','$urlRouterProvider']

var ApplicationRun = function($rootScope, $templateCache){
    $rootScope.$global = GLOBAL

    $rootScope.$on('$stateChangeStart', angular.bind(this, Router.onStateChangeStart, $templateCache));
}

ApplicationRun.$inject = ['$rootScope', '$templateCache']

angular.module('application', [
  'ngAnimate',
  'ui.router',
  'ui.router.state.events'
])
    .config(ApplicationConfig)
    .run(ApplicationRun)

angular.module('application').component('uabTopico',{
  template: "<div class='row center-xs'><h1>{{$root.$global.current_topic.nome}}</h1></div>",
  controller: function($rootScope){
    console.log($rootScope)
  }
});
