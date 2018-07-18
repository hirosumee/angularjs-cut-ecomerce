'use strict';
angular.module('myApp.cartView', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/cart', {
            templateUrl: '/views/cart/cart.html',
            controller: 'cartController'
        })
    }])
    .controller('cartController', ['$scope', function ($scope) {

        $scope.products = [
            {
                img:'../assets/img/product1.jpg',
                name:'Spring Jacket',
                designer:'by Dolce&Gabbana',
                color:'Red',
                size:'M',
                price:549,
                amount:1
            },
            {
                img:'../assets/img/product2.jpg',
                name:'Short Pants',
                designer:'by Pucci',
                color:'Purple',
                size:'M',
                price:499,
                amount:2
            },
            {
                img:'../assets/img/product3.jpg',
                name:'Pencil Skirt',
                designer:'by Valentino',
                color:'White',
                size:'XL',
                price:799,
                amount:1
            }
        ];
        $scope.total = $scope.products.reduce((acc,currentValue)=>{
            return acc +(currentValue.amount*currentValue.price);
        },0);

        $scope.$watch($scope.products,function (newVal) {
            if(Array.isArray(newVal)){
                $scope.total = newVal.reduce((acc,currentValue)=>{
                    return acc +(currentValue.amount*currentValue.price);
                },0);
            }
        });

    }]);