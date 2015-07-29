(function() {

    'use strict';

    angular.module('myapp').factory('requestService', requestService);

    requestService.$inject = ['$log', 'endpointService'];

    function requestService($log, endpointService) {


        /**
         * Used for obtaining movies data from the server
         * @returns {promise}
         */
        function getMovies() {
            $log.debug('requestService -> getMovies');
            var urlPath = 'movies';
            return endpointService.getServerRequest(urlPath);
        }


        /**
         * Used for obtaining particular movie by its ID
         * @param id
         * @returns {promise}
         */
        function getMovieByID(id) {
            $log.debug('requestService -> getMovieByID');
            var urlPath = 'movie/' + id;
            return endpointService.getServerRequest(urlPath);
        }


        /**
         * Used for obtaining upcoming data from the server
         * @returns {promise}
         */
        function getUpcoming() {
            $log.debug('requestService -> getUpcoming');
            var urlPath = 'upcoming';
            return endpointService.getServerRequest(urlPath);
        }


        /**
         * Used for obtaining user data from the server
         * @returns {promise}
         */
        function getUsers() {
            $log.debug('requestService -> getUsers');
            var urlPath = 'users';
            return endpointService.getServerRequest(urlPath);
        }


        /**
         * Used for saving new users data to the server
         * @param data
         * @returns {promise}
         */
        function addUser(data) {
            $log.debug('requestService -> addUser');
            var urlPath = 'user';
            return endpointService.postServerRequest(urlPath, data);
        }


        /**
         * Used for updating existing users data on the server
         * @param id
         * @param data
         * @returns {promise}
         */
        function updateUser(id, data) {
            $log.debug('requestService -> updateUser');
            var urlPath = 'user/' + id;
            return endpointService.putServerRequest(urlPath, data);
        }


        /**
         * Used for deleting existing users data on the server
         * @param id
         * @returns {promise}
         */
        function deleteUser(id) {
            $log.debug('requestService -> deleteUser');
            var urlPath = 'user/' + id;
            return endpointService.deleteServerRequest(urlPath);
        }


        /**
         * Used for checking username availability
         * @param data
         * @returns {promise}
         */
        function checkUsername(data) {
            $log.debug('requestService -> checkUsername');
            var urlPath = 'checkusername';
            return endpointService.postServerRequest(urlPath, data);
        }


        /**
         * Used for checking email availability
         * @param data
         * @returns {promise}
         */
        function checkEmail(data) {
            $log.debug('requestService -> checkEmail');
            var urlPath = 'checkemail';
            return endpointService.postServerRequest(urlPath, data);
        }


        return {
            getMovies: getMovies,
            getMovieByID: getMovieByID,
            getUpcoming: getUpcoming,
            getUsers: getUsers,
            addUser: addUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            checkUsername: checkUsername,
            checkEmail: checkEmail
        }

    }

}());