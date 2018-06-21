var ApplicationCtrl = function ($rootScope, $mdMedia, $mdToast, $sce, Sidenav, Hotkeys) {
  var self = this;

  
  self.renderHTML = function(text){
    return $sce.trustAsHtml(text);
  }
  
  // Audio Button API
  self.listen = function (location, msg) {
    var sound = document.createElement('audio')
    
    sound.addEventListener('play', function (e) {
      $mdToast.showSimple( msg || 'Executando Faixa')
    })
    
    sound.src = location
    sound.play();
  }

  $rootScope.$mdMedia = $mdMedia;
  $rootScope.$renderHTML = self.renderHTML

  return self;
};

ApplicationCtrl.$inject = ['$rootScope', '$mdMedia', '$mdToast', '$sce', 'Sidenav','Hotkeys']

angular.module("application").controller("ApplicationCtrl", ApplicationCtrl);
