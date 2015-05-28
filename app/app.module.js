(function() {

    'use strict';

    angular.module('myapp', [
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