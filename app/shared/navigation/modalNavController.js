(function() {

    'use strict';

    angular.module('myapp').controller('ModalInstanceNavCtrl', function ($scope, $log, $sce, $modalInstance, Upload, toastr, requestService, CONFIG) {

        $scope.states = {
            emailState: 0
        };

        // Progress bar visible
        $scope.uploadStatus = {
            progressBarVisible: false,
            progressBarValue: 0
        };

        var uploadImage = null;

        // email check on the backend
        /**
         * Checks if the Email is already in use on the server side
         * @param email
         */
        function validateEmail(email) {

            console.log('email checking', email);

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

        $scope.validateEmail = validateEmail;

        // logic for saving the content
        $scope.update = function() {

            if ($scope.states.emailState !== 0 && $scope.states.emailState === -1) {
                toastr.error('Check if email field is correctly filled!', 'Error');
            } else {
                var updateData = {
                    password: $scope.password || null,
                    email: $scope.email || null,
                    img: uploadImage || null
                };

                requestService.updateUser(updateData).then(

                    // success function
                    function(data) {
                        $log.debug('modalNavController -> updateUser success', data);
                        if (data.text === 'success') {
                            toastr.success('Successfully updated!', 'Success');
                        } else if (data.text === 'empty') {
                            toastr.info('None of the fields has been filled!', 'Info');
                        } else {
                            toastr.error('An error while updating has occurred!', 'Error');
                        }
                    },

                    // error function
                    function() {
                        $log.debug('modalNavController -> updateUser error');
                    }
                );
            }

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
                    uploadImage = resp.data.success.text;
                    $scope.uploadStatus.progressBarVisible = false;
                    toastr.success('Image successfully uploaded', 'Success');
                }, function (resp) {
                    // console.log('Error status: ' + resp.status);
                    toastr.error('Image upload error! Available formats are .jpg, .png and .gif.', 'Error');
                }, function (evt) {
                    $scope.uploadStatus.progressBarValue = parseInt(100.0 * evt.loaded / evt.total);
                    //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    //console.log('progress: ' + progressPercentage + '% ' + evt.config.data);
                });
            }
        };

    });


}());