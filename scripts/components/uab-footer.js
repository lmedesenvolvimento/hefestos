var uabFooterCtrl = function(){
  var self = this;

  return self;
}

uabFooterCtrl.$inject = []

var uabFooterader = {
  controller: uabFooterCtrl,
  templateUrl: "templates/uab-footer"
}

angular.module('application').component('uabFooterader', uabFooterader)
