(function() {

    'use strict';

    angular.module('admin').factory('loginService', loginService);

    loginService.$inject = ['$http', '$q', '$log', 'sessionService'];

    function loginService($http, $q, $log, sessionService) {

        /**
         * Check if user is registered and initiate the session
         * @param data
         * @returns {d.promise|promise|qFactory.Deferred.promise|m.ready.promise}
         */
        function login(data) {
            $log.debug('loginService -> login');

            var deferred = $q.defer();

            var url = 'data/user.php';

            $http({
                method: 'POST',
                url: url,
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function(data) {
                    sessionService.set('uid', data.uid);
                    deferred.resolve(data);
                })
                .error(function() {
                    deferred.reject('postServerRequest: Error!');
                });

            return deferred.promise;

        }

        /**
         * Destroy the session if it exists
         * @returns {d.promise|promise|qFactory.Deferred.promise|m.ready.promise}
         */
        function logout() {
            $log.debug('loginService -> logout');

            var deferred = $q.defer();

            var url = 'data/destroy_session.php';

            $http({
                method: 'POST',
                url: url,
                data: '',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function(data) {
                    sessionService.destroy('uid');
                    deferred.resolve(data);
                })
                .error(function() {
                    deferred.reject('postServerRequest: Error!');
                });

            return deferred.promise;

        }

        /**
         * Checks if the current user is logged in
         * @returns {d.promise|promise|qFactory.Deferred.promise|m.ready.promise}
         */
        function isLogged() {
            $log.debug('loginService -> isLogged');

            var deferred = $q.defer();

            var url = 'data/check_session.php';

            $http({
                method: 'POST',
                url: url,
                data: '',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function(data) {
                    deferred.resolve({
                        user: data,
                        storage: sessionService.get('uid')
                    });
                })
                .error(function() {
                    deferred.reject('postServerRequest: Error!');
                });

            return deferred.promise;

        }


        return {
            login: login,
            logout: logout,
            isLogged: isLogged
        }

    }


}());