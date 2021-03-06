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

    // Observe content scroll
    $('.main').on('scroll', function(e){
      var element = $(e.target);
      var body = $('body');
      
      $('.main').scrollTop() >= 320
        ? $('uab-header, body').addClass('animated') 
        : $('uab-header, body').removeClass('animated')
    })
  }
}
