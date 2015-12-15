(function() {

    'use strict';

    angular.module('myapp').controller('movieCommentsController', movieCommentsController);

    movieCommentsController.$inject = ['$scope', '$log', '$routeParams', '$timeout', 'requestService', 'CONFIG'];

    function movieCommentsController($scope, $log, $routeParams, $timeout, requestService, CONFIG) {

        $scope.leaveComment = CONFIG.userLogged;
        $scope.movieComments = [];
        $scope.movieComment = '';
        $scope.commented = false;
        checkForChange(); // initiate function for the first time
        getMovieComments();

        /**
         * Function for watching onChange
         */
        function checkForChange() {
            $timeout(function() { checkForChange(); $scope.leaveComment =  CONFIG.userLogged; }, 1000);
        }

        // Obtain Movie details for the passed movieID
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

        // Obtain Movie comments for the passed movieID
        function getMovieComments() {
            requestService.getMovieCommentsByID($routeParams.movieId).then(

                // success function
                function(data) {
                    $log.debug('movieCommentsController -> getCommentsByID success', data.comments);
                    $scope.movieComments = data.comments;
                },

                // error function
                function() {
                    $log.debug('movieCommentsController -> getCommentsByID error');
                }
            );
        }

        /**
         *
         */
        function getMovieRatings() {
            requestService.getMovieRatings($routeParams.movieId).then(

                // success function
                function(data) {
                    $log.debug('movieCommentsController -> getMovieRatings success', data);
                },

                // error function
                function() {
                    $log.debug('movieCommentsController -> getMovieRatings error');
                }
            );
        }

        /**
         *
         */
        function getMovieUserRating() {
            requestService.getMovieUserRating().then(

                // success function
                function(data) {
                    $log.debug('movieCommentsController -> getMovieUserRating success', data);
                },

                // error function
                function() {
                    $log.debug('movieCommentsController -> getMovieUserRating error');
                }

            );
        }

        function saveMovieUserRating() {
            requestService.saveMovieUserRating().then(

                // success function
                function(data) {
                    $log.debug('movieCommentsController -> saveMovieUserRating success', data);
                },

                // error function
                function() {
                    $log.debug('movieCommentsController -> saveMovieUserRating error');
                }
            );
        }

        // Save the entered movie comment
        $scope.commentSubmit = function() {
            if ($scope.leaveComment) {
                console.log('movieComment is:', $scope.movieComment);

                var payload = {
                    comment: $scope.movieComment,
                    movie_id: $scope.movie.movie_id,
                    user: CONFIG.username
                };

                requestService.addMovieComment(payload).then(

                    // success function
                    function(data) {
                        $log.debug('movieCommentsController -> addMovieComment success', data);
                        $scope.commented = true;
                        getMovieComments();
                    },

                    // error function
                    function() {
                        $log.debug('movieCommentsController -> addMovieComment error');
                    }
                );
            }
        };



        // logic for star voting

    }

}());