var uabAnnotationsCtrl = function($rootScope, hotkeys, Annotations){
  try{
    document.domain != "" ?  document.domain = "virtual.ufc.br" : false
  } catch(e){
    false
  }

  var self = {
    taToolbar: [
      ['h1', 'h2', 'bold', 'italics'],
    ]
  }

  self.$annotations = Annotations

  self.$newComment = {
    text: ''
  }

  self.comments = []

  self.$onInit = function(){
    self.topic = $rootScope.$global.current_topic
    loadComments();
  }

  self.toggle = function(){
    Annotations.toggle()
  }

  self.sendComment = function(){
    self.comments.push({
      text: self.$newComment.text,
      created_at: new Date()
    })

    self.$newComment.text = ''
    // Sincronizando com o Solar
    saveComments()
  }
  
  // private
  var loadComments = function(){
    var id = S(self.topic.nome).camelize().s
    var response = window.parent.find_note("Tópico " + id);
    
    if(response){
      self.comments = JSON.parse(response);
    }

    console.log(response);
  }

  var saveComments = function(){
    var id = S(self.topic.nome).camelize().s
    window.parent.create_or_update_note("Tópico " + id + "," + JSON.stringify(self.comments));
  }

  // Hotkeys
  hotkeys.add({
    combo: 'esc',
    description: 'Close Annotation',
    callback: function() {
      Annotations.hide();
    }
  });

  $rootScope.$on('topic:change', function(event, topic){
    self.topic = topic
    loadComments()
  })

  return self
}

uabAnnotationsCtrl.$inject = ['$rootScope','hotkeys','Annotations']

var uabAnnotations = {
  controller: uabAnnotationsCtrl,
  templateUrl: "templates/uab-annotations.html"
}

angular.module('application').component('uabAnnotations', uabAnnotations)
