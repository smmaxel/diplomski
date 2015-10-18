(function() {

    'use strict';

    angular.module('admin').controller('upcomingController', upcomingController);

    upcomingController.$inject = ['$scope', '$location', '$log', 'toastr', 'requestService'];

    function upcomingController($scope, $location, $log, toastr, requestService) {

        // initial values
        $scope.upcomings = [];
        $scope.totalItems =  0;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;

        // make a call to obtain upcoming data
        getUpcoming();

        function getUpcoming() {
            requestService.getUpcoming().then(

                // success function
                function(data) {
                    $log.debug('upcomingController -> getUpcoming success', data);
                    $scope.upcomings = data.upcoming;
                    $scope.totalItems = $scope.upcomings.length;
                },

                // error function
                function() {
                    $log.debug('upcomingController -> geUpcoming error');
                }
            );
        }




        $scope.addNewUpcoming = function() {
            $location.path('/upcomingNew');
        };

        $scope.editUpcoming = function(id) {
            $location.path('/upcomingEdit/' + id);
            /*console.log('edit upcoming under id ', id);*/
        };

        $scope.deleteUpcoming = function(id) {
            console.log('delete upcoming under id ', id);
            requestService.deleteUpcoming(id).then(

                // success function
                function(data) {
                    $log.debug('upcomingController -> deleteUpcoming success', data);
                    getUpcoming();
                    toastr.success('Data successfully deleted!', 'Success');
                },

                // error function
                function() {
                    $log.debug('upcomingController -> deleteUpcoming error');
                    toastr.error('Unexpected error has occurred!', 'Error');
                }
            );
        };

    }


}());