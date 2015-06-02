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

    moviesController.$inject = ['$scope', '$log', '$location', '$modal', 'requestService'];

    function moviesController($scope, $log, $location, $modal, requestService) {

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

        $scope.open = function (movie) {
            $modal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    movie: function () {
                        return movie;
                    }
                }
            });

        };


        // Redirect to movieComments page with appropriate movie id
        $scope.movieComments = function(id) {
            $location.path('/movieComments/' + id);
        };

        $scope.rating = 3;

    }

}());