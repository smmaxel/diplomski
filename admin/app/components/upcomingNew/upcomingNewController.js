(function() {

    'use strict';

    angular.module('admin').controller('upcomingNewController', upcomingNewController);

    upcomingNewController.$inject = ['$scope', '$routeParams', '$location', '$log', 'toastr', 'requestService'];

    function upcomingNewController($scope, $routeParams, $location, $log, toastr, requestService) {

        // Initial values
        var state = 0;
        var requiredFields = ['textName', 'textLength', 'textType', 'textYear', 'textUpcoming'];

        $scope.backToUpcoming = function() {
            $location.path('/upcoming');
        };

        /*
         * Pattern
         * toastr.success('Successfully logged in. You will be redirected in 3 sec to main page.', 'Success');
         * toastr.error('Your credentials are invalid!', 'Error');
         * */

        // validate the entry
        function validate() {
            for(var i = 0, length = requiredFields.length; i < length; i++) {
                if ($scope[requiredFields[i]] === undefined) {
                    state = -1;
                    break;
                } else {
                    state = 1;
                }
            }
        }

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

                requestService.saveUpcoming(payload).then(

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