<?php

	require 'Slim/Slim.php';
	\Slim\Slim::registerAutoloader();

	$app = new \Slim\Slim();

	// movies
	$app->get('/movies', 'getMovies');
	$app->get('/movie/:id', 'getMovie');
	$app->post('/movie', 'addMovie');
	$app->put('/movie/:id', 'updateMovie');
	$app->delete('/movie/:id', 'deleteMovie');

	// upcoming
	$app->get('/upcoming', 'getUpcoming');
	$app->get('/upcoming/:id', 'getUpcomingId');
	$app->post('/upcoming', 'addUpcoming');
	$app->put('/upcoming/:id', 'updateUpcoming');
	$app->delete('upcoming/:id', 'deleteUpcoming');

	// users
	$app->get('/users', 'getUsers');
	$app->get('/user/:id', 'getUser');
	$app->post('/user', 'addUser');
	$app->put('/user/:id', 'updateUser');
	$app->delete('/user/:id', 'deleteUser');

	// comments
	$app->get('/comments', 'getComments');
	$app->get('/comment/:id', 'getComment');
	$app->put('/comment/:id', 'updateComment');
	$app->delete('/comment/:id', 'deleteComment');

	// ratings
	$app->get('/ratings', 'getRatings');

	$app->run();

//$app->get('/movies', getMovies);
	function getMovies() {
		$sql = "SELECT * FROM movies";
		try {
			$db = getConnection();
			$stmt = $db->query($sql);
			$movies = $stmt->fetchAll(PDO::FETCH_OBJ);
			$db = null;
			echo '{"movies": ' . json_encode($movies) . '}';
		} catch (PDOexception $e) {
			echo '{"error": {"text":' . $e->getMessage() . '}}';
		}
	}


//$app->get('movie/:id', getMovie);
    function getMovie($id) {
        $sql = "SELECT * FROM movies WHERE movie_id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->execute();
            $movie = $stmt->fetchObject();
            $db = null;
            echo '{"movie": ' . json_encode($movie) . '}';
        } catch (PDOException $e) {
            echo '{"error": {"text":' . $e->getMessage() . '}}';
        }
    }


//$app->post('movie', addMovie);
    function addMovie() {
        $request = \Slim\Slim::getInstance()->request();
        $movie = json_decode($request->getBody());
        $sql = "INSERT INTO movies (id, heading, subheading, description, storyline, img, link, commentsID, ratingID) VALUES (NULL, :heading, :subheading, :description, :storyline, :img, :link, :commentsID, :ratingID)";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("heading", $movie->heading);
            $stmt->bindParam("subheading", $movie->subheading);
            $stmt->bindParam("storyline", $movie->storyline);
            $stmt->bindParam("img", $movie->img);
            $stmt->bindParam("link", $movie->link);
            $stmt->bindParam("commentsID", $movie->commentsID);
            $stmt->bindParam("ratingID", $movie->ratingID);
            $stmt->execute();
            $movie->id = $db->lastInsertId();
            $db = null;
            echo json_encode($movie);
        } catch (PDOException $e) {
            echo '{"error": {"text":' . $e->getMessage() . '}}';
        }
    }


//$app->put('movie/:id', updateMovie);
    function updateMovie($id) {
        $request = \Slim\Slim::getInstance()->request();
        $movie = json_decode($request->getBody());
        $sql = "UPDATE movies SET heading=:heading, subheading=:subheading, storyline=:storyline, img=:img, link=:link, commentsID=:commentsID, ratingID=:ratingID WHERE id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->bindParam("heading", $movie->heading);
            $stmt->bindParam("subheading", $movie->subheading);
            $stmt->bindParam("storyline", $movie->storyline);
            $stmt->bindParam("img", $movie->img);
            $stmt->bindParam("link", $movie->link);
            $stmt->bindParam("commentsID", $movie->commentsID);
            $stmt->bindParam("ratingID", $movie->ratingID);
            $stmt->execute();
            $db = null;
            echo json_encode($movie);
        } catch (PDOException $e) {
            echo '{"error": {"text":' . $e->getMessage() . '}}';
        }
    }

//$app->delete('movie/:id', deleteMovie);
    function deleteMovie($id) {
        $sql = "DELETE FROM movies WHERE id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->execute();
            $db = null;
            echo true;
        } catch (PDOException $e) {
            echo '{"error": {"text":' . $e->getMessage() . '}}';
        }
    }


