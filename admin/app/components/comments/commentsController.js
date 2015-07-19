(function() {

    'use strict';

    angular.module('admin').controller('commentsController', commentsController);

    commentsController.$inject = ['$scope', '$log', 'requestService'];

    function commentsController($scope, $log, requestService) {

        // initial values
        $scope.users = [];
        $scope.totalItems =  0;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;

        var id = 1; // TODO: remove this and replace with real data where needed


        // create a call to obtain all comments
        requestService.getComments().then(

            // success function
            function(data) {
                $log.debug('commentsController -> getComments success', data);
            },

            // error function
            function() {
                $log.debug('commentsController -> getComments error');
            }
        );

        // create a call to obtain only one comment
        requestService.getCommentByID(id).then(

            // success function
            function(data) {
                $log.debug('commentsController -> getCommentsByID success', data);
            },

            // error function
            function() {
                $log.debug('commentsController -> getCommentsByID errors');
            }
        );

        // update the comment

        // delete a comment

    }


}());