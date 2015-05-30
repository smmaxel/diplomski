(function() {

    'use strict';

    angular.module('myapp').controller('homeController', homeController)
    .filter('reverse', function() {
        return function(items) {
                return items.slice().reverse();
        };
    });

    homeController.$inject = ['$scope', '$log', 'requestService'];

    function homeController($scope, $log, requestService) {

        // Values used in carousel
        $scope.myInterval = 5000;
        $scope.movies = [];
        $scope.slides = [];

        // Main Data for the Carousel and Recently Added movies
        requestService.getMovies().then(

            // success function
            function(data) {
                $log.debug('homeController -> getMovies success: ', data.movies);
                $scope.movies = data.movies;
                $scope.slides = angular.copy($scope.movies);
            },

            // error function
            function() {
                $log.debug('getMovies error');
            }
        );

        // Main data info for the other pages
        $scope.data = {
            movieDescription: 'Movies section contains all the best rated moves of all time. Each movie contains description, poster and link to its trailer that will be opened in modal. Click on a link bellow and learn out more.',
            upcomingDescription: 'Upcoming section contains list of movies ordered by the days left till release date. All information are shown inside the dataTable which allows easier manipulation and filtering of the movie data.',
            aboutDescription: 'In About section you will find all the necessary information about the project and used technologies. Also links to all used tutorials and support are provided.'
        };

    }

}());