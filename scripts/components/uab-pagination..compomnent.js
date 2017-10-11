var uabPaginationCtrl = function($rootScope){
    var self = this;


    self.next = function(){
        var hasNext = _.indexOf($rootScope.$global.manifest.topicos, ($rootScope.$global.current_topic.position + 1));
        console.log(hasNext, $rootScope.$global.current_topic, $rootScope.$global.manifest.topicos)
        if(hasNext <= 0){
            return false
        } else{
            return true;
        }
    }

    return self;
}

uabPaginationCtrl.$inject = ['$rootScope']

angular.module("application").component("uabPagination",{
    controller: uabPaginationCtrl,
    templateUrl: "templates/uab-pagination"
})