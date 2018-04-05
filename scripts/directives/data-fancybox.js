var dataFancyBox = function(){
  return {
    restrict: "A",
    scope: {
      'fancyBox':'@'
    },
    link: function(scope, element, attrs){
      console.log(element)
      $(element).click(function(e){
        console.log("Catch")
      })
    }
  }
}

angular.module('application').directive('fancyBox', dataFancyBox)