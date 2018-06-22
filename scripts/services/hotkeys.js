var Hotkeys = function($location, $anchorScroll, hotkeys, Sidenav){
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
    toHightContrast: function(event){
      $("body").toggleClass("hc")
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
    description: 'Modo alto contraste',
    callback: angular.bind(this, self.toHightContrast)
  })

  return self;
}

Hotkeys.$inject = ['$location', '$anchorScroll', 'hotkeys', 'Sidenav'];

angular.module('application').factory('Hotkeys', Hotkeys);