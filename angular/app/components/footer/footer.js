'use strict';
angular.module('myApp.footer', [])
    .directive('customFooter', [function () {
        return {
            restrict: 'E',
            templateUrl: '/components/footer/footer.html'
        }
    }])
    .directive('customFooterTwo', [function () {
        return {
            restrict: 'E',
            templateUrl:'/components/footer/footer_2.html'
        }
    }]);