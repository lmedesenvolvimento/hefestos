var TIMEOUT = 2000;

var uabSvgAnimation = function($timeout){
  return {
    restrict: "E",
    scope: true,
    link: function(scope, element, attrs){
      $(element).find('iframe').on('load', function(e){
        $timeout(angular.bind(this, onIframeLoad, element), TIMEOUT)
      })
    }
  }
}

uabSvgAnimation.$inject = ['$timeout']

angular.module("application").directive("uabSvgAnimation", uabSvgAnimation)


var onIframeLoad = function(element){
  var body = $(element).find('iframe').contents().find('body')
  var canvas_container = $(body).find('#animation_container')

  // Update canvas container view
  $(canvas_container).css('margin','auto')

  if($(window).width() < 600){
    $(element).css('height','')
    
    $(canvas_container).css('max-width','100%')
    $(canvas_container).css('height','')
    $(canvas_container).css('height','auto')
    
    // Update canvas view
    $(canvas_container).children('#canvas').css('max-width','100%')
    $(canvas_container).children('#canvas').css('height','')
    $(canvas_container).css('height','auto')
  }

  $(window).resize(angular.bind(this, onIframeLoad, element))
}