(function() {

    'use strict';

    angular.module('myapp').controller('registerController', registerController);

    registerController.$inject = ['$scope', '$log', 'requestService'];

    function registerController($scope, $log, requestService) {

        $scope.occupations = [
            'Engineering',
            'Marketing',
            'Finance',
            'Administration'
        ];


        $scope.register = function() {


            // check verification

            // create a payload

            // send a payload to a server

            // if success login and redirect to home page

            // throw error if exists

            console.log('name', $scope.name);
            console.log('username', $scope.username);
            console.log('password', $scope.password);
            console.log('email', $scope.email);
            console.log('notes', $scope.notes);
            console.log('gender', $scope.gender);
            console.log('occupation', $scope.occupation);
            console.log('birthdate', $scope.birthdate);

        };

    }

}());