		<?php
		// van productenlijst.php
		?>
		<h1>Productenlijst</h1>
		<ul>
			<?php
			foreach ($producten as $product) {
			?>
				<li>
					<div>
						<img src=" <?php print($product->getAfbeelding()); ?>">
					</div>
					<?php
					print($product->getNaam() . ", " . $product->getBeschrijving());
					?>

				</li>
			<?php
			}
			?>
		</ul>





	$(".toonTopping").click(function(){
		$(".toppingContainer").toggle("blind");
	});




			// maak "toevoegen aan mandje" form
		var eForm = document.createElement("form");														// maak een form
		var eLabel = document.createTextNode("Aantal: ");												// maak tekst "aantal"
		eForm.appendChild(eLabel);																		// zet tekst 'aantal' in form
		var eInput = document.createElement("input");													// maak een input field
		eInput.type = "text";																			// set input type (number)
		eInput.setAttribute("size", "1");																// set input size
		eForm.appendChild(eInput);																		// zet inputveld in form
		var eButton = document.createElement("button");													// maak een button
		var tButton = document.createTextNode("Toevoegen aan mandje");									// maak tekst (voor button)
		eButton.appendChild(tButton);																	// zet tekst in button
		eForm.appendChild(eButton);																		// zet button in form
		eProductContainer.appendChild(eForm);															// zet form in productcontainer
		var eBr = document.createElement("br");
		eProductContainer.appendChild(eBr);