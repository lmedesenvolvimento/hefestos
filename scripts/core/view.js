var View = {
  configure: function($provide){
    $provide.decorator('$uiViewScroll', function ($delegate) {
      return function (uiViewElement) {
        var content = $(uiViewElement).closest("md-content")
        // Return to top from md-content every change route
        $(content).scrollTop(0)
        // Focus in content
        $(content).focus()
      };
    });
  }
}
