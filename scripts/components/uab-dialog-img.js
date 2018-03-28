var uabDialogImg = function($timeout){
  return {
    restrict: 'A',
    scope: {
      fancybox: "@"
    },
    transclude: true,
    link: function(scope, element, attrs, ctrl, transclude){
      transclude(scope, function(clone, scope){
        $(clone).appendTo(element)
      })
    }
  };
}

uabDialogImg.$inject = ['$timeout']

angular.module('application').directive('uabDialogImg', uabDialogImg)