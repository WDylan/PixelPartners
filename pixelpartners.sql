-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 21 nov. 2023 à 19:28
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
(7, 'FPS (First Person Shooter)'),
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
  `dateSortie` date DEFAULT NULL,
  `description` varchar(500) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `developpeur` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `editeur` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `video` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Déchargement des données de la table `jeux`
--

INSERT INTO `jeux` (`id`, `titre`, `dateSortie`, `description`, `developpeur`, `editeur`, `image`, `video`) VALUES
(1, 'The Last of Us Part II', '2020-06-19', 'Dans un monde post-apocalyptique déchiré par la survie, suivez l\'histoire intense d\'Ellie, une jeune femme déterminée à découvrir la vérité sur les événements tragiques qui ont transformé le monde. Entre action brutale et émotions poignantes, chaque choix compte dans cette quête désespérée.', 'Naughty Dog', 'Sony Interactive Entertainment', 'The_Last_Of_Us_Part_II.jpg', NULL),
(2, 'Cyberpunk 2077', '2020-12-10', 'Plongez dans Night City, la mégalopole futuriste où la technologie et la criminalité se mêlent. Incarnez V, un mercenaire cherchant l\'immortalité dans un monde où les augmentations cybernétiques offrent le pouvoir, mais à un prix élevé. Des choix moraux difficiles sculptent votre destinée dans cette ville impitoyable.', 'CD Projekt', 'CD Projekt', 'Cyberpunk_2077.jpg', NULL),
(3, 'Animal Crossing: New Horizons', '2020-03-20', ' Échappez à la vie trépidante pour une île paradisiaque où vous créez votre propre paradis. Construisez, décorez et personnalisez votre île tout en créant des liens avec des animaux adorables. Profitez d\'une vie insulaire paisible pleine d\'aventures et de découvertes.', 'Nintendo', 'Nintendo', 'Animal_Crossing_New_Horizons.jpg', NULL),
(4, 'Red Dead Redemption 2', '2018-10-26', 'Plongez dans l\'ère sauvage de l\'Ouest américain en incarnant Arthur Morgan, un hors-la-loi cherchant la rédemption. Explorez des terres vastes et dangereuses, prenez des décisions morales difficiles, et vivez l\'épopée captivante d\'un gang de hors-la-loi en déclin.', 'Rockstar Games', 'Rockstar Games', 'Read_Dead_Redemption_II.jpg', NULL),
(5, 'Fortnite', '2017-07-25', 'Immergez-vous dans le monde coloré de Fortnite, un jeu de bataille royale où 100 joueurs s\'affrontent pour être le dernier survivant. Construisez, combattez, et survivez dans un environnement en constante évolution, rempli d\'énigmes et de surprises.\r\n', 'Epic Games', 'Epic Games', 'Fortnite.jpg', NULL),
(6, 'The Legend of Zelda: Breath of the Wild', '2017-03-03', 'Explorez le royaume fantastique d\'Hyrule dans une aventure épique. Incarnez Link, le héros du temps, et embarquez dans un voyage pour libérer la princesse Zelda et vaincre Ganon. Découvrez un vaste monde ouvert, rempli de mystères et de défis.', 'Nintendo', 'Nintendo', 'The_Legend_Of_Zelda_Breath_Of_The_Wild.jpg', NULL),
(7, 'FIFA 22', '2021-10-01', 'Vivez l\'excitation du football de haut niveau dans FIFA 22. Entraînez votre équipe, affrontez des adversaires du monde entier, et ressentez l\'émotion du terrain. Avec des graphismes réalistes et un gameplay immersif, chaque match devient une expérience unique.', 'EA Vancouver', 'Electronic Arts', 'Fifa_22.png', NULL),
(8, 'Minecraft', '2011-11-18', 'Dans un monde pixelisé infini, laissez libre cours à votre créativité. Explorez, construisez, et survivez dans un environnement généré aléatoirement. Que vous construisiez des structures épiques ou que vous exploriez des cavernes mystérieuses, l\'aventure n\'a de limites que votre imagination.', 'Mojang', 'Mojang', 'Minecraft.jpg', NULL),
(9, 'Assassin\'s Creed Valhalla', '2020-11-10', 'Plongez dans l\'âge des Vikings en incarnant Eivor, un guerrier nordique en quête de gloire. Explorez l\'Angleterre médiévale, combattez pour établir votre propre royaume, et découvrez des mystères anciens dans cette épopée d\'action-aventure.', 'Ubisoft Montreal', 'Ubisoft', 'Assassins_Creed_Valhalla.avif', NULL),
(10, 'Among Us', '2018-11-16', 'Un groupe d\'astronautes se prépare pour une mission spatiale, mais parmi eux se cachent des imposteurs cherchant à saboter le vaisseau. Dans ce jeu de déduction sociale, l\'équipage doit travailler ensemble pour identifier les imposteurs avant qu\'il ne soit trop tard.', 'Innersloth', 'Innersloth', 'Among_Us.jpg', NULL),
(11, 'Pokémon Sword and Shield', '2019-11-15', 'Devenez un Dresseur Pokémon et explorez la région de Galar en quête de gloire et de nouveaux Pokémon. Affrontez des rivaux, découvrez des créatures légendaires, et devenez le champion de l\'arène dans cette aventure captivante.', 'Game Freak', 'Nintendo', 'Pokemon_Sword.jpg', NULL),
(12, 'Call of Duty: Warzone', '2020-03-10', 'Plongez dans l\'effervescence du combat urbain dans Warzone, une expérience de bataille royale intense. Formez une équipe, affrontez des adversaires, et soyez le dernier survivant dans un environnement de guerre moderne.', 'Infinity Ward', 'Activision', 'Call_Of_Duty_Warzone.jpg', NULL),
(13, 'Rocket League', '2015-07-07', 'Plongez dans le monde déjanté de Rocket League, où le football rencontre l\'adrénaline du pilotage acrobatique. Incarnez des véhicules surpuissants équipés de réacteurs et foncez sur un terrain pour marquer des buts spectaculaires. Que vous jouiez en solo ou en équipe, chaque partie devient une expérience de compétition effrénée, où la stratégie et les acrobaties aériennes sont les clés du succès.', 'Psyonix', 'Psyonix', 'Rocket_League.jpg', NULL),
(14, 'The Witcher 3: Wild Hunt', '2015-05-19', 'Embarquez dans une aventure épique en tant que Geralt de Riv, un sorceleur légendaire, dans The Witcher 3: Wild Hunt. Explorez un monde ouvert vaste et magnifique, découvrez des mystères, et affrontez des créatures surnaturelles. À la recherche de sa protégée disparue, Geralt se trouve entraîné dans un conflit plus vaste aux enjeux épiques, où chaque choix peut façonner le destin du monde qui l\'entoure. Plongez dans une histoire riche, des quêtes captivantes, et des paysages à couper le souffle.', 'CD Projekt', 'CD Projekt', 'The_Witcher_3_Wild_Hunt.jpg', NULL),
(16, 'Celeste', '2018-01-25', 'Un jeu de plateforme difficile avec une histoire touchante.', 'Maddy Makes Games', 'Maddy Makes Games', NULL, NULL),
(18, 'Doom Eternal', '2020-03-20', 'Combattez des hordes démoniaques dans ce FPS intense.', 'id Software', 'Bethesda Softworks', NULL, NULL),
(19, 'Stardew Valley', '2016-02-26', 'Échappez à la vie citadine pour gérer votre propre ferme.', 'ConcernedApe', 'ConcernedApe', NULL, NULL),
(20, 'Civilization VI', '2016-10-21', 'Construisez votre civilisation à travers l\'histoire dans ce jeu de stratégie.', 'Firaxis Games', '2K Games', NULL, NULL),
(21, 'Overwatch', '2016-05-24', 'Un jeu de tir multijoueur en équipe avec des héros uniques.', 'Blizzard Entertainment', 'Blizzard Entertainment', NULL, NULL),
(22, 'The Sims 4', '2014-09-02', 'Simulez la vie de vos personnages dans ce jeu de simulation de vie.', 'Maxis', 'Electronic Arts', NULL, NULL),
(23, 'Super Mario Odyssey', '2017-10-27', 'Mario part en voyage pour sauver la princesse Peach.', 'Nintendo', 'Nintendo', NULL, NULL),
(24, 'Halo: Master Chief Collection', '2014-11-11', 'Une collection de jeux de la série Halo pour Xbox.', '343 Industries', 'Xbox Game Studios', NULL, NULL),
(25, 'Horizon Zero Dawn', '2017-02-28', 'Un monde ouvert post-apocalyptique où des machines règnent.', 'Guerrilla Games', 'Sony Interactive Entertainment', NULL, NULL),
(26, 'Monster Hunter: World', '2018-01-26', 'Chassez des monstres énormes dans ce jeu de rôle daction.', 'Capcom', 'Capcom', NULL, NULL),
(27, 'The Elder Scrolls V: Skyrim', '2011-11-11', 'Explorez un vaste monde ouvert rempli de dragons et de mystères.', 'Bethesda Game Studios', 'Bethesda Softworks', NULL, NULL),
(28, 'Star Wars Jedi: Fallen Order', '2019-11-15', 'Vivez une histoire Star Wars en tant que jeune Jedi fugitif.', 'Respawn Entertainment', 'Electronic Arts', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `jeux_genres`
--

DROP TABLE IF EXISTS `jeux_genres`;
CREATE TABLE IF NOT EXISTS `jeux_genres` (
  `id_jeu` int(11) NOT NULL,
  `id_genre` int(11) NOT NULL,
  PRIMARY KEY (`id_jeu`,`id_genre`),
  KEY `id_genre` (`id_genre`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Déchargement des données de la table `jeux_genres`
--

INSERT INTO `jeux_genres` (`id_jeu`, `id_genre`) VALUES
(1, 1),
(1, 18),
(2, 3),
(2, 14),
(3, 2),
(3, 23),
(4, 1),
(4, 18),
(5, 4),
(5, 29),
(6, 2),
(6, 12),
(7, 26),
(8, 5),
(8, 16),
(9, 1),
(9, 18),
(10, 4),
(10, 5),
(11, 2),
(11, 23),
(12, 4),
(12, 29),
(13, 6),
(13, 29),
(14, 3),
(14, 14),
(15, 1),
(15, 18),
(16, 2),
(16, 12),
(18, 1),
(18, 29),
(19, 2),
(19, 25),
(20, 23),
(20, 24),
(21, 7),
(21, 29),
(22, 24),
(23, 12),
(23, 26),
(24, 7),
(24, 29),
(25, 1),
(25, 13),
(26, 6),
(26, 13),
(27, 13),
(28, 1),
(28, 29);

-- --------------------------------------------------------

--
-- Structure de la table `jeux_plateformes`
--

DROP TABLE IF EXISTS `jeux_plateformes`;
CREATE TABLE IF NOT EXISTS `jeux_plateformes` (
  `id_jeu` int(11) NOT NULL,
  `id_plateforme` int(11) NOT NULL,
  PRIMARY KEY (`id_jeu`,`id_plateforme`),
  KEY `id_plateforme` (`id_plateforme`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Déchargement des données de la table `jeux_plateformes`
--

INSERT INTO `jeux_plateformes` (`id_jeu`, `id_plateforme`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 4),
(3, 3),
(3, 8),
(4, 2),
(4, 6),
(5, 4),
(5, 13),
(6, 3),
(6, 8),
(7, 1),
(8, 12),
(9, 2),
(9, 6),
(10, 5),
(10, 6),
(11, 8),
(11, 9),
(12, 4),
(12, 5),
(13, 6),
(13, 8),
(14, 12),
(14, 13),
(15, 1),
(15, 6),
(16, 12),
(16, 14),
(18, 12),
(18, 14),
(19, 12),
(19, 14),
(20, 12),
(20, 14),
(21, 12),
(21, 14),
(22, 12),
(22, 14),
(23, 8),
(24, 5),
(24, 6),
(25, 1),
(25, 2),
(26, 12),
(26, 14),
(27, 12),
(27, 14),
(28, 5),
(28, 6);

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
(24, 'test', 'test@test.fr', '$2b$10$iJLjTVkBL0UFM5KfZ.uRmeEcYnAitTUmbexdGcI82ak/JuRq/U/Ly', '1993-12-20', 'homme', 'France', '131 rue Durutte', '59500', 'Douai', '0606060606', '0606060606', 0x696d6167652d313730303538343533333230352d3832383234303232322e706e67);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
