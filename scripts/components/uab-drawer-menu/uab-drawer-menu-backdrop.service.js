var DELAY = 500;

var Backdrop = function($timeout){
    return {
        element: null,
        body: angular.element(document.body),
        template: "<div class='uab-dropback'></div>",
        toggle: function(){

        },
        open: function(onClose){
            // bind externals events
            this.onClose = onClose  
            //  Create backdrop element
            this.mount()            
            // bind envents for backdrop element
            return this.bindEvents(); 
        },
        close: function(){
            $timeout(angular.bind(this, this.unmount), DELAY);
            this.element.removeClass("visible");
            return this.onClose();
        },
        bindEvents: function(){
            this.element.on('click', angular.bind(this, this.close))
        },
        mount: function(){                 
            this.element = angular.element(this.template);
            this.body.append(this.element);
            this.element.delay(100).addClass('visible');
        },
        unmount: function(){
            if(this.element) this.element.remove();
        },
        onClose: null
    };
};

Backdrop.$inject = ['$timeout']

angular.module("application").factory("Backdrop", Backdrop);
