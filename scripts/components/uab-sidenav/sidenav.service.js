var Sidenav = function($mdSidenav){
  return {
    $id: "uab-sidenav",
    open: function(){
      return $mdSidenav(this.$id).open()
    },
    close: function(){
      return $mdSidenav(this.$id).close()
    },
    toggle: function(){
      return $mdSidenav(this.$id).toggle()
    },
  }
}

Sidenav.$inject = ['$mdSidenav']

angular.module('application').factory('Sidenav', Sidenav)
