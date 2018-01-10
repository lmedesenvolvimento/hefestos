var uabQuadro = function(){
  return {
    scope: {
      icon: "@",
      title: "@"
    },
    transclude: true,
    templateUrl: "templates/uab-quadro.html"
  }
};

angular.module('application').directive('uabQuadro', uabQuadro)
