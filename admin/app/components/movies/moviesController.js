(function() {

    'use strict';

    angular.module('admin').controller('moviesController', moviesController)
        .filter('startFrom', function() {
            return function(input, start) {
                start = +start;
                if (input) {
                    return input.slice(start);
                }
            }
        });

    moviesController.$inject = ['$scope', '$location', '$log', 'requestService'];

    function moviesController($scope, $location, $log, requestService) {

        // initial values
        $scope.movies = [];
        $scope.totalItems =  0;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;

        // make a call to obtain movies
        getMovies();

        /**
         * Obtain movies and shows them in the UI
         */
        function getMovies() {
            requestService.getMovies().then(

                // success function
                function(data) {
                    $log.debug('moviesController -> getMovies success', data);
                    $scope.movies = data.movies;
                    $scope.totalItems = $scope.movies.length;
                },

                // error function
                function() {
                    $log.debug('moviesController -> getMovies error');
                }
            );
        }

        $scope.addNewMovie = function() {
            $location.path('/moviesNew');
        };

        $scope.editMovie = function(movie_id) {
            $location.path('/moviesEdit/' + movie_id);
        };

        $scope.deleteMovie = function(movie_id) {
            requestService.deleteMovie(movie_id).then(

                // success function
                function(data) {
                    $log.debug('moviesController -> deleteMovie success', data);
                    getMovies();
                },

                // error function
                function() {
                    $log.debug('moviesController -> deleteMovie error');
                }

            );
        };

    }


}());