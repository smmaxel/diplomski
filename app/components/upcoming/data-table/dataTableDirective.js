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

                // Main Data
                requestService.getUpcoming().then(

                    // success function
                    function(data) {
                        $log.debug('dataTableDirective -> getUpcoming success: ', data.upcoming);
                        $scope.upcomingMovies = data.upcoming;
                        $scope.totalItems = $scope.upcomingMovies.length;
                    },

                    // error function
                    function() {
                        $log.debug('getMovies error');
                    }
                );

            }]
        }

    });


}());