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

      // $('.main').scrollTop() >= 200 
      //   ? $('uab-header-titles').addClass('hidden') 
      //   : $('uab-header-titles').removeClass('hidden')
      
      $('.main').scrollTop() >= 200 
        ? $('uab-header').addClass('hidden') 
        : $('uab-header').removeClass('hidden')
    })
  }
}
