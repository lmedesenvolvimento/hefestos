var uabFooterCtrl = function($element){
  var self = this;

  self.toTop = function(){
    $($element).closest("md-content").scrollTop(0)
    return false
  }

  return self;
}

uabFooterCtrl.$inject = ['$element']

var uabFooter = {
  controller: uabFooterCtrl,
  templateUrl: "templates/uab-footer"
}

angular.module('application').component('uabFooter', uabFooter)
