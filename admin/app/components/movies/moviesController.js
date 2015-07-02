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

    moviesController.$inject = ['$scope', '$log', 'requestService'];

    function moviesController($scope, $log, requestService) {

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


        // create specific call for obtaining single movie (when editing)



        // create specific call for saving single movie (updating)

        // crate specific call for deleting single movie (deleting)


    }


}());