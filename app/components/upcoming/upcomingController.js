(function() {

    'use strict';

    angular.module('myapp').controller('upcomingController', upcomingController)
        .filter('startFrom', function() {
            return function(input, start) {
                start = +start;
                if (input) {
                    return input.slice(start);
                }
            }
        });

    upcomingController.$inject = ['$scope'];

    function upcomingController($scope) {

    }

}());