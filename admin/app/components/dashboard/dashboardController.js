(function() {

    'use strict';

    angular.module('admin').controller('dashboardController', dashboardController);

    dashboardController.$inject = ['$scope', '$log'];

    function dashboardController($scope, $log) {

        // obtain list of new comments that need our validation
        $scope.newComments = 26;

        // obtain list of new users
        $scope.newUsers = 4;

        // users with expired date of registration
        $scope.invalidUsers = 5;

    }

}());