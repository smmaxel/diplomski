(function() {

    'use strict';

    angular
        .module("admin")
        .factory('AuthService', ['$location', 'sessionService', 'CONFIG', function($location, sessionService, CONFIG) {

            /**
             * Check if user has the Auth
             */
            function checkAuth() {


                console.log('its checking this auth on each change');

                // check if user session exist and if not redirect to login page and clear the UI menu from config
                // if exist confirm that the UI exists (is enabled) in config


                /*if (CONFIG.user) {
                    var user = CONFIG.user;
                    if (user.name && user.username && user.password) {
                        if ($location.path() == '/login' || $location.path() == '/register') {
                            //$location.path('/home');
                        } else {
                            //$location.path();
                        }
                    } else {
                        //$location.path('/login');
                    }
                }*/
            }

            return {
                checkAuth: checkAuth
            };

        }]);

}());