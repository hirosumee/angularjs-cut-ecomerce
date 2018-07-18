'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.ecommerce',
    'myApp.view2',
    'myApp.productView',
    'myApp.loginView',
    'myApp.signUpView',
    'myApp.cartView',
    'myApp.version',
    'myApp.navBar',
    'myApp.headding',
    'myApp.section',
    'myApp.filter',
    'myApp.fashion',
    'myApp.article',
    'myApp.subscribe',
    'myApp.footer'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    // $routeProvider.otherwise({redirectTo: '/ecommerce'});
}])
    .controller('latestOffer', ['$scope', function ($scope) {
        $scope.latestProducts = [
            {
                img: '../assets/img/examples/gucci.jpg',
                name: 'Gucci',
                description: 'The structured shoulders and sleek detailing ensure a sharp silhouette. Team it with a silk pocket square and leather loafers.',
                oldPrice: '1,430',
                newPrice: '743'
            },
            {
                img: '../assets/img/examples/dolce.jpg',
                name: 'Dolce &amp; Gabbana',
                description: 'The structured shoulders and sleek detailing ensure a sharp silhouette. Team it with a silk pocket square and leather loafers.',
                oldPrice: '1,430',
                newPrice: '743'
            },
            {
                img: '../assets/img/examples/tom-ford.jpg',
                name: 'Dolce &amp; Gabbana',
                description: 'The structured shoulders and sleek detailing ensure a sharp silhouette. Team it with a silk pocket square and leather loafers.',
                oldPrice: '1,430',
                newPrice: '743'
            }
        ]
    }])
    .controller('productController', ['$scope', function ($scope) {
        $scope.filterData = {
            clothing: ['Blazers', 'Casual Shirts', 'Formal Shirts', 'Jeans', 'Polos', 'Pyjamas', 'Shorts', 'Trousers'],
            designer: ['All', 'Polo Ralph Lauren', 'Wooyoungmi', 'Alexander McQueen', 'Tom Ford', 'AMI',
                'Berena', 'Thom Sweeney', 'Burberry Prorsum', 'Calvin Klein', 'Kingsman', 'Club Monaco', 'Dolce &amp; Gabbana'
                , 'Gucci', 'Biglioli', 'Lanvin', 'Loro Piana', 'Massimo Alba'],
            colors: ['All', 'Black', 'Blue', 'Brown', 'Gray', 'Green', 'Neutrals', 'Purple']
        };
        $scope.products = [
            {
                img: '../assets/img/examples/suit-1.jpg',
                title: 'Polo Ralph Lauren',
                description: 'Impeccably tailored in Italy from lightweight navy wool.',
                price: '800'
            },
            {
                img: '../assets/img/examples/suit-2.jpg',
                title: 'Wooyoungmi',
                description: ' Dark-grey slub wool, pintucked notch lapels.',
                price: '555'
            },
            {
                img: '../assets/img/examples/suit-3.jpg',
                title: 'Tom Ford',
                description: 'Immaculate tailoring is TOM FORD\'s forte.',
                price: '879'
            },
            {
                img: '../assets/img/examples/suit-4.jpg',
                title: 'Thom Sweeney',
                description: 'It\'s made from lightweight grey wool woven.',
                price: '680'
            },
            {
                img: '../assets/img/examples/suit-5.jpg',
                title: 'Kingsman',
                description: 'Crafted from khaki cotton and fully canvassed.',
                price: '725'
            },
            {
                img: '../assets/img/examples/suit-6.jpg',
                title: 'Boglioli',
                description: 'Masterfully crafted in Northern Italy.',
                price: '699'
            }
        ];
        $scope.fashions ={
            small:[
                {
                    img:'../assets/img/examples/chris9.jpg',
                    info:'Productivy Apps',
                    title:'The best trends in fashion 2017',
                    description:'Don\'t be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...'
                },
                {
                    img:'../assets/img/examples/color3.jpg',
                    info:'Fashion News',
                    title:'Kanye joins the Yeezy team at Adidas',
                    description:'Don\'t be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...',

                },
                {
                    img:'../assets/img/examples/chris1.jpg',
                    info:'Productivy Apps',
                    title:'Learn how to use the new colors of 2017',
                    description:'Don\'t be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...',
                }
            ],
            big:[
                {
                    img:'../assets/img/dg3.jpg',
                    info:'Tutorials',
                    title:'Trending colors of 2017',
                    description:'Don\'t be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...'
                },
                {
                    img:'../assets/img/dg1.jpg',
                    info:'Productivy Style',
                    title:'Fashion &amp; Style 2017',
                    description:'Don\'t be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...',

                }
            ]
        };
    }])
    .controller('articleController',['$scope',function ($scope) {
        $scope.articles = [
            {
                img:'../assets/img/dg6.jpg',
                info:'Trends',
                title:'Learn how to wear your scarf with a floral print shirt',
                description:'Don\'t be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...',

            },
            {
                img:'../assets/img/dg10.jpg',
                info:'Fashion week',
                title:'Katy Perry was wearing a Dolce &amp; Gabanna arc dress',
                description:'Don\'t be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...',
            },
            {
                img:'../assets/img/dg9.jpg',
                info:'Fashion week',
                title:'Check the latest fashion events and which are the trends',
                description:'Don\'t be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...'
            }
        ];
    }]);
