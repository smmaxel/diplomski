<?php

    session_start();

    require 'Slim/Slim.php';
    \Slim\Slim::registerAutoloader();

    $app = new \Slim\Slim();

    $app->get('/movies', 'getMovies');
    $app->get('/movie/:id', 'getMovie');
    $app->get('/comments/:id', 'getComments');
    $app->get('/upcoming', 'getUpcoming');
    $app->get('/users', 'getUsers');
    $app->post('/user', 'addUser');
    $app->put('/user/:id', 'updateUser');
    $app->delete('/user/:id', 'deleteUser');
    $app->post('/comments', 'addComment');
    $app->post('/checkusername', 'checkUsername');
    $app->post('/checkemail', 'checkEmail');

    $app->run();

    /**
     * Get the Movies Data from the database
     * http://www.yourwebsite.com/api/movies
     * Method: GET
     */
    function getMovies() {
        $sql = "SELECT * FROM movies";
        try {
            $db = getConnection();
            $stmt = $db->query($sql);
            $movies = $stmt->fetchAll(PDO::FETCH_OBJ);
            $db = null;
            echo '{"movies": ' . json_encode($movies) . '}';
        } catch (PDOException $e) {
            echo '{"error": {"text":' . $e->getMessage() . '}}';
        }
    }

    /**
     * Get the specific Move Data from the database based on ID
     * http://www.yourwebsite.com/api/movie/id
     * @param $id
     */
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

    /**
     * Get the specific Movie Comments from the database based on ID
     * http://www.yourwebsite.com/api/comments/id
     * @param $id
     */
    function getComments($id) {
        $sql = "SELECT users.name, users.img, comments.comment, comments.date FROM users, comments WHERE comments.user_id = users.user_id AND comments.movie_id = :id AND comments.approved = 1 ORDER BY comments.timestamp DESC";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->execute();
            $comments = $stmt->fetchAll(PDO::FETCH_OBJ);
            $db = null;
            echo '{"comments": ' . json_encode($comments) . '}';
        } catch (PDOException $e) {
            echo '{"error": {"text": ' . $e->getMessage() . '}}';
        }
    }

    /**
     * Get the Upcoming Movies Data from the database
     * http://www.yourwebsite.com/api/upcoming
     * Method: GET
     */
    function getUpcoming() {
        $sql = "SELECT * FROM upcoming";
        try {
            $db = getConnection();
            $stmt = $db->query($sql);
            $upcoming = $stmt->fetchAll(PDO::FETCH_OBJ);
            $db = null;
            echo '{"upcoming": ' . json_encode($upcoming) . '}';
        } catch (PDOException $e) {
            echo '{"error": {"text":' . $e->getMessage() . '}}';
        }
    }

    /**
     * Get the registered users from the database
     * http://www.yourwebsite.com/api/users
     * Method: GET
     */
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

    /**
     * Add the new registered user into the database
     * http://www.yourwebsite.com/api/user
     * Method: POST
     */
    function addUser() {
        $request = \Slim\Slim::getInstance()->request();
        $user = json_decode($request->getBody());
        $sql = "INSERT INTO users (user_id, name, username, password, email, notes, occupation, gender, birthday) VALUES (NULL, :name, :username, :password, :email, :notes, :occupation, :gender, :birthday)";
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

    /**
     * Update existing user in database
     * http://www.yourwebsite.com/api/user/id
     * Method: PUT
     * @param $id
     */
    function updateUser($id) {
        $request = \Slim\Slim::getInstance()->request();
        $user = json_decode($request->getBody());
        $sql = "UPDATE users SET name=:name, username=:username, password=:password, email=:email, notes=:notes, occupation=:occupation, gender=:gender, birthday=:birthday WHERE user_id=:id";
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

    /**
     * Delete existing user in database
     * http://www.yourwebsite.com/api/user/id
     * Method: DELETE
     * @param $id
     */
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

    /**
     * Add the new comment into the database
     * http://www.yourwebsite.com/api/comment
     * Method: POST
     */
    function addComment() {
        $request = \Slim\Slim::getInstance()->request();
        $comment = json_decode($request->getBody());

        // search the user_id based on logged username
        $user_sql = 'SELECT user_id FROM users WHERE username = :username';
        $user_db = getConnection();
        $user_stmt = $user_db->prepare($user_sql);
        $user_stmt->bindParam("username", $comment->user);
        $user_stmt->execute();
        $user_result = $user_stmt->fetchObject();
        $user_db = null;
        $user_id = $user_result->user_id;
        
        // define time related variables
        $timestamp = time();
        $date = date("F d, Y \a\\t H:i", $timestamp);

        $sql = 'INSERT INTO comments (comment_id, comment, movie_id, user_id, date, timestamp, approved) VALUES (NULL, :comment, :movie_id, "'.$user_id.'", "'.$date.'", "'.$timestamp.'", 0)';
        try {

            // checks if the session is active and if the user's data match with session variables
            if ( isset($_SESSION['username']) && isset($_SESSION['uid']) && ($_SESSION['username'] === $comment->user) ) {
                
                $db = getConnection();
                $stmt = $db->prepare($sql);
                $stmt->bindParam("comment", $comment->comment);
                $stmt->bindParam("movie_id", $comment->movie_id);
                $stmt->execute();
                $comment->id = $db->lastInsertId();
                $db = null;
                echo json_encode($comment);

            } else {
                echo '{"error": {"text": "Bad authentification!"}}';
            }

        } catch (PDOException $e) {
            echo '{"error":{"text":' . $e->getMessage() . '}}';
        }
    }

    /**
     * Checks if username is available
     * http://www.yourwebsite.com/api/checkusername
     * Method: POST
     */
    function checkUsername() {
        $request = \Slim\Slim::getInstance()->request();
        $user = json_decode($request->getBody());
        $sql = "SELECT * FROM users WHERE (username = :username)";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("username", $user->username);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $db = null;
            if(!$row) {
                echo '{"username": "available"}';
            } else {
                echo '{"username": "unavailable"}';
            }
        } catch (PDOException $e) {
            echo '{"error":{"text":' . $e->getMessage() . '}}';
        }
    }

    /**
     * Checks if email is available
     * http://www.yourwebsite.com/api/checkemail
     * Method: POST
     */
    function checkEmail() {
        $request = \Slim\Slim::getInstance()->request();
        $email = json_decode($request->getBody());
        $sql = "SELECT * FROM users WHERE email = :email";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam('email', $email->email);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $db = null;
            if (!$row) {
                echo '{"email": "available"}';
            } else {
                echo '{"email": "unavailable"}';
            }
        } catch (PDOException $e) {
            echo '{"error":{"text":' . $e->getMessage() . '}}';
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