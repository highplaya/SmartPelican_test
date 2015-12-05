<?php

	$method = $_SERVER['REQUEST_METHOD'];

	if($method == 'POST') {


		if(isset($_POST['departmentId']) && isset($_POST['name'])) {

			require_once('./test.php');

			date_default_timezone_set('Europe/Kiev'); 
			$name = $_POST['name'];
			$depId = $_POST['departmentId'];
			$hired = date("Y-m-d H:i:s");



			$q = "insert into employees (name, departmentId, hired) " .
				"values ('$name', '$depId', '$hired');";

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