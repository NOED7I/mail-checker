//
// directives module
//
// Author Cloud@txthinking.comm
//

'use strict';

var ds = angular.module('ds', []);

ds.directive('header', ["$location",
    function($location) {
        return {
            templateUrl : "templates/header.html",
            replace : true
        }
    }
]);

ds.directive('footer', [
    function() {
        return {
            templateUrl : "templates/footer.html",
            replace : true,
            link : function(scope, element, attrs){
                scope.year = new Date().getFullYear();
            }
        }
    }
]);

