var manifest = {};

// Get Manifest
$.get("config.json").then(bootstrapApplication)

var ApplicationConfig = function($stateProvider, $mdThemingProvider, $urlRouterProvider, $provide){
  // Configurando o comportamento das roteador
  View.configure($provide)
  // Configurando a aula de acordo com seus meta dados
  Loader.onLoadManifest($stateProvider, $mdThemingProvider, $urlRouterProvider, manifest);  
}

ApplicationConfig.$inject = ['$stateProvider', '$mdThemingProvider','$urlRouterProvider','$provide']

var ApplicationRun = function($rootScope, $http){
    // Configurando Impresso
    Impress.instance($http, manifest)

    $rootScope.$global = GLOBAL
    // Eventos de Rotas
    $rootScope.$on('$stateChangeStart', angular.bind(this, Router.onStateChangeStart, $rootScope));
    $rootScope.$on('$stateChangeSuccess', angular.bind(this, Router.onStateChangeSuccess, $rootScope));

    // Init Fancybox
    $().fancybox({
      selector: '[data-fancybox]',
      buttons: [
        'slideShow',
        'zoom',
        'close'
      ],
      touch: false,
      loop: false,
      hash: false,
      afterShow: function(){
        $('.main').scrollTop($rootScope.$fancyScrollTop)
      }
    });
}

ApplicationRun.$inject = ['$rootScope','$http'];

var app = angular.module('application', [
  'ngAnimate',
  'ngSanitize',
  'ngMaterial',
  'angular-carousel',
  'ui.router',
  'ui.router.state.events',
  'textAngular'
])

app.config(ApplicationConfig).run(ApplicationRun)

function bootstrapApplication(response){
  angular.element(document).ready(function(){
    manifest = response;
    angular.bootstrap(document, ['application']);
  })
}

var taConfig = function ($provide) {
  $provide.decorator('taOptions', ['$delegate', function (taOptions) {
      taOptions.forceTextAngularSanitize = true;
      taOptions.keyMappings = [];
      taOptions.toolbar = [
          ['h1', 'h2', 'h3', 'p', 'pre', 'quote'],
          ['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo', 'clear'],
          ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
          ['html', 'insertImage', 'insertLink']
      ];
      taOptions.classes = {
          focussed: '',
          toolbar: 'ta-toolbar',
          toolbarGroup: 'ta-button-group',
          toolbarButton: '',
          toolbarButtonActive: 'active',
          disabled: 'disabled',
          textEditor: 'ta-text-editor',
          htmlEditor: 'md-input'
      };
      return taOptions;
  }]);
  $provide.decorator('taTools', ['$delegate', function (taTools) {
      taTools.h1.display = '<md-button aria-label="Heading 1">H1</md-button>';
      taTools.h2.display = '<md-button aria-label="Heading 2">H2</md-button>';
      taTools.h3.display = '<md-button aria-label="Heading 3">H3</md-button>';
      taTools.p.display = '<md-button aria-label="Paragraph">P</md-button>';
      taTools.pre.display = '<md-button aria-label="Pre">pre</md-button>';
      taTools.bold.display = '<md-button class="md-icon-button" aria-label="Bold"><md-icon md-font-icon="icon-format_bold"></md-icon></md-button>';
      taTools.italics.display = '<md-button class="md-icon-button" aria-label="Italic"><md-icon md-font-icon="icon-format_italic"></md-icon></md-button>';
      taTools.underline.display = '<md-button class="md-icon-button" aria-label="Underline"><md-icon md-font-icon="icon-format_underlined"></md-icon></md-button>';
      taTools.ul.display = '<md-button class="md-icon-button" aria-label="Buletted list"><md-icon md-font-icon="icon-format_list_bulleted"></md-icon></md-button>';
      taTools.ol.display = '<md-button class="md-icon-button" aria-label="Numbered list"><md-icon md-font-icon="icon-format_list_numbered"></md-icon></md-button>';
      taTools.undo.display = '<md-button class="md-icon-button" aria-label="Undo"><md-icon md-font-icon="icon-undo"></md-icon></md-button>';
      taTools.redo.display = '<md-button class="md-icon-button" aria-label="Redo"><md-icon md-font-icon="icon-redo"></md-icon></md-button>';
      taTools.justifyLeft.display = '<md-button class="md-icon-button" aria-label="Align left"><md-icon md-font-icon="icon-format_align_left"></md-icon></md-button>';
      taTools.justifyRight.display = '<md-button class="md-icon-button" aria-label="Align right"><md-icon md-font-icon="icon-format_align_right"></md-icon></md-button>';
      taTools.justifyCenter.display = '<md-button class="md-icon-button" aria-label="Align center"><md-icon md-font-icon="icon-format_align_center"></md-icon></md-button>';
      taTools.justifyFull.display = '<md-button class="md-icon-button" aria-label="Justify"><md-icon md-font-icon="icon-format_align_justify"></md-icon></md-button>';
      taTools.clear.display = '<md-button class="md-icon-button" aria-label="Clear formatting"><md-icon md-font-icon="icon-format_clear"></md-icon></md-button>';
      taTools.html.display = '<md-button class="md-icon-button" aria-label="Show HTML"><md-icon md-font-icon="icon-code"></md-icon></md-button>';
      taTools.insertLink.display = '<md-button class="md-icon-button" aria-label="Insert link"><md-icon md-font-icon="icon-insert_link"></md-icon></md-button>';
      taTools.insertImage.display = '<md-button class="md-icon-button" aria-label="Insert photo"><md-icon md-font-icon="icon-insert_photo"></md-icon></md-button>';
      return taTools;
  }]);
};

