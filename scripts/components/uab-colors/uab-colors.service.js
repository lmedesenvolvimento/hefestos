var Colors = function(){
  var self = {
    primary: null,
    accent: null
  }

  return self;
}

Colors.$inject = []

angular.module('application').factory('Colors',  Colors)
