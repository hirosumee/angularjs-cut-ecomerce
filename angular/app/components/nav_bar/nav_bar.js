'use strict';
angular.module('myApp.navBar',[])
    .directive('navBar',['$timeout',function ($timeout) {
        function link(scope,element,attrs) {
            //$timeout(()=>{
                var script = document.createElement('script');
                script.src = "./assets/js/material-kit.js?v=2.0.0";
                document.getElementsByTagName('head')[0].appendChild(script);
            //},1000)
        }
        return {
            restrict:'AECM',
            scope:{
                bgcolor:'@'
            },
            templateUrl:'/components/nav_bar/nav_bar.html',
            link
        }
    }]);
