(function() {

    'use strict';

    angular.module('admin', [
        'ngRoute',
        'ngSanitize',
        'angular-loading-bar',
        'ui.bootstrap'
    ])
    .constant('CONFIG', {
        user : {}
    })

    .config(function($logProvider){
        $logProvider.debugEnabled(true);
    });

}());