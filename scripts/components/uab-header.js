// Constantes
MAX_FONT_SIZE = 20.5; // 22px
MIN_FONT_SIZE = 8.5; // 14px
DEFAULT_FONT_SIZE = 12.5; // 18.5px

var uabHeaderCtrl = function($rootScope, Sidenav, Annotations, Aplayer){
  var self = this;

  self.toggleSidenav = function(){
    Sidenav.open()
  };

  self.toggleAnnotations = function(){
    Annotations.toggle()
  };

  self.toggleAplayer = function(){
    if(Aplayer.instance){
      Aplayer.toggle();
      self.AplayerPlaying = Aplayer.playing;
    }
  }

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
    return number + "px";
  }

  $rootScope.$on("$stateChangeSuccess", function(){
    Sidenav.close();
  })

  $rootScope.$on('aplayer:update', function(event, data){
    self.AplayerPlaying = false;
  });

  $rootScope.$on('aplayer:play', function(event, data){
    self.AplayerPlaying = true;
  });

  return self;
}

uabHeaderCtrl.$inject = ['$rootScope','Sidenav','Annotations','Aplayer']

var uabHeader = {
  controller: uabHeaderCtrl,
  templateUrl: "templates/uab-header.html"
}

angular.module('application').component('uabHeader', uabHeader)
