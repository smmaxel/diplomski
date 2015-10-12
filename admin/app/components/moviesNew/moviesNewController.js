(function() {

    'use strict';

    angular.module('admin').controller('moviesNewController', moviesNewController);

    moviesNewController.$inject = ['$scope', '$location', '$log', 'requestService'];

    function moviesNewController($scope, $location, $log, requestService) {

        // logic goes here
        $scope.saveMovie = function() {
            console.log('This will validate the data and save the movie!');
        };

        $scope.backToMovies = function() {
            $location.path('/movies');
        }
    }


}());