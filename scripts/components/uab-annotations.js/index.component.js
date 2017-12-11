var uabAnnotationsCtrl = function($rootScope, Annotations){
  var self = this

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

    console.log(self.comments)

    self.$newComment.text = ''
  }

  $rootScope.$on('topic:change', function(event, topic){
    self.topic = topic
  })

  return self
}

uabAnnotationsCtrl.$inject = ['$rootScope','Annotations']

var uabAnnotations = {
  controller: uabAnnotationsCtrl,
  templateUrl: "templates/uab-annotations"
}

angular.module('application').component('uabAnnotations', uabAnnotations)
