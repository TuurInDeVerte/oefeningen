<?php
require_once("entities/product.php");
include("DBConfig.php");

class ProductDAO {
	public static function getAlleProducten(){
		$lijst = array();
		$sql = "select productId, type, naam, afbeelding, beschrijving, eenheidsprijsStandaard, eenheidsprijsKorting, inPromotie from producten order by productId";
		$dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USERNAME, DBConfig::$DB_PASSWORD);
		// $dbh = new PDO("mysql:host=$DB_HOST;dbname=$DB_DBNAME", $DB_USERNAME, $DB_PASSWORD);
		$resultSet = $dbh->query($sql);
		foreach ($resultSet as $rij) {
			$product = new Product($rij["productId"], $rij["type"], $rij["naam"], $rij["afbeelding"], $rij["beschrijving"], $rij["eenheidsprijsStandaard"], $rij["eenheidsprijsKorting"], $rij["inPromotie"]);
			array_push($lijst, $product);
		}
		$dbh = null;
		return $lijst;
	}

	public static function getProductById($id){
		$sql = "select productId, type, naam, afbeelding, beschrijving, eenheidsprijsStandaard, eenheidsprijsKorting, inPromotie from producten where productId = " . $id;
		$dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USERNAME, DBConfig::$DB_PASSWORD);
		$resultSet = $dbh->query($sql);
		$rij = $resultSet->fetch();
		$product = new Product($rij["productId"], $rij["type"], $rij["naam"], $rij["afbeelding"], $rij["beschrijving"], $rij["eenheidsprijsStandaard"], $rij["eenheidsprijsKorting"], $rij["inPromotie"]);
		$dbh = null;
		return $product;
	}
}