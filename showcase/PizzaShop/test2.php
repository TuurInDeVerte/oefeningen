<?php
require_once("data/GemeenteDAO.php");

$lijst = GemeenteDAO::getAll();
print("<pre>");
print_r($lijst);
print("</pre>");
?>