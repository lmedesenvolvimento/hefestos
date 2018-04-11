var SanfonadoGroupCtrl = function($rootScope){
  var self = {
    children: [],
    lorem: "Ullamco Lorem excepteur voluptate labore Lorem enim qui Lorem in pariatur. Et magna magna minim minim sunt aliqua nulla amet fugiat laboris consectetur sunt. Voluptate est ut laboris enim excepteur Lorem aliqua Lorem eu dolore et laborum eu. Anim occaecat sit eiusmod eiusmod ad ex duis nostrud ex occaecat mollit. Ad id eiusmod proident magna dolore dolor proident nisi proident minim deserunt cupidatat ea."
  }

  self.$onInit = function(){
    console.log("Initialzed", self)
  }
  

  self.closeAll = function(){
    self.children.forEach(hide)    
  }

  self.join = function(child){
    self.children.push(child)

    console.log("New child added!", child)
  }
  
  function hide(child){
    child.$ctrl.hide()
  }

  return self
}

SanfonadoGroupCtrl.$inject = ['$rootScope']

var SanfonadoGroupComponent = function(){
  return {
    controller: SanfonadoGroupCtrl,
    transclude: true,
    link: function(scope, element, attrs, ctrl, transclude){
      scope.$group = ctrl;
      
      transclude(scope, function(clone){
        $(element).html(clone)
      })
    }
  };
}

angular.module('application').directive('uabSanfonadoGroup', SanfonadoGroupComponent)
