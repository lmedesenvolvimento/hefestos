var ApplicationCtrl = function ($rootScope, $mdMedia, $mdToast, Sidenav) {
  var self = this;

  $rootScope.$mdMedia = $mdMedia;

  // Audio Button API
  self.listen = function (location, msg) {
    var sound = document.createElement('audio')

    sound.addEventListener('play', function (e) {
      $mdToast.showSimple( msg || 'Executando Faixa')
    })

    sound.src = location
    sound.play();
  }

  return self;
};

ApplicationCtrl.$inject = ['$rootScope', '$mdMedia', '$mdToast', 'Sidenav']

angular.module("application").controller("ApplicationCtrl", ApplicationCtrl);
