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


        $scope.addNewUpcoming = function() {
            $location.path('/upcomingNew');
        };

        $scope.editUpcoming = function(id) {
            // $location.path('/upcomingEdit/' + id);
            console.log('edit upcoming under id ', id);
        };

        $scope.deleteUpcoming = function(id) {
            console.log('delete upcoming under id ', id);
        };

        // crate a call to obtain only one upcoming
        /*requestService.getUpcomingByID(id).then(

            // success function
            function(data) {
                $log.debug('upcomingController -> getUpcomingByID success', data);
            },

            // error function
            function() {
                $log.debug('upcomingController -> getUpcomingByID error');
            }
        );*/


        // create a call to save new upcoming

        // crate a call to update existing upcoming

        // crate a call to delete existing upcoming

    }


}());