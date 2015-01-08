<?php

require_once("data/GemeenteDAO.php");
class GemeenteService {
	public static function toonAlleGemeenten(){
		$lijst = GemeenteDAO::getAll();
		return $lijst;
	}
}