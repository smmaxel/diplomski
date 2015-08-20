(function() {

    'use strict';

    angular.module('myapp').controller('navigationController', navigationController);

    navigationController.$inject = ['$scope', '$log', '$timeout', '$modal', 'loginService'];

    function navigationController($scope, $log, $timeout, $modal, loginService) {

        $scope.userLogged = false;
        $scope.logout = logout;
        checkIsLogged(); // initiate hart-beat function


        /**
         * Hart-beat function for checking is user logged in
         */
        function checkIsLogged() {
            loginService.isLogged().then(
                // success function
                function(data) {
                    console.log('checkIsLogged success', data);
                    if (data.user.isLogged == 'true') {
                        $scope.userLogged = true;
                    } else {
                        $scope.userLogged = false;
                    }
                    $timeout(checkIsLogged, 5000);
                },

                // error function
                function() {
                    console.log('checkIsLogged error');
                    logout();
                }
            );
        }

        /**
         * Logout the user and destroys the active session
         */
        function logout() {
            loginService.logout().then(
                // success function
                function(data) {
                    $log.debug('logged out success', data);
                    checkIsLogged();
                },

                // error function
                function() {
                    $log.debug('logged out error');
                    checkIsLogged();
                }
            );
        }


        $scope.open = function () {
            $modal.open({
                animation: true,
                templateUrl: 'myNavModalContent.html',
                controller: 'ModalInstanceNavCtrl',
                size: 'lg',
                resolve: {
                    movie: function () {
                        return 'sm.maxel';
                    }
                }
            });

        };

    }


}());