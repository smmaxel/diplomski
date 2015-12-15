(function() {

    'use strict';

    angular.module('myapp').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider

            .otherwise({
                redirectTo: '/home'
            })

            .when('/home', {
                templateUrl: 'app/components/home/homeView.html',
                controller: 'homeController'
            })
            .when('/movies', {
                templateUrl: 'app/components/movies/moviesView.html',
                controller: 'moviesController'
            })
            .when('/movieComments/:movieId', {
                templateUrl: 'app/components/movie-comments/movieComments.html',
                controller: 'movieCommentsController'
            })
            .when('/upcoming', {
                templateUrl: 'app/components/upcoming/upcomingView.html',
                controller: 'upcomingController'
            })
            .when('/about', {
                templateUrl: 'app/components/about/aboutView.html',
                controller: 'aboutController'
            })
            .when('/login', {
                templateUrl: 'app/components/login/login.html',
                controller: 'loginController',
                resolve: {
                    auth: function (AuthService) {
                        AuthService.checkAuth();
                    }
                }
            })
            .when('/register', {
                templateUrl: 'app/components/register/register.html',
                controller: 'registerController',
                resolve: {
                    auth: function (AuthService) {
                        AuthService.checkAuth();
                    }
                }
            })
            .when('/registered/:id', {
                templateUrl: 'app/components/registered/registered.html',
                controller: 'registeredController'
            });


        // TODO: Integrate $locationProvider in order to avoid # from url
        /*$locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });*/

    }]);

}());