<?php

class Gemeente {

	private static $idMap = array();

	private $postId;
	private $postcode;
	private $gemeente;
	private $leveringMogelijk;
	private $leveringPrijs;

	private function __construct($postId, $postcode, $gemeente, $leveringMogelijk, $leveringPrijs){
		$this->setPostId($postId);
		$this->setPostcode($postcode);
		$this->setGemeente($gemeente);
		$this->setLeveringMogelijk($leveringMogelijk);
		$this->setLeveringPrijs($leveringPrijs);
	}

	public static function create($postId, $postcode, $gemeente, $leveringMogelijk, $leveringPrijs){
		if(!isset(self::$idMap[$postId])) {
			self::$idMap[$postId] = new Gemeente($postId, $postcode, $gemeente, $leveringMogelijk, $leveringPrijs);
		}
		return self::$idMap[$postId];
	}

	// SETTERS
	public function setPostId($postId){
		$this->postId = $postId;
	}
	public function setPostcode($postcode){
		$this->postcode = $postcode;
	}
	public function setGemeente($gemeente){
		$this->gemeente = $gemeente;
	}
	public function setLeveringMogelijk($leveringMogelijk){
		$this->leveringMogelijk = $leveringMogelijk;
	}
	public function setLeveringPrijs($leveringPrijs){
		$this->leveringPrijs = $leveringPrijs;
	}

	// GETTERS
	public function getPostId(){
		return $this->postId;
	}
	public function getPostcode(){
		return $this->postcode;
	}
	public function getGemeente(){
		return $this->gemeente;
	}
	public function getLeveringMogelijk(){
		return $this->leveringMogelijk;
	}
	public function getLeveringPrijs(){
		return $this->leveringPrijs;
	}

}