/* ************************************** */
// UPCOMING
/* ************************************** */

//$app->get('/upcoming', getUpcoming);
    function getUpcoming() {
        $sql = "SELECT * FROM upcoming";
        try {
            $db = getConnection();
            $stmt = $db->query($sql);
            $upcoming = $stmt->fetchAll(PDO::FETCH_OBJ);
            $db = null;
            echo '{"upcoming": ' . json_encode($upcoming) . '}';
        } catch (PDOException $e) {
            echo '{"error": {"text": ' . $e->getMessage() . '}}';
        }
    }

//$app->get('/upcoming/:id', getUpcomingId);
    function getUpcomingId($id) {
        $sql = "SELECT * FROM upcoming WHERE id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->execute();
            $upcoming = $stmt->fetchObject();
            $db = null;
            echo '{"upcoming": ' . json_encode($upcoming) . '}';
        } catch (PDOException $e) {
            echo '{"error": {"text": ' . $e->getMessage() . '}}';
        }
    }

//$app->post('/upcoming', addUpcoming);
    function addUpcoming() {
        $request = \Slim\Slim::getInstance()->request();
        $upcoming = json_decode($request->getBody());
        $sql = "INSERT INTO upcoming (id, name, length, type, year, upcoming) VALUES (NULL, :name, :length, :type, :year, :upcoming)";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("name", $upcoming->name);
            $stmt->bindParam("length", $upcoming->length);
            $stmt->bindParam("type", $upcoming->type);
            $stmt->bindParam("year", $upcoming->year);
            $stmt->bindParam("upcoming", $upcoming->upcoming);
            $stmt->execute();
            $upcoming->id = $db->lastInsertId();
            $db = null;
            echo json_encode($upcoming);
        } catch (PDOException $e) {
            echo '{"error": {"text": ' . $e->getMessage() . '}}';
        }
    }

//$app->put('/upcoming/:id', updateUpcoming);
    function updateUpcoming($id) {
        $request = \Slim\Slim::getInstance()->request();
        $upcoming = json_decode($request->getBody());
        $sql = "UPDATE upcoming SET name=:name, length=:length, type=:type, year=:year, upcoming=:upcoming WHERE id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->bindParam("name", $upcoming->name);
            $stmt->bindParam("length", $upcoming->length);
            $stmt->bindParam("type", $upcoming->type);
            $stmt->bindParam("year", $upcoming->year);
            $stmt->bindParam("upcoming", $upcoming->upcoming);
            $stmt->execute();
            $db = null;
            echo json_encode($upcoming);
        } catch (PDOException $e) {
            echo '{"error": {"text": ' . $e->getMessage() . '}}';
        }
    }

//$app->delete('upcoming/:id', deleteUpcoming);
    function deleteUpcoming($id) {
        $sql = "DELETE FROM upcoming WHERE id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->execute();
            $db = null;
            echo true;
        } catch (PDOException $e) {
            echo '{"error": {"text": ' . $e->getMessage() . '}}';
        }
    }


/* ************************************** */
// USERS
/* ************************************** */

//$app->get('/users', getUsers);
    function getUsers() {
        $sql = "SELECT * FROM users";
        try {
            $db = getConnection();
            $stmt = $db->query($sql);
            $users = $stmt->fetchAll(PDO::FETCH_OBJ);
            $db = null;
            echo '{"users": ' . json_encode($users) . '}';
        } catch (PDOException $e) {
            echo '{"error": {"text":' . $e->getMessage() . '}}';
        }
    }

//$app->get('/user/:id', getUser);
    function getUser($id) {
        $sql = "SELECT * FROM users WHERE id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->execute();
            $user = $stmt->fetchObject();
            $db = null;
            echo '{"user": ' . json_encode($user) . '}';
        } catch (PDOException $e) {
            echo '{"error": {"text": ' . $e->getMessage() . '}}';
        }
    }


