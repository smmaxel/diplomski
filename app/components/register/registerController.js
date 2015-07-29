(function() {

    'use strict';

    angular.module('myapp').controller('registerController', registerController);

    registerController.$inject = ['$scope', '$log', '$filter', 'requestService'];

    function registerController($scope, $log, $filter, requestService) {

        $scope.occupations = [
            'Engineering',
            'Marketing',
            'Finance',
            'Administration'
        ];

        $scope.submit = submit;

        setTimeout(function() {

            var username = {username: "userTEst"};
            var email = {email: "email@nesto.com"};

            requestService.checkUsername(username).then(

                // success function
                function(data) {
                    $log.debug('registerController -> checkUserAvailability success', data);
                },

                // error function
                function() {
                    $log.debug('registerController -> checkUserAvailability error');
                }
            );

            requestService.checkEmail(email).then(

                // success function
                function(data) {
                    $log.debug('registerController -> checkEmail success', data);
                },

                // error function
                function() {
                    $log.debug('registerController -> checkEmail error');
                }
            );

        }, 2000);

        function submit() {

            // send user name to server to check if it's free
            // send email to server to check if it's free

            var data = {
                name: $scope.name,
                username: $scope.username,
                password: $scope.password,
                email: $scope.email,
                notes: $scope.notes,
                gender: $scope.gender,
                occupation: $scope.occupation,
                birthday: $filter('date')($scope.birthday, 'd/M/yyyy')
            };

            console.log('user register data', data);

            /*var checkUser = {
                username: $scope.username,
                email: $scope.email
            };*/



/*            requestService.updateUser(2, data).then(

                // success function
                function(data) {
                    console.log('data saved successfully: ', data);
                },

                // error function
                function() {
                    console.log('error while trying to POST the data');
                }
            );*/

        }

    }

}());