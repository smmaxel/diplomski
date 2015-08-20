<?php

    require 'Slim/Slim.php';
    \Slim\Slim::registerAutoloader();

    $app = new \Slim\Slim();

    $app->get('/movies', 'getMovies');
    $app->get('/movie/:id', 'getMovie');
    $app->get('/upcoming', 'getUpcoming');
    $app->get('/users', 'getUsers');
    $app->post('/user', 'addUser');
    $app->put('/user/:id', 'updateUser');
    $app->delete('/user/:id', 'deleteUser');
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
        $sql = "SELECT * FROM movies WHERE id=:id";
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


    /**
     * Update existing user in database
     * http://www.yourwebsite.com/api/user/id
     * Method: PUT
     * @param $id
     */
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


    /**
     * Delete existing user in database
     * http://www.yourwebsite.com/api/user/id
     * Method: DELETE
     * @param $id
     */
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