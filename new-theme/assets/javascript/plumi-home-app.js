(function() {

    /*var plumiHomeApp = angular.module('plumi_home_app', ['ngRoute', 'ngAnimate']);*/
    var plumiHomeApp = angular.module('plumi_home_app', []);

    plumiHomeApp.dev = true;
    plumiHomeApp.dateNum = new Date().valueOf();

    plumiHomeApp.templateParameters = function(){
        return plumiHomeApp.dev ? '?' + plumiHomeApp.dateNum : '';
    };

    plumiHomeApp.directive('plumiHome', [function() {
        return {
        	restrict: 'E',
            templateUrl: 'contents/plumi-home.html' + plumiHomeApp.templateParameters(),
		    link: function( scope ){}
        };
    }]);

    plumiHomeApp.directive('plumiHeader', [function() {
        return {
        	restrict: 'E',
            templateUrl: 'contents/plumi-header.html' + plumiHomeApp.templateParameters(),
		    link: function( scope ){}
        };
    }]);

    plumiHomeApp.directive('plumiFooter', [function() {
        return {
        	restrict: 'E',
            templateUrl: 'contents/plumi-footer.html' + plumiHomeApp.templateParameters(),
		    link: function( scope ){}
        };
    }]);

    plumiHomeApp.directive('plumiMain', [function() {
        return {
        	restrict: 'E',
            templateUrl: 'contents/plumi-main.html' + plumiHomeApp.templateParameters(),
		    link: function( scope ){
                
                jQuery('#main-video').mediaelementplayer({
                    success: function (mediaElement, domObject) {

                    }
                });

            }
        };
    }]);
    
    plumiHomeApp.directive('bootstrapCustomGrid', [function() {
        return {
            restrict: 'E',
            templateUrl: 'contents/custom/bootstrap-custom-grid.html' + plumiHomeApp.templateParameters(),
            link: function( scope ){},
            controller: function(){
                this.displayGrid = false;
            },
            controllerAs: 'bs_custom_grid_control'
        };
    }]);
})();