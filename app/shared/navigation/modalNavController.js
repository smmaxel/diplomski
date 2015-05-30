(function() {

    'use strict';

    angular.module('myapp').controller('ModalInstanceNavCtrl', function ($scope, $log, $sce, $modalInstance, movie) {

        $log.debug('movie idemo', movie);

        /*$scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };*/

        $scope.movieName = 'idemo';
        $scope.movieLink = 'i opet';

    });


}());