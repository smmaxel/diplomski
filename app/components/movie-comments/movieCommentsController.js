(function() {

    'use strict';

    angular.module('myapp').controller('movieCommentsController', movieCommentsController);

    movieCommentsController.$inject = ['$scope', '$log', '$routeParams', '$timeout', 'requestService', 'CONFIG'];

    function movieCommentsController($scope, $log, $routeParams, $timeout, requestService, CONFIG) {

        $scope.leaveComment = CONFIG.userLogged;
        $scope.movieComments = [];
        $scope.movieRating = null;
        $scope.movieRatingVotes = 0;
        $scope.userRating = null;
        $scope.movieComment = '';
        $scope.commented = false;
        checkForChange(); // initiate function for the first time
        getMovieComments();
        getMovieRatings();

        if (CONFIG.userLogged) {
            getMovieUserRating();
        }


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
         * Used for obtaining existing movie ratings
         */
        function getMovieRatings() {
            requestService.getMovieRatings($routeParams.movieId).then(

                // success function
                function(data) {
                    var averageRating = 0;

                    $log.debug('movieCommentsController -> getMovieRatings success', data);
                    $scope.movieRatingVotes = data.ratings.length;

                    for (var i = 0; i < data.ratings.length; i++) {
                        averageRating += parseInt(data.ratings[i].rating, 10);
                    }
                    $scope.movieRating = averageRating / data.ratings.length;
                },

                // error function
                function() {
                    $log.debug('movieCommentsController -> getMovieRatings error');
                }
            );
        }

        /**
         * Used for obtaining logged user ratings
         */
        function getMovieUserRating() {
            requestService.getMovieUserRating().then(

                // success function
                function(data) {
                    $log.debug('movieCommentsController -> getMovieUserRating success', data);
                    $scope.userRating = data.user_rating.rating;
                },

                // error function
                function() {
                    $log.debug('movieCommentsController -> getMovieUserRating error');
                }

            );
        }


        $scope.saveRating = saveMovieUserRating;
        /**
         * Used for saving/updating logged user rating
         */
        function saveMovieUserRating() {
            var payload = {
                movie_id: $routeParams.movieId,
                rating: $scope.userRating
            };

            requestService.saveMovieUserRating(payload).then(

                // success function
                function(data) {
                    $log.debug('movieCommentsController -> saveMovieUserRating success', data);
                    getMovieRatings();
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