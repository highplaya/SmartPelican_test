<?php
	require_once('./test.php');

	$q = 'select UNIX_TIMESTAMP(hired) as hired, departmentId, id, name from employees';

	$response = mysqli_query($dbc, $q);

	$rows = array();

	if($response) {
		while($r = mysqli_fetch_assoc($response)) {
			$rows[] = $r;
		}
		print json_encode($rows);
	} else {
		echo "Coludn't issue database query";

		echo mysqli_error($dbc);
	}

	mysqli_close($dbc);
?>