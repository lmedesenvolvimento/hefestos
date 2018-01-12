var ApplicationCtrl = function($rootScope, $mdMedia, Sidenav){
    var self = this;

    $rootScope.$mdMedia = $mdMedia;

    return self;
};

ApplicationCtrl.$inject = ['$rootScope','$mdMedia','Sidenav']

angular.module("application").controller("ApplicationCtrl", ApplicationCtrl);
