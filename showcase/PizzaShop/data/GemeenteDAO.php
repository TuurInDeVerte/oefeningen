<?php

require_once("entities/Gemeente.php");
require_once("DBConfig.php");

class GemeenteDAO {

	public static function getAll(){
		$lijst = array();
		$sql =
		"select postId, postcode, gemeente, leveringMogelijk, leveringPrijs from gemeenten";
		$dbh = $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USERNAME, DBConfig::$DB_PASSWORD);
		$resultSet = $dbh->query($sql);
		foreach ($resultSet as $rij) {
			$gemeente = Gemeente::create(
				$rij["postId"],
				$rij["postcode"],
				$rij["gemeente"],
				$rij["leveringMogelijk"],
				$rij["leveringPrijs"]);
			array_push($lijst, $gemeente);
		}
		$dbh = null;
		return $lijst;
	}

	public static function getById($id){
		$sql = "select postId, postcode, gemeente, leveringMogelijk, leveringPrijs from gemeenten where postId = " . $id;
		$dbh = $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USERNAME, DBConfig::$DB_PASSWORD);
		$resultSet = $dbh->query($sql);
		$rij = $resultSet->fetch();
		$gemeente = Gemeente::create(
				$rij["postId"],
				$rij["postcode"],
				$rij["gemeente"],
				$rij["leveringMogelijk"],
				$rij["leveringPrijs"]);
		$dbh = null;
		return $gemeente;
	}
}