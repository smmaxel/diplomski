(function() {

    'use strict';

    angular.module('admin').controller('loginController', loginController);

    loginController.$inject = ['$scope', '$log', '$location', 'toastr', 'loginService', 'CONFIG'];

    function loginController($scope, $log, $location, toastr, loginService, CONFIG) {

        CONFIG.userLogged = false;

        // send request to verify the admin user
        $scope.login = function() {

            if ($scope.username && $scope.password) {

                var payload = {
                    username: $scope.username,
                    password: $scope.password
                };

                loginService.login(payload).then(

                    // success function
                    function(data) {
                        $log.debug('loginController -> login success', data);
                        if (data.error) {
                            toastr.error('Your credentials are invalid!', 'Error');
                        } else {
                            CONFIG.userLogged = true;
                            $location.path('/movies');
                        }
                    },

                    // error function
                    function() {
                        $log.debug('loginController -> login error');
                        // toaster message
                    }
                );

            }

        };

    }

}());