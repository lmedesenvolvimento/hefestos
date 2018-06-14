var uabAplayerCtrl = function($rootScope, $timeout, Aplayer, Colors){
  var self = this

  self.$onInit = function(){
    $timeout(angular.bind(self, createAplayerInstance, $rootScope, Aplayer, Colors), 2000);
  }

  return self
}

uabAplayerCtrl.$inject = ['$rootScope', '$timeout', 'Aplayer', 'Colors']

var uabAplayer = {
  controller: uabAplayerCtrl,
  template: "<div id='uab-aplayer'></div>",
  bindings: {
    topics: '='
  }
}

angular.module('application').component('uabAplayer', uabAplayer)


var createAplayerInstance = function($rootScope, Aplayer, Colors){
  var audios = this.topics.map(mapTopics)

  Aplayer.instance = new APlayer({
    container: document.getElementById('uab-aplayer'),
    theme: Colors.primary.hex,
    mini: true,
    audio: audios
  })
  
  Aplayer.instance.on('play', function(){
    $rootScope.$emit('aplayer:play')
  })

  Aplayer.hide()
}

var mapTopics = function(t, index){
  return {
    name: t.nome,
    url: t.audio
  }
}