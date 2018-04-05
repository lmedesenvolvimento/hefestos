var uabInputRadio = function(){
  return {
    controller: 'inputValidationCtrl',
    templateUrl: "templates/inputs/radio.html",
    transclude: true,
    scope: {
      sentence: "@",
      submitText: "@",
      failMessage: "@"
    },
    link: function (scope, element, attrs, ctrl, transclude){
      scope.$ctrl = angular.merge(ctrl, { sentence: scope.sentence, submitText: scope.submitText, failMessage: scope.failMessage })
      transclude(scope, function(clone, scope, compile){
        var radioGroup = element.find('md-radio-group');
        $(clone).appendTo(radioGroup);
      });
    }
  }
};

angular.module('application').directive('uabInputRadio', uabInputRadio)

var uabInputRadioButton = function(){
  return {
    template: '<md-radio-button value="{{value}}" ng-disabled="$ctrl.correct"><ng-transclude></ng-transclude></md-radio-button>',
    transclude: true,
    require: "^uabInputRadio",
    scope: {
      value: "@",
      disabled: "="
    },
    link: function(scope, element, attrs, ctrl){
      scope.$ctrl = ctrl;
    }
  }
};

angular.module('application').directive('uabInputRadioButton', uabInputRadioButton)