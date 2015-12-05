<?php
	define ('db_user', 'root');
	define('db_password', '1111');
	define('db_host', 'localhost');
	define('db_name', 'test');

	//phpinfo();
	$dbc = mysqli_connect(db_host, db_user, db_password, db_name)
	or die('Could not connect to MySQL' . mysqli_connect_error());
?>