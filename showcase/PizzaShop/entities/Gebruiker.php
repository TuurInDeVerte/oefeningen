<?php

class Gebruiker {

	private static $idMap = array();

	private $gebruikerId;
	private $gebruikersnaam;
	private $wachtwoord;
	private $emailadres;
	private $type;
	private $familienaam;
	private $voornaam;
	private $telefoonnummer;
	private $adres;
	private $postId;
	private $status;

	private function __construct($gebruikerId, $gebruikersnaam, $wachtwoord, $emailadres, $type, $familienaam, $voornaam, $telefoonnummer, $adres, $postId, $status){
		$this->gebruikerId = $gebruikerId;
		$this->gebruikersnaam = $gebruikersnaam;
		$this->wachtwoord = $wachtwoord;
		$this->emailadres = $emailadres;
		$this->type = $type;
		$this->familienaam = $familienaam;
		$this->voornaam = $voornaam;
		$this->telefoonnummer = $telefoonnummer;
		$this->adres = $adres;
		$this->postId = $postId;
		$this->status = $status;
	}

	public static function create($gebruikerId, $gebruikersnaam, $wachtwoord, $emailadres, $type, $familienaam, $voornaam, $telefoonnummer, $adres, $postId, $status){
		if(!isset(self::$idMap[$gebruikerId])){
			self::$idMap[$gebruikerId] = new Gebruiker($gebruikerId, $gebruikersnaam, $wachtwoord, $emailadres, $type, $familienaam, $voornaam, $telefoonnummer, $adres, $postId, $status);
		}
		var_dump($idMap);
		return self::$idMap[$gebruikerId];
	}


	// SETTERS
	public function setGebruikerId($gebruikerId){
		$this->gebruikerId = $gebruikerId;
	}
	public function setGebruikersnaam($gebruikersnaam){
		$this->gebruikersnaam = $gebruikersnaam;
	}
	public function setWachtwoord($wachtwoord){
		$this->wachtwoord = $wachtwoord;
	}
	public function setEmailadres($emailadres){
		$this->emailadres = $emailadres;
	}
	public function setType($type){
		$this->type = $type;
	}
	public function setFamilienaam($familienaam){
		$this->familienaam = $familienaam;
	}
	public function setVoornaam($voornaam){
		$this->voornaam = $voornaam;
	}
	public function setTelefoonnummer($telefoonnummer){
		$this->telefoonnummer = $telefoonnummer;
	}
	public function setAdres($adres){
		$this->adres = $adres;
	}
	public function setPostId($postId){
		$this->postId = $postId;
	}
	public function setStatus($status){
		$this->status = $status;
	}

	// GETTERS
	public function getGebruikerId(){
		return $this->gebruikerId;
	}
	public function getGebruikersnaam(){
		return $this->gebruikersnaam;
	}
	public function getWachtwoord(){
		return $this->wachtwoord;
	}
	public function getEmailadres(){
		return $this->emailadres;
	}
	public function getType(){
		return $this->type;
	}
	public function getFamilienaam(){
		return $this->familienaam;
	}
	public function getVoornaam(){
		return $this->voornaam;
	}
	public function getTelefoonnummer(){
		return $this->telefoonnummer;
	}
	public function getAdres(){
		return $this->adres;
	}
	public function getPostId(){
		return $this->postId;
	}
	public function getStatus(){
		return $this->status;
	}

}