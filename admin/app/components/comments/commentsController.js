(function() {

    'use strict';

    angular.module('admin').controller('commentsController', commentsController)
        .filter('startFrom', function() {
            return function(input, start) {
                start = +start;
                if (input) {
                    return input.slice(start);
                }
            }
        });

    commentsController.$inject = ['$scope', '$location', '$log', 'requestService'];

    function commentsController($scope, $location, $log, requestService) {

        // initial values
        $scope.comments = [];
        $scope.totalItems =  0;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;

        // make initial call to obtain comments
        getComments();

        /**
         * Obtain comments and shows them on the UI
         */
        function getComments() {
            requestService.getComments().then(

                // success function
                function(data) {
                    $log.debug('commentsController -> getComments success', data);
                    $scope.comments = data.comments;
                    $scope.totalItems = $scope.comments.length;
                },

                // error function
                function() {
                    $log.debug('commentsController -> getComments error');
                }
            );
        }

        $scope.editComment = function(comment_id) {
            $location.path('/commentsEdit/' + comment_id);
        };

    }


}());