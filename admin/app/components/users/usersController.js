(function() {

    'use strict';

    angular.module('admin').controller('usersController', usersController);

    usersController.$inject = ['$scope', '$location', '$log', 'toastr', 'requestService'];

    function usersController($scope, $location, $log, toastr, requestService) {

        // initial values
        $scope.users = [];
        $scope.totalItems =  0;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;

        // make a call to obtain all users
        getUsers();

        function getUsers() {
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
        }

        $scope.approveUser = function(user_id) {
            requestService.approveUser(user_id).then(

                // success function
                function(data) {
                    $log.debug('userController -> approveUser suceess', data);
                    toastr.success('User successfully approved!', 'Success');
                    getUsers();
                },

                // error function
                function() {
                    $log.debug('userController -> approveUser error');
                    toastr.error('Unexpected error has occurred!', 'Error');
                }

            );
        };

        $scope.addNewUser = function() {
            $location.path('/userNew');
        };

        $scope.editUser = function(user_id) {
            $location.path('/userEdit/' + user_id);
        };


        $scope.deleteUser = function(user_id) {
            requestService.deleteUser(user_id).then(

                // success function
                function(data) {
                    $log.debug('usersController -> deleteUser success', data);
                    toastr.success('User successfully deleted!', 'Success');
                    getUsers();
                },

                // error function\
                function() {
                    $log.debug('usersController -> deleteUser error');
                    toastr.error('Unexpected error has occurred!', 'Error');
                }
            );
        }


    }


}());