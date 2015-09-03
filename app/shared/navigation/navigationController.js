(function() {

    'use strict';

    angular.module('myapp').controller('navigationController', navigationController);

    navigationController.$inject = ['$scope', '$log', '$timeout', '$modal', 'loginService', 'CONFIG'];

    function navigationController($scope, $log, $timeout, $modal, loginService, CONFIG) {

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
                        CONFIG.userLogged = true;
                        CONFIG.username = data.user.username;
                    } else {
                        $scope.userLogged = false;
                        CONFIG.userLogged = false;
                        CONFIG.username = null;
                    }
                    $timeout(checkIsLogged, 3000);
                },

                // error function
                function() {
                    console.log('checkIsLogged error');
                    logout();
                }
            );
        }

        //$scope.$on('logout', function() { console.log('emit captured, locking the comments section'); });

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