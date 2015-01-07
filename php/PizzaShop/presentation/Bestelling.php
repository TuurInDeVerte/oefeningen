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
	<section class="content">
		<h1>Uw bestelling</h1>
		<table>
			<tr class="zetInBox">
				<th>Naam</th>
				<th>Type</th>
				<th>Extra toppings</th>
				<th>Aantal</th>
				<th>Stukprijs</th>
				<th>Subtotaal</th>
			</tr>
			<?php
			$totaalprijsBestelling = 0;
			foreach ($teBestellenProducten as $product) {
				?>
				<tr class="zetInBox">
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
					<td>
					<?php
					$toppingLijst = $product->lijstToppingIds;
					if($toppingLijst == "geen"){
						if($type == "pizza"){
							print("Geen extra toppings");
						}
						if($type == "drank"){
							print("nvt");
						}
					}
					else{
						foreach ($toppingLijst as $topping) {
							$topping = ProductDAO::getProductById($topping);
							print(($topping->getNaam()) . "<br>");
							if($topping->getInPromotie() == "0"){
								$product->prijs = $product->prijs + $topping->getEenheidsprijsStandaard();
							}
							if($topping->getInPromotie() == "1"){
								$product->prijs = $product->prijs + $topping->getEenheidsprijsKorting();
							}
						}
					}

					?>
					</td>

					<!-- kolom met aantal -->
					<td><?php print($product->aantal);?></td>

					<!-- kolom met stukprijs -->
					<td>
					<?php
					$stukprijs = floatval($product->prijs);
					$stukprijs = number_format($stukprijs, 2, ",", ".");
					print("€ " . $stukprijs);
					?>
					</td>

					<!-- kolom met stubtotaal -->

					<td>
					<?php
					$subtotaal = $product->prijs * $product->aantal;
					$subtotaal = floatval($subtotaal);
					$totaalprijsBestelling = $totaalprijsBestelling + $subtotaal;
					$subtotaal = number_format($subtotaal, 2, ",", ".");
					print("€ " . $subtotaal);
					?>
					</td>

				</tr>

			<?php
			}
			?>
				<tr>
					<td colspan="5">Totaalprijs:</td>
					<td>
						<?php
						$totaalprijsBestelling = number_format($totaalprijsBestelling, 2, ",", ".");
						print("€ " . $totaalprijsBestelling);
						?>
					</td>
				</tr>
		</table>
		<br>
		<form class="zetLinks" action="toonalleproducten.php" method="post"><input type="submit" value="Terug naar de shop"></form>
		<form class="zetRechts" action="nogaantevullen.php" method="post"><input type="submit" value="Bevestigen"></form>
		<br>
	</section>
	</body>
</html>