(function() {

    'use strict';

    angular.module('myapp').controller('loginController', loginController);

    loginController.$inject = ['$scope', '$log', '$location', 'requestService', 'loginService', 'CONFIG'];

    function loginController($scope, $log, $location, requestService, loginService, CONFIG) {


        // if username and password are defined than call function to check authentification
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
                        // login the user (broadcast the event)

                        // if error notify the user about wrong credentials

                    },

                    // error function
                    function() {
                        $log.debug('failed to login');
                    }
                );
            }
        };

        // if autentification is good, set sesstion and uid and "login the user"

        // if autentification is not ok notify the user that he used wrong credentials

        /*function checkIsLogged() {
            loginService.isLogged().then(

                // success function
                function(data) {
                    console.log('checkIsLogged success', data);
                },

                // error function
                function() {
                    console.log('checkIsLogged error');
                }
            );
        }*/

    }

}());