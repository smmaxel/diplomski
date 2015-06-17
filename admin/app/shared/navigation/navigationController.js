(function() {

    'use strict';

    angular.module('admin').controller('navigationController', navigationController);

    navigationController.$inject = ['$scope', '$log', '$location', '$modal', 'CONFIG'];

    function navigationController($scope, $log, $location) {

        $scope.navigation = true; // display the navigatin pages (Movies, Upcoming etc.)

    }


}());