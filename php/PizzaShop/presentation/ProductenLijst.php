<!DOCTYPE HTML>
<html>
	<head>
		<meta charset='utf-8'>
		<title>Productenlijst</title>
		<link rel ="stylesheet" href="presentation/js/jquery-ui-1.11.2/jquery-ui.min.css">
		<!-- <link rel="stylesheet" type="text/css" href="presentation/css/normalize.css"> -->
 		<link rel="stylesheet" type="text/css" href="presentation/css/toonalleproducten.css">
		<link rel="stylesheet" type="text/css" href="presentation/lightbox/css/lightbox.css">
		<script type="text/javascript" id="test">
		<?php
			$producten_js = json_encode($producten, JSON_FORCE_OBJECT);
			echo "var producten = " . $producten_js . ";";
		?>
		</script>

		<script src="presentation/js/jquery-2.1.1.js"></script>
		<script src="presentation/js/jquery-ui-1.11.2/jquery-ui.min.js"></script>
		<script src="presentation/lightbox/js/lightbox.min.js"></script>
		<script src="presentation/js/jquery.lightbox_me.js"></script>
		<script src="presentation/js/toonalleproducten.js"></script>

	</head>
	<body>
		<div class="content" id="filterBoxContainer">
			<div id="filterBox" class="zetInBox cf">
				<h1 class="zetLinks" id="menuTitel">Menu</h1>
				<form class="zetInBox boxInBox" id="filter">
					<h3>Filter producten</h3>
					<input class="productFilter" type="radio" name="filter" value="alle" checked>Alle Producten<br>
					<input class="productFilter" type="radio" name="filter" value="pizza">Pizza<br>
					<input class="productFilter" type="radio" name="filter" value="drank">Dranken<br>
				</form>
			</div>
			<div class="zetInBox sidebarRight" id="winkelmandje" style="display: none;">
				<h3>Winkelmandje</h3>
				<div class="onTheSide">
					<div id="pizzaMandje" data-aantalPizza="0"><div id="aantalPizza"></div><img src="presentation/images/Pizza.png"></div><br>
					<div id="drankMandje" data-aantalDrank="0"><div id="aantalDrank"></div><img src="presentation/images/soda.png"></div>
				</div>
				<button id="naarDeKassa">Naar de kassa</button>
			</div>
			<div class="zetInBox" id="ticketMandje">
				<!-- <h2>Details Winkelmandje</h2> -->
			</div>
		</div>
		<section id="productenlijst" class="content">
		</section>
	</body>
</html>

