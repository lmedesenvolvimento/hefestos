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


var inputGroupValidationCtrl = function ($mdToast) {
  var self = this;

  self.items = [];

  self.toggle = function(item){
    var idx = self.items.indexOf(item);
    if (idx > -1) {
      self.items.splice(idx, 1);
    }
    else {
      self.items.push(item);
    }
  }

  self.exist = function(item){
    return self.items.indexOf(item) > -1;
  }

  self.onSubmit = function () {
    var a1 = self.items.sort()
    var a2 = self.sentence.split(',').sort()

    if (_.isEqual(a1, a2)) {
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

angular.module('application').controller('inputGroupValidationCtrl', inputGroupValidationCtrl)