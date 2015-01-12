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