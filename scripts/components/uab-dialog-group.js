var uabDialogTriggerCtrl = function($element, $scope, $mdDialog, $compile){
  $element.on('click', function(e){
    var content = $element.closest('uab-dialog-group').find($scope.uabDialogTrigger)
    var htmlString = content.html();
    var htmlParsed = angular.element(htmlString);
    var htmlTitle = content.attr('title');

    showHtml($mdDialog, htmlTitle, $compile(htmlParsed)($scope));
  });
};

uabDialogTriggerCtrl.$inject = ['$element','$scope','$mdDialog','$compile'];

var uabDialogTriggerComponent = function(){
  return {
    restrict: 'A',
    controller: uabDialogTriggerCtrl,
    scope: {
      uabDialogTrigger: '@',
      title: '@'
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