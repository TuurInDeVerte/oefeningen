<!DOCTYPE HTML>
<html>
	<head>
		<meta charset='utf-8'>
		<title>Bestelling</title>
<!--
		<link rel ="stylesheet" href="presentation/js/jquery-ui-1.11.2/jquery-ui.min.css">
-->
		<script src="presentation/js/bestelling.js"></script>



<script> 

var winkelmandje = localStorage.getItem("winkelmandje");
winkelmandje = JSON.parse(winkelmandje);
winkelmandje = JSON.stringify(winkelmandje);
</script>



	</head>
	<body>
		<h1>Winkelmandje</h1>

		<?php
		$winkelmandje = json_decode($winkelmandje);
		var_dump($winkelmandje);
		?>

	</body>
</html>