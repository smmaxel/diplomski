(function() {

    'use strict';

    angular.module('myapp').factory('endpointService', endpointService);

    endpointService.$inject = ['$http', '$q', '$log'];

    function endpointService($http, $q, $log) {


        /**
         * Used for getting data from server
         * @param urlPath
         * @param requestObject
         * @returns {d.promise|promise|m.ready.promise|qFactory.Deferred.promise}
         */
        function getServerRequest(urlPath, requestObject) {

            $log.debug('endpointService -> getServerRequest');

            var deferred = $q.defer();

            var path = urlPath ? urlPath : '';
            var url = '/' + path + encodeURIComponent(JSON.stringify(requestObject));

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
         * @returns {d.promise|promise|m.ready.promise|qFactory.Deferred.promise}
         */
        function postServerRequest(urlPath, requestObject) {

            $log.debug('endpointService -> postServerRequest');

            var deferred = $q.defer();

            var path = urlPath ? urlPath : '';
            var url = '/' + path;

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


        return {
            getServerRequest: getServerRequest,
            postServerRequest: postServerRequest
        }

    }

}());