//$app->post('/user', addUser);
    function addUser() {
        $request = \Slim\Slim::getInstance()->request();
        $user = json_decode($request->getBody());
        $sql = "INSERT INTO users (id, name, username, password, email, notes, occupation, gender, birthday) VALUES (NULL, :name, :username, :password, :email, :notes, :occupation, :gender, :birthday)";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("name", $user->name);
            $stmt->bindParam("username", $user->username);
            $stmt->bindParam("password", $user->password);
            $stmt->bindParam("email", $user->email);
            $stmt->bindParam("notes", $user->notes);
            $stmt->bindParam("occupation", $user->occupation);
            $stmt->bindParam("gender", $user->gender);
            $stmt->bindParam("birthday", $user->birthday);
            $stmt->execute();
            $user->id = $db->lastInsertId();
            $db = null;
            echo json_encode($user);
        } catch (PDOException $e) {
            echo '{"error":{"text":' . $e->getMessage() . '}}';
        }
    }

//$app->put('/user/:id', updateUser);
    function updateUser($id) {
        $request = \Slim\Slim::getInstance()->request();
        $user = json_decode($request->getBody());
        $sql = "UPDATE users SET name=:name, username=:username, password=:password, email=:email, notes=:notes, occupation=:occupation, gender=:gender, birthday=:birthday WHERE id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->bindParam("name", $user->name);
            $stmt->bindParam("username", $user->username);
            $stmt->bindParam("password", $user->password);
            $stmt->bindParam("email", $user->email);
            $stmt->bindParam("notes", $user->notes);
            $stmt->bindParam("occupation", $user->occupation);
            $stmt->bindParam("gender", $user->gender);
            $stmt->bindParam("birthday", $user->birthday);
            $stmt->execute();
            $db = null;
            echo json_encode($user);
        } catch (PDOException $e) {
            echo '{"error":{"text":' . $e->getMessage() . '}}';
        }
    }

//$app->delete('/user/:id', deleteUser);
    function deleteUser($id) {
        $sql = "DELETE FROM users WHERE id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->execute();
            $db = null;
            echo true;
        } catch (PDOException $e) {
            echo '{"error":{"text":' . $e->getMessage() . '}}';
        }
    }


/* ************************************** */
// COMMENTS
/* ************************************** */

//$app->get('/comments', getComments);
    function getComments() {
        $sql = "SELECT * FROM comments";
        try {
            $db = getConnection();
            $stmt = $db->query($sql);
            $comments = $stmt->fetchAll(PDO::FETCH_OBJ);
            $db = null;
            echo '{"comments": ' . json_encode($comments) . '}';
        } catch (PDOException $e) {
            echo '{"error": {"text": ' . $e->getMessage() . '}}';
        }
    }

//$app->get('/comment/:id', getComment);
    function getComment($id) {
        $sql = "SELECT * FROM comments WHERE id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->execute();
            $comment = $stmt->fetchObject();
            $db = null;
            echo '{"comment": ' . json_encode($comment) . '}';
        } catch (PDOException $e) {
            echo '{"error": {"text": ' . $e->getMessage() . '}}';
        }
    }

//$app->put('/comment/:id', updateComment);
    function updateComment($id) {
        $request = \Slim\Slim::getInstance()->request();
        $comment = json_decode($request->getBody());
        $sql = "UPDATE comments SET ????? WHERE id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->bindParam("???", $comment->something);
            // fill with more data once you get the info
            $stmt->execute();
            $db = null;
            echo json_encode($comment);
        } catch (PDOException $e) {
            echo '{"error": {"text": ' . $e->getMessage() . '}}';
        }
    }

//$app->delete('/comment/:id', deleteComment);
    function deleteComment($id) {
        $sql = "DELETE FROM comments WHERE id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->execute();
            $db = null;
            echo true;
        } catch (PDOException $e) {
            echo '{"error": {"text": ' . $e->getMessage() . '}}';
        }
    }


/* ************************************** */
// RATINGS
/* ************************************** */

//$app->get('/ratings', getRatings);
    function getRatings() {
        $sql = "SELECT * FROM ratings";
        try {
            $db = getConnection();
            $stmt = $db->query($sql);
            $ratings = $stmt->fetchAll(PDO::FETCH_OBJ);
            $db = null;
            echo '{"ratings": ' . json_encode($ratings) . '}';
        } catch (PDOException $e) {
            echo '{"error": {"text": ' . $e->getMessage() . '}}';
        }
    }


/**
 * Main configuration for database connection
 * @return PDO
 */
function getConnection() {
    $dbhost = "127.0.0.1";
    $dbuser = "root";
    $dbpass = "";
    $dbname = "moviedb";
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
}