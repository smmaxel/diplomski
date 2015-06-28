<?php

	session_start();
	//if( isset($_SESSION['uid']) ) print 'authentified';

	//echo 'authentified2';
	echo 'session usrname:' . $_SESSION['username'] . ', and session uid:' . $_SESSION['uid'];
