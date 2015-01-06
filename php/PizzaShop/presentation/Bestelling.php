<!DOCTYPE HTML>
<html>
	<head>
		<meta charset='utf-8'>
		<title>Bestelling</title>
<!--
		<link rel ="stylesheet" href="presentation/js/jquery-ui-1.11.2/jquery-ui.min.css">
-->
		<link rel="stylesheet" href="presentation/css/toonbestelling.css">
		<script src="presentation/js/bestelling.js"></script>


	</head>
	<body>
		<h1>Uw bestelling</h1>
		<table>
			<tr>
				<th>Naam</th>
				<th>Type</th>
				<th>Extra toppings</th>
				<th>Aantal</th>
			</tr>
			<?php
			foreach ($teBestellenProducten as $product) {
				?>
				<tr>
					<!-- kolom met naam -->
					<td><?php print($product->getNaam());?></td>

					<!-- kolom met type -->
					<td><img src="
					<?php
					$type = $product->getType();
					if($type == 'pizza'){
						print("presentation/images/Pizza.png");
					}
					if($type == 'drank'){
						print("presentation/images/soda.png");
					}
					?>">
					</td>

					<!-- kolom met lijst toppings -->
					<td><?php print($product->lijstToppingIds);?></td>

					<!-- kolom met aantal -->
					<td><?php print($product->aantal);?></td>

				</tr>
			<?php
			}
			?>
		</table>


	</body>
</html>