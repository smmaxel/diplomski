(function() {

    'use strict';

    angular.module('admin').controller('moviesNewController', moviesNewController);

    moviesNewController.$inject = ['$scope', '$location', '$log', 'toastr', 'requestService'];

    function moviesNewController($scope, $location, $log, toastr, requestService) {

        // Initial values
        var state = 0;
        var requiredFields = ['textHeading', 'textSubheading', 'textDescription', 'textStoryline', 'textLink', 'textIMDBRating'];


        // logic goes here
        $scope.saveMovie = function() {
            console.log('This will validate the data and save the movie!');
        };

        $scope.backToMovies = function() {
            $location.path('/movies');
        };

        /*
        * Pattern
        * toastr.success('Successfully logged in. You will be redirected in 3 sec to main page.', 'Success');
        * toastr.error('Your credentials are invalid!', 'Error');
        * */


        // validate the entry
        function validate() {
            for(var i = 0, length = requiredFields.length; i < length; i++) {
                if ($scope[requiredFields[i]] === undefined) {
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
                    storyline: $scope.textDescription,
                    img: $scope.picture,
                    link: $scope.textLink,
                    imdb_rating: $scope.textIMDBRating
                };

                requestService.addMovie(payload).then(

                    // success function
                    function(data) {
                        $log.debug('movieNewController -> saveMovie success', data);
                        toastr.success('Data successfully saved!', 'Success');
                    },

                    // error function
                    function() {
                        $log.debug('movieNewController -> saveMovie error');
                        toastr.error('Unexpected error has occurred!', 'Error');
                    }
                );

            }

        };

        // save the entry
        // give the result of saving
        // in case of success empty the fields (for another entry), in case of error leave as is


    }


}());