taConfig.$inject = ['$provide'];

angular.module('application').config(taConfig);
var lazyImgDirective = function(){
  return {
    restrict: "A",
    link: function(scope, element, attrs){
      var img = element.get(0)

      img.setAttribute('src', img.getAttribute('data-src'));

      img.onload = function() {
        img.removeAttribute('data-src');
      };
    }
  }
}

angular.module("application").directive("lazyImg", lazyImgDirective)

var uabAudioButtonCtrl = function($scope, $rootScope, $element, $mdToast){
  var self = this;

  self.isPlaying = false
  
  self.$onInit = function(){
    self.sound = document.createElement('audio');

    self.sound.addEventListener('play', function (e) {
      $mdToast.showSimple( $scope.msg || 'Executando Faixa');
    });

    self.sound.addEventListener('pause', function (e) {
      self.isPlaying = false;
    });

    self.sound.src = $scope.src;
    
    // Bind click event
    $($element).find('> .md-button, > button').click(angular.bind(self, self.listen));
  }

  self.listen = function(){
    if (self.isPlaying){
      self.sound.pause();
      self.isPlaying = false;
    } else{
      // Notify another players
      $rootScope.$emit('uab-audio-button:play');
      // Execute audio
      self.sound.play();
      self.isPlaying = true;
    }
  };

  // Event listen
  $rootScope.$on('uab-audio-button:play', function(){
    self.isPlaying = false
    self.sound.pause();
  });

  return self;
};

uabAudioButtonCtrl.$inject = ['$scope', '$rootScope','$element','$mdToast'];

var uabAudioButton = function(){
  return {
    restrict: "E",
    transclude: true,
    scope:{
      src: "@",
      msg: "@"
    },
    controller: uabAudioButtonCtrl,
    link: function(scope, element, attrs, ctrl, transclude){
      scope.$ctrl = ctrl
      transclude(scope, function(clone, scope){
        $(element).html(clone)
        // Initialize Component
        scope.$ctrl.$onInit()
      });
    }
  }
}

uabAudioButton.$inject = []

angular.module('application').directive('uabAudioButton', uabAudioButton)
var uabColorsCtrl = function($rootScope, $mdColorPalette){
  var self = this
  var tema = $rootScope.$global.manifest.tema

  self.colors = {
    primary: $mdColorPalette[tema.primario]["500"],
    accent: $mdColorPalette[tema.contraste]["500"]
  }

  console.log(self.colors)

  return self
}

uabColorsCtrl.$inject = ['$rootScope','$mdColorPalette']

var uabColors = {
  controller: uabColorsCtrl,
  templateUrl: "templates/uab-colors.html"
};

angular.module('application').component('uabColors', uabColors)

