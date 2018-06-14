var Aplayer = function($rootScope, $mdToast){
  var self = {
    audios: [],
    visible: false,
    instance: null,
    playing: false
  }

  self.toggle = function(){
    self.visible = !self.visible;
    
    if(self.visible){
      $(self.instance.container).removeClass('hide')
      // listen lesson
      self.instance.play()
      self.playing = true
    } else{
      $(self.instance.container).addClass('hide')
      // stop listen lesson
      self.instance.pause()      
      self.playing = false
    }
  }
  
  self.updateTrack = function(audio){
    promise = self.instance.setAudio(audio)
    console.log(self.instance)
  }

  self.hide = function(){
    $(self.instance.container).addClass('hide')
  }

  $rootScope.$on('aplayer:update', function(event, data){
    self.updateTrack(data.audio);

    if(self.playing){
      $mdToast.showSimple("Atualizando Faixa!");
    }

    self.playing = false;
  })

  $rootScope.$on('aplayer:play', function(event, data){
    self.playing = true;
  })

  return self;
}

Aplayer.$inject = ['$rootScope','$mdToast']

angular.module('application').factory('Aplayer',  Aplayer)
