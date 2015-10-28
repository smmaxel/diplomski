(function() {

    'use strict';

    angular.module('admin').controller('upcomingEditController', upcomingEditController);

    upcomingEditController.$inject = ['$scope', '$routeParams', '$location', '$log', 'toastr', 'requestService'];

    function upcomingEditController($scope, $routeParams, $location, $log, toastr, requestService) {

        // Initial values
        var state = 0;
        var requiredFields = ['textName', 'textLength', 'textType', 'textYear', 'textUpcoming'];

        $scope.backToUpcoming = function() {
            $location.path('/upcoming');
        };

        // validate the entry
        function validate() {
            for(var i = 0, length = requiredFields.length; i < length; i++) {
                if ($scope[requiredFields[i]] === undefined || $scope[requiredFields[i]] === '') {
                    state = -1;
                    break;
                } else {
                    state = 1;
                }
            }
        }

        // obtaion data for particular upcoming
        requestService.getUpcomingByID($routeParams.id).then(

            // success function
            function(data) {
                $log.debug('upcomingEditController -> getUpcomingByID success', data);
                var upcoming = data.upcoming;
                $scope.textName = upcoming.name;
                $scope.textLength = upcoming.length;
                $scope.textType = upcoming.type;
                $scope.textYear = upcoming.year;
                $scope.textUpcoming = upcoming.upcoming;
            },

            // error function
            function() {
                $log.debug('upcomingEditController -> getUpcomingByID error');
                toastr.error('Unexpected error has occurred!', 'Error');
            }
        );


        $scope.saveUpcoming = function() {
            validate();
            var payload = {};

            if (state === -1) {
                toastr.error('All fields must be filled!', 'Error');
            } else {

                payload = {
                    name: $scope.textName,
                    length: $scope.textLength,
                    type: $scope.textType,
                    year: $scope.textYear,
                    upcoming: $scope.textUpcoming
                };

                requestService.updateUpcoming($routeParams.id, payload).then(

                    // success function
                    function(data) {
                        $log.debug('upcomingNewController -> saveUpcoming success', data);
                        toastr.success('Data successfully saved!', 'Success');
                    },

                    // error function
                    function() {
                        $log.debug('upcomingNewController -> saveUpcoming error');
                        toastr.error('Unexpected error has occurred!', 'Error');
                    }
                );

            }
        };

    }


}());