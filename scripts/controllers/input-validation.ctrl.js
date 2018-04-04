var inputValidationCtrl = function () {
  var self = this;

  self.$onInit = function () {
    console.log(self)
  }

  self.onSubmit = function () {
    if (self.value.toUpperCase() == self.sentence.toUpperCase()) {
      setCorrect();
    } else {
      setIncorrect();
    }
  }

  function setCorrect() {
    self.correct = true
    delete self.incorrect
  }

  function setIncorrect() {
    self.incorrect = true
    delete self.correct
  }
}

inputValidationCtrl.$inject = []

angular.module('application').controller('inputValidationCtrl', inputValidationCtrl)