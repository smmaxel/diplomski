-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 23, 2015 at 06:57 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `moviedb`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` text,
  `movieID` int(11) DEFAULT NULL,
  `userID` int(11) DEFAULT NULL,
  `approved` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE IF NOT EXISTS `movies` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `heading` tinytext CHARACTER SET latin1,
  `subheading` tinytext CHARACTER SET latin1,
  `description` text CHARACTER SET latin1,
  `storyline` text COLLATE utf8_unicode_ci,
  `img` tinytext CHARACTER SET latin1,
  `link` tinytext CHARACTER SET latin1,
  `commentsID` int(11) DEFAULT NULL,
  `ratingID` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=15 ;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `heading`, `subheading`, `description`, `storyline`, `img`, `link`, `commentsID`, `ratingID`) VALUES
(1, 'The Shawshank Redemption', '(1994)', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'Andy Dufresne is a young and successful banker whose life changes drastically when he is convicted and sentenced to life imprisonment for the murder of his wife and her lover. Set in the 1940s, the film shows how Andy, with the help of his friend Red, the prison entrepreneur, turns out to be a most unconventional prisoner.', 'data/img/the-shawshank-redemption.jpg', 'https://www.youtube.com/embed/6hB3S9bIaco', NULL, NULL),
(2, 'The Godfather', '(1972)', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 'When the aging head of a famous crime family decides to transfer his position to one of his subalterns, a series of unfortunate events start happening to the family, and a war begins between all the well-known families leading to insolence, deportation, murder and revenge, and ends with the favorable successor being finally chosen.', 'data/img/the-godfather.jpg', 'https://www.youtube.com/embed/sY1S34973zA', NULL, NULL),
(3, 'The Godfather: Part II', '(1974)', 'The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.', 'The continuing saga of the Corleone crime family tells the story of a young Vito Corleone growing up in Sicily and in 1910s New York; and follows Michael Corleone in the 1950s as he attempts to expand the family business into Las Vegas, Hollywood and Cuba.', 'data/img/the-godfather-part-II.jpg', 'https://www.youtube.com/embed/8PyZCU2vpi8', NULL, NULL),
(4, 'The Dark Knight', '(2008)', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.', 'Batman raises the stakes in his war on crime. With the help of Lieutenant Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the city streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as The Joker.', 'data/img/the-dark-knight.jpg', 'https://www.youtube.com/embed/yrJL5JxEYIw', NULL, NULL),
(5, 'Pulp Fiction', '(1994)', 'The lives of two mob hit men, a boxer, a gangster''s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', 'Jules Winnfield and Vincent Vega are two hitmen who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace. Wallace has also asked Vincent to take his wife Mia out a few days later when Wallace himself will be out of town. Butch Coolidge is an aging boxer who is paid by Wallace to lose his next fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.', 'data/img/pulp-fiction.jpg', 'https://www.youtube.com/embed/ewlwcEBTvcg', NULL, NULL),
(6, 'Schindler''s List', '(1993)', 'In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.', 'Oskar Schindler is a vainglorious and greedy German businessman who becomes an unlikely humanitarian amid the barbaric Nazi reign when he feels compelled to turn his factory into a refuge for Jews. Based on the true story of Oskar Schindler who managed to save about 1100 Jews from being gassed at the Auschwitz concentration camp, it is a testament for the good in all of us.', 'data/img/schindlers-list.jpg', 'https://www.youtube.com/embed/dwfIf1WMhgc', NULL, NULL),
(7, '12 Angry Men', '(1957)', 'A dissenting juror in a murder trial slowly manages to convince the others that the case is not as obviously clear as it seemed in court.', 'The defense and the prosecution have rested and the jury is filing into the jury room to decide if a young Spanish-American is guilty or innocent of murdering his father. What begins as an open and shut case of murder soon becomes a mini-drama of each of the jurors'' prejudices and preconceptions about the trial, the accused, and each other. Based on the play, all of the action takes place on the stage of the jury room.', 'data/img/12-angry-men.jpg', 'https://www.youtube.com/embed/fSG38tk6TpI', NULL, NULL),
(8, 'The Good, the Bad and the Ugly', '(1966)', 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.', 'Blondie (The Good) is a professional gunslinger who is out trying to earn a few dollars. Angel Eyes (The Bad) is a hit man who always commits to a task and sees it through, as long as he is paid to do so. And Tuco (The Ugly) is a wanted outlaw trying to take care of his own hide. Tuco and Blondie share a partnership together making money off Tuco''s bounty, but when Blondie unties the partnership, Tuco tries to hunt down Blondie. When Blondie and Tuco come across a horse carriage loaded with dead bodies, they soon learn from the only survivor (Bill Carson) that he and a few other men have buried a stash of gold in a cemetery. Unfortunately Carson dies and Tuco only finds out the name of the cemetery, while Blondie finds out the name on the grave. Now the two must keep each other alive in order to find the gold. Angel Eyes (who had been looking for Bill Carson) discovers that Tuco and Blondie meet with Carson and knows they know the location of the gold. All he needs is for the two to ...', 'data/img/the-good-the-bad-and-the-ugly.jpg', 'https://www.youtube.com/embed/WCN5JJY_wiA', NULL, NULL),
(9, 'The Lord of the Rings: The Return of the King', '(2003)', 'Gandalf and Aragorn lead the World of Men against Sauron\\''s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.', 'While Frodo & Sam continue to approach Mount Doom to destroy the One Ring, unaware of the path Gollum is leading them, the former Fellowship aid Rohan & Gondor in a great battle in the Pelennor Fields, Minas Tirith and the Black Gates as Sauron wages his last war against Middle-Earth.', 'data/img/the-lord-of-the-rings-the-return-of-the-king.jpg', 'https://www.youtube.com/embed/r5X-hFf6Bwo', NULL, NULL),
(10, 'Fight Club', '(1999)', 'An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more...', 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.', 'data/img/fight-club.jpg', 'https://www.youtube.com/embed/SUXWAEX2jlg', NULL, NULL),
(11, 'The Lord of the Rings: The Fellowship of the Ring', '(2001)', 'A meek hobbit of the Shire and eight companions set out on a journey to Mount Doom to destroy the One Ring and the dark lord Sauron.', 'An ancient Ring thought lost for centuries has been found, and through a strange twist in fate has been given to a small Hobbit named Frodo. When Gandalf discovers the Ring is in fact the One Ring of the Dark Lord Sauron, Frodo must make an epic quest to the Cracks of Doom in order to destroy it! However he does not go alone. He is joined by Gandalf, Legolas the elf, Gimli the Dwarf, Aragorn, Boromir and his three Hobbit friends Merry, Pippin and Samwise. Through mountains, snow, darkness, forests, rivers and plains, facing evil and danger at every corner the Fellowship of the Ring must go. Their quest to destroy the One Ring is the only hope for the end of the Dark Lords reign!', 'data/img/the-lord-of-the-rings-the-fellowship-of-the-ring.jpg', 'https://www.youtube.com/embed/V75dMMIW2B4', NULL, NULL),
(12, 'Star Wars: Episode V - The Empire Strikes Back', '(1980)', 'After the rebels have been brutally overpowered by the Empire on their newly established base, Luke Skywalker takes advanced Jedi training with Master Yoda, while his friends are pursued by Darth Vader as part of his plan to capture Luke.', 'After the Rebel base on the icy planet Hoth is taken over by the empire, Han, Leia, Chewbacca, and C-3PO flee across the galaxy from the Empire. Luke travels to the forgotten planet of Dagobah to receive training from the Jedi master Yoda, while Vader endlessly pursues him.', 'data/img/star-wars-episode-V-the-empire-strikes-back.jpg', 'https://www.youtube.com/embed/PkEKIw0FU6Y', NULL, NULL),
(13, 'Forrest Gump', '(1994)', 'Forrest Gump, while not intelligent, has accidentally been present at many historic moments, but his true love, Jenny Curran, eludes him.', 'Forrest Gump is a simple man with a low I.Q. but good intentions. He is running through childhood with his best and only friend Jenny. His ''mama'' teaches him the ways of life and leaves him to choose his destiny. Forrest joins the army for service in Vietnam, finding new friends called Dan and Bubba, he wins medals, creates a famous shrimp fishing fleet, inspires people to jog, starts a ping-pong craze, create the smiley, write bumper stickers and songs, donating to people and meeting the president several times. However, this is all irrelevant to Forrest who can only think of his childhood sweetheart Jenny Curran. Who has messed up her life. Although in the end all he wants to prove is that anyone can love anyone.', 'data/img/forrest-gump.jpg', 'https://www.youtube.com/embed/uPIEn0M8su0', NULL, NULL),
(14, 'Inception', '(2010)', 'A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.', 'Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb''s rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved. Now Cobb is being offered a chance at redemption. One last job could give him his life back but only if he can accomplish the impossible-inception. Instead of the perfect heist, Cobb and his team of specialists have to pull off the reverse: their task is not to steal an idea but to plant one. If they succeed, it could be the perfect crime. But no amount of careful planning or expertise can prepare the team for the dangerous enemy that seems to predict their every move. An enemy that only Cobb could have seen coming.', 'data/img/inception.jpg', 'https://www.youtube.com/embed/8hP9D6kZseM', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE IF NOT EXISTS `rating` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rating` int(11) DEFAULT NULL,
  `movieID` int(11) DEFAULT NULL,
  `userID` int(11) DEFAULT NULL,
  `voted` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `upcoming`
