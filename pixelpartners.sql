-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 21 nov. 2023 à 14:58
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
-- Structure de la table `genres`
--

DROP TABLE IF EXISTS `genres`;
CREATE TABLE IF NOT EXISTS `genres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) COLLATE utf8_unicode_520_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Déchargement des données de la table `genres`
--

INSERT INTO `genres` (`id`, `nom`) VALUES
(1, 'Action'),
(2, 'Aventure'),
(3, 'Bac à sable (Sandbox)'),
(4, 'Battle Royale'),
(5, 'Combat'),
(6, 'Course'),
(7, 'FPS  (First Person Shooter)'),
(8, 'Horreur'),
(9, 'Jeux de cartes à collectionner (CCG)'),
(10, 'Jeux de construction'),
(11, 'Jeux de gestion'),
(12, 'Jeux de plateforme'),
(13, 'Jeux de rôle (RPG)'),
(14, 'Jeux de science-fiction'),
(15, 'Jeux de survie'),
(16, 'Jeux éducatifs'),
(17, 'Jeux historiques'),
(18, 'Jeux narratifs'),
(19, 'MMO (Massively Multiplayer Online)'),
(20, 'MOBA  (Multiplayer Online Battle Arena)'),
(21, 'Musique/Rythme'),
(22, 'Puzzle'),
(23, 'RTS (Stratégie en temps réel)'),
(24, 'Simulation'),
(25, 'Simulation de vie'),
(26, 'Sport'),
(27, 'Stratégie au tour par tour'),
(28, 'Stratégie tactique'),
(29, 'TPS (Third Person Shooter)'),
(30, 'Jeux de tir tactique');

-- --------------------------------------------------------

--
-- Structure de la table `jeux`
--

DROP TABLE IF EXISTS `jeux`;
CREATE TABLE IF NOT EXISTS `jeux` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) COLLATE utf8_unicode_520_ci NOT NULL,
  `id_plateforme` int(11) NOT NULL,
  `id_genre` int(11) NOT NULL,
  `dateSortie` date DEFAULT NULL,
  `developpeur` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `editeur` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `video` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_plateforme` (`id_plateforme`),
  KEY `id_genre` (`id_genre`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Déchargement des données de la table `jeux`
--

INSERT INTO `jeux` (`id`, `titre`, `id_plateforme`, `id_genre`, `dateSortie`, `developpeur`, `editeur`, `image`, `video`) VALUES
(1, 'The Last of Us Part II', 1, 1, '2020-06-19', 'Naughty Dog', 'Sony Interactive Entertainment', NULL, NULL),
(2, 'Cyberpunk 2077', 4, 3, '2020-12-10', 'CD Projekt', 'CD Projekt', NULL, NULL),
(3, 'Animal Crossing: New Horizons', 3, 2, '2020-03-20', 'Nintendo', 'Nintendo', NULL, NULL),
(4, 'Red Dead Redemption 2', 2, 1, '2018-10-26', 'Rockstar Games', 'Rockstar Games', NULL, NULL),
(5, 'Fortnite', 4, 4, '2017-07-25', 'Epic Games', 'Epic Games', NULL, NULL),
(6, 'The Legend of Zelda: Breath of the Wild', 3, 2, '2017-03-03', 'Nintendo', 'Nintendo', NULL, NULL),
(7, 'FIFA 22', 1, 6, '2021-10-01', 'EA Vancouver', 'Electronic Arts', NULL, NULL),
(8, 'Minecraft', 4, 5, '2011-11-18', 'Mojang', 'Mojang', NULL, NULL),
(9, 'Assassin\'s Creed Valhalla', 2, 1, '2020-11-10', 'Ubisoft Montreal', 'Ubisoft', NULL, NULL),
(10, 'Among Us', 5, 4, '2018-11-16', 'Innersloth', 'Innersloth', NULL, NULL),
(11, 'Pokémon Sword and Shield', 3, 2, '2019-11-15', 'Game Freak', 'Nintendo', NULL, NULL),
(12, 'Call of Duty: Warzone', 4, 4, '2020-03-10', 'Infinity Ward', 'Activision', NULL, NULL),
(13, 'Rocket League', 4, 6, '2015-07-07', 'Psyonix', 'Psyonix', NULL, NULL),
(14, 'The Witcher 3: Wild Hunt', 2, 3, '2015-05-19', 'CD Projekt', 'CD Projekt', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `notes`
--

DROP TABLE IF EXISTS `notes`;
CREATE TABLE IF NOT EXISTS `notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int(11) NOT NULL,
  `id_jeu` int(11) NOT NULL,
  `note` int(11) NOT NULL,
  `date_note` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_utilisateur` (`id_utilisateur`),
  KEY `id_jeu` (`id_jeu`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

-- --------------------------------------------------------

--
-- Structure de la table `plateformes`
--

DROP TABLE IF EXISTS `plateformes`;
CREATE TABLE IF NOT EXISTS `plateformes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) COLLATE utf8_unicode_520_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Déchargement des données de la table `plateformes`
--

INSERT INTO `plateformes` (`id`, `nom`) VALUES
(1, 'PlayStation 5'),
(2, 'Playstation 4'),
(3, 'Playstation 3'),
(4, 'Playstation Vita'),
(5, 'Xbox Series'),
(6, 'Xbox One'),
(7, 'Xbox 360'),
(8, 'Nintendo Switch'),
(9, 'Nintendo 3Ds'),
(10, 'Nintendo Ds'),
(11, 'WII'),
(12, 'PC'),
(13, 'Google Stadia'),
(14, 'Mobile');

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
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `dateNaissance`, `genre`, `pays`, `adresse`, `codePostal`, `ville`, `telephone`, `telephonePortable`, `image`) VALUES
(24, 'test', 'test@test.fr', '$2b$10$iJLjTVkBL0UFM5KfZ.uRmeEcYnAitTUmbexdGcI82ak/JuRq/U/Ly', '1993-12-20', 'homme', 'France', '131 rue Durutte', '59500', 'Douai', '0606060606', '0606060606', 0x696d6167652d313730303530333937373032352d3139383034373031382e706e67);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
