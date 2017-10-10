angular.module('application').component('uabTopico',{
  template: "<div class='row center-xs'><h1>{{$root.$global.current_topic.nome}}</h1></div>",
  controller: function($rootScope){
    console.log($rootScope)
  }
});