var uabDialogImg = function($timeout, $rootScope){
  return {
    restrict: 'A',
    scope: {
      fancybox: "@"
    },
    transclude: true,
    link: function(scope, element, attrs, ctrl, transclude){
      $(element).click(function(e){
        $rootScope.$fancyScrollTop = $('.main').scrollTop();
      });

      transclude(scope, function(clone, scope){
        $(clone).appendTo(element);
      });
    }
  };
}

uabDialogImg.$inject = ['$timeout','$rootScope']

angular.module('application').directive('uabDialogImg', uabDialogImg)
var uabDialogCtrl = function($scope, $element, $mdDialog, $compile){
  this.simpleText = function(title, text){
    simpleText($mdDialog, title, text)
  }

  this.showHtml = function(){
    var htmlString = $element.find('uab-dialog-content').html();
    var htmlParsed = angular.element(htmlString);
    showHtml($mdDialog, $scope.uabDialogTitle, $compile(htmlParsed)($scope));
  }
}

uabDialogCtrl.$inject = ['$scope', '$element', '$mdDialog', '$compile']

var uabDialog = function($mdDialog){
  return {
    restrict: 'E',
    transclude: true,
    controller: uabDialogCtrl,
    scope: {
      uabDialogTitle: "@"
    },
    link: function(scope, element, attrs, ctrl, transclude){
      scope.$ctrl = ctrl
      transclude(scope, function(clone, scope){
        element.append(clone)
      })
    }
  }
}

uabDialog.$inject = ['$mdDialog']

angular.module('application').directive('uabDialog', uabDialog)


// @private
function simpleText(mdDialog, title, text){
  mdDialog.show({
    templateUrl: "templates/dialogs/simple-text.html",
    controller: "SimpleDialogCtrl",
    controllerAs: "dialog",
    clickOutsideToClose: true,
    locals: {
      title: title,
      text: text
    }
  })
}

function showHtml(mdDialog, title, html){
  mdDialog.show({
    templateUrl: "templates/dialogs/markup.html",
    controller: "HtmlDialogCtrl",
    controllerAs: "dialog",
    clickOutsideToClose: true,
    locals: {
      title: title,
      html: html
    }
  })
}
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
  templateUrl: "templates/uab-footer.html"
}

angular.module('application').component('uabFooter', uabFooter)

// Constantes
MAX_FONT_SIZE = 20.5; // 22px
MIN_FONT_SIZE = 8.5; // 14px
DEFAULT_FONT_SIZE = 12.5; // 18.5px

var uabHeaderCtrl = function($rootScope, Sidenav, Annotations){
  var self = this;

  self.toggleSidenav = function(){
    Sidenav.open()
  };

  self.toggleAnnotations = function(){
    Annotations.toggle()
  };

  self.increaseText = function(){
    var font_size = $("body").css("font-size").replace('px','');
    var increment = parseFloat(font_size) + 2;
    increment <= MAX_FONT_SIZE ? $("body, html").css("font-size", floatToPx(increment)) : false
  }

  self.decreaseText = function(){
    var font_size = $("body").css("font-size").replace('px','');
    var increment = parseFloat(font_size) - 2;
    increment >= MIN_FONT_SIZE ? $("body, html").css("font-size", floatToPx(increment)) : false
  }

  self.toggleHightContrast = function(){
    $("body").toggleClass("hc")
  }

  // @private
  floatToPx = function(number){
    console.log(number);
    return number + "px";
  }

  $rootScope.$on("$stateChangeSuccess", function(){
    Sidenav.close()
  })

  return self;
}

uabHeaderCtrl.$inject = ['$rootScope','Sidenav','Annotations']

var uabHeader = {
  controller: uabHeaderCtrl,
  templateUrl: "templates/uab-header.html"
}

angular.module('application').component('uabHeader', uabHeader)

