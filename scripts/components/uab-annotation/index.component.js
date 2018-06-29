var uabAnnotationsCtrl = function($rootScope, $mdToast, hotkeys, Annotations){
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

  // self.comments = []
  
  self.comment = ''

  self.$onInit = function(){
    self.topic = $rootScope.$global.current_topic
    loadComments();
  }

  self.toggle = function(){
    Annotations.toggle()
  }

  self.sendComment = function(){
    // self.comment = self.$newComment.text
    // self.$newComment.text = ''
    // Sincronizando com o Solar
    saveComments()
  }
  
  // private
  window.loadComments = function(){
    var response = null

    try {
      var id = S(self.topic.nome).camelize().s
      response = window.parent.find_note("Tópico " + id);
      console.log(response);
    } catch(e){
      console.log("Funcionalidade presente apenas no ambiente Solar")
    }
    
    if(response){
      self.comment = response;
    } else{
      self.comment = ''
    }

    return self.comment
  }

  window.saveComments = function(){
    try {
      var id = S(self.topic.nome).camelize().s
      window.parent.create_or_update_note("Tópico " + id, self.comment)
    } catch(e){
      console.log("Funcionalidade presente apenas no ambiente Solar")
    }
    $mdToast.showSimple("Comentário salvo!")
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

uabAnnotationsCtrl.$inject = ['$rootScope','$mdToast','hotkeys','Annotations']

var uabAnnotations = {
  controller: uabAnnotationsCtrl,
  templateUrl: "templates/uab-annotations.html"
}

angular.module('application').component('uabAnnotations', uabAnnotations)
