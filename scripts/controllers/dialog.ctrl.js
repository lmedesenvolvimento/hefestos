var SimpleDialogCtrl = function($scope, $mdDialog, title, text){
  $scope.title = title
  $scope.text = text

  $scope.close = function(){
    $mdDialog.cancel(true)
  }
}

SimpleDialogCtrl.$inject = ['$scope', '$mdDialog','title','text']

var HtmlDialogCtrl = function($scope, $element, $mdDialog, $controller, title, html){
  $controller("SimpleDialogCtrl", { $scope: $scope, title: title, text: html })
  
  $scope.title = title;

  this.$onInit = function(){
    try{
      $element.find("#markup").append(html)
    } catch(e){    
      $element.find("#markup").append('<p>Conteúdo não é um HTML válido</p>')
    }
  }
  
};

HtmlDialogCtrl.$inject = ['$scope', '$element', '$mdDialog', '$controller', 'title','html'];

angular.module('application').controller('HtmlDialogCtrl', HtmlDialogCtrl);
angular.module('application').controller('SimpleDialogCtrl', SimpleDialogCtrl);

