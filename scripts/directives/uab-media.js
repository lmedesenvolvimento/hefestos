var uabMedia = function(){
  return {
    restrict: 'A',
    scope: {
      type: "@"
    },
    link: function(scope, element, attr){
      var media = element.get(0)
      plyr.setup(media);
    }
  }
};

angular.module('application').directive('uabMedia', uabMedia);
