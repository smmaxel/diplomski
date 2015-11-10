<?php

    session_start();

    date_default_timezone_set('Etc/UTC');

    require 'PHPMailer/PHPMailerAutoload.php';
    require 'Slim/Slim.php';
    \Slim\Slim::registerAutoloader();

    $app = new \Slim\Slim();

    $app->get('/movies', 'getMovies');
    $app->get('/movie/:id', 'getMovie');
    $app->get('/comments/:id', 'getComments');
    $app->get('/upcoming', 'getUpcoming');
    $app->get('/users', 'getUsers');
    $app->get('/register/:id', 'registerUser');
    $app->post('/user', 'addUser');
    $app->put('/user', 'updateUser');
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
        $sql = "SELECT * FROM movies, rating WHERE movies.movie_id = rating.movie_id";
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
        $sql = "SELECT * FROM movies, rating WHERE movies.movie_id=:id AND movies.movie_id = rating.movie_id";
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
     * Verify and approve the registered users
     * http://www.yourwebsite.com/api/register/id
     * Method: GET
     */
    function registerUser($id) {
        $timestamp = time();
        $sql = "SELECT * FROM users WHERE registered_id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->execute();
            $user = $stmt->fetchObject();
            $db = null;

            if (!$user) {
                echo '{"text": "unregistered"}';
            } else {
                // Check the 24h period and approve the user
                if (($user->registered - $timestamp) <= 86400) {
                    $approve_sql = "UPDATE users SET approved='1' WHERE user_id=$user->user_id";
                    $approve_db = getConnection();
                    $approve_stmt = $approve_db->prepare($approve_sql);
                    $approve_stmt->execute();
                    $approve_db = null;
                    echo '{"text": "registered"}';
                } else {
                    echo '{"text": "expired"}';
                }    
            }
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
        $timestamp = time();
        $register_id = md5($timestamp);

        $user->password = md5($user->password);
        
        // logic for reCaptcha
        $captcha = $user->gRecaptcha;

        // Build post data to make request weith fetch_file_contents
        $postdata = http_build_query(
            array(
                'secret' => '6LdQSgwTAAAAADpDAA-y3b6CGJ6RdB8HaCOlS1cd',
                'response' => $captcha,
                'remoteip' => $_SERVER['REMOTE_ADDR']
            )
        );

        // Build options for the post request
        $opts = array('http' =>
            array(
                'method' => 'POST',
                'header' => 'Content-type: application/x-www-form-urlencoded',
                'content' => $postdata
            )
        );

        // Create a stream this is required to make post request with fetch_file_contents
        $context = stream_context_create($opts);

        /* Send request to Googles siteVerify API */
        $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify",false,$context);
        $response = json_decode($response, true);

        if ($response["success"] === false) { // if user verification failed
            echo '{"error":{"text": "Bad captcha"}}';
            exit();
        }

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
        $mail->addAddress($user->email);
        //Set the subject line
        $mail->Subject = 'Movie Review Verification';

        //Checks the env and crate dynamic email body
        $server = $_SERVER['HTTP_HOST'];
        if ($server === "localhost") {
            $server = "http://localhost/diplomski/#/registered/" . $register_id;
        } else {
            $server = "http://" . $server . "/#/registered/" . $register_id;
        }
        $content = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Movie Review Verification</title><style>body { margin: 0; }.navbar-brand { float: left; font-family:sans-serif; color: #9d9d9d; height: 50px; padding: 15px 15px; font-size: 18px; line-height: 20px; text-decoration: none; } .navbar-brand:hover, .navbar-brand:focus { color: #e5e5e5; text-decoration: none; } .btn { display: inline-block; padding: 6px 12px; margin-bottom: 0; font-size: 14px; font-weight: normal; line-height: 1.42857143; text-align: center; white-space: nowrap; vertical-align: middle; -ms-touch-action: manipulation; touch-action: manipulation; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-image: none; border: 1px solid transparent; border-radius: 4px; } .btn:focus, .btn:active:focus, .btn.active:focus, .btn.focus, .btn:active.focus, .btn.active.focus { outline: thin dotted; outline: 5px auto -webkit-focus-ring-color; outline-offset: -2px; } .btn:hover, .btn:focus, .btn.focus { color: #333; text-decoration: none; } .btn:active, .btn.active { background-image: none; outline: 0; -webkit-box-shadow: inset 0 3px 5px rgba(0, 0,* 0, .125); box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125); } .btn-success { color: #fff; background-color: #5cb85c; border-color: #4cae4c; } .btn-success:hover, .btn-success:focus, .btn-success.focus, .btn-success:active, .btn-success.active, .open > .dropdown-toggle.btn-success { color: #fff; background-color: #449d44; border-color: #398439; }</style></head><body><div style="width: 100%; height: 50px; background-color: #222"><a class="navbar-brand" href="#/home">Movie Review</a></div><h3 style="color:#212121;font-family:sans-serif;font-size:30px;font-weight:100;padding-bottom:10px;margin-left:10px;">Please verify your email address</h3><p style="color:#484848;font-family:sans-serif;font-size:14px;font-weight:100;margin-left:10px;">Your username is: <b>' . $user->username . '</b></p><p style="color:#484848;font-family:sans-serif;font-size:18px;line-height:26px;font-weight:100;margin-left:10px;">Click the button below to confirm this email address:</p><a href="' . $server . '"<button type="button" class="btn btn-success" style="margin-left:10px;">Verify now</button></a></body></html>';
        $mail->msgHTML($content);
        //send the message
        $mail->send();
        
        $sql = 'INSERT INTO users (user_id, name, username, password, email, gender, birthday, registered, registered_id, approved, img) VALUES (NULL, :name, :username, :password, :email, :gender, :birthday, "'.$timestamp.'", "'.$register_id.'", "0", :img)';
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("name", $user->name);
            $stmt->bindParam("username", $user->username);
            $stmt->bindParam("password", $user->password);
            $stmt->bindParam("email", $user->email);
            $stmt->bindParam("gender", $user->gender);
            $stmt->bindParam("birthday", $user->birthday);
            $stmt->bindParam("img", $user->img);
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
     * http://www.yourwebsite.com/api/user
     * Method: PUT
     */
    function updateUser() {
        $request = \Slim\Slim::getInstance()->request();
        $user = json_decode($request->getBody());

        $sqlSET = "";

        if (isset($user->password)) {
            $user->password = md5($user->password);
            $sqlSET = $sqlSET . ", password=:password";
        }

        if (isset($user->email)) {
            $sqlSET = $sqlSET . ", email=:email";
        }

        if (isset($user->img)) {
            $sqlSET = $sqlSET . ", img=:img";
        }

        if ($sqlSET === '') {
            '{"text": "empty"}';
            exit();
        }

        $sqlSET = substr($sqlSET, 2);

        // TODO: missing logic for image upload
        $sql = 'UPDATE users SET ' . $sqlSET . ' WHERE username="' . $_SESSION['username'] . '"';
        try {
            if ( isset($_SESSION['username']) && isset($_SESSION['uid']) ) {
                $db = getConnection();
                $stmt = $db->prepare($sql);
                if (isset($user->password)) {
                    $stmt->bindParam("password", $user->password);    
                }
                if (isset($user->email)) {
                    $stmt->bindParam("email", $user->email);    
                }
                if (isset($user->img)) {
                    $stmt->bindParam("img", $user->img);    
                }
                $stmt->execute();
                $db = null;

                echo '{"text": "success"}';
            } else {
                echo '{"text": "error"}';
            }
        } catch (PDOException $e) {
            echo '{"error": {"text":' . $e->getMessage() . '}}';
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