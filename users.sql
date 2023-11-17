-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 17 nov. 2023 à 13:51
-- Version du serveur : 5.7.40
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `pixelpartners`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_520_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_520_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_520_ci NOT NULL,
  `dateNaissance` date DEFAULT NULL,
  `genre` enum('homme','femme','nonRenseigne','') COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `pays` varchar(100) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `adresse` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `codePostal` varchar(50) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `ville` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `telephone` varchar(100) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `telephonePortable` varchar(100) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `image` mediumblob,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `dateNaissance`, `genre`, `pays`, `adresse`, `codePostal`, `ville`, `telephone`, `telephonePortable`, `image`) VALUES
(26, 'test', 'test@test.fr', '$2b$10$f7z4cJ4igSEBvk300b2fCuKLJ0F68eDfMecih.S6ZV59WoC0U44N.', '1993-12-20', 'homme', 'France', 'test', '59500', 'test', '0606060606', '0606060606', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
