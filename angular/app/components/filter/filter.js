'use strict';
angular.module('myApp.filter',[])
.directive('filter',[function () {
    function link(scope,element,attrs) {
            var slider2 = document.getElementById('sliderRefine');
            noUiSlider.create(slider2, {
                start: [101, 790],
                connect: true,
                range: {
                    'min': [30],
                    'max': [900]
                }
            });

            var limitFieldMin = document.getElementById('price-left');
            var limitFieldMax = document.getElementById('price-right');

            slider2.noUiSlider.on('update', function (values, handle) {
                if (handle) {
                    limitFieldMax.innerHTML = $('#price-right').data('currency') + Math.round(values[handle]);
                } else {
                    limitFieldMin.innerHTML = $('#price-left').data('currency') + Math.round(values[handle]);
                }

            });
    }
    return {
        restrict:'E',
        templateUrl:'/components/filter/filter.html',
        link,
    }
}]);