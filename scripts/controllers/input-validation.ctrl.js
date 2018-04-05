var inputValidationCtrl = function ($mdToast) {
  var self = this;

  self.$onInit = function () {
    console.log(self)
  }

  self.onSubmit = function () {
    if (self.value.toUpperCase() == self.sentence.toUpperCase()) {
      setCorrect();
    } else {
      setIncorrect();
      $mdToast.showSimple(self.failMessage || "Resposta incorreta tente novamente")
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

inputValidationCtrl.$inject = ['$mdToast']

angular.module('application').controller('inputValidationCtrl', inputValidationCtrl)