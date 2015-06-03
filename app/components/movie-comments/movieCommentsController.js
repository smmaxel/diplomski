(function() {

    'use strict';

    angular.module('myapp').controller('movieCommentsController', movieCommentsController);

    movieCommentsController.$inject = ['$scope', '$log', '$routeParams', 'requestService'];

    function movieCommentsController($scope, $log, $routeParams, requestService) {

        $scope.movieComment = '';

        //console.log('obtained route params: ', $routeParams.movieId);


        // obtain data for the passed movieId
        requestService.getMovieByID($routeParams.movieId).then(

            // success function
            function(data) {
                $log.debug('movieCommentsController -> getMovieByID success: ', data.movie);
                $scope.movie = data.movie;
            },

            // error function
            function() {
                $log.debug('movieCommentsController -> getMovieByID error');
            }


        );

        // logic for star voting

        // logic for submitting comments



        $scope.commentSubmit = function() {
            console.log('movieComment is:', $scope.movieComment);
        };

    }

}());