(function() {

    'use strict';

    angular.module('admin').controller('usersNewController', usersNewController);

    usersNewController.$inject = ['$scope', '$routeParams', '$location', '$log', 'toastr', 'requestService'];

    function usersNewController($scope, $routeParams, $location, $log, toastr, requestService) {

        $scope.backToUsers = function() {
            $location.path('/users');
        };


    }


}());