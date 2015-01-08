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
	</head>
	<body>
		<h1>Registreer nieuwe gebruiker</h1>
		<form method="post" action="VoegGebruikerToe.php?action=process">
			<table>
<!-- gebruikersnaam -->
				<tr>
					<td>Gebruikersnaam:</td>
					<td>
						<input type="text" name="txtGebruikersnaam">
					</td>
				</tr>
<!-- wachtwoord -->
				<tr>
					<td>Wachtwoord:</td>
					<td>
						<input type="password" name="txtWachtwoord">
					</td>
				</tr>
<!-- herhaal wachtwoord -->
				<tr>
					<td>Herhaal wachtwoord:</td>
					<td>
						<input type="password" name="txtHerhaalWachtwoord">
					</td>
				</tr>
<!-- emailadres -->
				<tr>
					<td>Emailadres:</td>
					<td>
						<input type="email" name="txtEmailadres">
					</td>
				</tr>
<!-- familienaam -->
				<tr>
					<td>Familienaam:</td>
					<td>
						<input type="text" name="txtFamilienaam">
					</td>
				</tr>
<!-- voornaam -->
				<tr>
					<td>Voornaam:</td>
					<td>
						<input type="text" name="txtVoornaam">
					</td>
				</tr>
<!-- telefoonnummer -->
				<tr>
					<td>Telefoonnummer:</td>
					<td>
						<input type="number" name="numberTelefoonnummer">
					</td>
				</tr>
<!-- adres -->
				<tr>
					<td>Straat en huisnummer:</td>
					<td>
						<input type="text" name="txtAdres">
					</td>
				</tr>
<!-- postid -->
				<tr>
					<td>Gemeente:</td>
					<td>
						<select name="selGemeente">
							<?php
							foreach ($gemeenteLijst as $gemeente) {
								?>
								<option value="<?php print($gemeente->getPostId());?>">
								<?php print($gemeente->getGemeente());?></option>
							<?php
							}
							?>
						</select>
					</td>
				</tr>
<!-- status -->
<!-- type -->
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