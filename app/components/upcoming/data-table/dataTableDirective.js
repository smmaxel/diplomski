(function () {

    'use strict';

    angular.module('myapp').directive('datatable', function() {

        return {
            restrict: 'E',
            // require: datas,
            replace: true,
            scope: {},
            templateUrl: 'app/components/upcoming/data-table/upcomingView.html',
            controller: ['$scope', '$log', function($scope, $log) {

                // controller area
            }]
        }

    });


}());

/*    angular
        .module("appAudiences")
        .directive('datatable', function() {
            return {
                restrict: 'AE',
                *//*require: '^datas',*//*
                replace: true,
                *//*scope: {
                 datas: '='
                 },*//*
                templateUrl: '/activate/public/app/activate/modules/audiences/data-explorer/custom-directive/dataTableTemplate.html',
                controller: ['$scope', '$log', 'requestService', 'commonService', 'sharedService', function($scope, $log, requestService, commonService, sharedService) {


                    var allDataObject = {};

                    *//**
                     * Used for filtering and pagination on the dataTable
                     *//*
                    var maxAttributes = 50;
                    $scope.currentPage = 1;
                    $scope.pageSize = 10;


                    *//**
                     * Used for filtering of dataTable results
                     *//*
                    $scope.orderByField = 'used_ratio';
                    $scope.reverseSort = true;


                    requestService.getEventAttributes().then(
                        function (data) {
                            $log.debug('directive -> success', data, data.values.length);
                            $scope.datas = commonService.prepareEventAttributes(data, maxAttributes);
                            $scope.totalItems = $scope.datas.length;

                            $log.debug('$scope.datas', $scope.datas);
                        },
                        function (error) {
                            $log.debug('directive -> error', error);
                        }
                    );

                    $scope.getAttributeDetails = function(name) {

                        if ($scope.datas[commonService.searchArrayIndex(name, $scope.datas)].pieChartData.length == 0) {
                            requestService.getEventAttributeValues(name).then(

                                function (data) {
                                    allDataObject[name] = data;
                                    $scope.datas[commonService.searchArrayIndex(name, $scope.datas)].pieChartData = commonService.limitArrayOutput(commonService.calculatePerscentage(data.totalCount,data.values), 6);
                                },
                                function (error) {
                                    $log.debug('getEventAttributeValues -> error', error);
                                }
                            );
                        }

                    };


                    $scope.broadcastData = function(name) {
                        sharedService.prepForBroadcast(allDataObject[name]);
                    };


                }]
            };
        });*/


