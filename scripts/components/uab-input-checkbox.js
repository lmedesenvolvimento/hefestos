var uabInputCheckbox = function(){
  return {
    restrict: "E",
    controller: 'inputGroupValidationCtrl',
    templateUrl: "templates/inputs/checkbox.html",
    transclude: true,
    scope: {
      sentence: "@",
      submitText: "@",
      failMessage: "@"
    },
    link: function (scope, element, attrs, ctrl, transclude){
      scope.$ctrl = angular.merge(ctrl, { sentence: scope.sentence, submitText: scope.submitText, failMessage: scope.failMessage })
      transclude(scope, function(clone, scope, compile){
        var checkboxGroup = element.find('.checkbox-group');
        $(clone).appendTo(checkboxGroup);
      });
    }
  }
};


var uabInputCheckboxButton = function(){
  return {
    template: '<md-checkbox value="{{value}}" ng-disabled="$ctrl.correct" ng-checked="$ctrl.exist(value)" ng-click="$ctrl.toggle(value)"><ng-transclude></ng-transclude></md-checkbox>',
    transclude: true,
    require: "^uabInputCheckbox",
    scope: {
      value: "@",
      disabled: "="
    },
    link: function(scope, element, attrs, ctrl){
      scope.$ctrl = ctrl      
    }
  }
};

angular.module('application')
  .directive('uabInputCheckbox', uabInputCheckbox)
  .directive('uabInputCheckboxButton', uabInputCheckboxButton)