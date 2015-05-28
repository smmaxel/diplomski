(function() {

    'use strict';

    angular
        .module("myapp")
        .factory('AuthService', ['$location', 'CONFIG', function($location, CONFIG) {

            /**
             * Check if user has the Auth
             */
            function checkAuth() {
                if (CONFIG.user) {
                    var user = CONFIG.user;
                    if (user.name && user.username && user.password) {
                        if ($location.path() == '/login' || $location.path() == '/register') {
                            $location.path('/home');
                        } else {
                            $location.path();
                        }
                    } else {
                        $location.path('/login');
                    }
                }
            }

            return {
                checkAuth: checkAuth
            };

        }]);

}());