'use strict';
angular.module('myApp.loginView',['ngRoute'])
.config(['$routeProvider',function ($routeProvider) {
   $routeProvider.when('/login',{
       templateUrl:'/views/login/login.html',
       controller:'loginController'
   })
}])
.controller('loginController',['$scope',function ($scope) {

}]);