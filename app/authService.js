(function() {

    'use strict';

    angular
        .module("myapp")
        .factory('AuthService', ['$location', 'CONFIG', function($location, CONFIG) {

            /**
             * Check if user has the Auth
             */
            function checkAuth() {
                if (CONFIG.userLogged) {
                    $location.path('/home');
                }
            }

            return {
                checkAuth: checkAuth
            };

        }]);

}());