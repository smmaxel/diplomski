(function() {

    'use strict';

    angular.module('myapp').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider

            .otherwise({
                redirectTo: '/home'
            })

            .when('/home', {
                templateUrl: 'app/components/home/homeView.html',
                controller: 'homeController'/*,
                resolve: {
                    auth: function (AuthService) {
                        AuthService.checkAuth();
                }*/
            })
            .when('/movies', {
                templateUrl: 'app/components/movies/moviesView.html',
                controller: 'moviesController'/*,
                 resolve: {
                 auth: function (AuthService) {
                 AuthService.checkAuth();
                 }*/
            })
            .when('/upcoming', {
                templateUrl: 'app/components/upcoming/upcomingView.html',
                controller: 'upcomingController'/*,
                 resolve: {
                 auth: function (AuthService) {
                 AuthService.checkAuth();
                 }*/
            })
            .when('/about', {
                templateUrl: 'app/components/about/aboutView.html',
                controller: 'aboutController'/*,
                 resolve: {
                 auth: function (AuthService) {
                 AuthService.checkAuth();
                 }*/
            })
            .when('/404', {
                templateUrl: 'app/shared/404.html'
            });


        // TODO: Integrate $locationProvider in order to avoid # from url
        /*$locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });*/

    }]);

}());