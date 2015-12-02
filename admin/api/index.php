<?php

	require 'PHPMailer/PHPMailerAutoload.php';
    require 'Slim/Slim.php';
	\Slim\Slim::registerAutoloader();

	$app = new \Slim\Slim();

	// movies
	$app->get('/movies', 'getMovies'); // get all movies
	$app->get('/movie/:id', 'getMovie'); // get a movie for editing
	$app->post('/movie', 'addMovie'); // add a new movie
	$app->put('/movie/:id', 'updateMovie'); // update a movie after editing
	$app->delete('/movie/:id', 'deleteMovie'); // delete a movie

	// upcoming
	$app->get('/upcoming', 'getUpcoming');
	$app->get('/upcoming/:id', 'getUpcomingId');
	$app->post('/upcoming', 'addUpcoming');
	$app->put('/upcoming/:id', 'updateUpcoming');
	$app->delete('/upcoming/:id', 'deleteUpcoming');

	// users
	$app->get('/users', 'getUsers');
	$app->get('/user/:id', 'getUser');
	$app->post('/user', 'addUser');
	$app->put('/user/:id', 'updateUser');
    $app->put('/userApp/:id', 'approveUser');
	$app->delete('/user/:id', 'deleteUser');

	// comments
	$app->get('/comments', 'getComments');
	$app->get('/comment/:id', 'getComment');
	$app->put('/comment/:id', 'updateComment');
	$app->delete('/comment/:id/:reason', 'deleteComment');

	// ratings
	$app->get('/ratings', 'getRatings');
    $app->delete('/rating/:id', 'deleteRating');

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
        $sql = "INSERT INTO movies (movie_id, heading, subheading, description, storyline, img, link, imdb_rating) VALUES (NULL, :heading, :subheading, :description, :storyline, :img, :link, :imdb_rating)";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("heading", $movie->heading);
            $stmt->bindParam("subheading", $movie->subheading);
			$stmt->bindParam("description", $movie->description);
            $stmt->bindParam("storyline", $movie->storyline);
            $stmt->bindParam("img", $movie->img);
            $stmt->bindParam("link", $movie->link);
            $stmt->bindParam("imdb_rating", $movie->imdb_rating);
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
        $sql = "UPDATE movies SET heading=:heading, subheading=:subheading, description=:description, storyline=:storyline, img=:img, link=:link, imdb_rating=:imdb_rating WHERE movie_id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->bindParam("heading", $movie->heading);
            $stmt->bindParam("subheading", $movie->subheading);
			$stmt->bindParam("description", $movie->description);
            $stmt->bindParam("storyline", $movie->storyline);
            $stmt->bindParam("img", $movie->img);
            $stmt->bindParam("link", $movie->link);
			$stmt->bindParam("imdb_rating", $movie->imdb_rating);
            $stmt->execute();
            $db = null;
            echo json_encode($movie);
        } catch (PDOException $e) {
            echo '{"error": {"text":' . $e->getMessage() . '}}';
        }
    }

	//$app->delete('movie/:id', deleteMovie);
    function deleteMovie($id) {
        $sql = "DELETE FROM movies WHERE movie_id=:id";
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
        $sql = "SELECT * FROM users WHERE user_id=:id";
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
        $sql = "UPDATE users SET name=:name, username=:username, password=:password, email=:email, gender=:gender, birthday=:birthday, registered=:registered, registered_id=:registered_id, approved=:approved, img=:img WHERE user_id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->bindParam("name", $user->name);
            $stmt->bindParam("username", $user->username);
            $stmt->bindParam("password", $user->password);
            $stmt->bindParam("email", $user->email);
            $stmt->bindParam("gender", $user->gender);
            $stmt->bindParam("birthday", $user->birthday);
            $stmt->bindParam("registered", $user->registered);
            $stmt->bindParam("registered_id", $user->registered_id);
            $stmt->bindParam("approved", $user->approved);
            $stmt->bindParam("img", $user->img);
            $stmt->execute();
            $db = null;
            echo json_encode($user);
        } catch (PDOException $e) {
            echo '{"error":{"text":' . $e->getMessage() . '}}';
        }
    }

    // $app->put('/userApp/:id', 'approveUser');
    function approveUser($id) {
        $request = \Slim\Slim::getInstance()->request();
        $user = json_decode($request->getBody());
        $sql = "UPDATE users SET approved = '1' WHERE user_id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->execute();
            $db = null;
            echo json_encode($user);
        } catch (PDOException $e) {
            echo '{"error":{"text":' . $e->getMessage() . '}}';
        }
    }


	//$app->delete('/user/:id', deleteUser);
    function deleteUser($id) {
        $sql = "DELETE FROM users WHERE user_id=:id";
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
        $sql = "SELECT * FROM comments WHERE comment_id=:id";
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
        $sql = "UPDATE comments SET comment=:comment, movie_id=:movie_id, date=:date, timestamp=:timestamp, approved=:approved WHERE comment_id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->bindParam("comment", $comment->comment);
            $stmt->bindParam("movie_id", $comment->movie_id);
            $stmt->bindParam("date", $comment->date);
            $stmt->bindParam("timestamp", $comment->timestamp);
            $stmt->bindParam("approved", $comment->approved);
            $stmt->execute();
            $db = null;
            echo json_encode($comment);
        } catch (PDOException $e) {
            echo '{"error": {"text": ' . $e->getMessage() . '}}';
        }
    }

	//$app->delete('/comment/:id/:reason', deleteComment);
    function deleteComment($id, $reason) {

        // obtain user id and via ID get the user email
        $user_sql = 'SELECT email FROM users, comments WHERE comments.comment_id = "' . $id . '" AND users.user_id = comments.user_id;';
        $user_db = getConnection();
        $user_stmt = $user_db->prepare($user_sql);
        $user_stmt->execute();
        $user_result = $user_stmt->fetchObject();
        $user_db = null;
        $user_email = $user_result->email;

        // Create a new PHPMailer instance
        $mail = new PHPMailer;
        // Tell PHPMailer to use SMTP
        $mail->isSMTP();

        // Enable SMTP debugging
        // 0 = off (for production use)
        // 1 = client messages
        // 2 = client and server messages
        $mail->SMTPDebug = 0;

        // Set the hostname of the mail server
        $mail->Host = 'smtp.gmail.com';
        // Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
        $mail->Port = 587;
        // Set the encryption system to use - ssl (deprecated) or tls
        $mail->SMTPSecure = 'tls';
        // Whether to use SMTP authentication
        $mail->SMTPAuth = true;

        //Username to use for SMTP authentication - use full email address for gmail
        $mail->Username = "auto.responder.moviereview@gmail.com";
        //Password to use for SMTP authentication
        $mail->Password = "Marko022";

        //Set who the message is to be sent from
        $mail->setFrom('auto.responder.moviereview@gmail.com', 'Movie Review');
        //Set who the message is to be sent to
        $mail->addAddress($user_email);
        //Set the subject line
        $mail->Subject = 'Movie Review Verification';

        // switch case for different messages
        $rejectMsg = '';
        switch ($reason) {
            case 'in':
                // inappropriate
                $rejectMsg = 'Your comment contains inappropriate content.';
                break;

            case 'ra':
                // rasist
                $rejectMsg = 'Your comment contains rasist content.';
                break;

            case 'cu':
                // curses
                $rejectMsg = 'Your comment contains curses.';
                break;

            default: break;
        }
        
        $content = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> <html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Movie Review Rejection</title></head><body style="margin:0"><div style="width: 100%; height: 50px; background-color: #222"><a style="float: left; font-family: sans-serif; color: #e5e5e5; height: 50px; padding: 15px 15px; font-size: 18px; line-height: 20px; text-decoration: none;" href="#/home">Movie Review</a></div><h3 style="color:#212121;font-family:sans-serif;font-size:30px;font-weight:100;padding-bottom:10px;margin-left:10px;">Your comment has been rejected!</h3><p style="color:#484848;font-family:sans-serif;font-size:14px;font-weight:100;margin-left:10px;">Reason: <b>' . $rejectMsg . '</b></p></body></html>';
        $mail->msgHTML($content);
        //send the message
        $mail->send();

        $sql = "DELETE FROM comments WHERE comment_id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->execute();
            $db = null;
            //echo true;
            echo '{"success": {"text": "deleted"}}';
        } catch (PDOException $e) {
            echo '{"error": {"text": ' . $e->getMessage() . '}}';
        }
    }

    function deleteRating($id) {
        $sql = "DELETE FROM rating WHERE rating_id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->execute();
            $db = null;
            echo '{"success": {"text": ' . '"$reason"' . '}}';
        } catch (PDOException $e) {
            echo '{"error": {"text": ' . $e->getMessage() . '}}';
        }
    }


/* ************************************** */
// RATINGS
/* ************************************** */

	//$app->get('/ratings', getRatings);
    function getRatings() {
        $sql = "SELECT * FROM rating";
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