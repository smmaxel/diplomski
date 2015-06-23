(function() {

    'use strict';

    angular.module('myapp').factory('loginService', loginService);

    loginService.$inject = ['$log', 'sessionService'];

    function loginService($log, sessionService) {

        /**
         * Check if user is registered and initiate the session
         * @param data
         */
        function login(data) {
            // requestService
            var $promise = $http.post('data/user.php', data);
            $promise.then(function(msg) {
                var uid = msg.data;
                if (uid) {
                    // use the sessionService to set the value of uid
                    $log.debug('loginService -> login success', uid);
                    sessionService.set('uid', uid);
                } else {
                    // give the error notification to the user
                    $log.debug('wrong initials or something');
                }
            });
        }

        /**
         * Destroy the session if it exists
         */
        function logout() {
            // call the sessionService to destroy the uid
            $log.debug('loginService -> logout');
            sessionService.destroy('uid');
            // update the navigation and other necessary  pages
        }

        /**
         * Checks if the current user is logged in
         * @returns {*}
         */
        function isLogged() {
            // check if the user is logged in
            $log.debug('loginService -> isLogged');
            return $http.post('data/check_session.php');

            // this will be used before sending data to the backend
        }


        return {
            login: login,
            logout: logout,
            isLogged: isLogged
        }

    }


}());