--

CREATE TABLE IF NOT EXISTS `upcoming` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext,
  `length` tinytext,
  `type` tinytext,
  `year` tinytext,
  `upcoming` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=42 ;

--
-- Dumping data for table `upcoming`
--

INSERT INTO `upcoming` (`id`, `name`, `length`, `type`, `year`, `upcoming`) VALUES
(1, 'Furious 7', '137 min', 'Action | Crime | Thriller', '(2015)', '94'),
(15, 'Woman in Gold', '109 min', 'Drama', '(2015)', '51'),
(17, '5 to 7', '95 min', 'Comedy | Romance', '(2014)', '156'),
(18, 'Lambert & Stamp', '117 min', 'Documentary | Biography | History | Music', '(2014)', '123'),
(19, 'Effie Gray', '108 min', 'Drama', '(2014)', '99'),
(20, 'The Longest Ride', 'Unknown', 'Drama | Romance', '(2015)', '42'),
(21, 'Ex Machina', '108 min', 'Drama | Sci-Fi', '(2015)', '157'),
(22, 'Desert Dancer', '98 min', 'Biography | Drama', '(2014)', '121'),
(23, 'Clouds of Sils Maria', '124 min', 'Drama', '(2014)', '34'),
(24, 'Kill Me Three Times', '90 min', 'Action | Thriller', '(2014)', '135'),
(25, 'Self/less', 'Unknown', 'Drama | Sci-Fi | Thriller', '(2015)', '103'),
(26, 'Unfriended', '82 min', 'Horror | Thriller', '(2014)', '26'),
(27, 'Paul Blart: Mall Cop 2', '94 min', 'Action | Comedy', '(2015)', '173'),
(28, 'Child 44', '137 min', 'Drama | Thriller', '(2015)', '91'),
(29, 'Monkey Kingdom', 'Unknown', 'Documentary', '(2015)', '59'),
(30, 'True Story', '100 min', 'Drama | Mystery | Thriller', '(2015)', '78'),
(31, 'Alex of Venice', '86 min', 'Drama', '(2014)', '61'),
(32, 'Beyond the Reach', 'Unknown', 'Thriller', '(2014)', '157'),
(33, 'Felix and Meira', '105 min', 'Drama | Family | Romance', '(2014)', '85'),
(34, 'Monsters: Dark Continent', '119 min', 'Drama | Sci-Fi | Thriller', '(2014)', '134'),
(35, 'The Dead Lands', '107 min', 'Action', '(2014)', '184'),
(36, 'The Age of Adaline', '110 min', 'Drama | Romance', '(2015)', '53'),
(37, 'Little Boy', 'Unknown', 'Comedy | Drama | War', '(2015)', '191'),
(38, 'Little Boy', 'Unknown', 'Comedy | Drama | War', '(2015)', '165'),
(39, 'The Water Diviner', '111 min', 'Drama | War', '(2014)', '34'),
(40, 'Adult Beginners', '90 min', 'Comedy | Drama', '(2014)', '27'),
(41, 'Misery Loves Comedy', '94 min', 'Documentary | Comedy', '(2014)', '188');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  `username` tinytext NOT NULL,
  `password` tinytext NOT NULL,
  `email` tinytext NOT NULL,
  `notes` tinytext,
  `occupation` tinytext,
  `gender` tinytext,
  `birthday` tinytext,
  `registered` text,
  `approved` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `email`, `notes`, `occupation`, `gender`, `birthday`, `registered`, `approved`) VALUES
(1, 'Marko Martinovic', 'sm.maxel', 'Marko024', 'sm.maxel@gmail.com', 'This looks awesome!', 'Programer', 'Male', '12-02-1987', NULL, NULL),
(2, 'Marko Martin', 'userTEst', 'passTest', 'email@nesto.com', 'notesTest', 'Engineering', 'male', '2015-06-23T22:00:00.000Z', NULL, NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
