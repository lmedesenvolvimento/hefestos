var uabHqCtrl = function($element, $timeout){
  var self = this;

  self.$onInit = function(){
    $timeout(angular.bind(self, loadFlipbook, $element), 600);
  }

  self.next = function(e){
    e.preventDefault()
    $($element).find('.flipbook').turn("next")
    return false
  }

  self.back = function(e){
    e.preventDefault()
    $($element).find('.flipbook').turn("previous")
    return false
  }

  self.toogleFullscreen = function(e){
    e.preventDefault()

    var element = $element[0]

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }

    return false
  }

  self.enableZoom = function(){
    $($element).find('.page').each(function(index, page){
      $(page).zoom({
         url: $(page).attr('big-picture'),
         on: 'click',
         touch: true,
         magnify: 0.3
      })
    })
  }

  function loadFlipbook(element){
    $(element).find('.flipbook').turn({
      // Width
      width:922,
      // Height
      height:600,
      // Elevation
      elevation: 50,
      // Enable gradients
      gradients: true,
      // Auto center this flipbook
      autoCenter: true,
      // Hardware acceleration
      acceleration: !isChrome(),
    });

    $(element).find('.flipbook').bind('turn.turning', function(e){
      $($element).find('.page').each(function(index, page){
        $(page).trigger('zoom.destroy')
      });
    });

    $(element).find('.flipbook').bind('turn.turned', function(e){
      self.enableZoom()
    });

    self.enableZoom()
  }

  return self;
}

uabHqCtrl.$inject = ['$element', '$timeout']

angular.module("application").component("uabHq",{
    controller: uabHqCtrl,
    bindings:{
      images: "="
    },
    templateUrl: "templates/uab-hq.html"
});


function isChrome() {
   return navigator.userAgent.indexOf('Chrome')!=-1;
}
