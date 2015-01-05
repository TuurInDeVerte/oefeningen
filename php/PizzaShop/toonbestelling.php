<?php
require_once("business/ProductService.php");
$producten = ProductService::getAlleProducten();
include("presentation/Bestelling.php");