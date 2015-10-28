(function() {

    'use strict';

    angular.module('admin').factory('sessionService', sessionService);

    sessionService.$inject = ['$http'];

    function sessionService($http) {

        /**
         * Set the user value to local storage
         * @param key
         * @param value
         * @returns {*}
         */
        function set(key, value) {
            return sessionStorage.setItem(key, value);
        }

        /**
         * Get the user value from the local storage
         * @param key
         * @returns {*}
         */
        function get(key) {
            return sessionStorage.getItem(key);
        }

        /**
         * Remove the user value from the local storage and clear the session
         * @param key
         * @returns {*}
         */
        function destroy(key) {
            return sessionStorage.removeItem(key);
        }

        return {
            set: set,
            get: get,
            destroy: destroy
        }

    }


}());