(function() {

    'use strict';

    angular.module('myapp').controller('registerController', registerController);

    registerController.$inject = ['$scope', '$location', '$log', '$filter', '$timeout', 'Upload', 'toastr', 'vcRecaptchaService', 'requestService'];

    function registerController($scope, $location, $log, $filter, $timeout, Upload, toastr, vcRecaptchaService, requestService) {

        // States for checking availability of username and email values
        $scope.states = {
            usernameState: 0,
            emailState: 0
        };

        // Progress bar visible
        $scope.uploadStatus = {
            progressBarVisible: false,
            progressBarValue: 0
        };

        // Starting date
        $scope.birthday = '1990-01-01';

        // Captcha success response (not a robot)
        var captchaResponse = null;

        // Uploaded image URL
        var uploadImage = null;

        /**
         * Funciton used to validate both Username and Email
         * @param field
         */
        $scope.validateInput = function(field) {
            switch(field) {
                case 'email':
                    validateEmail($scope.email);
                    break;

                case 'username':
                    validateUsername($scope.username);
                    break;

                default: return;
            }
        };

        /**
         * Checks if the Email is already in use on the server side
         * @param email
         */
        function validateEmail(email) {
            requestService.checkEmail({'email': email}).then(

                // success function
                function(data) {
                    $log.debug('registerController -> checkEmail success', data);

                    if (data.email === 'available') {
                        $scope.states.emailState = 1;
                    } else {
                        $scope.states.emailState = -1;
                        toastr.warning('This email is already being used.', 'Warning');
                    }
                },

                // error function
                function() {
                    $log.debug('registerController -> checkEmail error');
                    $scope.states.emailState = 0;
                }
            );
        }

        /**
         * Checks if the Username is already in use on the server side
         * @param username
         */
        function validateUsername(username) {
            requestService.checkUsername({'username': username}).then(

                // success function
                function(data) {
                    $log.debug('registerController -> checkUserAvailability success', data);

                    if (data.username === 'available') {
                        $scope.states.usernameState = 1;
                    } else {
                        $scope.states.usernameState = -1;
                        toastr.warning('This username is already being used.', 'Warning');
                    }
                },

                // error function
                function() {
                    $log.debug('registerController -> checkUserAvailability error');
                    $scope.states.usernameState = 0;
                }
            );

        }

        /**
         * Captcha set response (not a robot)
         * @param response
         */
        $scope.setResponse = function (response) {
            captchaResponse = response;
        };

        /**
         * Upload file to server on select event
         * @param file
         */
        $scope.upload = function (file) {

            $scope.uploadStatus.progressBarValue = 0;
            uploadImage = null;

            if (file === null) {
                $scope.uploadStatus.progressBarVisible = false;
            } else {

                $scope.uploadStatus.progressBarVisible = true;

                Upload.upload({
                    url: 'api/upload.php',
                    method: 'POST',
                    file: file,
                    sendFieldsAs: 'form'
                }).then(function (resp) {
                    // console.log('Success ' + resp.config.data + 'uploaded. Response: ' + resp.data);
                    if (resp.data.error) {
                        $scope.uploadStatus.progressBarVisible = false;
                        toastr.error(resp.data.error.text, 'Error');
                    } else {
                        uploadImage = resp.data.success.text;
                        $scope.uploadStatus.progressBarVisible = false;
                        toastr.success('Image successfully uploaded', 'Success');
                    }
                }, function (resp) {
                    // console.log('Error status: ' + resp.status);
                    toastr.error('Image upload error!', 'Error');
                }, function (evt) {
                    $scope.uploadStatus.progressBarValue = parseInt(100.0 * evt.loaded / evt.total);
                    //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    //console.log('progress: ' + progressPercentage + '% ' + evt.config.data);
                });
            }
        };

        /**
         * Adds new user
         */
        $scope.submit = function() {

            if ($scope.states.emailState !== 1 && $scope.states.usernameState !== 1) {
                toastr.error('Check if all fields are filled correctly!', 'Error');
            } else {
                var userData = {
                    name: $scope.name,
                    username: $scope.username,
                    
                    password: $scope.password,
                    email: $scope.email,
                    gender: $scope.gender,
                    birthday: $filter('date')($scope.birthday, 'd/M/yyyy'),
                    gRecaptcha: vcRecaptchaService.getResponse(),
                    img: uploadImage
                };

                requestService.addUser(userData).then(

                    // success function
                    function(data) {
                        $log.debug('registerController -> addUser success', data);
                        toastr.info('Please check your email address for confirmation email!', 'Note');
                        toastr.success('Successfully Registered! You will be redirected to login page.', 'Success');
                        $timeout(function() { $location.path('/login'); }, 8000);
                    },

                    // error function
                    function() {
                        $log.debug('registerController -> addUser error');
                        toastr.error('An error while registering has occurred!', 'Error');
                    }
                );


            }
        }

    }

}());