(function() {

    'use strict';

    angular.module('myapp').controller('moviesController', moviesController);

    moviesController.$inject = ['$scope'];

    function moviesController($scope) {

        // dummy data
        $scope.movies = [
            {
                heading: 'Project One',
                subheading: 'Subheading',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium veniam exercitationem expedita laborum at voluptate. Labore, voluptates totam at aut nemo deserunt rem magni pariatur quos perspiciatis atque eveniet unde.'
            },
            {
                heading: 'Project Two',
                subheading: 'Subheading',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, odit velit cumque vero doloremque repellendus distinctio maiores rem expedita a nam vitae modi quidem similique ducimus! Velit, esse totam tempore.'
            },
            {
                heading: 'Project Three',
                subheading: 'Subheading',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, temporibus, dolores, at, praesentium ut unde repudiandae voluptatum sit ab debitis suscipit fugiat natus velit excepturi amet commodi deleniti alias possimus!'
            },
            {
                heading: 'Project Four',
                subheading: 'Subheading',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, quidem, consectetur, officia rem officiis illum aliquam perspiciatis aspernatur quod modi hic nemo qui soluta aut eius fugit quam in suscipit?'
            },
            {
                heading: 'Project Five',
                subheading: 'Subheading',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, quo, minima, inventore voluptatum saepe quos nostrum provident ex quisquam hic odio repellendus atque porro distinctio quae id laboriosam facilis dolorum.'
            }
        ];

    }

}());