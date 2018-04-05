var uabInputText = {
  controller: 'inputValidationCtrl',
  templateUrl: "templates/inputs/text.html",
  bindings: {
    label: "@",
    sentence: "@",
    full: "=",
    submitText: "@",
    failMessage: "@"
  }
};

angular.module('application').component('uabInputText',uabInputText)