var uabHqCtrl = function($element, $timeout){
  var self = this;

  self.$onInit = function(){
    $timeout(angular.bind(self, loadFlipbook, $element), 600);
  }

  self.next = function(e){
    e.preventDefault()
    $($element).find('.flipbook').turn("next")
    return false
  }

  self.back = function(e){
    e.preventDefault()
    $($element).find('.flipbook').turn("previous")
    return false
  }

  self.toogleFullscreen = function(e){
    e.preventDefault()

    var element = $element[0]

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }

    return false
  }

  self.enableZoom = function(){
    $($element).find('.page').each(function(index, page){
      $(page).zoom({
         url: $(page).attr('big-picture'),
         on: 'click',
         touch: true,
         magnify: 0.3
      })
    })
  }

  function loadFlipbook(element){
    $(element).find('.flipbook').turn({
      // Width
      width:922,
      // Height
      height:600,
      // Elevation
      elevation: 50,
      // Enable gradients
      gradients: true,
      // Auto center this flipbook
      autoCenter: true,
      // Hardware acceleration
      acceleration: !isChrome(),
    });

    $(element).find('.flipbook').bind('turn.turning', function(e){
      $($element).find('.page').each(function(index, page){
        $(page).trigger('zoom.destroy')
      });
    });

    $(element).find('.flipbook').bind('turn.turned', function(e){
      self.enableZoom()
    });

    self.enableZoom()
  }

  return self;
}

uabHqCtrl.$inject = ['$element', '$timeout']

angular.module("application").component("uabHq",{
    controller: uabHqCtrl,
    bindings:{
      images: "="
    },
    templateUrl: "templates/uab-hq.html"
});


function isChrome() {
   return navigator.userAgent.indexOf('Chrome')!=-1;
}

var uabInputRadio = function(){
  return {
    controller: 'inputValidationCtrl',
    templateUrl: "templates/inputs/radio.html",
    transclude: true,
    scope: {
      sentence: "@",
      submitText: "@",
      failMessage: "@"
    },
    link: function (scope, element, attrs, ctrl, transclude){
      scope.$ctrl = angular.merge(ctrl, { sentence: scope.sentence, submitText: scope.submitText, failMessage: scope.failMessage })
      transclude(scope, function(clone, scope, compile){
        var radioGroup = element.find('md-radio-group');
        $(clone).appendTo(radioGroup);
      });
    }
  }
};

angular.module('application').directive('uabInputRadio', uabInputRadio)

var uabInputRadioButton = function(){
  return {
    template: '<md-radio-button value="{{value}}" ng-disabled="$ctrl.correct"><ng-transclude></ng-transclude></md-radio-button>',
    transclude: true,
    require: "^uabInputRadio",
    scope: {
      value: "@",
      disabled: "="
    },
    link: function(scope, element, attrs, ctrl){
      scope.$ctrl = ctrl;
    }
  }
};

angular.module('application').directive('uabInputRadioButton', uabInputRadioButton)
var uabInputText = {
  controller: 'inputValidationCtrl',
  templateUrl: "templates/inputs/text.html",
  bindings: {
    label: "@",
    sentence: "@",
    full: "=",
    submitText: "@",
    failMessage: "@"
  }
};

angular.module('application').component('uabInputText',uabInputText)




var uabPaginationCtrl = function($rootScope, $timeout){
    var self = this;


    self.next = function(){
        var currentPosition  = $rootScope.$global.current_topic.position + 1;
        var hasIndex = $rootScope.$global.manifest.topicos[currentPosition];

        self.nextTopic = hasIndex;

        return angular.isDefined(hasIndex) ? true : false;
    }

    self.prev = function(){
        var currentPosition  = $rootScope.$global.current_topic.position - 1;
        var hasIndex = $rootScope.$global.manifest.topicos[currentPosition];

        self.prevTopic = hasIndex;

        return angular.isDefined(hasIndex) ? true : false;
    }

    self.reset = function(){
        self.nextTopic = null;
        self.prevTopic = null;
    }

    self.$onInit = function(){
        self.reset();
        $timeout(angular.bind(this, self.next));
        $timeout(angular.bind(this, self.prev));
    }

    $rootScope.$on("$stateChangeStart", function(event){
        self.reset();
        $timeout(angular.bind(this, self.next));
        $timeout(angular.bind(this, self.prev));
    });

    return self;
}

uabPaginationCtrl.$inject = ['$rootScope','$timeout']

