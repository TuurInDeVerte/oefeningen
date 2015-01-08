<?php

require_once("entities/Gebruiker.php");
require_once("entities/Gemeente.php");
require_once("DBConfig.php");

class GebruikerDAO {

	public static function getAll(){
		$lijst = array();
		$sql =
		"select gebruikerId, gebruikersnaam, wachtwoord, emailadres, type, familienaam, voornaam, telefoonnummer, adres, gebruikers.postId, status, postcode, gemeente, leveringMogelijk, leveringPrijs
		from gebruikers, gemeenten
		where gebruikers.postId = gemeenten.postId";
		$dbh = $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USERNAME, DBConfig::$DB_PASSWORD);
		$resultSet = $dbh->query($sql);
		foreach ($resultSet as $rij) {
			$gemeente = Gemeente::create($rij["postId"], $rij["postcode"], $rij["gemeente"], $rij["leveringMogelijk"], $rij["leveringPrijs"]);
			$gebruiker = Gebruiker::create(
				$rij["gebruikerId"],
				$rij["gebruikersnaam"],
				$rij["wachtwoord"],
				$rij["emailadres"],
				$rij["type"],
				$rij["familienaam"],
				$rij["voornaam"],
				$rij["telefoonnummer"],
				$rij["adres"],
				$rij["postId"],
				$rij["status"],
				$gemeente);
			array_push($lijst, $gebruiker);
		}
		$dbh = null;
		return $lijst;
	}

	public static function getById($id){
		$sql =
		"select gebruikerId, gebruikersnaam, wachtwoord, emailadres, type, familienaam, voornaam, telefoonnummer, adres, gebruikers.postId, status, postcode, gemeente, leveringMogelijk, leveringPrijs
		from gebruikers, gemeenten
		where gebruikers.postId = gemeenten.postId and gebruikerId = " . $id;
		$dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USERNAME, DBConfig::$DB_PASSWORD);
		$resultSet = $dbh->query($sql);
		$rij = $resultSet->fetch();
		$gemeente = Gemeente::create($rij["postId"], $rij["postcode"], $rij["gemeente"], $rij["leveringMogelijk"], $rij["leveringPrijs"]);
		$gebruiker = Gebruiker::create(
			$rij["gebruikerId"],
			$rij["gebruikersnaam"],
			$rij["wachtwoord"],
			$rij["emailadres"],
			$rij["type"],
			$rij["familienaam"],
			$rij["voornaam"],
			$rij["telefoonnummer"],
			$rij["adres"],
			$rij["postId"],
			$rij["status"],
			$gemeente);
		$dbh = null;
		return $gebruiker;
	}

	public static function create($gebruikerId, $gebruikersnaam, $wachtwoord, $emailadres, $type, $familienaam, $voornaam, $telefoonnummer, $adres, $postId, $status){
		$sql =
		"insert into gebruikers (gebruikerId, gebruikersnaam, wachtwoord, emailadres, type, familienaam, voornaam, telefoonnummer, adres, postId, status)
		values ('" . $gebruikersnaam . "', " . $wachtwoord . "', " . $emailadres . "', " . $type . "', " . $familienaam . "', " . $voornaam . "', " . $telefoonnummer . "', " . $adres . "', " . $postId . "', " . $status . ")";
		$dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USERNAME, DBConfig::$DB_PASSWORD);
		$dbh->exec($sql);
		$gebruikerId = $dbh->lastInsertId();
		$dbh = null;
		$gemeente = GemeenteDAO::getById($postId);
		$gebruiker = Gebruiker::create($gebruikerId, $gebruikersnaam, $wachtwoord, $emailadres, $type, $familienaam, $voornaam, $telefoonnummer, $adres, $postId, $status);
		return $gebruiker;
	}
}