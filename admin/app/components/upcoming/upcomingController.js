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



        // crate a call to obtain all upcomings
        // requestService.

        // crate a call to obtain only one upcoming

        // create a call to save new upcoming

        // crate a call to update existing upcoming

        // crate a call to delete existing upcoming

    }


}());