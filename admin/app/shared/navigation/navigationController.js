(function() {

    'use strict';

    angular.module('admin').controller('navigationController', navigationController);

    navigationController.$inject = ['$scope', '$log', '$location', 'CONFIG'];

    function navigationController($scope, $log, $location, CONFIG) {

        $scope.navigation = CONFIG.userLogged; // display the navigatin pages (Movies, Upcoming etc.)

    }


}());