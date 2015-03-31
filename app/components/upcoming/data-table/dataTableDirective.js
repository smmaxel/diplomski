(function () {

    'use strict';

    angular.module('myapp').directive('datatable', function() {

        return {
            restrict: 'E',
            // require: datas,
            replace: true,
            scope: {},
            templateUrl: 'app/components/upcoming/data-table/dataTableView.html',
            controller: ['$scope', '$log', function($scope, $log) {

                // controller area

                $scope.upcomingMovies = [
                    {
                        name: 'Furious 7',
                        length: '137 min',
                        type: 'Action | Crime | Thriller',
                        year: '(2015)',
                        upcoming: ''
                    },
                    {
                        name: 'Woman in Gold',
                        length: '109 min',
                        type: 'Drama',
                        year: '(2015)',
                        upcoming: ''
                    },
                    {
                        name: '5 to 7',
                        length: '95 min',
                        type: 'Comedy | Romance',
                        year: '(2014)',
                        upcoming: ''
                    },
                    {
                        name: 'Lambert & Stamp',
                        length: '117 min',
                        type: 'Documentary | Biography | History | Music',
                        year: '(2014)',
                        upcoming: ''
                    },
                    {
                        name: 'Effie Gray',
                        length: '108 min',
                        type: 'Drama',
                        year: '(2014)',
                        upcoming: ''
                    },
                    {
                        name: 'The Longest Ride',
                        length: 'Unknown',
                        type: 'Drama | Romance',
                        year: '(2015)',
                        upcoming: ''
                    },
                    {
                        name: 'Ex Machina',
                        length: '108 min',
                        type: 'Drama | Sci-Fi',
                        year: '(2015)',
                        upcoming: ''
                    },
                    {
                        name: 'Desert Dancer',
                        length: '98 min',
                        type: 'Biography | Drama',
                        year: '(2014)',
                        upcoming: ''
                    },
                    {
                        name: 'Clouds of Sils Maria',
                        length: '124 min',
                        type: 'Drama',
                        year: '(2014)',
                        upcoming: ''
                    },
                    {
                        name: 'Kill Me Three Times',
                        length: '90 min',
                        type: 'Action | Thriller',
                        year: '(2014)',
                        upcoming: ''
                    },
                    {
                        name: 'Self/less',
                        length: 'Unknown',
                        type: 'Drama | Sci-Fi | Thriller',
                        year: '(2015)',
                        upcoming: ''
                    },
                    {
                        name: 'Unfriended',
                        length: '82 min',
                        type: 'Horror | Thriller',
                        year: '(2014)',
                        upcoming: ''
                    },
                    {
                        name: 'Paul Blart: Mall Cop 2',
                        length: '94 min',
                        type: ' Action | Comedy',
                        year: '(2015)',
                        upcoming: ''
                    },
                    {
                        name: 'Child 44',
                        length: '137 min',
                        type: 'Drama | Thriller',
                        year: '(2015)',
                        upcoming: ''
                    },
                    {
                        name: 'Monkey Kingdom',
                        length: 'Unknown',
                        type: 'Documentary',
                        year: '(2015)',
                        upcoming: ''
                    },
                    {
                        name: 'True Story',
                        length: '100 min',
                        type: 'Drama | Mystery | Thriller',
                        year: '(2015)',
                        upcoming: ''
                    },
                    {
                        name: 'Alex of Venice',
                        length: '86 min',
                        type: 'Drama',
                        year: '(2014)',
                        upcoming: ''
                    },
                    {
                        name: 'Beyond the Reach',
                        length: 'Unknown',
                        type: 'Thriller',
                        year: '(2014)',
                        upcoming: ''
                    },
                    {
                        name: 'Felix and Meira',
                        length: '105 min',
                        type: 'Drama | Family | Romance',
                        year: '(2014)',
                        upcoming: ''
                    },
                    {
                        name: 'Monsters: Dark Continent',
                        length: '119 min',
                        type: 'Drama | Sci-Fi | Thriller',
                        year: '(2014)',
                        upcoming: ''
                    },
                    {
                        name: 'The Dead Lands',
                        length: '107 min',
                        type: 'Action',
                        year: '(2014)',
                        upcoming: ''
                    },
                    {
                        name: 'The Age of Adaline',
                        length: '110 min',
                        type: 'Drama | Romance',
                        year: '(2015)',
                        upcoming: ''
                    },
                    {
                        name: 'Little Boy',
                        length: 'Unknown',
                        type: 'Comedy | Drama | War',
                        year: '(2015)',
                        upcoming: ''
                    },
                    {
                        name: 'The Water Diviner',
                        length: '111 min',
                        type: 'Drama | War',
                        year: '(2014)',
                        upcoming: ''
                    },
                    {
                        name: 'Adult Beginners',
                        length: '90 min',
                        type: 'Comedy | Drama',
                        year: '(2014)',
                        upcoming: ''
                    },
                    {
                        name: 'Misery Loves Comedy',
                        length: '94 min',
                        type: 'Documentary | Comedy',
                        year: '(2014)',
                        upcoming: ''
                    }
                ];


                // pagination
                $scope.totalItems =  $scope.upcomingMovies.length;
                $scope.itemsPerPage = 10;
                $scope.currentPage = 1;

            }]
        }

    });


}());