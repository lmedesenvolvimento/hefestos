var Aplayer = function(){
  var self = {
    audios: [],
    visible: false,
    instance: null
  }

  self.toggle = function(){
    self.visible = !self.visible;
    
    if(self.visible){
      $(self.instance.container).removeClass('hide')
      // listen lesson
      self.instance.play()
    } else{
      $(self.instance.container).addClass('hide')
      // stop listen lesson
      self.instance.pause()
      self.instance.skipBack(0) //return to begin audio
    }
  }

  self.skipBack = function(){
    self.instance.skipBack()
  }

  self.skipForward = function(){
    self.instance.skipForward()
  }

  self.hide = function(){
    $(self.instance.container).addClass('hide')
  }

  return self;
}

Aplayer.$inject = []

angular.module('application').factory('Aplayer',  Aplayer)
