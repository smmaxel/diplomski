(function() {

    'use strict';

    angular.module('myapp', [
        'ngRoute',
        'ngSanitize',
        'ngAnimate',
        'toastr',
        'angular-loading-bar',
        'ui.bootstrap'
    ])
    .constant('CONFIG', {
        userLogged : false,
        username: null
    })

    .config(function($logProvider){
        $logProvider.debugEnabled(true);
    });

}());