var Annotations = function($mdSidenav){
  var self = this

  self.visible = false
  self.data = []

  self.toggle = function(){
    self.visible = !self.visible
  }

  self.hide = function(){
    self.visible = false
  }

  return self
}

Annotations.$inject = ['$mdSidenav']

angular.module('application').factory('Annotations',  Annotations)
