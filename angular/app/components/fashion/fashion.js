'use strict';
angular.module('myApp.fashion',[])
.directive('fashion',[function () {
    return {
        restrict:'E',
        scope:{
            fashion:'='
        },
        templateUrl:'/components/fashion/fashion.html'
    }
}]);