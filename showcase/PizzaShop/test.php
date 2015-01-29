<?php
require_once("data/GemeenteDAO.php");

$boek = GemeenteDAO::getById(1);
print("<pre>");
print_r($boek);
print("</pre>");
?>