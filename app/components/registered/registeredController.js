(function() {

    'use strict';

    angular.module('myapp').controller('registeredController', registeredController);

    registeredController.$inject = ['$scope', '$routeParams', '$log', '$location', '$timeout', 'toastr', 'requestService'];

    function registeredController($scope, $routeParams, $log, $location, $timeout, toastr, requestService) {

        // Initiate the function to check the status of registration
        verifyRegistration($routeParams.id);

        // messages
        var messages = {
            success: "You successfully registered!",
            expired: "Your registration has expired!",
            error: "Your registration is not valid!"
        };

        $scope.message = '';

        /**
         * Main call that verifies the user registration
         */
        function verifyRegistration(id) {
            requestService.verifyRegistration(id).then(

                // success function
                function(data) {
                    $log.debug('registeredController -> verifyRegistration success', data);
                    if (data.text === 'registered') {
                        $scope.message = messages.success;
                        toastr.success('You will be redirected to Login page in few sec!', 'Success');
                        $timeout(function() { $location.path('/login'); }, 3000);
                    } else if (data.text === 'expired') {
                        $scope.message = messages.expired;
                        toastr.error('Your registration is not completed within 24h period!', 'Error');
                    } else  {
                        $scope.message = messages.error;
                        toastr.error('Unknown user in the database!', 'Error');
                    }
                },

                // error function
                function() {
                    $log.debug('registeredController -> verifyRegistration error');
                }
            );
        }

    }

}());