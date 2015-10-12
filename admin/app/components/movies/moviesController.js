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

        $scope.addNewMovie = function() {
            $location.path('/moviesNew');
        };

        $scope.editMovie = function(movie_id) {
            $location.path('/moviesEdit/' + movie_id);
        };

        $scope.deleteMovie = function(movie_id) {
            console.log('deletes the selected movie', movie_id);
        };

        // create specific call for obtaining single movie (when editing)
        // TODO: refactor to use real value once edit field is clicked
        /*requestService.getMovieByID('1').then(

            // success function
            function(data) {
                $log.debug('moviesController -> getMovieByID success', data);
            },

            // error function
            function() {
                $log.debug('moviesController -> getMovieByID error');
            }
        );*/

        // create specific call for saving single movie (updating)
        // TODO: refactor and prepare payload to be save (see example from registering user on UI side)
        /*requestService.saveMovie(payload).then(

            // success function
            function(data) {
                $log.debug('movieController -> saveMovie success', data);
            },

            // error function
            function() {
                $log.debug('movieController -> saveMovie error');
            }
        );*/

        // crate specific call for deleting single movie (deleting)
        // TODO: refactor to use real value once the delete field is clicked
        /*requestService.deleteMovie(id).then(

            // success function
            function(data) {
                $log.debug('movieController -> deleteMovie success', data);
            },

            // error function
            function() {
                $log.debug('movieController -> deleteMovie error');
            }
        );*/

    }


}());