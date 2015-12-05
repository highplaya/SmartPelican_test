<?php

	$method = $_SERVER['REQUEST_METHOD'];

	if($method == 'POST') {


		if(isset($_POST['name'])) {

			require_once('./test.php');

			date_default_timezone_set('Europe/Kiev'); 
			$name = $_POST['name'];

			$q = "insert into department (name) " .
				"values ('$name')";

			$response = mysqli_query($dbc, $q);
			$id = mysqli_insert_id($dbc);

			if($response == true) {
				print $id;
			} else {
				echo "Coludn't issue database query";

				echo mysqli_error($dbc);
			}

			mysqli_close($dbc);
		}



	}
	else {
		print "";
	}


?>