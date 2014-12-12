<?php
require_once("entities/product.php");
require_once("DBConfig.php");

class ProductDAO {
	public static function getAlleProducten(){
		$lijst = array();
		$sql = "select productID, type, naam, afbeelding, beschrijving, eenheidsprijsStandaard, eenheidsprijsKorting, inPromotie from producten order by eenheidsprijsStandaard DESC, naam ASC";
		$dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USERNAME, DBConfig::$DB_PASSWORD);
		$resultSet = $dbh->query($sql);
		foreach ($resultSet as $rij) {
			$product = new Product($rij["productID"], $rij["type"], $rij["naam"], $rij["afbeelding"], $rij["beschrijving"], $rij["eenheidsprijsStandaard"], $rij["eenheidsprijsKorting"], $rij["inPromotie"]);
			array_push($lijst, $product);
		}
		$dbh = null;
		return $lijst;
	}
}