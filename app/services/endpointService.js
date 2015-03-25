(function() {

    'use strict';

    angular.module.factory('endpointService', endpointService);

    endpointService.$inject = ['$http', '$q', '$log'];

    function endpointService($http, $q, $log) {




        function getServerRequest(requestObject) {
            var deferred = $q.defer();

            var url = '/' + encodeURIComponent(JSON.stringify(requestObject));

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
                    deferred.reject('getServerRequest : Error!')
                });

            return deferred.promise;
        }



        function postServerRequest(requestObject) {
            var deferred = $q.defer();

            var url = '/';

        }








    }

}());