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
		<!-- <form id="nieuweGebruikerForm" method="post" action="VoegGebruikerToe.php?action=process novalidate="novalidate""> -->
		<form id="nieuweGebruikerForm" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]) . "?action=process" ;?>">
			<table>
<!-- gebruikersnaam -->
				<tr>
					<td>
						<label for="txtGebruikersnaam">Gebruikersnaam:</label>
					</td>
					<td>
						<input type="text" name="txtGebruikersnaam">
						<span class="error"><?php if($_GET){if($_GET["action"] == "process"){echo $gebruikernaamErrorMsg;}} ?></span>
					</td>
				</tr>
<!-- wachtwoord -->
				<tr>
					<td>
						<label for="txtWachtwoord">Wachtwoord:</label>
					</td>
					<td>
						<input id="wachtwoord" type="password" name="txtWachtwoord">
						<span class="error"><?php if($_GET){if($_GET["action"] == "process"){echo $wachtwoordErrorMsg;}} ?></span>
					</td>
				</tr>
<!-- herhaal wachtwoord -->
				<tr>
					<td>
						<label for="txtHerhaalWachtwoord">Herhaal wachtwoord:</label>
					</td>
					<td>
						<input id="herhaalWachtwoord" type="password" name="txtHerhaalWachtwoord">
						<span class="error"><?php if($_GET){if($_GET["action"] == "process"){echo $herhaalWachtwoordErrorMsg;}} ?></span>
					</td>
				</tr>
<!-- emailadres -->
				<tr>
					<td>
						<label for="txtEmailadres">Emailadres:</label>
					</td>
					<td>
						<input type="email" name="txtEmailadres">
						<span class="error"><?php if($_GET){if($_GET["action"] == "process"){echo $emailadresErrorMsg;}} ?></span>
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
						<span class="error"><?php if($_GET){if($_GET["action"] == "process"){echo $telefoonnummerErrorMsg;}} ?></span>
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
						<span class="error"><?php if($_GET){if($_GET["action"] == "process"){echo $gemeenteErrorMsg;}} ?></span>
					</td>
				</tr>
<!-- adres -->
				<tr id="adresVeld">
					<td>
						<label for="txtAdres">Straat en huisnummer:</label>
					</td>
					<td>
						<input type="text" name="txtAdres">
						<span class="error"><?php if($_GET){if($_GET["action"] == "process"){echo $adresErrorMsg;}} ?></span>
					</td>
				</tr>
<!-- verzendknop -->
				<tr>
					<td></td>
					<td>
						<input type="submit" value="Gebruiker maken" name="submit">
					</td>
				</tr>
			</table>
	</body>
</html>