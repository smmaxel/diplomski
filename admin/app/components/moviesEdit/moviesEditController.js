(function() {

    'use strict';

    angular.module('admin').controller('moviesEditController', moviesEditController);

    moviesEditController.$inject = ['$scope', '$routeParams', '$location', '$log', 'requestService'];

    function moviesEditController($scope, $routeParams, $location, $log, requestService) {

        $scope.backToMovies = function() {
            $location.path('/movies');
        };

        function loadMovieId() {
            requestService.getMovieByID($routeParams.movieId).then(
                // success function
                function(data) {
                    $log.debug('movieEditController -> loadMovieId success', data);
                    if (data.movie) {
                        var movie = data.movie;
                        $scope.textHeading = movie.heading;
                        $scope.textSubheading = movie.subheading;
                        $scope.textDescription = movie.description;
                        $scope.textStoryline = movie.storyline;
                        $scope.picture = movie.img;
                        $scope.textLink = movie.link;
                        $scope.textIMDBRating = '';
                    } else {
                        // notify about the error
                        console.log('An unknown error has occurred!');
                    }
                },

                // error function
                function() {
                    $log.debug('movieEditController -> loadMovieId error');
                }
            );
        }

        loadMovieId();



        // logic to load the movie data for the particular id
        /*
        * in case there is an error show the error on page
        * */


        // logic for saving the edited movie
        /*
        * in case of success show the success msg
        * in case of error show the error msg
        * */



    }


}());