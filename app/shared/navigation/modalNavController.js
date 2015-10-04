(function() {

    'use strict';

    angular.module('myapp').controller('ModalInstanceNavCtrl', function ($scope, $log, $sce, $modalInstance, toastr, requestService, CONFIG) {

        $scope.states = {
            emailState: 0
        };

        // email check on the backend
        /**
         * Checks if the Email is already in use on the server side
         * @param email
         */
        function validateEmail(email) {

            console.log('email checking', email);

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

        $scope.validateEmail = validateEmail;

        // logic for saving the content
        $scope.update = function() {

            if ($scope.states.emailState !== 0 && $scope.states.emailState === -1) {
                toastr.error('Check if email field is correctly filled!', 'Error');
            } else {
                var updateData = {
                    password: $scope.password || null,
                    email: $scope.email || null,
                    img: $scope.picture || null
                };

                requestService.updateUser(updateData).then(

                    // success function
                    function(data) {
                        $log.debug('modalNavController -> updateUser success', data);
                        if (data.text === 'success') {
                            toastr.success('Successfully updated!', 'Success');
                        } else if (data.text === 'empty') {
                            toastr.info('None of the fields has been filled!', 'Info');
                        } else {
                            toastr.error('An error while updating has occurred!', 'Error');
                        }
                    },

                    // error function
                    function() {
                        $log.debug('modalNavController -> updateUser error');
                    }
                );
            }

        };

        // logic for image upload

    });


}());