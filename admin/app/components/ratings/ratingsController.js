(function() {

    'use strict';

    angular.module('admin').controller('ratingsController', ratingsController);

    ratingsController.$inject = ['$scope', '$log', 'requestService'];

    function ratingsController($scope, $log, requestService) {

        // initial values
        $scope.users = [];
        $scope.totalItems =  0;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;

        var id = 1; // TODO: remove this and replace with real data where needed

        // create a call to obtain all ratings
        requestService.getRatings().then(

            // success function
            function(data) {
                $log.debug('ratingsController -> getRatings success', data);
            },

            // error function
            function() {
                $log.debug('ratingController -> getRatings error');
            }
        );

        // delete a rating

    }


}());