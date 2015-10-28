<?php

	session_start();
	if( isset($_SESSION['username']) && isset($_SESSION['uid']) ) {
		echo '{"isLogged": "true", "username": ' . json_encode($_SESSION['username']) . ', "uid": ' . json_encode($_SESSION['uid']) . '}';
	} else {
		echo '{"isLogged": "false", "username": "NA", "uid": "NA"}';
	}
