// Constantes
MAX_FONT_SIZE = 20.5; // 22px
MIN_FONT_SIZE = 8.5; // 14px
DEFAULT_FONT_SIZE = 12.5; // 18.5px

var uabHeaderCtrl = function($rootScope, Sidenav, Annotations){
  var self = this;

  self.toggleSidenav = function(){
    Sidenav.open()
  };

  self.toggleAnnotations = function(){
    Annotations.toggle()
  };

  self.increaseText = function(){
    var font_size = $("body").css("font-size").replace('px','');
    var increment = parseFloat(font_size) + 2;
    increment <= MAX_FONT_SIZE ? $("body, html").css("font-size", floatToPx(increment)) : false
  }

  self.decreaseText = function(){
    var font_size = $("body").css("font-size").replace('px','');
    var increment = parseFloat(font_size) - 2;
    increment >= MIN_FONT_SIZE ? $("body, html").css("font-size", floatToPx(increment)) : false
  }

  self.toggleHightContrast = function(){
    $("body").toggleClass("hc")
  }

  // @private
  floatToPx = function(number){
    console.log(number);
    return number + "px";
  }

  $rootScope.$on("$stateChangeSuccess", function(){
    Sidenav.close()
  })

  return self;
}

uabHeaderCtrl.$inject = ['$rootScope','Sidenav','Annotations']

var uabHeader = {
  controller: uabHeaderCtrl,
  templateUrl: "templates/uab-header.html"
}

angular.module('application').component('uabHeader', uabHeader)
