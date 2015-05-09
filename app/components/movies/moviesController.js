(function() {

    'use strict';

    angular.module('myapp').controller('moviesController', moviesController)
        .filter('startFrom', function() {
            return function(input, start) {
                start = +start;
                if (input) {
                    return input.slice(start);
                }
            }
        });

    moviesController.$inject = ['$scope', '$log', 'requestService'];

    function moviesController($scope, $log, requestService) {

        $scope.movies = [];
        $scope.totalItems = 0;
        $scope.itemsPerPage = 5;
        $scope.currentPage = 1;

        // Main Data
        requestService.getMovies().then(

            // success function
            function(data) {
                $log.debug('moviesController -> getMovies success: ', data.movies);
                $scope.movies = data.movies;
                $scope.totalItems = $scope.movies.length;
            },

            // error function
            function() {
                $log.debug('getMovies error');
            }
        );

    }

}());