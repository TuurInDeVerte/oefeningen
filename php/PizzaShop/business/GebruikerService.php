<?php

require_once("data/GebruikerDAO.php");

class GebruikerService{
	public static function toonAlleGebruikers(){
		$lijst = GebruikerDAO::getAll();
		return $lijst;
	}

	public static function voegNieuweGebruikerToe($gebruikersnaam, $wachtwoord, $emailadres, $type, $familienaam, $voornaam, $telefoonnummer, $adres, $postId, $status){
		GebruikerDAO::create(
			$gebruikersnaam,
			$wachtwoord,
			$emailadres,
			$type,
			$familienaam,
			$voornaam,
			$telefoonnummer,
			$adres,
			$postId,
			$status);
	}
}