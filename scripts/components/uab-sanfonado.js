var SanfonadoCtrl = function($element){
  var self = this

  self.$onInit = function(){
    self.element = $element

    $(self.element).find('[uab-sanfonado-toggle]').on('click', self.toggle)
  }

  self.toggle = function(){
    $(self.element).toggleClass('active')
    $(self.element).find('.uab-sanfonado-wrap').toggleClass('active')
  }

  return self
}

SanfonadoCtrl.$inject = ['$element']

var SanfonadoComponent = {
  controller: SanfonadoCtrl
}

angular.module('application').component('uabSanfonado', SanfonadoComponent)