angular.module("application").component("uabPagination",{
    controller: uabPaginationCtrl,
    templateUrl: "templates/uab-pagination.html",
    bindings:{
      asText: "="
    }
})

var uabQrCodeCtrl = function($controller, $mdDialog){
  var self = this

  self.trigger = function(){
    $mdDialog.show({
      templateUrl: "templates/dialogs/qr-code.html",
      controller: "SimpleDialogCtrl",
      controllerAs: "dialog",
      clickOutsideToClose: true,
      locals: {
        title: null,
        text: null
      }
    })
  }

  return self;
}

uabQrCodeCtrl.$inject = ['$controller', '$mdDialog']

var uabQrCode = {
  controller: uabQrCodeCtrl,
  templateUrl: 'templates/uab-qr-code.html'
}

angular.module('application').component('uabQrCode', uabQrCode)
var uabQuadro = function(){
  return {
    scope: {
      icon: "@",
      title: "@"
    },
    transclude: true,
    templateUrl: "templates/uab-quadro.html"
  }
};

angular.module('application').directive('uabQuadro', uabQuadro)

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

var SanfonadoCtrl = function($scope, $element){
  var self = this

  self.$onInit = function(){
    self.element = $element    

    $(self.element).find('[uab-sanfonado-toggle]').on('click', self.toggle)

    if(self.group){
      self.group.join($scope)
    }
  }

  self.toggle = function(){
    self.group.closeAll()
    $(self.element).toggleClass('active')
    $(self.element).find('.uab-sanfonado-wrap').toggleClass('active')
  }
  
  self.open = function(){
    $(self.element).addClass('active')
    $(self.element).find('.uab-sanfonado-wrap').addClass('active')
  }

  self.hide = function(){
    $(self.element).removeClass('active')
    $(self.element).find('.uab-sanfonado-wrap').removeClass('active')
  }

  return self
}

SanfonadoCtrl.$inject = ['$scope','$element']

var SanfonadoComponent = {
  controller: SanfonadoCtrl,
  bindings: {
    group: "="
  }
}

angular.module('application').component('uabSanfonado', SanfonadoComponent)

var uabTabsVerticalCtrl = function($element){
  var self = this

  $($element)
    .find('.uab-tabs-pagination .md-button').on('click', angular.bind(self, onClickItem, $element))

  return self;
};

uabTabsVerticalCtrl.$inject = ['$element'];

var uabTabsVertical = {
  controller: uabTabsVerticalCtrl  
};

angular.module('application').component('uabTabsVertical', uabTabsVertical);

// @private
function onClickItem(element, e){
  e.preventDefault()

  var tabId = $(e.target).parent().attr('target')

  // unmark all itens
  $(e.target).closest('ul').find('li').removeClass('active');
  $(e.target).closest('ul').find('li .md-primary').removeClass('md-primary');
  // mark current item
  $(e.target).addClass('md-primary');
  $(e.target).parent().addClass('active');

  activeTab(element, tabId);
};

function activeTab(element, tabId){
  $(element).find('.uab-tabs-body md-content').removeClass('active');

  var tab = $(element).find('.uab-tabs-body').find(tabId)

  $(tab).addClass('active');
  $(tab).scrollTop(0);
};
var Annotations = function($mdSidenav){
  var self = this

  self.visible = false
  self.data = []

  self.toggle = function(){
    self.visible = !self.visible
  }

  return self
}

Annotations.$inject = ['$mdSidenav']

angular.module('application').factory('Annotations',  Annotations)

var uabAnnotationsCtrl = function($rootScope, Annotations){
  var self = {
    taToolbar: [
      ['h1', 'h2', 'bold', 'italics'],
    ]
  }

  self.$annotations = Annotations

  self.$newComment = {
    text: ''
  }

  self.comments = []

  self.$onInit = function(){
    self.topic = $rootScope.$global.current_topic
  }

  self.toggle = function(){
    Annotations.toggle()
  }

  self.sendComment = function(){
    console.log(self.$newComment.text)
    self.comments.push({
      text: self.$newComment.text,
      created_at: new Date()
    })

    self.$newComment.text = ''
  }

  $rootScope.$on('topic:change', function(event, topic){
    self.topic = topic
  })

  return self
}

