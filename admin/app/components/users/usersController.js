(function() {

    'use strict';

    angular.module('admin').controller('usersController', usersController);

    usersController.$inject = ['$scope', '$log', 'requestService'];

    function usersController($scope, $log, requestService) {

        // initial values
        $scope.users = [];
        $scope.totalItems =  0;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;

        var id = 1; // TODO: remove this and replace with real data where needed


        // make a call to obtain all users
        requestService.getUsers().then(

            // success function
            function(data) {
                $log.debug('usersController -> getUsers success', data);
                $scope.users = data.users;
            },

            // error function
            function() {
                $log.debug('usersController -> getUsers error');
            }
        );

        // make a call to obtain single user
        requestService.getUserByID(id).then(

            // success function
            function(data) {
                $log.debug('userController -> getUserByID success', data);
            },

            // error function
            function() {
                $log.debug('userController -> getUserByID error');
            }
        );

        // create new user

        // update existing

        // update -> verify existing

        // delete existing

    }


}());