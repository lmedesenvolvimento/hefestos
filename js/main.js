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
angular.module('application').component('uabTopico',{
  templateUrl: "templates/uab-topico-component"
});
  
var DELAY = 500;

var Backdrop = function($timeout){
    return {
        element: null,
        body: angular.element(document.body),
        template: "<div class='uab-dropback'></div>",
        toggle: function(){

        },
        open: function(onClose){
            // bind externals events
            this.onClose = onClose  
            //  Create backdrop element
            this.mount()            
            // bind envents for backdrop element
            return this.bindEvents(); 
        },
        close: function(){
            $timeout(angular.bind(this, this.unmount), DELAY);
            this.hide();
            return this.onClose();
        },
        bindEvents: function(){
            this.element.on('click', angular.bind(this, this.close));
        },
        show: function(){
            console.log("AQUI", this.element)
            this.element.addClass('visible');
        },
        hide: function(){
            this.element.removeClass('visible');
        },
        mount: function(){                 
            $timeout(angular.bind(this, this.show));
            this.element = angular.element(this.template);
            this.body.append(this.element);
        },
        unmount: function(){
            if(this.element) this.element.remove();
        },
        onClose: null
    };
};

Backdrop.$inject = ['$timeout']

angular.module("application").factory("Backdrop", Backdrop);

angular.module('application').component('uabDrawerMenu',{
    templateUrl: "templates/uab-drawer-menu"
});
    
var DrawerMenu = function($rootScope, Backdrop){
    var self = {};

    self.toggle = function(){
        $rootScope.$drawerMenuActive = !$rootScope.$drawerMenuActive;
        return $rootScope.$drawerMenuActive ? Backdrop.open(angular.bind(this, onCloseBackdrop)) : Backdrop.close()
    }

    self.open = function(){
        $rootScope.$drawerMenuActive = true;
        return Backdrop.open(angular.bind(this, onCloseBackdrop))
    }
    
    self.cancel = function(){
        try{            
            $rootScope.$drawerMenuActive = false;
            return Backdrop.close()
        } catch(e){
            return false
        }
    }

    var onCloseBackdrop = function(){        
        $rootScope.$drawerMenuActive = false;
        return $rootScope.$apply()
    }

    return self;
}

DrawerMenu.$inject = ['$rootScope', 'Backdrop']

angular.module("application").factory("DrawerMenu",  DrawerMenu)
var ApplicationCtrl = function(DrawerMenu){
    var self = this;

    self.toggleMenu = function(){
        DrawerMenu.toggle();
    };

    return self;
};

ApplicationCtrl.$inject = ['DrawerMenu']

angular.module("application").controller("ApplicationCtrl", ApplicationCtrl);