(function() {

    'use strict';

    angular.module('admin', [
        'ngRoute',
        'ngSanitize',
        'angular-loading-bar',
        'ui.bootstrap',
        'toastr'

    ])
    .constant('CONFIG', {
            userLogged: false
    })

    .config(function($logProvider){
        $logProvider.debugEnabled(true);
    });

}());