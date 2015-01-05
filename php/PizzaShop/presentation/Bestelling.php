<!DOCTYPE HTML>
<html>
	<head>
		<meta charset='utf-8'>
		<title>Bestelling</title>
<!--
		<link rel ="stylesheet" href="presentation/js/jquery-ui-1.11.2/jquery-ui.min.css">
-->
		<script src="presentation/js/bestelling.js"></script>


	</head>
	<body>
		<h1>Winkelmandje</h1>

		<?php
		if(!isset($_COOKIE["Winkelmandje"])){
			print('geen cookie');
		}
		else {
			$winkelmandje = $_COOKIE["Winkelmandje"];
			var_dump(json_decode($winkelmandje));
		}
		?>

	</body>
</html>