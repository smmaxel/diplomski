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


        $scope.submitForm = function() {
            console.log('submit form initiated');
        };

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


            var data = {
                name: $scope.name,
                username: $scope.username,
                password: $scope.password,
                email: $scope.email,
                notes: $scope.notes,
                gender: $scope.gender,
                occupation: $scope.occupation,
                birthday: $scope.birthdate
            };


            /*
                 $stmt->bindParam("name", $user->name);
                 $stmt->bindParam("username", $user->username);
                 $stmt->bindParam("password", $user->password);
                 $stmt->bindParam("email", $user->email);
                 $stmt->bindParam("notes", $user->notes);
                 $stmt->bindParam("occupation", $user->occupation);
                 $stmt->bindParam("gender", $user->gender);
                 $stmt->bindParam("birthday", $user->birthday);
             */

/*            requestService.updateUser(2, data).then(

                // success function
                function(data) {
                    console.log('data saved successfully: ', data);
                },

                // error function
                function() {
                    console.log('error while trying to POST the data');
                }
            );*/

        };

    }

}());