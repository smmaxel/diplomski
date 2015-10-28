(function() {

    'use strict';

    angular.module('admin').controller('commentsEditController', commentsEditController);

    commentsEditController.$inject = ['$scope', '$routeParams', '$location', '$log', 'toastr', 'requestService'];

    function commentsEditController($scope, $routeParams, $location, $log, toastr, requestService) {

        $scope.saveAvailable = true;

        $scope.backToComments = function() {
            $location.path('/comments');
        };

        // create a call to obtain only one comment
        requestService.getCommentByID($routeParams.id).then(

             // success function
             function(data) {
                $log.debug('commentsController -> getCommentsByID success', data);
                 var comment = data.comment;
                 $scope.textComment = comment.comment;
                 $scope.textMovieId = comment.movie_id;
                 $scope.textUserId = comment.user_id;
                 $scope.textDate = comment.date;
                 $scope.textTimestamp = comment.timestamp;
             },

             // error function
             function() {
                $log.debug('commentsController -> getCommentsByID errors');
             }

         );

        $scope.deleteComment = function(reason) {
            requestService.deleteComment($routeParams.id, reason).then(

                // success function
                function(data) {
                    $log.debug('commentsController -> deleteComment success', data);
                    toastr.success('Comment successfully deleted!', 'Success');
                    $location.path('/comments');
                },

                // error function
                function() {
                    $log.debug('commentsController -> deleteComment error');
                }
            );
        };


        // save and approve
        $scope.saveAndApprove = function() {

            var payload = {
                comment: $scope.textComment,
                movie_id: $scope.textMovieId,
                user_id: $scope.textUserId,
                date: $scope.textDate,
                timestamp: $scope.textTimestamp,
                approved: '1'
            };

            requestService.updateComment($routeParams.id, payload).then(

                // success function
                function(data) {
                    $log.debug('commentsEditController -> updateComment success', data);
                    toastr.success('Comment successfully approved!', 'Success');
                    $location.path('/comments');

                },

                // error function
                function() {
                    $log.debug('commentsEditController -> updateComment error');
                }
            );

        }

    }


}());