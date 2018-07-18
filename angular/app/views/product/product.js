'use strict';
angular.module('myApp.productView', ['ngRoute'])
    .config(['$routeProvider', function ($routerProvider) {
        $routerProvider.when('/product/:name.:id', {
            templateUrl: '/views/product/product.html',
            controller: 'productViewController'
        })
    }])
    .controller('productViewController', ['$scope', function ($scope) {
        let product = [
            '../assets/img/examples/product1.jpg',
            '../assets/img/examples/product2.jpg',
            '../assets/img/examples/product3.jpg',
            '../assets/img/examples/product4.jpg'
        ];
        $scope.product = {
            images: product.map((item, index) => {
                return {
                    img: item,
                    tag: `product-page${index + 1}`,
                    active: index === 1
                }
            }),
            description: 'Eres&apos; daring &apos;Grigri Fortune&apos; swimsuit has the fit and coverage of a bikini in' +
            ' a one-piece silhouette. This fuchsia style is crafted from the label&apos;s sculpting peau douce fabric and' +
            ' has flattering cutouts through the torso and back. Wear yours with mirrored sunglasses on vacation.',
            name: 'Becky Silk Blazer',
            price: 335,
            designer: {
                info: 'An infusion of West Coast cool and New York attitude, Rebecca Minkoff is synonymous with It girl' +
                ' style. Minkoff burst on the fashion scene with her best-selling &apos;Morning After Bag&apos; and ' +
                'later expanded her offering with the Rebecca Minkoff Collection - a range of luxe city staples with ' +
                'a &quot;downtown romantic&quot; theme.'
            },
            detail: [
                'Storm and midnight-blue stretch cotton-blend',
                'Notch lapels, functioning buttoned cuffs, two front flap pockets, single vent, internal pocket',
                'Two button fastening',
                '84% cotton, 14% nylon, 2% elastane',
                'Dry clean'
            ],
            colors: ['Rose', 'Gray', 'White'],
            sizes: ['Small', 'Medium', 'Large']
        };

        $scope.relateproducts = [
            {
                img: '../assets/img/examples/card-product1.jpg',
                type: 'Trending',
                title: 'Dolce &amp; Gabbana',
                description: 'Dolce &amp; Gabbana\'s \'Greta\' tote has been crafted in Italy from hard-wearing red' +
                ' textured-leather.',
                price: '1,459',
                hightlight:true,
            },
            {
                img: '../assets/img/examples/card-product3.jpg',
                type: 'Popular',
                title: 'Balmain',
                description: 'Balmain\'s mid-rise skinny jeans are cut with stretch to ensure they retain their ' +
                'second-skin fit but move comfortably.',
                price: '459',
            },
            {
                img:'../assets/img/examples/card-product4.jpg',
                type:'Popular',
                title:'Balenciaga',
                description:'Balenciaga\'s black textured-leather wallet is finished with the label\'s iconic \'Giant\'\ ' +
                'studs. This is where you can...',
                price:'590'
            },
            {
                img:'../assets/img/examples/card-product2.jpg',
                type:'Trending',
                title:'Dolce &amp; Gabbana',
                description:'Dolce &amp; Gabbana\'s \'Greta\' tote has been crafted in Italy from hard-wearing red textured-leather.',
                price:'1459',
                hightlight:true,
            }
        ]
    }]);