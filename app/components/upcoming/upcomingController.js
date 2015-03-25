(function() {

    'use strict';

    angular.module('myapp').controller('upcomingController', upcomingController);

    upcomingController.$inject = ['$scope'];

    function upcomingController($scope) {

        // The directives automatically detects a dtOptions directive.
        // It will act as a default options for all the datatables in the scope. This is not necessary.
        $scope.dtOptions = {

            iDisplayLength: 5,

            // These 2 lines are for styling. Ignore!
            sDom: "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
            sPaginationType: "bootstrap"
            // End

        }

        // These are the options for the second DT. It's set in the element tags.
        $scope.dtOptionsExample2 = {
            sAjaxSource: 'data.json',
            sAjaxDataProp: 'result',
            bProcessing: false,
            fnRowCallback: function (row, data, index, fullindex) {
                if (data.id === 1) {
                    angular.element(row).addClass('blue');
                }
            }
        }


        // This is an example of column callback
        $scope.idCB = function (data) {
            if (data.id > 3) {
                return '<span class="label label-info">' + data.id + '</span>'
            }
            return '<span class="label label-important">' + data.id + '</span>'
        }

        // Anoter example
        $scope.aboutCB = function (data) {
            return data.about.text.substring(0, 50) + '...';

        }

    }

}());