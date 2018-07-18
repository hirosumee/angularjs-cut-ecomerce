'use strict';
angular.module('myApp.section', [])
  .directive('customSection', [function () {
      return {
          restrict: 'E',
          transclude: true,
          scope: {
              title: '@'
          },
          templateUrl: '/components/section/section.html'
      }
  }])
  .directive('productTypeOne', [function () {
        return {
            scope:{
                product:'='
            },
            restrict:'E',
            templateUrl:'/components/section/productOne.html'
        }
  }])
  .directive('productTypeTwo', [function () {
      return {
          restrict:'E',
          scope:{
              product:'='
          },
          templateUrl:'/components/section/productTwo.html'
      }
  }])
    .directive('productTypeThree',[function () {
        return {
            restrict:'E',
            scope:{
                product:'='
            },
            templateUrl:'/components/section/productThree.html'
        }
    }]);