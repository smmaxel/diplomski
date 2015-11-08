(function() {

    'use strict';

    angular
        .module("admin")
        .factory('AuthService', ['$location', '$log', 'loginService', 'sessionService', 'CONFIG', function($location, $log, loginService, sessionService, CONFIG) {

            /**
             * Check if user has the Auth
             */
            function checkAuth() {

                /**
                 * Checking if user is logged in
                 */
                loginService.isLogged().then(
                    // success function
                    function(data) {
                        $log.debug('authService -> isLogged success', data);
                        if (data.user.isLogged == 'true') {
                            CONFIG.userLogged = true;
                        } else {
                            CONFIG.userLogged = false;
                            loginService.logout().then(
                                // success function
                                function(data) {
                                    $log.debug('authService -> logout success', data);
                                    $location.path('/login');
                                },

                                // error function
                                function() {
                                    $log.debug('authService -> logout error');
                                    $location.path('/login');
                                }
                            );
                        }
                    },

                    // error function
                    function() {
                        $log.debug('authService -> isLogged error');
                    }
                );
            }

            return {
                checkAuth: checkAuth
            };

        }]);

}());