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

var uabHeader = {
  templateUrl: "templates/uab-header"
}

angular.module('application').component('uabHeader', uabHeader)

var uabPaginationCtrl = function($rootScope, $timeout){
    var self = this;


    self.next = function(){
        var currentPosition  = $rootScope.$global.current_topic.position + 1;
        var hasIndex = $rootScope.$global.manifest.topicos[currentPosition];
        
        self.nextTopic = hasIndex;

        return angular.isDefined(hasIndex) ? true : false;
    }

    self.prev = function(){
        var currentPosition  = $rootScope.$global.current_topic.position - 1;
        var hasIndex = $rootScope.$global.manifest.topicos[currentPosition];

        self.prevTopic = hasIndex;

        return angular.isDefined(hasIndex) ? true : false;
    }

    self.reset = function(){
        self.nextTopic = null;
        self.prevTopic = null;
    }

    self.$onInit = function(){        
        self.reset();
        $timeout(angular.bind(this, self.next));
        $timeout(angular.bind(this, self.prev));
    }
    
    $rootScope.$on("$stateChangeStart", function(event){
        self.reset();
        $timeout(angular.bind(this, self.next));
        $timeout(angular.bind(this, self.prev));
    });

    return self;
}

uabPaginationCtrl.$inject = ['$rootScope','$timeout']

angular.module("application").component("uabPagination",{
    controller: uabPaginationCtrl,
    templateUrl: "templates/uab-pagination"
})
var ApplicationCtrl = function(){
    var self = this;

    self.toggleMenu = function(){
    };

    return self;
};

ApplicationCtrl.$inject = []

angular.module("application").controller("ApplicationCtrl", ApplicationCtrl);
