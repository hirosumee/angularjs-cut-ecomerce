'use strict';
angular.module('myApp.article',[])
.directive('customArticle',[function () {
    return {
        restrict:'E',
        scrope:{
            article:'='
        },
        templateUrl:'/components/article/article.html'
    }
}]);