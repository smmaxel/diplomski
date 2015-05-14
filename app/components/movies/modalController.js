(function() {

    'use strict';

    angular.module('myapp').controller('ModalInstanceCtrl', function ($scope, $log, $sce, $modalInstance, movie) {

        $log.debug('movie idemo', movie);

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };

        $scope.movieName = movie.heading;
        $scope.movieLink = movie.link;

    });


}());