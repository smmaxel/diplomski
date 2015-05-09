(function() {

    'use strict';

    angular.module('myapp', [
        'ngRoute',
        'ngSanitize',
        'angular-loading-bar',
        'ui.bootstrap'
    ])

    .config(function($logProvider){
        $logProvider.debugEnabled(true);
    });

}());