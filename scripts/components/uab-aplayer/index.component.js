var uabAplayerCtrl = function($rootScope, $timeout, Aplayer, Colors){
  var self = this

  self.$onInit = function(){
    $timeout(angular.bind(self,createAplayerInstance, Aplayer, Colors), 2000);
  }

  return self
}

uabAplayerCtrl.$inject = ['$rootScope', '$timeout', 'Aplayer', 'Colors']

var uabAplayer = {
  controller: uabAplayerCtrl,
  template: "<div id='uab-aplayer'></div>",
  bindings: {
    audios: '='
  }
}

angular.module('application').component('uabAplayer', uabAplayer)


var createAplayerInstance = function(Aplayer, Colors){
  Aplayer.instance = new APlayer({
    container: document.getElementById('uab-aplayer'),
    theme: Colors.primary.hex,
    mini: true,
    audio: [{
      name: 'Lorens',
      artist: 'Dunne Lorens',
      url: 'https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3',
    }]
  })
}