var uabSlideItem = function(){
  return {
    restrict: "A",
    scope: {
      legend: "@",
      uabSlideItem: "@"
    },
    templateUrl: "templates/uab-slide-item.html"
  }
}

angular.module("application").directive("uabSlideItem", uabSlideItem)
