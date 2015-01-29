-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Machine: 127.0.0.1
-- Genereertijd: 29 jan 2015 om 09:34
-- Serverversie: 5.6.11
-- PHP-versie: 5.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Databank: `pizzashop`
--
-- CREATE DATABASE IF NOT EXISTS `tuurwpi55_pShop` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `tuurwpi55_pShop`;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `bestellingen`
--

CREATE TABLE IF NOT EXISTS `bestellingen` (
  `bestelnummer` int(11) NOT NULL,
  `klantGebruikerId` int(11) NOT NULL,
  `medewerkerGebruikerId` int(11) NOT NULL,
  `besteldatum` date NOT NULL,
  `leverdatum` date NOT NULL,
  `thuislevering` tinyint(1) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`bestelnummer`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `bestelregels`
--

CREATE TABLE IF NOT EXISTS `bestelregels` (
  `bestelnummer` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `extraVoorProductId` int(11) NOT NULL,
  `aantal` int(11) NOT NULL,
  `prijs` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `gebruikers`
--

CREATE TABLE IF NOT EXISTS `gebruikers` (
  `gebruikerId` int(11) NOT NULL AUTO_INCREMENT,
  `gebruikersnaam` varchar(20) NOT NULL,
  `wachtwoord` char(96) NOT NULL,
  `emailadres` varchar(30) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `familienaam` varchar(25) NOT NULL,
  `voornaam` varchar(25) NOT NULL,
  `telefoonnummer` varchar(20) NOT NULL,
  `adres` varchar(50) NOT NULL,
  `postId` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  PRIMARY KEY (`gebruikerId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Gegevens worden uitgevoerd voor tabel `gebruikers`
--

INSERT INTO `gebruikers` (`gebruikerId`, `gebruikersnaam`, `wachtwoord`, `emailadres`, `type`, `familienaam`, `voornaam`, `telefoonnummer`, `adres`, `postId`, `status`) VALUES
(1, 'admin', 'admin', 'tuurwalleyn@gmail.com', 0, 'admin', 'admin', '0478227583', '', 0, 1),
(2, 'tuur', 'tuur', 'tuur@walleyn.com', 1, 'Walleyn', 'Tuur', '0478 22 75 83', 'Vestingstraat 16', 0, 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `gemeenten`
--

CREATE TABLE IF NOT EXISTS `gemeenten` (
  `postId` int(11) NOT NULL AUTO_INCREMENT,
  `postcode` smallint(6) NOT NULL,
  `gemeente` varchar(25) NOT NULL,
  `leveringMogelijk` tinyint(1) NOT NULL,
  `leveringPrijs` decimal(10,0) NOT NULL,
  PRIMARY KEY (`postId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Gegevens worden uitgevoerd voor tabel `gemeenten`
--

INSERT INTO `gemeenten` (`postId`, `postcode`, `gemeente`, `leveringMogelijk`, `leveringPrijs`) VALUES
(1, 8310, 'Assebroek', 1, '0'),
(2, 8310, 'Sint-Kruis', 1, '5'),
(3, 8000, 'Brugge - centrum', 1, '5'),
(4, 8200, 'Sint-Michiels', 1, '5'),
(5, 8200, 'Sint-Andries', 1, '5'),
(6, 8000, 'Sint-Pieters', 1, '5');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `producten`
--

CREATE TABLE IF NOT EXISTS `producten` (
  `productId` int(11) NOT NULL,
  `type` varchar(20) CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL,
  `naam` varchar(40) CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL,
  `afbeelding` varchar(150) CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL,
  `beschrijving` text CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL,
  `eenheidsprijsStandaard` double NOT NULL,
  `eenheidsprijsKorting` double NOT NULL,
  `inPromotie` tinyint(1) NOT NULL,
  PRIMARY KEY (`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden uitgevoerd voor tabel `producten`
--

INSERT INTO `producten` (`productId`, `type`, `naam`, `afbeelding`, `beschrijving`, `eenheidsprijsStandaard`, `eenheidsprijsKorting`, `inPromotie`) VALUES
(1, 'pizza', 'BBQ-Chicken', '/oefeningen/php/PizzaShop/presentation/images/bbq_chicken.png', 'Lekker malse kipfilet met een zoete en rokerige BBQ-saus. Gebakken met onze gekende pizzasaus, verse champignons, mozzarella en cheddar.', 14.49, 12.49, 0),
(2, 'pizza', 'Deluxe', '/oefeningen/php/PizzaShop/presentation/images/deluxe.png', 'Onze gekende pizzasaus, mozzarella, pepperoni, gerookte ham, groene paprika en verse champignons.', 16.49, 14.49, 0),
(3, 'pizza', 'Hawai', '/oefeningen/php/PizzaShop/presentation/images/hawai.png', 'Onze gekende pizzasaus, mozzarella, gerookte ham en uiteraard ananas.', 14.49, 12.49, 1),
(4, 'pizza', 'Meateor', '/oefeningen/php/PizzaShop/presentation/images/meateor.png', 'Een pizza voor echte carnivoren. Met een bolognesesaus boordevol vlees, gerookte ham, pepperoni, gekruid gehakt, pittige Italiaanse worst en mozzarella.', 17.49, 15.49, 0),
(5, 'pizza', 'Mediterrane', '/oefeningen/php/PizzaShop/presentation/images/mediterrane.png', 'Een mediterraans meesterwerk! Onze gekende pizzasaus, mozzarella, verse spinazie, geroosterde portobello champignons, zongedroogde tomaten en gemarineerde artisjokharten daarbovenop feta, afgewerkt met pesto.', 15.49, 13.49, 0),
(6, 'pizza', 'Pepperoni', '/oefeningen/php/PizzaShop/presentation/images/pepperoni.png', 'Onze gekende pizzasaus, mozzarella en heel veel pepperoni.', 14.49, 12.49, 0),
(7, 'pizza', 'Royal', '/oefeningen/php/PizzaShop/presentation/images/royal.png', 'Onze Royal doet zijn naam alle eer aan. Onze gekende pizzasaus, gerookte ham, pepperoni, garnalen, olijven, groene paprika, ui, verse champignons, mozzarella en daarbovenop scampi''s gebakken in een looksausje.', 16.49, 14.49, 0),
(8, 'pizza', 'Spicy Steak and Potato', '/oefeningen/php/PizzaShop/presentation/images/spicy_steak_potato.png', 'Onze gekende pizzasaus, fijne schijfjes krielaardappels, cheddar, mozzarella, in bier gestoofde fijne sneetjes BBQ-steak en ui, goudbruin gebakken en afgewerkt met krokant gefrituurde uitjes en besprenkeld met merikswortel dressing.', 17.49, 15.49, 1),
(9, 'pizza', 'Vegetariana', '/oefeningen/php/PizzaShop/presentation/images/vegetariana.png', 'Onze gekende pizzasaus, mozzarella, champignons, groene paprika, ui, gegarneerd met schijfjes verse tomaat.', 14.49, 12.49, 0),
(10, 'drank', 'CocaCola', '/oefeningen/php/PizzaShop/presentation/images/cocacola.png', 'Suikerhoudende, koolzuurhoudende frisdrank met plantenextracten. (33cl)', 1.5, 1, 0),
(11, 'drank', 'Fanta Orange', '/oefeningen/php/PizzaShop/presentation/images/fanta.png', 'Suikerhoudende, koolzuurhoudende sinaasappeldrank. (33cl)', 1.5, 1, 0),
(12, 'topping', 'Olijven', '/oefeningen/php/PizzaShop/presentation/images/olijven.png', '(extra) portie olijven', 0.5, 0, 1),
(13, 'topping', 'Ei', '/oefeningen/php/PizzaShop/presentation/images/ei.png', 'een ei (paardenoog) bovenop uw pizza!', 0.5, 0.25, 1),
(14, 'drank', 'Chaudfontaine (blauw)', '/oefeningen/php/PizzaShop/presentation/images/chaudfontaine_blauw.png', 'Plat water van het merk Chaudfontaine (50cl)', 1.5, 1, 1),
(15, 'drank', 'Chaudfontaine (rood)', '/oefeningen/php/PizzaShop/presentation/images/chaudfontaine_rood.png', 'Bruisend water van het merk Chaudfontaine (50cl)', 1.5, 1, 0),
(16, 'topping', 'Mozzarella', '/oefeningen/php/PizzaShop/presentation/images/mozzarella.png', '(extra) portie mozzarella', 0.5, 0, 0),
(17, 'topping', 'Gruyere', '/oefeningen/php/PizzaShop/presentation/images/gruyere.jpg', '(extra) portie gemalen gruyere', 0.5, 0, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
