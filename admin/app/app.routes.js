(function() {

    'use strict';

    angular.module('admin').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider

            .otherwise({
                redirectTo: '/movies'
            })

            .when('/login', {
                templateUrl: 'app/components/login/loginView.html',
                controller: 'loginController'
            })
            .when('/dashboard', {
                templateUrl: 'app/components/dashboard/dashboardView.html',
                controller: 'dashboardController',
                resolve: {
                    auth: function (AuthService) {
                        AuthService.checkAuth();
                    }
                }
            })
            .when('/movies', {
                templateUrl: 'app/components/movies/moviesView.html',
                controller: 'moviesController',
                resolve: {
                    auth: function (AuthService) {
                        AuthService.checkAuth();
                    }
                }
            })
            .when('/moviesNew', {
                templateUrl: 'app/components/moviesNew/moviesNewView.html',
                controller: 'moviesNewController',
                resolve: {
                    auth: function (AuthService) {
                        AuthService.checkAuth();
                    }
                }
            })
            .when('/moviesEdit/:movieId', {
                templateUrl: 'app/components/moviesEdit/moviesEditView.html',
                controller: 'moviesEditController',
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
            .when('/upcomingNew', {
                templateUrl: 'app/components/upcomingNew/upcomingNewView.html',
                controller: 'upcomingNewController',
                resolve: {
                    auth: function (AuthService) {
                        AuthService.checkAuth();
                    }
                }
            })
            .when('/upcomingEdit/:id', {
                templateUrl: 'app/components/upcomingEdit/upcomingEditView.html',
                controller: 'upcomingEditController',
                resolve: {
                    auth: function (AuthService) {
                        AuthService.checkAuth();
                    }
                }
            })
            .when('/users', {
                templateUrl: 'app/components/users/usersView.html',
                controller: 'usersController',
                resolve: {
                    auth: function (AuthService) {
                        AuthService.checkAuth();
                    }
                }
            })
            .when('/userNew', {
                templateUrl: 'app/components/usersNew/usersNewView.html',
                controller: 'usersNewController',
                resolve: {
                    auth: function (AuthService) {
                        AuthService.checkAuth();
                    }
                }
            })
            .when('/userEdit/:user_id', {
                templateUrl: 'app/components/usersEdit/usersEditView.html',
                controller: 'usersEditController',
                resolve: {
                    auth: function (AuthService) {
                        AuthService.checkAuth();
                    }
                }
            })
            .when('/comments', {
                templateUrl: 'app/components/comments/commentsView.html',
                controller: 'commentsController',
                resolve: {
                    auth: function (AuthService) {
                        AuthService.checkAuth();
                    }
                }
            })
            .when('/commentsEdit/:id', {
                templateUrl: 'app/components/commentsEdit/commentsEditView.html',
                controller: 'commentsEditController',
                resolve: {
                    auth: function (AuthService) {
                        AuthService.checkAuth();
                    }
                }
            })
            .when('/ratings', {
                templateUrl: 'app/components/ratings/ratingsView.html',
                controller: 'ratingsController',
                resolve: {
                    auth: function (AuthService) {
                        AuthService.checkAuth();
                    }
                }
            });

        // TODO: Integrate $locationProvider in order to avoid # from url
        /*$locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });*/

    }]);

}());