var uabDialog = function($mdDialog){
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      uabDialogTitle: "@"
    },
    template: "<ng-transclude></ng-transclude>",
    compile: function(scope, element, attrs){
      $(element)
        .find('[uab-dialog-trigger]')
        .on('click', angular.bind(scope, triggerDialog, $mdDialog))
      console.log(element)
    }
  }
}

uabDialog.$inject = ['$mdDialog']

angular.module('application').directive('uabDialog', uabDialog)


// @private
function triggerDialog(event, mdDialog){  
  mdDialog.showSimpleText(this.uabDialogTitle)
}