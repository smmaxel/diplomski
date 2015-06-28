(function() {

    'use strict';

    angular.module('myapp').controller('loginController', loginController);

    loginController.$inject = ['$scope', '$log', '$location', 'requestService', 'loginService', 'CONFIG'];

    function loginController($scope, $log, $location, requestService, loginService, CONFIG) {


        // username and password
        /*$scope.username = "";
        $scope.password = "";*/

        // if username and password are defined than call function to check authentification
        $scope.login = function() {

            if ($scope.username && $scope.password) {

                var payload = {
                    username: $scope.username,
                    password: $scope.password
                };

                console.log("payload passing: ", payload);

                loginService.login(payload).then(

                    // success function
                    function(data) {
                        $log.debug('logged in successfully', data);
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
                    console.log('loginController success', data);
                },

                // error function
                function() {
                    console.log('loginController error');
                }
            );
        }*/

       // setTimeout(checkIsLogged, 5000);

    }

}());