(function() {

    'use strict';

    angular.module('admin').controller('loginController', loginController);

    loginController.$inject = ['$scope', '$log', '$location', 'loginService', 'CONFIG'];

    function loginController($scope, $log, $location, loginService, CONFIG) {

        CONFIG.userLogged = true;

        setTimeout(function() {
            $location.path('/dashboard');
        }, 3000);


    }

}());