uabAnnotationsCtrl.$inject = ['$rootScope','Annotations']

var uabAnnotations = {
  controller: uabAnnotationsCtrl,
  templateUrl: "templates/uab-annotations.html"
}

angular.module('application').component('uabAnnotations', uabAnnotations)

var uabSidenavCtrl = function(Sidenav){
  var self = this

  self.close = function(){
    Sidenav.close()
  }

  return self
}

uabSidenavCtrl.$inject = ['Sidenav']

var uabSidenav = {
  controller: uabSidenavCtrl,
  templateUrl: "templates/uab-sidenav.html"
}

angular.module('application').component('uabSidenav', uabSidenav)

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

var dataFancyBox = function(){
  return {
    restrict: "A",
    scope: {
      'fancyBox':'@'
    },
    link: function(scope, element, attrs){
      console.log(element)
      $(element).click(function(e){
        console.log("Catch")
      })
    }
  }
}

angular.module('application').directive('fancyBox', dataFancyBox)
var uabMedia = function(){
  return {
    restrict: 'A',
    scope: {
      type: "@"
    },
    link: function(scope, element, attr){
      var media = element.get(0)
      plyr.setup(media);
    }
  }
};

angular.module('application').directive('uabMedia', uabMedia);

var uabSlideItem = function(){
  return {
    restrict: "A",
    scope: {
      uabSlideItem: "@"
    },
    templateUrl: "templates/uab-slide-item.html"
  }
}

angular.module("application").directive("uabSlideItem", uabSlideItem)

var TIMEOUT = 2000;

var uabSvgAnimation = function($timeout){
  return {
    restrict: "E",
    scope: true,
    link: function(scope, element, attrs){
      $(element).find('iframe').on('load', function(e){
        $timeout(angular.bind(this, onIframeLoad, element), TIMEOUT)
      })
    }
  }
}

uabSvgAnimation.$inject = ['$timeout']

angular.module("application").directive("uabSvgAnimation", uabSvgAnimation)


var onIframeLoad = function(element){
  var body = $(element).find('iframe').contents().find('body')
  var canvas_container = $(body).find('#animation_container')

  // Update canvas container view
  $(canvas_container).css('margin','auto')

  if($(window).width() < 600){
    $(element).css('height','')
    
    $(canvas_container).css('max-width','100%')
    $(canvas_container).css('height','')
    $(canvas_container).css('height','auto')
    
    // Update canvas view
    $(canvas_container).children('#canvas').css('max-width','100%')
    $(canvas_container).children('#canvas').css('height','')
    $(canvas_container).css('height','auto')
  }

  $(window).resize(angular.bind(this, onIframeLoad, element))
}
var ApplicationCtrl = function ($rootScope, $mdMedia, $mdToast, $sce, Sidenav) {
  var self = this;

  
  self.renderHTML = function(text){
    return $sce.trustAsHtml(text);
  }
  
  // Audio Button API
  self.listen = function (location, msg) {
    var sound = document.createElement('audio')
    
    sound.addEventListener('play', function (e) {
      $mdToast.showSimple( msg || 'Executando Faixa')
    })
    
    sound.src = location
    sound.play();
  }

  $rootScope.$mdMedia = $mdMedia;
  $rootScope.$renderHTML = self.renderHTML

  return self;
};

ApplicationCtrl.$inject = ['$rootScope', '$mdMedia', '$mdToast', '$sce', 'Sidenav']

angular.module("application").controller("ApplicationCtrl", ApplicationCtrl);

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


var inputValidationCtrl = function ($mdToast) {
  var self = this;

  self.$onInit = function () {
    console.log(self)
  }

  self.onSubmit = function () {
    if (self.value.toUpperCase() == self.sentence.toUpperCase()) {
      setCorrect();
    } else {
      setIncorrect();
      $mdToast.showSimple(self.failMessage || "Resposta incorreta tente novamente")
    }
  }

  function setCorrect() {
    self.correct = true
    delete self.incorrect
  }

  function setIncorrect() {
    self.incorrect = true
    delete self.correct
  }
}

inputValidationCtrl.$inject = ['$mdToast']

angular.module('application').controller('inputValidationCtrl', inputValidationCtrl)