var Impress = {
  _instance: {
    isPrinting: false,
    topicos: []
  },

  instance: function($http, manifest){
    GLOBAL.impress = Impress;

    console.log($http)

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
    console.log("printing...")
  },
  onAfterPrint: function(){
    $('#impress').addClass('ng-hide')
    $('#root').removeClass('ng-hide')
    console.log("exit print...")
  }
}