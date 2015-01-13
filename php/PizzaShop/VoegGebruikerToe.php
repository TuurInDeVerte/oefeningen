<?php
require_once("business/GemeenteService.php");
require_once("business/GebruikerService.php");


if($_GET){
	if($_GET["action"] == "process"){
		GebruikerService::voegNieuweGebruikerToe(
			$_POST["txtGebruikersnaam"],
			$_POST["txtWachtwoord"],
			$_POST["txtEmailadres"],
			2,
			$_POST["txtFamilienaam"],
			$_POST["txtVoornaam"],
			$_POST["numberTelefoonnummer"],
			$_POST["txtAdres"],
			$_POST["selGemeente"],
			1);

		header("location: toonbestelling.php");
		exit(0);
	}
}
else {
	$gemeenteLijst = GemeenteService::toonAlleGemeenten();
	include("presentation/NieuweGebruikerForm.php");
}

function NieuweGebruikerFormCheck(){
		function test_input($data){
			$data = trim($data);
			$data = stripslashes($data);
			$data = htmlspecialchars($data);
			return $data;
		}

		$gebruikersnaam = $wachtwoord = $herhaalWachtwoord = $emailadres = $telefoonnummer = $checkLevering = $gemeente = $adres = "";
		$gebruikersnaamErrorMsg = $wachtwoordErrorMsg = $herhaalWachtwoordErrorMsg = $emailadresErrorMsg = $telefoonnummerErrorMsg =
		$checkLeveringErrorMsg = $gemeenteErrorMsg = $adresErrorMsg = "";


		if($_SERVER["REQUEST_METHOD"] == "POST"){
// gebruikersnaam
			if(empty($_POST["txtGebruikersnaam"])){
				$gebruikersnaamErrorMsg = "Gelieve een gebruikersnaam in te voeren";
			}
			else{
				$gebruikersnaam = test_input($_POST["txtGebruikersnaam"]);
			}
// Wachtwoord
			if(empty($_POST["txtWachtwoord"])){
				$wachtwoordErrorMsg = "Gelieve een wachtwoord in te voeren";
			}
			else {
				$wachtwoord = test_input($_POST["txtWachtwoord"]);
			}
// herhaal wachtwoord
			if(($_POST["txtHerhaalWachtwoord"]) != ($_POST["txtWachtwoord"])){
				$herhaalWachtwoordErrorMsg = "De ingegeven waarde is niet identiek aan het gekozen wachtwoord";
			}
			else {
				$herhaalWachtwoord = test_input($_POST["txtHerhaalWachtwoord"]);
			}
// emailadres
			if(empty($_POST["txtEmailadres"])){
				$emailadresErrorMsg = "Gelieve uw emailadres in te voeren";
			}
			else {
				$emailadres = test_input($_POST["txtEmailadres"]);
				// is $emailadres een emailadres?
				if(!filter_var($emailadres, FILTER_VALIDATE_EMAIL)){
					$emailadresErrorMsg = " Ongeldig emailadres";
				}
			}
// telefoonnummer
			if(empty($_POST["numberTelefoonnummer"])){
				$telefoonnummerErrorMsg = "Gelieve uw telefoonnummer in te voeren";
			}
			else {
				$telefoonnummer = test_input($_POST["numberTelefoonnummer"]);
			}
// chechlevering
			if(empty($_POST["checkLevering"])){
				$checkLeveringErrorMsg = "Gelieve aan te vinken voor thuislevering";
			}
			else {
				$checkLevering = test_input($_POST["checkLevering"]);
			}
// gemeente
			if(empty($_POST["selGemeente"])){
				$gemeenteErrorMsg = "Kies uw gemeente";
			}
			else {
				$gemeente = test_input($_POST["selGemeente"]);
			}
// adres
			if(empty($_POST["txtAdres"])){
				$adresErrorMsg = "Om uw pizza's thuis te kunnen leveren hebben we uw adres nodig...";
			}
			else {
				$adres = test_input($_POST["txtAdres"]);
			}
		}
	} // end function NieuweGebruikerFormCheck