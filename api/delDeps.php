<?php

	$method = $_SERVER['REQUEST_METHOD'];

	if($method == 'POST') {


		if(isset($_POST['IDs'])) {

			require_once('./test.php');

			$ids = $_POST['IDs'];

			$items = implode(",", $ids);    
			$q = "delete from department where id in ($items)";
			echo $q;

			$response = mysqli_query($dbc, $q);

			if($response == true) {
				print $response;
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