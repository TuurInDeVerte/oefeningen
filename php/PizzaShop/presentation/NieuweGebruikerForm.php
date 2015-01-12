<!DOCTYPE HTML>
<html>
	<head>
		<meta charset='utf-8'>
		<title>Nieuwe gebruiker</title>
<!--
		<link rel ="stylesheet" href="presentation/js/jquery-ui-1.11.2/jquery-ui.min.css">
		<link rel="stylesheet" href="presentation/css/toonbestelling.css">
		<script src="presentation/js/bestelling.js"></script>
-->
	<script src="presentation/js/jquery-2.1.1.js"></script>
	<script src="presentation/js/jquery-validation/dist/jquery.validate.js"></script>
	<script src="presentation/js/bestelling.js"></script>

	</head>
	<body>
		<h1>Registreer nieuwe gebruiker</h1>
		<form id="nieuweGebruikerForm" method="post" action="VoegGebruikerToe.php?action=process" novalidate="novalidate">
			<table>
<!-- gebruikersnaam -->
				<tr>
					<td>
						<label for="txtGebruikersnaam">Gebruikersnaam:</label>
					</td>
					<td>
						<input type="text" name="txtGebruikersnaam">
					</td>
				</tr>
<!-- wachtwoord -->
				<tr>
					<td>
						<label for="txtWachtwoord">Wachtwoord:</label>
					</td>
					<td>
						<input id="wachtwoord" type="password" name="txtWachtwoord">
					</td>
				</tr>
<!-- herhaal wachtwoord -->
				<tr>
					<td>
						<label for="txtHerhaalWachtwoord">Herhaal wachtwoord:</label>
					</td>
					<td>
						<input id="herhaalWachtwoord" type="password" name="txtHerhaalWachtwoord">
					</td>
				</tr>
<!-- emailadres -->
				<tr>
					<td>
						<label for="txtEmailadres">Emailadres:</label>
					</td>
					<td>
						<input type="email" name="txtEmailadres">
					</td>
				</tr>
<!-- familienaam -->
				<tr>
					<td>
						<label for="txtFamilienaam">Familienaam:</label>
					</td>
					<td>
						<input type="text" name="txtFamilienaam">
					</td>
				</tr>
<!-- voornaam -->
				<tr>
					<td>
						<label for="txtVoornaam">Voornaam:</label>
					</td>
					<td>
						<input type="text" name="txtVoornaam">
					</td>
				</tr>
<!-- telefoonnummer -->
				<tr>
					<td>
						<label for="numberTelefoonnummer">Telefoonnummer:</label>
					</td>
					<td>
						<input type="number" name="numberTelefoonnummer">
					</td>
				</tr>
<!-- LEVERING -->
				<tr>
					<td>
						<label for="levering">Vink aan voor thuislevering</label>
					</td>
					<td>
						<input id="checkLevering" type="checkbox" name="checkLevering">
					</td>
				</tr>
<!-- postid -->
				<tr id="gemeenteVeld">
					<td>
						<label for="selGemeente">Gemeente:</label>
					</td>
					<td>
						<select name="selGemeente"><option value="notGood">Selecteer uw gemeente...</option>
							<?php
							foreach ($gemeenteLijst as $gemeente) {
								?>
								<option value="<?php print($gemeente->getPostId());?>">
								<?php print($gemeente->getGemeente() . " (" . $gemeente->getPostcode() . ")");?></option>
							<?php
							}
							?>
						</select>
					</td>
				</tr>
<!-- adres -->
				<tr id="adresVeld">
					<td>
						<label for="txtAdres">Straat en huisnummer:</label>
					</td>
					<td>
						<input type="text" name="txtAdres">
					</td>
				</tr>
<!-- verzendknop -->
				<tr>
					<td></td>
					<td>
						<input type="submit" value="Gebruiker maken">
					</td>
				</tr>
			</table>
	</body>
</html>