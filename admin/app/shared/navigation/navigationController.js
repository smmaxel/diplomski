(function() {

    'use strict';

    angular.module('admin').controller('navigationController', navigationController);

    navigationController.$inject = ['$scope', '$log', '$timeout', '$location', 'loginService', 'CONFIG'];

    function navigationController($scope, $log, $timeout, $location, loginService, CONFIG) {

        $scope.navigation = CONFIG.userLogged; // display the navigation pages (Movies, Upcoming etc.)

        checkForChange(); // initiate function for the first time

        /**
         * Function for watching onChange
         */
        function checkForChange() {
            $timeout(function() {
                $scope.navigation  = CONFIG.userLogged;
                checkForChange();
            }, 100);
        }

        /**
         * Logout the user and destroys the active session
         */
        $scope.logout = function() {
            loginService.logout().then(
                // success function
                function(data) {
                    $log.debug('logged out success', data);
                    $location.path('/login');
                },

                // error function
                function() {
                    $log.debug('logged out error');
                    $location.path('/login');
                }
            );
        };

    }

}());