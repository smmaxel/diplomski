(function () {

    'use strict';

    angular.module('myapp').directive('datatable', function() {

        return {
            restrict: 'E',
            // require: datas,
            replace: true,
            scope: {},
            templateUrl: 'app/components/upcoming/data-table/dataTableView.html',
            controller: ['$scope', '$log', 'requestService', function($scope, $log, requestService) {

                $scope.upcomingMovies = [];
                $scope.totalItems =  0;
                $scope.itemsPerPage = 10;
                $scope.currentPage = 1;

                // Speed up calls to hasOwnProperty
                var hasOwnProperty = Object.prototype.hasOwnProperty;

                // Main Data
                requestService.getUpcoming().then(

                    // success function
                    function(data) {
                        $log.debug('dataTableDirective -> getUpcoming success: ', data.upcoming);
                        $scope.upcomingMovies = changeToInt(data.upcoming, 'upcoming');
                        $scope.totalItems = $scope.upcomingMovies.length;

                    },

                    // error function
                    function() {
                        $log.debug('getMovies error');
                    }
                );


                /**
                 * Receives an object and change specified property from string to int
                 * @param obj
                 * @param prop
                 * @returns {object}
                 */
                function changeToInt(obj, prop) {
                    if (prop) {
                        for (var key in obj) {
                            if (hasOwnProperty.call(obj, key)) {
                                obj[key][prop] = parseInt(obj[key][prop], 10);
                            }
                        }
                    }
                    return obj;
                }

            }]
        }

    });


}());