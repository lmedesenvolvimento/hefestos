var uabDialogCtrl = function($scope, $element, $mdDialog, $compile){
  this.simpleText = function(title, text){
    simpleText($mdDialog, $scope.uabDialogTitle, $scope.uabDialogText)
  }

  this.showHtml = function(){
    var htmlString = $element.find('uab-dialog-content').html();
    var htmlParsed = angular.element(htmlString);
    showHtml($mdDialog, $scope.uabDialogTitle, $compile(htmlParsed)($scope));
  }
}

uabDialogCtrl.$inject = ['$scope', '$element', '$mdDialog', '$compile']

var uabDialog = function($mdDialog){
  return {
    restrict: 'E',
    transclude: true,
    controller: uabDialogCtrl,
    scope: {
      uabDialogTitle: "@",
      uabDialogText: "@"
    },
    link: function(scope, element, attrs, ctrl, transclude){
      scope.$ctrl = ctrl
      transclude(scope, function(clone, scope){
        element.append(clone)
      })
    }
  }
}

uabDialog.$inject = ['$mdDialog']

angular.module('application').directive('uabDialog', uabDialog)


// @private
function simpleText(mdDialog, title, text){
  mdDialog.show({
    templateUrl: "templates/dialogs/simple-text.html",
    controller: "SimpleDialogCtrl",
    controllerAs: "dialog",
    clickOutsideToClose: true,
    locals: {
      title: title,
      text: text
    }
  })
}

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