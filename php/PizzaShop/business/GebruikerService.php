<?php

require_once("data/GebruikerDAO.php");

class GebruikerService{
	public static function toonAlleGebruikers(){
		$lijst = GebruikerDAO::getAll();
		return $lijst;
	}

	public static function voegNieuweGebruikerToe($gebruikerId, $gebruikersnaam, $wachtwoord, $emailadres, $type, $familienaam, $voornaam, $telefoonnummer, $adres, $postId, $status){
		GebruikerDAO::create(
			$gebruikerId,
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