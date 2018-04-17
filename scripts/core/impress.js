var Impress = {
  _instance: {
    isPrinting: false,
    topicos: []
  },

  instance: function($http, manifest){
    GLOBAL.impress = Impress;

    manifest.topicos.forEach(function(t){
      $http.get(t.local).then(function(response){
        Impress._instance.topicos.push(response.data)
      });
    });
    // Bind print events
    window.onbeforeprint = Impress.onBeforePrint
    window.onafterprint = Impress.onAfterPrint
  },
  onBeforePrint: function(){
    $('#root').addClass('ng-hide')
    $('#impress').removeClass('ng-hide') 
    Impress.addLinkFonts()
    console.log("printing...")
  },
  onAfterPrint: function(){
    $('#impress').addClass('ng-hide')
    $('#root').removeClass('ng-hide')
    Impress.removeLinkFonts()
    console.log("exit print...")
  },
  addLinkFonts: function(){
    Impress.createListLinks();
    
    $('#impress').find("a[href^='http']").each(function(i){
			if ( $(this).attr('id') == 'logo-ufc' || $(this).attr('id') == 'logo-ufcv' ) {
				// evitando colocar os links dos logos de rodape na lista de links
			} else {
				var b = i+1;
        link = $(this).attr("href");
        // Create Link reference
        $(this).append("<span class='image-link'> ["+b+"]</span>");
        // Add link in list
				$("#links").append("<li>"+ b + " - " + link+"</li>");
			}
		});
  },
  removeLinkFonts: function(){
    Impress.destroyListLinks();
    
    $('#impress').find(".image-link").each(function(i){
			$(this).remove()
		});
  },
  createListLinks: function(){
    var list = "<ol id='links'></ol>"
    $('#impress').append(list)
  },
  destroyListLinks: function(){
    $('#impress #links').remove()
  }
}