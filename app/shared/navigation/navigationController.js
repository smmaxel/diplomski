(function() {

    'use strict';

    angular.module('myapp').controller('navigationController', navigationController);

    navigationController.$inject = ['$scope', '$log', '$location', '$modal', 'CONFIG'];

    function navigationController($scope, $log, $location, $modal, CONFIG) {

        $scope.navigation = true; // display the navigatin pages (Movies, Upcoming etc.)

        /*$scope.$on('$routeChangeStart', function() {

            if (CONFIG.user.name) {
                $scope.navigation = true;
                $scope.username = CONFIG.user.username;
            } else {
                $scope.navigation = false;
                $scope.username = '';
            }
        });*/

        $scope.logout = function() {
            CONFIG.user = {};
            $location.path('/login');
        };


        $scope.open = function () {
            $modal.open({
                animation: true,
                templateUrl: 'myNavModalContent.html',
                controller: 'ModalInstanceNavCtrl',
                size: 'lg',
                resolve: {
                    movie: function () {
                        return 'sm.maxel';
                    }
                }
            });

        };

    }


}());