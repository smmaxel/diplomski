(function() {

    'use strict';

    angular.module('admin').controller('ratingsController', ratingsController);

    ratingsController.$inject = ['$scope', '$log', 'toastr', 'requestService'];

    function ratingsController($scope, $log, toastr, requestService) {

        // initial values
        $scope.ratings = [];
        $scope.totalItems =  0;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;

        // make a call to obtain all ratings
        getRatings();

        function getRatings() {
            requestService.getRatings().then(

                // success function
                function(data) {
                    $log.debug('ratingsController -> getRatings success', data);
                    $scope.ratings = data.ratings;
                    $scope.totalItems = $scope.ratings.length;
                },

                // error function
                function() {
                    $log.debug('ratingController -> getRatings error');
                }
            );
        }

        // delete a rating
        $scope.deleteRating = function(rating_id) {
            console.log('delete rating ID ', rating_id);
            requestService.deleteRating(rating_id).then(

                // success function
                function(data) {
                    $log.debug('ratingsController -> deleteRating success', data);
                    toastr.success('Rating successfully deleted!', 'Success');
                    getRatings();
                },

                // error function
                function() {
                    $log.debug('ratingsController -> deleteRating error');
                    toastr.error('Unexpected error has occurred!', 'Error');
                }
            );
        }

    }

}());