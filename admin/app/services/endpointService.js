(function() {

    'use strict';

    angular.module('admin').factory('endpointService', endpointService);

    endpointService.$inject = ['$http', '$q', '$log'];

    function endpointService($http, $q, $log) {


        /**
         * Used for getting data from server
         * @param urlPath
         * @returns {promise}
         */
        function getServerRequest(urlPath) {
            $log.debug('endpointService -> getServerRequest');

            var deferred = $q.defer();

            var url = 'api/' + urlPath; // TODO: return / ifront of api ('/api/')

            $http({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            })
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function() {
                    deferred.reject('getServerRequest : Error!');
                });

            return deferred.promise;
        }


        /**
         * Used for posting data to server
         * @param urlPath
         * @param requestObject
         * @returns {promise}
         */
        function postServerRequest(urlPath, requestObject) {
            $log.debug('endpointService -> postServerRequest');

            var deferred = $q.defer();

            var url = '/diplomski/api/' + urlPath;

            $http({
                method: 'POST',
                url: url,
                data: JSON.stringify(requestObject),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function() {
                    deferred.reject('postServerRequest : Error!');
                });

            return deferred.promise;
        }


        /**
         * Used for updating data on the server
         * @param urlPath
         * @param requestObject
         * @returns {promise}
         */
        function putServerRequest(urlPath, requestObject) {
            $log.debug('endpointService -> postServerRequest');

            var deferred = $q.defer();

            var url = '/api/' + urlPath;

            $http({
                method: 'PUT',
                url: url,
                data: JSON.stringify(requestObject),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function() {
                    deferred.reject('postServerRequest : Error!');
                });

            return deferred.promise;
        }


        /**
         * Used for deleting data from the server
         * @param urlPath
         * @returns {promise}
         */
        function deleteServerRequest(urlPath) {
            $log.debug('endpointService -> postServerRequest');

            var deferred = $q.defer();

            var url = '/api/' + urlPath;

            $http({
                method: 'DELETE',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function() {
                    deferred.reject('postServerRequest : Error!');
                });

            return deferred.promise;
        }


        return {
            getServerRequest: getServerRequest,
            postServerRequest: postServerRequest,
            putServerRequest: putServerRequest,
            deleteServerRequest: deleteServerRequest
        }

    }

}());