<?php
require_once("data/ProductDAO.php");

class ProductService{

	public static function getAlleProducten(){
		$producten = ProductDAO::getAlleProducten();
		return $producten;
	}

	public static function getProductById($id){
		$product = ProductDAO::getProductById($id);
		return $product;
	}

}


