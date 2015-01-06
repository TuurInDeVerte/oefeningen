<?php
require_once("data/ProductDAO.php");

$product = ProductDAO::getProductById(7);
print("<pre>");
print_r($product);
?>