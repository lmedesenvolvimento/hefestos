var uabColorsCtrl = function($rootScope, $mdColorPalette, Colors){
  var self = this
  var tema = $rootScope.$global.manifest.tema

  var primario = tema.primario.split('-');
  var contraste = tema.contraste.split('-');

  self.colors = {
    primary: $mdColorPalette[primario[0]][primario[1] || "500" ],
    accent: $mdColorPalette[contraste[0]][contraste[1] || "500"]
  }

  Colors.primary = self.colors.primary
  Colors.accent = self.colors.accent

  return self
}

uabColorsCtrl.$inject = ['$rootScope', '$mdColorPalette', 'Colors']

var uabColors = {
  controller: uabColorsCtrl,
  templateUrl: "templates/uab-colors.html"
};

angular.module('application').component('uabColors', uabColors)
