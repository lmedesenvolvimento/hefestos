var uabColorsCtrl = function($rootScope, $mdColorPalette){
  var self = this
  var tema = $rootScope.$global.manifest.tema

  self.colors = {
    primary: $mdColorPalette[tema.primario]["500"],
    accent: $mdColorPalette[tema.contraste]["500"]
  }

  return self
}

uabColorsCtrl.$inject = ['$rootScope','$mdColorPalette']

var uabColors = {
  controller: uabColorsCtrl,
  templateUrl: "templates/uab-colors.html"
};

angular.module('application').component('uabColors', uabColors)
