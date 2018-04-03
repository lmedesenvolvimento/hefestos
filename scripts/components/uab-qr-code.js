var uabQrCodeCtrl = function($controller, $mdDialog){
  var self = this

  self.trigger = function(){
    $mdDialog.show({
      templateUrl: "templates/dialogs/qr-code.html",
      controller: "SimpleDialogCtrl",
      controllerAs: "dialog",
      clickOutsideToClose: true,
      locals: {
        title: null,
        text: null
      }
    })
  }

  return self;
}

uabQrCodeCtrl.$inject = ['$controller', '$mdDialog']

var uabQrCode = {
  controller: uabQrCodeCtrl,
  templateUrl: 'templates/uab-qr-code.html'
}

angular.module('application').component('uabQrCode', uabQrCode)