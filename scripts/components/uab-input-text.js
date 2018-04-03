var uabInputTextCtrl = function(){
  var self = this;

  self.$onInit = function(){
    console.log(self)
  }

  self.onSubmit = function(){
    self.incorrect = true
  }
}

uabInputTextCtrl.$inject = []


var uabInputText = {
  controller: uabInputTextCtrl,
  templateUrl: "templates/inputs/text.html",
  bindings: {
    label: "@",
    sentence: "@",
    full: "=",
    submitText: "@"
  }
};

angular.module('application').component('uabInputText',uabInputText)



