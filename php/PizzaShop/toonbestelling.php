<?php

session_start();

require_once("business/ProductService.php");

if(!isset($_COOKIE["Winkelmandje"])){
	print('geen cookie');
}
else {
	$teBestellenProducten = array();
	$winkelmandje = $_COOKIE["Winkelmandje"];
	$winkelmandje = json_decode($winkelmandje);
	$aantalProductenInMandje = count($winkelmandje);
	for($i=0; $i < $aantalProductenInMandje; $i++){
		$product = ProductService::getProductById($winkelmandje[$i]->databaseProductId);
		$product->aantal = $winkelmandje[$i]->aantal;
		if($product->getInPromotie() == '1'){
			$product->prijs = $product->getEenheidsprijsKorting();
		}
		if($product->getInPromotie() == '0'){
			$product->prijs = $product->getEenheidsprijsStandaard();
		}
		$product->lijstToppingIds = $winkelmandje[$i]->lijstToppingDBids;
		array_push($teBestellenProducten, $product);
	}
	//var_dump($teBestellenProducten);
}
$_SESSION["winkelmandje"] = $winkelmandje;
include("presentation/Bestelling.php");