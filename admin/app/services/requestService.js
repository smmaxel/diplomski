(function() {

    'use strict';

    angular.module('admin').factory('requestService', requestService);

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

        function addMovie(data) {
            $log.debug('requestService -> saveMovie');
            var urlPath = 'movie';
            return endpointService.postServerRequest(urlPath, data);
        }


        function updateMovie(id, data) {
            $log.debug('requestService -> updateMovie');
            var urlPath = 'movie/' + id;
            return endpointService.putServerRequest(urlPath, data);
        }


        function deleteMovie(id) {
            $log.debug('requestService -> deleteMovie');
            var urlPath = 'movie/' + id;
            return endpointService.deleteServerRequest(urlPath);
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


        function getUpcomingByID(id) {
            $log.debug('requestService -> getUpcomingByID');
            var urlPath = 'upcoming/' + id;
            return endpointService.getServerRequest(urlPath);
        }

        function saveUpcoming(data) {
            $log.debug('requestService -> saveUpcoming');
            var urlPath = 'upcoming';
            return endpointService.postServerRequest(urlPath, data);
        }

        function updateUpcoming(id, data) {
            $log.debug('requestService -> updateUpcoming');
            var urlPath = 'upcoming/' + id;
            return endpointService.putServerRequest(urlPath, data);
        }

        function deleteUpcoming(id) {
            $log.debug('requestService -> deleteUpcoming');
            var urlPath = 'upcoming/' + id;
            return endpointService.deleteServerRequest(urlPath);
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


        function getUserByID(id) {
            $log.debug('requestService -> getUserByID');
            var urlPath = 'user/' + id;
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
         * Used for approving existing users on the server
         * @param id
         * @param data
         * @returns {promise}
         */
        function approveUser(id) {
            $log.debug('requestService -> approveUser');
            var urlPath = 'userApp/' + id;
            return endpointService.putServerRequest(urlPath);
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


        // comments
        function getComments() {
            $log.debug('requestService -> getComments');
            var urlPath = 'comments';
            return endpointService.getServerRequest(urlPath);
        }

        function getCommentByID(id) {
            $log.debug('requestService -> getCommentByID');
            var urlPath = 'comment/' + id;
            return endpointService.getServerRequest(urlPath);
        }

        /*function saveComment(data) {
            $log.debug('requestService -> saveComment');
            var urlPath = 'comment';
            return endpointService.postServerRequest(urlPath, data);
        }*/

        function updateComment(id, data) {
            $log.debug('requestService -> updateComment');
            var urlPath = 'comment/' + id;
            return endpointService.putServerRequest(urlPath, data);
        }

        function deleteComment(id, reason) {
            $log.debug('requestService -> deleteComment');
            var urlPath = 'comment/' + id + '/' + reason;
            return endpointService.deleteServerRequest(urlPath);
        }


        // Ratings
        function getRatings() {
            $log.debug('requestService -> getRatings');
            var urlPath = 'ratings';
            return endpointService.getServerRequest(urlPath);
        }

        function deleteRating(id) {
            $log.debug('requestService -> deleteRating');
            var urlPath = 'rating/' + id;
            return endpointService.deleteServerRequest(urlPath);
        }



        return {
            getMovies: getMovies,
            getMovieByID: getMovieByID,
            addMovie: addMovie,
            updateMovie: updateMovie,
            deleteMovie: deleteMovie,
            getUpcoming: getUpcoming,
            getUpcomingByID: getUpcomingByID,
            saveUpcoming: saveUpcoming,
            updateUpcoming: updateUpcoming,
            deleteUpcoming: deleteUpcoming,
            getUsers: getUsers,
            getUserByID: getUserByID,
            addUser: addUser,
            updateUser: updateUser,
            approveUser: approveUser,
            deleteUser: deleteUser,
            getComments: getComments,
            getCommentByID: getCommentByID,
            // saveComment: saveComment,
            updateComment: updateComment,
            deleteComment: deleteComment,
            getRatings: getRatings,
            deleteRating: deleteRating
        }

    }

}());