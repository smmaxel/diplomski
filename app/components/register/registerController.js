(function() {

    'use strict';

    angular.module('myapp').controller('registerController', registerController);

    registerController.$inject = ['$scope', '$location', '$log', '$filter', '$timeout', 'toastr', 'requestService'];

    function registerController($scope, $location, $log, $filter, $timeout, toastr, requestService) {

        // States for checking availability of username and email values
        $scope.states = {
            usernameState: 0,
            emailState: 0
        };

        // Starting date
        $scope.birthday = '1990-01-01';

        $scope.occupations = [
            'Engineering',
            'Marketing',
            'Finance',
            'Administration'
        ];

        /**
         * Funciton used to validate both Username and Email
         * @param field
         */
        $scope.validateInput = function(field) {
            switch(field) {
                case 'email':
                    validateEmail($scope.email);
                    break;

                case 'username':
                    validateUsername($scope.username);
                    break;

                default: return;
            }
        };

        /**
         * Checks if the Email is already in use on the server side
         * @param email
         */
        function validateEmail(email) {
            requestService.checkEmail({'email': email}).then(

                // success function
                function(data) {
                    $log.debug('registerController -> checkEmail success', data);

                    if (data.email === 'available') {
                        $scope.states.emailState = 1;
                    } else {
                        $scope.states.emailState = -1;
                        toastr.warning('This email is already being used.', 'Warning');
                    }
                },

                // error function
                function() {
                    $log.debug('registerController -> checkEmail error');
                    $scope.states.emailState = 0;
                }
            );
        }

        /**
         * Checks if the Username is already in use on the server side
         * @param username
         */
        function validateUsername(username) {
            requestService.checkUsername({'username': username}).then(

                // success function
                function(data) {
                    $log.debug('registerController -> checkUserAvailability success', data);

                    if (data.username === 'available') {
                        $scope.states.usernameState = 1;
                    } else {
                        $scope.states.usernameState = -1;
                        toastr.warning('This username is already being used.', 'Warning');
                    }
                },

                // error function
                function() {
                    $log.debug('registerController -> checkUserAvailability error');
                    $scope.states.usernameState = 0;
                }
            );

        }


        /**
         * Adds new user
         */
        $scope.submit = function() {

            var captcha = jQuery('#g-recaptcha-response').val();
            if (!captcha) {
                toastr.error('Please fill the requirements for the captcha!', 'Error');
                return;
            }

            console.log('emailState', $scope.states.emailState);
            console.log('usernameState', $scope.states.usernameState);
            if ($scope.states.emailState !== 1 && $scope.states.usernameState !== 1) {
                toastr.error('Check if all fields are filled correctly!', 'Error');
            } else {
                var userData = {
                    name: $scope.name,
                    username: $scope.username,
                    password: $scope.password,
                    email: $scope.email,
                    notes: $scope.notes,
                    gender: $scope.gender,
                    occupation: $scope.occupation,
                    birthday: $filter('date')($scope.birthday, 'd/M/yyyy')
                };

                requestService.addUser(userData).then(

                    // success function
                    function(data) {
                        $log.debug('registerController -> addUser success', data);
                        toastr.success('Successfully Registered! You will be redirected to login page.', 'Success');
                        $timeout(function() { $location.path('/login'); }, 5000);
                    },

                    // error function
                    function() {
                        $log.debug('registerController -> addUser error');
                        toastr.error('An error while registering has occurred!', 'Error');
                    }
                );
            }
        }

    }

}());