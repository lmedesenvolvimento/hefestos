var uabColorsCtrl = function($rootScope, $mdColorPalette){
  var self = this
  var tema = $rootScope.$global.manifest.tema

  var primario = tema.primario.split('-');
  var contraste = tema.contraste.split('-');

  self.colors = {
    primary: $mdColorPalette[primario[0]][primario[1] || "500" ],
    accent: $mdColorPalette[contraste[0]][contraste[1] || "500"]
  }

  console.log(self.colors)

  return self
}

uabColorsCtrl.$inject = ['$rootScope','$mdColorPalette']

var uabColors = {
  controller: uabColorsCtrl,
  templateUrl: "templates/uab-colors.html"
};

angular.module('application').component('uabColors', uabColors)
