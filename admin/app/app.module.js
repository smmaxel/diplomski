(function() {

    'use strict';

    angular.module('admin', [
        'ngRoute',
        'ngSanitize',
        'angular-loading-bar',
        'ui.bootstrap'

    ])
    .constant('CONFIG', {
            userLogged: true
    })

    .config(function($logProvider){
        $logProvider.debugEnabled(true);
    });

}());