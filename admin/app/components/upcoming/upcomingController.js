(function() {

    'use strict';

    angular.module('admin').controller('upcomingController', upcomingController);

    upcomingController.$inject = ['$scope', '$log', 'requestService'];

    function upcomingController($scope, $log, requestService) {

        // initial values
        $scope.upcomings = [];
        $scope.totalItems =  0;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;

        var id = 1;  // TODO: delete this and replace where needed whith real data

        requestService.getUpcoming().then(

            // success function
            function(data) {
                $log.debug('upcomingController -> getUpcoming success', data);
                $scope.upcomings = data.upcoming;
            },

            // error function
            function() {
                $log.debug('upcomingController -> geUpcoming error');
            }
        );

        // crate a call to obtain only one upcoming
        requestService.getUpcomingByID(id).then(

            // success function
            function(data) {
                $log.debug('upcomingController -> getUpcomingByID success', data);
            },

            // error function
            function() {
                $log.debug('upcomingController -> getUpcomingByID error');
            }
        );


        // create a call to save new upcoming

        // crate a call to update existing upcoming

        // crate a call to delete existing upcoming

    }


}());