(function() {

    'use strict';

    angular.module('myapp').controller('loginController', loginController);

    loginController.$inject = ['$scope', '$log', '$location', 'requestService', 'CONFIG'];

    function loginController($scope, $log, $location, requestService, CONFIG) {

        var users = [];

        requestService.getUsers().then(

            // success function
            function(data) {
                $log.debug('loginController -> users success', data);
                users = data.users;
            },

            // error function
            function() {
                $log.debug('loginController -> users error');
            }
        );

        $scope.login =  function() {

            for (var i = 0, length = users.length; i < length; i++) {
                if (users[i]) {
                    if (users[i].username === $scope.username && users[i].password === $scope.password) {
                        CONFIG.user = users[i];
                        $location.path('/home');
                    } else {
                        if (i === length - 1) {
                            console.log('wrong credentials');
                        }
                    }
                }
            }

        };

    }

}());