<?php
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
		$product->lijstToppingIds = $winkelmandje[$i]->lijstToppingIds;
		array_push($teBestellenProducten, $product);
	}
	//var_dump($teBestellenProducten);
}
include("presentation/Bestelling.php");