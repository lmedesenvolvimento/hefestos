var uabAudioButtonCtrl = function($scope, $rootScope, $element, $mdToast){
  var self = this;

  self.isPlaying = false
  
  self.$onInit = function(){
    self.sound = document.createElement('audio');

    self.sound.addEventListener('play', function (e) {
      $mdToast.showSimple( $scope.msg || 'Executando Faixa');
    });

    self.sound.addEventListener('pause', function (e) {
      self.isPlaying = false;
    });

    self.sound.src = $scope.src;
    
    // Bind click event
    $($element).find('> .md-button, > button').click(angular.bind(self, self.listen));
  }

  self.listen = function(){
    if (self.isPlaying){
      self.sound.pause();
      self.isPlaying = false;
    } else{
      // Notify another players
      $rootScope.$emit('uab-audio-button:play');
      // Execute audio
      self.sound.play();
      self.isPlaying = true;
    }
  };

  // Event listen
  $rootScope.$on('uab-audio-button:play', function(){
    self.isPlaying = false
    self.sound.pause();
  });

  return self;
};

uabAudioButtonCtrl.$inject = ['$scope', '$rootScope','$element','$mdToast'];

var uabAudioButton = function(){
  return {
    restrict: "E",
    transclude: true,
    scope:{
      src: "@",
      msg: "@"
    },
    controller: uabAudioButtonCtrl,
    link: function(scope, element, attrs, ctrl, transclude){
      scope.$ctrl = ctrl
      transclude(scope, function(clone, scope){
        $(element).html(clone)
        // Initialize Component
        scope.$ctrl.$onInit()
      });
    }
  }
}

uabAudioButton.$inject = []

angular.module('application').directive('uabAudioButton', uabAudioButton)