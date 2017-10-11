var ApplicationConfig = function($stateProvider, $urlRouterProvider){
    $.get("config.json").then(angular.bind(this, Loader.onLoadManifest, $stateProvider, $urlRouterProvider))
}

ApplicationConfig.$inject = ['$stateProvider','$urlRouterProvider']

var ApplicationRun = function($rootScope, DrawerMenu){
    $rootScope.$global = GLOBAL
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
