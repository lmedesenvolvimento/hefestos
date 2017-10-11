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