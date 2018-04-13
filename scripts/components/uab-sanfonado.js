var SanfonadoCtrl = function($scope, $element){
  var self = this;

  self.$onInit = function(){
    self.element = $element;

    $(self.element).find('[uab-sanfonado-toggle]').on('click', self.toggle);

    if(self.group){
      self.group.join($scope);
    }
  }

  self.toggle = function(){
    if(self.group){
      self.group.closeAll($scope);
    }
    $($element).toggleClass('active');
    $($element).find('.uab-sanfonado-wrap').toggleClass('active');
  }
  
  self.open = function(){
    $($element).addClass('active');
    $($element).find('.uab-sanfonado-wrap').addClass('active');
  }

  self.hide = function(){
    $($element).removeClass('active');
    $($element).find('.uab-sanfonado-wrap').removeClass('active');
  }

  return self;
}

SanfonadoCtrl.$inject = ['$scope','$element'];

var SanfonadoComponent = {
  controller: SanfonadoCtrl,
  bindings: {
    group: "="
  }
};

angular.module('application').component('uabSanfonado', SanfonadoComponent);
