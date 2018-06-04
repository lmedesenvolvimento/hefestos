var Aplayer = function(){
  var self = {
    audios: [],
    visible: false,
    instance: null
  }

  self.toggle = function(){
    self.visible = !self.visible;
  }

  self.hide = function(){
    self.visible = false;
  }

  return self;
}

Aplayer.$inject = []

angular.module('application').factory('Aplayer',  Aplayer)
