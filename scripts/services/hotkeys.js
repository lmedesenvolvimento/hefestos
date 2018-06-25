var Hotkeys = function($mdDialog, hotkeys, Sidenav){
  var self = {
    toContent: function(){
      var content = document.getElementById("content")
      // goto content
      $('.main').scrollTop(0)
      // force focus
      content.focus()
    },
    toFooter: function(){
      var footer = document.getElementById("footer")
      // goto footer
      $('.main').scrollTop($('main').height())
      // force focus
      footer.focus()
    },
    toMenu: function(){
      Sidenav.toggle()
    },
    toHightContrast: function(){
      $("body").toggleClass("hc")
    },
    toAccessibilityMenu: function(){
      dialog = $mdDialog.show({
        controller: "SimpleDialogCtrl",
        controllerAs: "dialog",
        templateUrl: "templates/dialogs/accessibility.html",
        locals: {          
          title: "Acessibilidade",
          text: null
        }
      })
    }
  }
  
  // configure hotkeys
  hotkeys.add({
    combo: ['alt+1','alt+shift+1'],
    description: 'Ir para o começo',
    callback: angular.bind(this, self.toContent)
  })
  
  hotkeys.add({
    combo: ['alt+2','alt+shift+2'],
    description: 'Ir para o menu',
    callback: angular.bind(this, self.toMenu)
  })

  hotkeys.add({
    combo: ['alt+4','alt+shift+4'],
    description: 'Ir para o Rodapé',
    callback: angular.bind(this, self.toFooter)
  })

  hotkeys.add({
    combo: ['alt+5','alt+shift+5'],
    description: 'Ir para o Menu de Acessibilidade',
    callback: angular.bind(this, self.toAccessibilityMenu)
  })

  hotkeys.add({
    combo: ['alt+8','alt+shift+8'],
    description: 'Modo alto contraste',
    callback: angular.bind(this, self.toHightContrast)
  })

  return self;
}

Hotkeys.$inject = ['$mdDialog', 'hotkeys', 'Sidenav'];

angular.module('application').factory('Hotkeys', Hotkeys);