(function() {

    'use strict';

    angular.module('myapp').controller('loginController', loginController);

    loginController.$inject = ['$scope', '$log', '$location', '$timeout', 'toastr', 'loginService'];

    function loginController($scope, $log, $location, $timeout, toastr, loginService) {

        /**
         * Main call that verifies the username and password
         */
        $scope.login = function() {

            if ($scope.username && $scope.password) {

                var payload = {
                    username: $scope.username,
                    password: $scope.password
                };

                /**
                 * Calls login function to verify the user and set SESSION if it's authenticated
                 */
                loginService.login(payload).then(

                    // success function
                    function(data) {
                        $log.debug('logged in successfully', data);
                            if (data.error) {
                                toastr.error('Your credentials are invalid!', 'Error');
                            } else                                {
                                toastr.success('Successfully logged in. You will be redirected in 3 sec to main page.', 'Success');
                                $timeout(function() { $location.path('/home'); }, 3000);
                            }
                    },

                    // error function
                    function() {
                        $log.debug('failed to login');
                    }
                );
            }
        };

    }

}());