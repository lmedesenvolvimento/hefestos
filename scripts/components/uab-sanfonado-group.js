var SanfonadoGroupCtrl = function($rootScope){
  var self = {
    children: []
  }

  self.closeAll = function(target){
    self.children.forEach(angular.bind(target, hide));
  }

  self.join = function(child){
    self.children.push(child);
  }
  
  function hide(child){
    if(this != child){
      child.$ctrl.hide();
    };
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
