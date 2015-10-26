(function() {

    'use strict';

    angular.module('admin').controller('usersEditController', usersEditController);

    usersEditController.$inject = ['$scope', '$routeParams', '$location', '$log', 'toastr', 'requestService'];

    function usersEditController($scope, $routeParams, $location, $log, toastr, requestService) {

        // obtain user by Id
        requestService.getUserByID($routeParams.user_id).then(

            // success function
            function(data) {
                $log.debug('usersEditController -> getUserByID success', data);
                var user = data.user;
                $scope.textName = user.name;
                $scope.textUsername = user.username;
                $scope.textPassword = user.password;
                $scope.textEmail = user.email;
                $scope.textGender = user.gender;
                $scope.textBirthday = user.birthday;
                $scope.textRegistered = user.registered;
                $scope.textRegisteredId = user.registered_id;
                $scope.textApproved = user.approved;
                $scope.picture = user.img;
            },

            // error function
            function() {
                $log.debug('usersEditController -> getUserByID error');
            }
        );

        $scope.backToUsers = function() {
            $location.path('/users');
        };

        $scope.saveUser = function() {

            var payload = {
                name: $scope.textName,
                username: $scope.textUsername,
                password: $scope.textPassword,
                email: $scope.textEmail,
                gender: $scope.textGender,
                birthday: $scope.textBirthday,
                registered: $scope.textRegistered,
                registered_id: $scope.textRegisteredId,
                approved: $scope.textApproved,
                img: $scope.picture
            };

            requestService.updateUser($routeParams.user_id, payload).then(

                // success function
                function(data) {
                    $log.debug('usersEditController -> updateUser success', data);
                    toastr.success('Data successfully saved!', 'Success');
                },

                // error function
                function() {
                    $log.debug('usersEditController -> updateUser error');
                    toastr.error('Unexpected error has occurred!', 'Error');
                }
            );
        };

    }


}());