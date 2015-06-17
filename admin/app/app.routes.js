(function() {

    'use strict';

    angular.module('admin').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider

            .otherwise({
                redirectTo: '/dashboard'
            })

            .when('/login', {
                templateUrl: 'app/components/login/loginView.html',
                controller: 'loginController'
            })
            .when('/dashboard', {
                templateUrl: 'app/components/dashboard/dashboardView.html',
                controller: 'dashboardController'
            })
            .when('/movies', {
                templateUrl: 'app/components/movies/moviesView.html',
                controller: 'moviesController'
            })
            .when('/upcoming', {
                templateUrl: 'app/components/upcoming/upcomingView.html',
                controller: 'upcomingController'
            })
            .when('/users', {
                templateUrl: 'app/components/users/usersView.html',
                controller: 'usersController'
            })
            .when('/comments', {
                templateUrl: 'app/components/comments/commentsView.html',
                controller: 'commentsController'
            })
            .when('/ratings', {
                templateUrl: 'app/components/ratings/ratingsView.html',
                controller: 'ratingsController'
            });
            /*.when('/movies', {
                templateUrl: 'app/components/movies/moviesView.html',
                controller: 'moviesController',
                resolve: {
                    auth: function (AuthService) {
                        AuthService.checkAuth();
                    }
                }
            })
            .when('/movieComments/:movieId', {
                templateUrl: 'app/components/movie-comments/movieComments.html',
                controller: 'movieCommentsController',
                resolve: {
                    auth: function (AuthService) {
                        AuthService.checkAuth();
                    }
                }
            })
            .when('/upcoming', {
                templateUrl: 'app/components/upcoming/upcomingView.html',
                controller: 'upcomingController',
                resolve: {
                    auth: function (AuthService) {
                        AuthService.checkAuth();
                    }
                }
            })
            .when('/about', {
                templateUrl: 'app/components/about/aboutView.html',
                controller: 'aboutController',
                resolve: {
                    auth: function (AuthService) {
                        AuthService.checkAuth();
                    }
                }
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
            }*/


        // TODO: Integrate $locationProvider in order to avoid # from url
        /*$locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });*/

    }]);

}());