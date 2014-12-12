<?php
require_once("data/ProductDAO.php");

class ProductService{

	public static function getAlleProducten(){
		$producten = ProductDAO::getAlleProducten();
		return $producten;
	}

}


