<?php

class Product implements JsonSerializable {


	private $productId;
	private $type;
	private $naam;
	private $afbeelding;
	private $beschrijving;
	private $eenheidsprijsStandaard;
	private $eenheidsprijsKorting;
	private $inPromotie;


	public function __construct($productId, $type, $naam, $afbeelding, $beschrijving, $eenheidsprijsStandaard, $eenheidsprijsKorting, $inPromotie){
		$this->setProductId($productId);
		$this->setType($type);
		$this->setNaam($naam);
		$this->setAfbeelding($afbeelding);
		$this->setBeschrijving($beschrijving);
		$this->setEenheidsprijsStandaard($eenheidsprijsStandaard);
		$this->setEenheidsprijsKorting($eenheidsprijsKorting);
		$this->setInPromotie($inPromotie);
	}

	public function jsonSerialize(){
		return array(
			'productId'=>$this->productId,
			'type'=>$this->type,
			'naam'=>$this->naam,
			'afbeelding'=>$this->afbeelding,
			'beschrijving'=>$this->beschrijving,
			'eenheidsprijsStandaard'=>$this->eenheidsprijsStandaard,
			'eenheidsprijsKorting'=>$this->eenheidsprijsKorting,
			'inPromotie'=>$this->inPromotie
			);
	}


// SETTERS
	public function setProductId($productId){
		$this->productId = $productId;
	}

	public function setType($type){
		$this->type = $type;
	}

	public function setNaam($naam){
		$this->naam = $naam;
	}

	public function setAfbeelding($afbeelding){
		$this->afbeelding = $afbeelding;
	}

	public function setBeschrijving($beschrijving){
		$this->beschrijving = $beschrijving;
	}

	public function setEenheidsprijsStandaard($eenheidsprijsStandaard){
		$this->eenheidsprijsStandaard = $eenheidsprijsStandaard;
	}

	public function setEenheidsprijsKorting($eenheidsprijsKorting){
		$this->eenheidsprijsKorting = $eenheidsprijsKorting;
	}

	public function setInPromotie($inPromotie){
		$this->inPromotie = $inPromotie;
	}


// GETTERS
	public function getProductId(){
		return $this->productId;
	}

	public function getType(){
		return $this->type;
	}

	public function getNaam(){
		return $this->naam;
	}

	public function getAfbeelding(){
		return $this->afbeelding;
	}

	public function getBeschrijving(){
		return $this->beschrijving;
	}

	public function getEenheidsprijsStandaard(){
		return $this->eenheidsprijsStandaard;
	}

	public function getEenheidsprijsKorting(){
		return $this->eenheidsprijsKorting;
	}

	public function getInPromotie(){
		return $this->inPromotie;
	}

}