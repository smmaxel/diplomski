(function() {

    'use strict';

    angular.module('myapp').controller('navigationController', navigationController);

    navigationController.$inject = ['$scope', '$log', '$location', '$modal', 'loginService', 'CONFIG'];

    function navigationController($scope, $log, $location, $modal, loginService, CONFIG) {

        $scope.navigation = true; // display the navigatin pages (Movies, Upcoming etc.)

        /*$scope.$on('$routeChangeStart', function() {

            if (CONFIG.user.name) {
                $scope.navigation = true;
                $scope.username = CONFIG.user.username;
            } else {
                $scope.navigation = false;
                $scope.username = '';
            }
        });*/

        $scope.userLogged = true;

        $scope.logout = function() {

            loginService.logout().then(

                // success function
                function(data) {
                    $log.debug('logged out success', data);
                    setTimeout(checkIsLogged, 3000);
                },

                // error function
                function() {
                    $log.debug('logged out error');
                }

            );
        };

        function checkIsLogged() {
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