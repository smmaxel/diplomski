(function() {

    'use strict';

    angular.module('myapp').controller('homeController', homeController)
    .filter('reverse', function() {
        return function(items) {
            return items.slice().reverse();
        };
    });

    homeController.$inject = ['$scope'];

    function homeController($scope) {

        // Values used in carousel
        $scope.myInterval = 5000;
        $scope.slides = [];


        // main data info for the other pages
        $scope.data = {
            movieDescription: 'Movies section contains all the best rated moves of all time. Each movie contains description, poster and link to its trailer that will be opened in modal. Click on a link bellow and learn out more.',
            upcomingDescription: 'Upcoming section contains list of movies ordered by the days left till release date. All information are shown inside the dataTable which allows easier manipulation and filtering of the movie data.',
            aboutDescription: 'In About section you will find all the necessary information about the project and used technologies. Also links to all used tutorials and support are provided.'
        };

        // dummy data
        $scope.movies = [
            {
                heading: 'The Shawshank Redemption',
                subheading: '(1994)',
                text: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
                img: 'data/img/the-shawshank-redemption.jpg'
            },
            {
                heading: 'The Godfather',
                subheading: '(1972)',
                text: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
                img: 'data/img/the-godfather.jpg'
            },
            {
                heading: 'The Godfather: Part II',
                subheading: '(1974)',
                text: 'The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.',
                img: 'data/img/the-godfather-part-II.jpg'
            },
            {
                heading: 'The Dark Knight',
                subheading: '(2008)',
                text: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.',
                img: 'data/img/the-dark-knight.jpg'
            },
            {
                heading: 'Pulp Fiction',
                subheading: '(1994)',
                text: 'The lives of two mob hit men, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
                img: 'data/img/pulp-fiction.jpg'
            },
            {
                heading: 'Schindler\'s List',
                subheading: '(1993)',
                text: 'In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
                img: 'data/img/schindlers-list.jpg'
            },
            {
                heading: '12 Angry Men',
                subheading: '(1957)',
                text: 'A dissenting juror in a murder trial slowly manages to convince the others that the case is not as obviously clear as it seemed in court.',
                img: 'data/img/12-angry-men.jpg'
            },
            {
                heading: 'The Good, the Bad and the Ugly',
                subheading: '(1966)',
                text: 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.',
                img: 'data/img/the-good-the-bad-and-the-ugly.jpg'
            },
            {
                heading: 'The Lord of the Rings: The Return of the King',
                subheading: '(2003)',
                text: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
                img: 'data/img/the-lord-of-the-rings-the-return-of-the-king.jpg'
            },
            {
                heading: 'Fight Club',
                subheading: '(1999)',
                text: 'An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more...',
                img: 'data/img/fight-club.jpg'
            },
            {
                heading: 'The Lord of the Rings: The Fellowship of the Ring',
                subheading: '(2001)',
                text: 'A meek hobbit of the Shire and eight companions set out on a journey to Mount Doom to destroy the One Ring and the dark lord Sauron.',
                img: 'data/img/the-lord-of-the-rings-the-fellowship-of-the-ring.jpg'
            },
            {
                heading: 'Star Wars: Episode V - The Empire Strikes Back',
                subheading: '(1980)',
                text: 'After the rebels have been brutally overpowered by the Empire on their newly established base, Luke Skywalker takes advanced Jedi training with Master Yoda, while his friends are pursued by Darth Vader as part of his plan to capture Luke.',
                img: 'data/img/star-wars-episode-V-the-empire-strikes-back.jpg'
            },
            {
                heading: 'Forrest Gump',
                subheading: '(1994)',
                text: 'Forrest Gump, while not intelligent, has accidentally been present at many historic moments, but his true love, Jenny Curran, eludes him.',
                img: 'data/img/forrest-gump.jpg'
            },
            {
                heading: 'Inception',
                subheading: '(2010)',
                text: 'A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
                img: 'data/img/inception.jpg'
            }
        ];

        // copy of data array passed to the carousel
        $scope.slides = angular.copy($scope.movies);

    }

}());