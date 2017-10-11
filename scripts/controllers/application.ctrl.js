var ApplicationCtrl = function(DrawerMenu){
    var self = this;

    self.toggleMenu = function(){
        DrawerMenu.toggle();
    };

    return self;
};

ApplicationCtrl.$inject = ['DrawerMenu']

angular.module("application").controller("ApplicationCtrl", ApplicationCtrl);