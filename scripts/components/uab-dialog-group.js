var uabDialogTriggerCtrl = function($element, $scope, $mdDialog, $compile){
  $element.on('click', function(e){
    var htmlString = $element.closest('uab-dialog-group').find($scope.uabDialogTrigger).html();
    var htmlParsed = angular.element(htmlString);
    showHtml($mdDialog, $scope.uabDialogTitle, $compile(htmlParsed)($scope));
  });
};

uabDialogTriggerCtrl.$inject = ['$element','$scope','$mdDialog','$compile'];

var uabDialogTriggerComponent = function(){
  return {
    restrict: 'A',
    controller: uabDialogTriggerCtrl,
    scope: {
      uabDialogTrigger: '@'
    }
  };
}

angular.module('application').directive('uabDialogTrigger', uabDialogTriggerComponent);

function showHtml(mdDialog, title, html){
  mdDialog.show({
    templateUrl: "templates/dialogs/markup.html",
    controller: "HtmlDialogCtrl",
    controllerAs: "dialog",
    clickOutsideToClose: true,
    locals: {
      title: title,
      html: html
    }
  })
}