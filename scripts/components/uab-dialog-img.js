var uabDialogImg = function($timeout, $rootScope){
  return {
    restrict: 'A',
    scope: {
      fancybox: "@"
    },
    transclude: true,
    link: function(scope, element, attrs, ctrl, transclude){
      $(element).click(function(e){
        $rootScope.$fancyScrollTop = $('.main').scrollTop();
      });

      transclude(scope, function(clone, scope){
        $(clone).appendTo(element);
      });
    }
  };
}

uabDialogImg.$inject = ['$timeout','$rootScope']

angular.module('application').directive('uabDialogImg', uabDialogImg)