var uabAnnotationsCtrl = function($rootScope, hotkeys, Annotations){
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
  })

  return self
}

uabAnnotationsCtrl.$inject = ['$rootScope','hotkeys','Annotations']

var uabAnnotations = {
  controller: uabAnnotationsCtrl,
  templateUrl: "templates/uab-annotations.html"
}

angular.module('application').component('uabAnnotations', uabAnnotations)
