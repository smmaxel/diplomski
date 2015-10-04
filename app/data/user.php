<?php

	require("db_config.php");

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$username = $request->username;
	$password = $request->password;

	/*
	 * Checks if username and password are provided 
	 */
	if (empty($username) || empty($password)) {
		echo '{"error": {"text": "Invalid request" }}';
	} else {

		/*
		 * Check if there is already an active session 
		 */
		if (isset($_SESSION["username"]) || isset($_SESSION["uid"])) {
			echo '{"error": {"text": "Already logged in" }}';
		} else {
			$sql = "SELECT username, password FROM users WHERE username = '$username' && approved = '1'";
			$result = mysqli_query($connection, $sql) or die(mysqli_error($connection));

			if (mysqli_num_rows($result) > 0) {
				while ($record = mysqli_fetch_array($result, MYSQLI_BOTH)) {
					if ($record['password'] !== $password) {
						echo '{"error": {"text": "Username or Password invalid" }}';
					} else {
						session_start();
						$_SESSION['username'] = $username;
						$uid = uniqid();
						$_SESSION['uid'] = $uid;
						echo '{"user": ' . json_encode($username) .',"uid": ' . json_encode($uid) . '}';
					}
				}
				mysqli_free_result($result);
			} else {
				echo '{"error": {"text": "Username or Password invalid" }}';
			}	
		}
		mysqli_close($connection);
	}