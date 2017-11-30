var View = {
  configure: function($provide){
    $provide.decorator('$uiViewScroll', function ($delegate) {
      return function (uiViewElement) {
        // Return to top from md-content every change route
        $(uiViewElement).closest("md-content").scrollTop(0)
      };
    });
  }
}
