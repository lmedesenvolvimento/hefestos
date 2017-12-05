var lazyImgDirective = function(){
  return {
    restrict: "A",
    link: function(scope, element, attrs){
      var img = element.get(0)

      img.setAttribute('src', img.getAttribute('data-src'));

      img.onload = function() {
        img.removeAttribute('data-src');
      };
    }
  }
}

angular.module("application").directive("lazyImg", lazyImgDirective)
