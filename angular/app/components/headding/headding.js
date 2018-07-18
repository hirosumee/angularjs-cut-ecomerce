'use strict';
angular.module('myApp.headding', [])
    .directive('headding', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/headding/headding.html'
        }
    })
    .directive('smallHeadding', function () {
        return {
            restrict:'E',
            templateUrl:'components/headding/small-headding.html'
        }
    });