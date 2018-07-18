'use strict';
angular.module('myApp.subscribe',[])
.directive('subscribeLine',[function () {
    return {
        restrict:'E',
        templateUrl:'/components/subscribe_line/subscribe.html'
    }
}]);