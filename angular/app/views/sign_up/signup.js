'use strict';
angular.module('myApp.signUpView', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/signup', {
            templateUrl: '/views/sign_up/signup.html',
            controller: 'signUpController'
        })
    }])
    .controller('signUpController', ['$scope', function ($scope) {

    }]);
