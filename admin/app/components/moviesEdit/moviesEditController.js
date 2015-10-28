(function() {

    'use strict';

    angular.module('admin').controller('moviesEditController', moviesEditController);

    moviesEditController.$inject = ['$scope', '$routeParams', '$location', '$log', 'toastr', 'requestService'];

    function moviesEditController($scope, $routeParams, $location, $log, toastr, requestService) {

        // Initial values
        var state = 0;
        var requiredFields = ['textHeading', 'textSubheading', 'textDescription', 'textStoryline', 'textLink', 'textIMDBRating'];

        $scope.backToMovies = function() {
            $location.path('/movies');
        };

        // make call to obtain movie
        loadMovieId();

        /**
         * Obtain movie data and show it in datatable fields
         */
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

        // validate the entry
        function validate() {
            for(var i = 0, length = requiredFields.length; i < length; i++) {
                if ($scope[requiredFields[i]] === undefined || $scope[requiredFields[i]] === '') {
                    state = -1;
                    break;
                } else {
                    state = 1;
                }
            }
        }

        $scope.saveMovie = function() {

            validate();
            var payload = {};

            if (state === -1) {
                toastr.error('All fields must be filled!', 'Error');
            } else {

                payload = {
                    heading: $scope.textHeading,
                    subheading: $scope.textSubheading,
                    description: $scope.textDescription,
                    storyline: $scope.textStoryline,
                    img: $scope.picture,
                    link: $scope.textLink,
                    imdb_rating: $scope.textIMDBRating
                };

                requestService.updateMovie($routeParams.movieId, payload).then(

                    // success function
                    function(data) {
                        $log.debug('moviesEditController -> updateMovie success', data);
                        toastr.success('Data successfully saved!', 'Success');
                    },

                    // error function
                    function() {
                        $log.debug('moviesEditController -> updateMovie error');
                        toastr.error('Unexpected error has occurred!', 'Error');
                    }
                );


            }


        };





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