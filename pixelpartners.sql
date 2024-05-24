-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 16 mai 2024 à 12:00
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

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
-- Structure de la table `developpeurs`
--

DROP TABLE IF EXISTS `developpeurs`;
CREATE TABLE IF NOT EXISTS `developpeurs` (
  `id` int NOT NULL,
  `nom` varchar(250) CHARACTER SET utf32 COLLATE utf32_unicode_520_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_520_ci;

--
-- Déchargement des données de la table `developpeurs`
--

INSERT INTO `developpeurs` (`id`, `nom`) VALUES
(1, 'Naughty Dog'),
(2, 'CD Projekt'),
(3, 'Nintendo'),
(4, 'Rockstar Games'),
(5, 'Epic Games'),
(6, 'EA Vancouver'),
(7, 'Mojang'),
(8, 'Ubisoft Montreal'),
(9, 'Innersloth'),
(10, 'Game Freak'),
(11, 'Infinity Ward'),
(12, 'Psyonix'),
(13, 'Maddy Makes Games'),
(14, 'Id Software'),
(15, 'ConcernedApe'),
(16, 'Firaxis Games'),
(17, 'Blizzard Entertainement'),
(18, '343 Industries'),
(19, 'Capcom'),
(20, 'Bethesda Game Studio'),
(21, 'Respawn Entertainment'),
(22, 'Sega'),
(23, 'Konami'),
(24, 'Guerilla Games'),
(25, 'Maxis'),
(26, 'Firaxis Games');

-- --------------------------------------------------------

--
-- Structure de la table `editeurs`
--

DROP TABLE IF EXISTS `editeurs`;
CREATE TABLE IF NOT EXISTS `editeurs` (
  `id` int NOT NULL,
  `nom` varchar(255) CHARACTER SET utf32 COLLATE utf32_unicode_520_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_520_ci;

--
-- Déchargement des données de la table `editeurs`
--

INSERT INTO `editeurs` (`id`, `nom`) VALUES
(5, 'Sony Interactive Entertainment'),
(4, 'Electronic Arts'),
(1, 'Konami'),
(2, 'Sega'),
(3, 'Nintendo'),
(6, 'CD Projekt'),
(7, 'Rockstar Games'),
(8, 'Epic Games'),
(20, 'Mojang'),
(9, 'Ubisoft'),
(10, 'Innersloth'),
(11, 'Activision'),
(12, 'Psyonix'),
(13, 'Maddy Makes Games'),
(14, 'Bethesda Softworks'),
(15, 'ConcernedApe'),
(16, '2K Games'),
(17, 'Blizzard Entertainment'),
(18, 'Xbox Game Studios'),
(19, 'Sony Interactive Entertainment'),
(21, 'Capcom');

-- --------------------------------------------------------

--
-- Structure de la table `genres`
--

DROP TABLE IF EXISTS `genres`;
CREATE TABLE IF NOT EXISTS `genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_520_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_520_ci;

--
-- Déchargement des données de la table `genres`
--

INSERT INTO `genres` (`id`, `nom`) VALUES
(1, 'Action'),
(2, 'Aventure'),
(23, 'Party Game'),
(22, 'Survival Horror'),
(21, 'Rythme'),
(20, 'Beat\'m All'),
(19, 'Adresse'),
(18, 'Point\'n Click'),
(17, 'MMO'),
(16, 'Shoot\'em Up'),
(15, 'Combat'),
(14, 'FPS'),
(13, 'Puzzle-Game'),
(12, 'Gestion'),
(11, 'Course'),
(10, 'Simulation'),
(9, 'Autres'),
(8, 'Plate-Forme'),
(7, 'Sport'),
(6, 'Shooter'),
(5, 'Réflexion'),
(4, 'Stratégie'),
(3, 'RPG'),
(33, 'Roguelike'),
(32, 'Visual Novel'),
(31, 'Jeu de société'),
(30, 'Infiltration'),
(29, 'Wargame'),
(28, 'Action RPG'),
(27, 'Ludo Educatif'),
(26, 'Jeu de Cartes'),
(25, 'Tactique'),
(24, 'Tir'),
(34, 'Compilation'),
(35, 'MMORPG'),
(36, 'Survie'),
(37, 'Coaching'),
(38, 'TPS'),
(39, 'Tactical RPG'),
(40, 'Runner'),
(41, 'Flipper'),
(42, 'Création'),
(43, 'Sandbox'),
(44, 'Hack\'n slash'),
(45, 'Casse Brique'),
(46, 'Open World'),
(47, 'Tower Defense'),
(48, 'City Builder'),
(49, 'Dungeon RPG'),
(50, 'Management'),
(51, 'Simulation de vie'),
(52, 'Battle Royal'),
(53, 'Objets cachés'),
(54, 'MOBA'),
(55, 'God Game'),
(56, '4X'),
(57, 'Film interactif'),
(58, 'Simulation de vol'),
(59, 'Drague'),
(60, 'Match 3'),
(61, 'MMOFPS'),
(62, 'Danse'),
(63, 'Karaoké'),
(64, 'Serious Games'),
(65, 'Jeu de rôle');

-- --------------------------------------------------------

--
-- Structure de la table `jeux`
--

DROP TABLE IF EXISTS `jeux`;
CREATE TABLE IF NOT EXISTS `jeux` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_520_ci NOT NULL,
  `dateSortie` date DEFAULT NULL,
  `description` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_520_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_520_ci DEFAULT NULL,
  `video` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_520_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_520_ci;

--
-- Déchargement des données de la table `jeux`
--

INSERT INTO `jeux` (`id`, `titre`, `dateSortie`, `description`, `image`, `video`) VALUES
(1, 'The Last of Us Part II', '2020-06-19', 'Dans un monde post-apocalyptique déchiré par la survie, suivez l\'histoire intense d\'Ellie, une jeune femme déterminée à découvrir la vérité sur les événements tragiques qui ont transformé le monde. Entre action brutale et émotions poignantes, chaque choix compte dans cette quête désespérée.', 'The_Last_Of_Us_Part_II.jpg', 'https://www.youtube.com/watch?v=Ye3st9z6jQY&t=22s'),
(2, 'Cyberpunk 2077', '2020-12-10', 'Plongez dans Night City, la mégalopole futuriste où la technologie et la criminalité se mêlent. Incarnez V, un mercenaire cherchant l\'immortalité dans un monde où les augmentations cybernétiques offrent le pouvoir, mais à un prix élevé. Des choix moraux difficiles sculptent votre destinée dans cette ville impitoyable.', 'Cyberpunk_2077.jpg', 'https://www.youtube.com/watch?v=qIcTM8WXFjk&t=14s'),
(3, 'Animal Crossing: New Horizons', '2020-03-20', ' Échappez à la vie trépidante pour une île paradisiaque où vous créez votre propre paradis. Construisez, décorez et personnalisez votre île tout en créant des liens avec des animaux adorables. Profitez d\'une vie insulaire paisible pleine d\'aventures et de découvertes.', 'Animal_Crossing_New_Horizons.jpg', 'https://www.youtube.com/watch?v=0p7KZd2HLHs'),
(4, 'Red Dead Redemption 2', '2018-10-26', 'Plongez dans l\'ère sauvage de l\'Ouest américain en incarnant Arthur Morgan, un hors-la-loi cherchant la rédemption. Explorez des terres vastes et dangereuses, prenez des décisions morales difficiles, et vivez l\'épopée captivante d\'un gang de hors-la-loi en déclin.', 'Red_Dead_Redemption_II.jpg', 'https://www.youtube.com/watch?v=NTZiuqBwvBk'),
(5, 'Fortnite', '2017-07-25', 'Immergez-vous dans le monde coloré de Fortnite, un jeu de bataille royale où 100 joueurs s\'affrontent pour être le dernier survivant. Construisez, combattez, et survivez dans un environnement en constante évolution, rempli d\'énigmes et de surprises.\r\n', 'Fortnite.jpg', 'https://www.youtube.com/watch?v=4Z9aZ28QnJA'),
(6, 'The Legend of Zelda: Breath of the Wild', '2017-03-03', 'Explorez le royaume fantastique d\'Hyrule dans une aventure épique. Incarnez Link, le héros du temps, et embarquez dans un voyage pour libérer la princesse Zelda et vaincre Ganon. Découvrez un vaste monde ouvert, rempli de mystères et de défis.', 'The_Legend_Of_Zelda_Breath_Of_The_Wild.jpg', 'https://www.youtube.com/watch?v=vumJiWdxQSs'),
(7, 'FIFA 22', '2021-10-01', 'Vivez l\'excitation du football de haut niveau dans FIFA 22. Entraînez votre équipe, affrontez des adversaires du monde entier, et ressentez l\'émotion du terrain. Avec des graphismes réalistes et un gameplay immersif, chaque match devient une expérience unique.', 'Fifa_22.png', 'https://www.youtube.com/watch?v=lK8SJg1rO4U'),
(8, 'Minecraft', '2011-11-18', 'Dans un monde pixelisé infini, laissez libre cours à votre créativité. Explorez, construisez, et survivez dans un environnement généré aléatoirement. Que vous construisiez des structures épiques ou que vous exploriez des cavernes mystérieuses, l\'aventure n\'a de limites que votre imagination.', 'Minecraft.jpg', 'https://www.youtube.com/watch?v=KahvH4HjyGU'),
(9, 'Assassin\'s Creed Valhalla', '2020-11-10', 'Plongez dans l\'âge des Vikings en incarnant Eivor, un guerrier nordique en quête de gloire. Explorez l\'Angleterre médiévale, combattez pour établir votre propre royaume, et découvrez des mystères anciens dans cette épopée d\'action-aventure.', 'Assassins_Creed_Valhalla.avif', 'https://www.youtube.com/watch?v=666CH0jvDRs'),
(10, 'Among Us', '2018-11-16', 'Un groupe d\'astronautes se prépare pour une mission spatiale, mais parmi eux se cachent des imposteurs cherchant à saboter le vaisseau. Dans ce jeu de déduction sociale, l\'équipage doit travailler ensemble pour identifier les imposteurs avant qu\'il ne soit trop tard.', 'Among_Us.jpg', 'https://www.youtube.com/watch?v=CermGp8bwFE'),
(11, 'Pokémon Sword', '2019-11-15', 'Devenez un Dresseur Pokémon et explorez la région de Galar en quête de gloire et de nouveaux Pokémon. Affrontez des rivaux, découvrez des créatures légendaires, et devenez le champion de l\'arène dans cette aventure captivante.', 'Pokemon_Sword.jpg', 'https://www.youtube.com/watch?v=WQXYjuLGuXU'),
(12, 'Call of Duty: Warzone', '2020-03-10', 'Plongez dans l\'effervescence du combat urbain dans Warzone, une expérience de bataille royale intense. Formez une équipe, affrontez des adversaires, et soyez le dernier survivant dans un environnement de guerre moderne.', 'Call_Of_Duty_Warzone.jpg', 'https://www.youtube.com/watch?v=YuzcRdAyGac'),
(13, 'Rocket League', '2015-07-07', 'Plongez dans le monde déjanté de Rocket League, où le football rencontre l\'adrénaline du pilotage acrobatique. Incarnez des véhicules surpuissants équipés de réacteurs et foncez sur un terrain pour marquer des buts spectaculaires. Que vous jouiez en solo ou en équipe, chaque partie devient une expérience de compétition effrénée, où la stratégie et les acrobaties aériennes sont les clés du succès.', 'Rocket_League.jpg', 'https://www.youtube.com/watch?v=SgSX3gOrj60'),
(14, 'The Witcher 3: Wild Hunt', '2015-05-19', 'Embarquez dans une aventure épique en tant que Geralt de Riv, un sorceleur légendaire, dans The Witcher 3: Wild Hunt. Explorez un monde ouvert vaste et magnifique, découvrez des mystères, et affrontez des créatures surnaturelles. À la recherche de sa protégée disparue, Geralt se trouve entraîné dans un conflit plus vaste aux enjeux épiques, où chaque choix peut façonner le destin du monde qui l\'entoure. Plongez dans une histoire riche, des quêtes captivantes, et des paysages à couper le souffle.', 'The_Witcher_3_Wild_Hunt.jpg', 'https://www.youtube.com/watch?v=c0i88t0Kacs'),
(16, 'Celeste', '2018-01-25', 'Un jeu de plateforme difficile avec une histoire touchante.', 'Celeste.jpg', 'https://www.youtube.com/watch?v=70d9irlxiB4'),
(18, 'Doom Eternal', '2020-03-20', 'Combattez des hordes démoniaques dans ce FPS intense.', 'Doom_Eternal.jpg', 'https://www.youtube.com/watch?v=-PpCBFZWm6c'),
(19, 'Stardew Valley', '2016-02-26', 'Échappez à la vie citadine pour gérer votre propre ferme.', 'Stardew_Valley.png', 'https://www.youtube.com/watch?v=8A7A1X1TVNc'),
(20, 'Civilization VI', '2016-10-21', 'Construisez votre civilisation à travers l\'histoire dans ce jeu de stratégie.', 'Civilization_VI.jpg', 'https://www.youtube.com/watch?v=5KdE0p2joJw'),
(21, 'Overwatch 2', '2016-05-24', 'Un jeu de tir multijoueur en équipe avec des héros uniques.', 'Overwatch.jpeg', 'https://www.youtube.com/watch?v=pyS3vmnWTyU'),
(22, 'The Sims 4', '2014-09-02', 'Simulez la vie de vos personnages dans ce jeu de simulation de vie.', 'The_Sims_4.jpeg', 'https://www.youtube.com/watch?v=sdhU5tRCqYc'),
(23, 'Super Mario Odyssey', '2017-10-27', 'Mario part en voyage pour sauver la princesse Peach.', 'Super_Mario_Odyssey.jpeg', 'https://www.youtube.com/watch?v=5kcdRBHM7kM'),
(24, 'Halo: Master Chief Collection', '2014-11-11', 'Une collection de jeux de la série Halo pour Xbox.', 'Halo_The_Master_Chief_Collection.jpg', 'https://www.youtube.com/watch?v=ZDvYJGquXgE'),
(25, 'Horizon Zero Dawn', '2017-02-28', 'Un monde ouvert post-apocalyptique où des machines règnent.', 'Horizon_Zero_Dawn.jpeg', 'https://www.youtube.com/watch?v=rpHpldW0l6Y'),
(26, 'Monster Hunter: World', '2018-01-26', 'Chassez des monstres énormes dans ce jeu de rôle daction.', 'Monster_Hunter_World.jpg', 'https://www.youtube.com/watch?v=OotQrKEqe94'),
(27, 'The Elder Scrolls V: Skyrim', '2011-11-11', 'Explorez un vaste monde ouvert rempli de dragons et de mystères.', 'The_Elder_Scroll_V_Skyrim.jpg', 'https://www.youtube.com/watch?v=JSRtYpNRoN0'),
(28, 'Star Wars Jedi: Fallen Order', '2019-11-15', 'Vivez une histoire Star Wars en tant que jeune Jedi fugitif.', 'Star_Wars_Jedi_Fallen_Order.jpg', 'https://www.youtube.com/watch?v=0GLbwkfhYZk'),
(29, 'Pokémon Shield', '2019-11-15', 'Devenez un Dresseur Pokémon et explorez la région de Galar en quête de gloire et de nouveaux Pokémon. Affrontez des rivaux, découvrez des créatures légendaires, et devenez le champion de l\\\'arène dans cette aventure captivante.', 'Pokemon_Shield.jpg', 'https://www.youtube.com/watch?v=WQXYjuLGuXU'),
(17, 'Kid Chameleon', '1992-05-28', 'Un nouveau jeu vidéo, Wild Side, est apparu dans les salles d\'arcades. Dans ce jeu, le héros est le joueur lui-même qui se déplace dans une réalité virtuelle créée grâce à des hologrammes. Mais le jeu est devenu tellement réaliste que le boss du jeu, Heady Metal, s\'est échappé et a commencé à capturer les joueurs qui perdaient. Incarner le joueur Kid Chameleon dans ce jeu de plates-formes et utiliser les différents casque pour vaincre Heady Metal.', 'Kid_Chameleon.png', 'https://www.youtube.com/watch?v=gch65ybjk6Y'),
(15, 'Tiny Toon Adventures: Buster\'s Hidden Treasure', '1993-01-01', 'En fouillant les greniers de l’université Acme, Buster Bunny et ses camarades tombent soudain sur une vieille carte au trésor. Comme tout est prétexte à une grande aventure et à tenter d’imiter leurs glorieux aïeux, les Tiny Toons décident immédiatement de partir explorer l’île perdue où serait enterré le pactole. Mais c’est sans compter l’infâme Montana Max qui lobotomisa les amis de Buster. Sauver les amis de buster et trouver les trésor de l\'île perdue!', 'Tiny_Toon_Adventures_Busters_Hidden_Treasure.png', 'https://www.youtube.com/watch?v=4zE78Pl2ASY');

-- --------------------------------------------------------

--
-- Structure de la table `jeux_developpeurs`
--

DROP TABLE IF EXISTS `jeux_developpeurs`;
CREATE TABLE IF NOT EXISTS `jeux_developpeurs` (
  `id_jeu` int NOT NULL,
  `id_developpeur` int NOT NULL,
  PRIMARY KEY (`id_jeu`,`id_developpeur`),
  KEY `id_developpeur` (`id_developpeur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_520_ci;

--
-- Déchargement des données de la table `jeux_developpeurs`
--

INSERT INTO `jeux_developpeurs` (`id_jeu`, `id_developpeur`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 3),
(7, 6),
(8, 7),
(9, 8),
(10, 9),
(11, 3),
(12, 11),
(13, 12),
(14, 2),
(15, 23),
(16, 13),
(17, 22),
(18, 14),
(19, 15),
(20, 26),
(21, 17),
(22, 25),
(23, 3),
(24, 18),
(25, 24),
(26, 19),
(27, 20),
(28, 21),
(29, 10);

-- --------------------------------------------------------

--
-- Structure de la table `jeux_editeurs`
--

DROP TABLE IF EXISTS `jeux_editeurs`;
CREATE TABLE IF NOT EXISTS `jeux_editeurs` (
  `id_jeu` int NOT NULL,
  `id_editeur` int NOT NULL,
  PRIMARY KEY (`id_jeu`,`id_editeur`),
  KEY `id_editeur` (`id_editeur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_520_ci;

--
-- Déchargement des données de la table `jeux_editeurs`
--

INSERT INTO `jeux_editeurs` (`id_jeu`, `id_editeur`) VALUES
(1, 19),
(2, 6),
(3, 3),
(4, 7),
(5, 8),
(6, 3),
(7, 4),
(8, 20),
(9, 9),
(10, 10),
(11, 3),
(12, 11),
(13, 12),
(14, 6),
(15, 1),
(16, 13),
(17, 2),
(18, 14),
(19, 15),
(20, 16),
(21, 17),
(22, 4),
(23, 3),
(24, 18),
(25, 19),
(26, 21),
(27, 14),
(28, 4),
(29, 3);

-- --------------------------------------------------------

--
-- Structure de la table `jeux_genres`
--

DROP TABLE IF EXISTS `jeux_genres`;
CREATE TABLE IF NOT EXISTS `jeux_genres` (
  `id_jeu` int NOT NULL,
  `id_genre` int NOT NULL,
  PRIMARY KEY (`id_jeu`,`id_genre`),
  KEY `id_genre` (`id_genre`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_520_ci;

--
-- Déchargement des données de la table `jeux_genres`
--

INSERT INTO `jeux_genres` (`id_jeu`, `id_genre`) VALUES
(1, 1),
(1, 22),
(1, 30),
(2, 3),
(3, 2),
(3, 12),
(3, 43),
(4, 1),
(4, 2),
(4, 38),
(5, 1),
(5, 6),
(5, 24),
(5, 52),
(6, 2),
(6, 3),
(6, 28),
(7, 7),
(8, 36),
(8, 42),
(8, 43),
(8, 46),
(9, 1),
(9, 2),
(9, 33),
(9, 46),
(10, 23),
(10, 36),
(11, 3),
(12, 6),
(12, 14),
(13, 1),
(13, 7),
(14, 1),
(14, 2),
(14, 3),
(15, 8),
(16, 1),
(16, 2),
(17, 8),
(18, 6),
(18, 14),
(19, 3),
(19, 10),
(19, 12),
(19, 51),
(20, 4),
(20, 12),
(20, 56),
(21, 1),
(21, 14),
(22, 10),
(22, 12),
(22, 51),
(23, 8),
(24, 14),
(25, 1),
(25, 3),
(25, 30),
(26, 1),
(26, 3),
(26, 28),
(27, 1),
(27, 2),
(27, 3),
(28, 2),
(29, 3);

-- --------------------------------------------------------

--
-- Structure de la table `jeux_plateformes`
--

DROP TABLE IF EXISTS `jeux_plateformes`;
CREATE TABLE IF NOT EXISTS `jeux_plateformes` (
  `id_jeu` int NOT NULL,
  `id_plateforme` int NOT NULL,
  PRIMARY KEY (`id_jeu`,`id_plateforme`),
  KEY `id_plateforme` (`id_plateforme`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_520_ci;

--
-- Déchargement des données de la table `jeux_plateformes`
--

INSERT INTO `jeux_plateformes` (`id_jeu`, `id_plateforme`) VALUES
(1, 2),
(1, 5),
(2, 1),
(2, 2),
(2, 3),
(2, 5),
(2, 6),
(3, 4),
(4, 1),
(4, 4),
(4, 6),
(5, 1),
(5, 2),
(5, 3),
(5, 4),
(5, 5),
(5, 6),
(5, 15),
(5, 17),
(6, 4),
(6, 8),
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(7, 5),
(7, 6),
(8, 1),
(8, 4),
(8, 5),
(8, 6),
(8, 15),
(8, 16),
(8, 17),
(8, 69),
(9, 1),
(9, 2),
(9, 3),
(9, 5),
(9, 6),
(10, 1),
(10, 2),
(10, 3),
(10, 4),
(10, 5),
(10, 6),
(10, 16),
(10, 17),
(11, 4),
(12, 1),
(12, 5),
(12, 6),
(13, 1),
(13, 4),
(13, 5),
(13, 6),
(13, 69),
(14, 1),
(14, 2),
(14, 3),
(14, 5),
(14, 6),
(15, 46),
(16, 1),
(16, 4),
(16, 5),
(16, 6),
(16, 15),
(16, 69),
(17, 1),
(17, 4),
(17, 14),
(17, 16),
(17, 17),
(17, 46),
(17, 69),
(18, 1),
(18, 2),
(18, 3),
(18, 4),
(18, 5),
(18, 6),
(19, 1),
(19, 4),
(19, 5),
(19, 6),
(19, 12),
(19, 15),
(19, 16),
(19, 17),
(19, 69),
(20, 1),
(20, 4),
(20, 5),
(20, 6),
(20, 16),
(20, 17),
(20, 69),
(21, 1),
(21, 2),
(21, 3),
(21, 4),
(21, 5),
(21, 6),
(22, 1),
(22, 5),
(22, 6),
(23, 4),
(24, 1),
(24, 3),
(24, 6),
(25, 1),
(25, 5),
(26, 1),
(26, 5),
(26, 6),
(27, 1),
(27, 2),
(27, 3),
(27, 4),
(27, 5),
(27, 6),
(27, 9),
(27, 10),
(28, 1),
(28, 2),
(28, 3),
(28, 5),
(28, 6),
(29, 4);

-- --------------------------------------------------------

--
-- Structure de la table `notes`
--

DROP TABLE IF EXISTS `notes`;
CREATE TABLE IF NOT EXISTS `notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int DEFAULT NULL,
  `id_jeu` int NOT NULL,
  `note` int NOT NULL,
  `commentaire` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_520_ci DEFAULT NULL,
  `date_note` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_jeu` (`id_user`,`id_jeu`),
  KEY `id_utilisateur` (`id_user`),
  KEY `id_jeu` (`id_jeu`)
) ENGINE=MyISAM AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_520_ci;

--
-- Déchargement des données de la table `notes`
--

INSERT INTO `notes` (`id`, `id_user`, `id_jeu`, `note`, `commentaire`, `date_note`) VALUES
(37, 24, 1, 3, 'Test commentaire', '2023-11-28 15:54:20'),
(43, 1, 1, 8, '', '2023-11-28 15:54:20'),
(44, 2, 1, 9, 'Ceci est vraiment bien', '2023-11-28 15:54:20'),
(45, 3, 1, 10, 'Ouah c\'est bien', '2023-11-28 15:54:20'),
(48, 26, 1, 9, 'J\'ai passé un très bon moment devant ce jeu, scénario très prenant !', '2023-11-30 23:40:45');

-- --------------------------------------------------------

--
-- Structure de la table `plateformes`
--

DROP TABLE IF EXISTS `plateformes`;
CREATE TABLE IF NOT EXISTS `plateformes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_520_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_520_ci;

--
-- Déchargement des données de la table `plateformes`
--

INSERT INTO `plateformes` (`id`, `nom`) VALUES
(2, 'Playstation 5'),
(12, 'Playstation Vita'),
(11, 'Nintendo 3Ds'),
(10, 'Xbox 360'),
(9, 'Playstation 3'),
(8, 'Wii U'),
(7, 'Google Stadia'),
(6, 'Xbox One'),
(5, 'Playstation 4'),
(1, 'PC'),
(4, 'Nintendo Switch'),
(3, 'Xbox Series'),
(13, 'Nintendo Ds'),
(14, 'Wii'),
(15, 'Mac'),
(16, 'IOS'),
(17, 'Android'),
(18, 'Web'),
(19, '3DO'),
(20, 'Amiga'),
(21, 'Amstrad CPC'),
(22, 'Apple II'),
(23, 'Atari ST'),
(24, 'Atari 2600'),
(25, 'Atari 5200'),
(26, 'Atari 7800'),
(27, 'Box Orange'),
(28, 'Box SFR'),
(29, 'Box Bouygues'),
(30, 'CD-i'),
(31, 'Colecovision'),
(32, 'Commodore 64'),
(33, 'Dreamcast'),
(34, 'Famicon Disk System'),
(35, 'Game & Watch'),
(36, 'Game Boy'),
(37, 'Game Boy Advance'),
(38, 'Game Boy Color'),
(39, 'Game Cube'),
(40, 'Game Gear'),
(41, 'Gizmondo'),
(42, 'GP32'),
(43, 'Jaguar'),
(44, 'Lynx'),
(45, 'Master System'),
(46, 'Megadrive'),
(47, 'Megadrive 32X'),
(48, 'Mega-CD'),
(49, 'MSX'),
(50, 'N-Gage'),
(51, 'Neo Geo'),
(52, 'Neo Geo Pocket'),
(53, 'NES'),
(54, 'Nintendo 64'),
(55, 'PsOne'),
(56, 'Playstation 2'),
(57, 'Playstation Portable'),
(58, 'Saturn'),
(59, 'Super Nintendo'),
(60, 'PC Engine'),
(61, 'Virtual Boy'),
(62, 'Wonderswan'),
(63, 'Xbox'),
(64, 'ZX Spectrum'),
(65, 'Arcade'),
(66, 'New Nintendo 3DS'),
(67, 'OUYA'),
(68, 'Steam Machine'),
(69, 'Linux'),
(70, 'Shield TV'),
(71, 'Intellivision Amico'),
(72, 'Steam Deck'),
(73, 'Box Free'),
(74, 'GX4000'),
(75, 'Intellivision'),
(76, 'Odyssey'),
(77, 'Vextrex'),
(78, 'Videopac'),
(79, 'WonderSwan Color');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_520_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_520_ci NOT NULL,
  `password` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_520_ci NOT NULL,
  `dateNaissance` date DEFAULT NULL,
  `genre` enum('homme','femme','nonRenseigne','') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_520_ci DEFAULT NULL,
  `pays` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_520_ci DEFAULT NULL,
  `image` mediumblob,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_520_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `dateNaissance`, `genre`, `pays`, `image`) VALUES
(28, 'test', 'test@test.fr', '$2b$10$EzZHTgPI.MJpnzWI74984OimHTT/bILF9FSo.CmVVglCOOVbvdRr2', '1993-12-20', NULL, '', NULL),
(26, 'Dylan', 'w.dylan59@hotmail.fr', '$2b$10$3fc7rLcHsWBDkRKVOak1V.I.gE8sVVQYeR2dHHeqCBgUXi4KHShpi', '1993-12-20', 'homme', '', 0x524946463642000057454250565038580a000000180000007f02007f0200414c5048571e0000011c056ddb306df8d3de1f808850d8b66d83ec9db45f3800803390a740db01d4d405ad0177f0b4acf7cc0b40f6970bbf65badb3e29929b5f5797e1d6cc4cb791994566cc9599d93e85abcd1c3167f7e87f30d346ca4c6b478ca1329d2832dbabeaae5fa4d9990e2b8a8809c0056d9bb2b98deeee7e4791e2294b0ec38423a936a07022580c995db596a1349e3073242d861c342c987d148691ac7261782563a9ccf668d1655758c6714832ec5a7fbfddcf818efd7ddd7b141113800ddab6656fe35ccf733f92bdc525990ba6c540399c8530ab64cbe5d6aec7cbccbbd666d6bf02e5d6c580928236a478260e8f6199e9db8d6c7d8672ed911285ecf53cf77d5f3ff429f4bd6fe12e45c404d02253caa50c948c67b870e895270d0fffec874747c7272626ee99ea76bbdd593ae775ce76bbddeed43d131313e3a3a31f1e1ebefc55af1c5a886798cb4029392544c794a5949231ff4b569f39b2f9ba3f7bf00b878e9ea87c819f3871f4d0171efcb3eb368f9cb9fa25983f975224a78890b29422e89d874eb97cf3276e7df89119e5333533ed6ddef399794fd3de66ce67aa338f3c7ceb27365f7ed28b337a4b2992531cc852043d65c5399bb6deb867f231ce6f5a6b553377e70bdcddcdb4d6aac6f9a727f7dcb875d3392b043da548fe2fbf904c30372f3f7bd3efecdc7f8cf36aad55cd9d8de86e5a6b55ce7b6cffcedfd974f6f28cb9622974ba10cd02072f7bc33b6ff9ced3ec69b556356743bb69add5d8f3e9efdcf2ce372cc3dc6016435f0bc912072f5ff7a1b16f3ec9b956ab9ab315ddb456e3dc27bf39f6a175cb3938590a7d2c244b00cb5e3277c1ee0774b0d56aced675abd538f781dde79cfc926500c952e85b215a02985ebbe58abd55926aaee66c71b79aab24d5bd576c593b0d902c863e15a22580e9376cbdec6e1decd9ab0661f5ec3af8eecbb6be611a20590c9d292403985ab3f9f27b24a9662f5583b216cf5592eeb97cf39a29004ba11bc5940056bd7fdbcf24a9662f1aa8c57395a49f6d7bc72a809462078a168143de7ae67f6649ca5e34708b6749caff79e65b0f01a2c5ae132d00339bb6fd4692722e1ac825bb24fd66dba6192058ec34d102b06af3950f492ab9540dea5a7291f4d0959b5701c16277891680d59baf3d20c9bd689017774907aeddbc1a08163b4ab008bc7cf3751349d9ab067cf52c6972dde6d540b4d045424ac0aa4f5eeb92b2570dfeea59d2816b3ff94220a5d03b52029efdae1f1e9094bd6a2456cf921efdc1bb9f0da4d43182053864e3f6fd92b2578dcaea59d2feed1b0f8160a14fa404ac3fe75792dcab46687597f4ab73d6032975879002cc6cb959927bd568adee926ef8e80c84147a4234e08d3bf64935178ddc92abb46fc71b018bbd202558f1ee1b25e5a2515cb2a41bdfbd0252ea0021012b4fdf2b15af1acdd58bb4f7f495400a6d2f1af0c6ed8f495e34b28b4b8f6d7f2360b1ddc50887bef74649b96a84d72ce9c6f72e8718db5c0af027ff7ab754bd6aa457afd2dd5f59092135b79002bcfea289e445a3beb8f4bf17bd01420a4d2d01875f2929578dfe9a255d7938909a594890e6ae91aa5735c1ea55ba662e410a2d2c24b0b905a9b81aa2176961ce2085d61512d8dc1ec95d8dd15dda33679042d34a904e5990bca8411697164e4990da558ad8dc82e4458db2b8b43067c4d4a6628063f7485ed4308b4b7b8e8518db534c70c455921735cee2d25547408a6d292478dd4ea91435d052a41fbe0e52684721c12b7754155723f5a2bae3959042234af0ec0b1e53753554af7aec8267436a4131b26ceba2e46aac2e2d6e5d4a8cad272438e94e295735d79aa5ff3a01526839c160fd4ec9ab9a6c7569e77ab0d06c12cc7cadc88b9a6d71950b6620b5991859f2370f4aaea6ebd2831f5f428ced25181cb3477235df2ced3906acb524587d8994ab1a7075e9921712524b0989257ff7b0bca81117d71fff2692423349f097b74aae86ecd24d7f09a98d84c4532f94725553ae2e5df854526820066ffbb54a51732e45bf7e1b58eb8891e75c2c6535e92c5dfc1c626c1a06ef59941735eae25a7c3b58bb8891d53f955c0ddba59fac26c64691e0a3fb95ab9a7675edff28a416118c999f48aee6edd24f66b0d01c126c5c54ae6ae0356b7123a4c6604c7f5d72357297be3e8db58418d970874a5533af45776c20c66690e05359594d3d2b7f0a521b08c6737f281535f622fdf0b95868003170f403ca55cdbd663d7034218e3ec5be2c6535f92c7dd9b07197142b77ab1435fa52b47b2516465c84937eafac865f397312c4d1664c9d25b99abe52674d6123cd5879bdbcaaf1bbebfa95d8180b91137fa7ac0e98f5bb1389617425384b727541974e8334b28cc37e20afea84d5f583c3b05165bcea2e6575c4acbb5e858da710d9f488b2ba62d6239b88612445384d2aea8c453a0de2284a2cbb445ed51dabeb9265a411643cf3166575c9ac5b9e898d1ee3957b95d529b3f6be121b39c6710fcbd52d5d0f1fc7d49809894f141575cca2f20952182d11ce512dea9aa5ea0c882325b1745e5ed539abeb1b4b49a32471d82e4dd44127da7518698418cfbb431375d1ac3b9e878d0e63ed7d727552d77d6bb191611cbb4fae6eeada772c362aa698958a3a6a9166991a11c6ac4a51572d45b3d85808c6a754aa3a6b2dfa14164641303eaf52d55d6bd1e7b1300242e454e5aa0e5bb34e2586c11722df5656a7cdfa2a310cbc18995756b7cd9a27c6411703f39aa8e34e344f88032e3235af89baee44f353c4c116c3f2ddcaeabc59bb978738d0424cd72babfb665d9f62186421b24d1375e089b611c3000b91796575e1ac7962185cc198d7449d78a2792c0cac607c5b1375e389be8d8561657c5e1375e4893e8f0daa293eafacae9cf579a606d4149f525667cefa145383c99855aebda966cd6203c99855a9eaceb568161b44c6d12a551dba161d8d0da0c4da7da5a84b97b26f2d69f044661655d4a98b1667880327b2fc2eb9bab5ebaee5c44113e2b25d72756cd7ae27c4306082b15d1375ed89be8985e132c5399aa8734f74065383c5f8b8b2ba77d6c7b181621c23affdabba8ec1064962cda3a5a88397f2e81ad200893cfd1e1575f1a27b9e4e1c1c214e2fc8d5c95db73d218681118ccb95d5cdb32ec5c2b0304e535647cf3a0d1b14c6c99aa8ab4f74323620126b1e2db5afd5f2e81ad2608861c5cf54d4d98b7eb622c4811012bbe4eaee593fc4c23030ce565687cf3a1d1b04c6f1cab5c7d5ace3b1011079e1be52d5e56bd9f74262eb856437cad5e95d375a4a6d679cadac6e9f7536a5e5121b95d5f1b336425a2d63e51f4bed796e8fad4cb9c59294cfcbd5f5959f4f92daabe05a6675feca6d28ad25b88455ddbff212484be5b4fc885bff333fb23ce5564a05f751f9ff0095f7a1a4362af8102b4360e587505a48709aa9c700573b0dd23a49be778ac620689cfa5e496d5370032bc360e50d282d2318666520ac1c86b44a4e4ba7cd2381dbf4d2945b24153c406528543e8092daa3e0cdac0c86956f46698d9c563da51e0d5c9f5a95725b081ea2321c2a1f82b444c16fb0322056fe064a2be4bc74da2c22984d2fcdb90d04775219129577425a40b0819541b17203a4f1527ee93f9b4505b37f7e694e4d57b09d9561b1723b4ac309ce72f5b8e0ea67411a2dc9e0d7690c8cc6af0f4a6ab282f7b3323456be0fa5c1725a7d4c3d36b83efec3293797e06e2a83a37207a4b1041753191e9517431a2ae5c18e5b7c30ef94dc5005ef66658054be15a591725e32631621cc1e5d9c7313096e606588acfc134803097eaa2a83a4ea4f411a28ed629ce0aedc3c829fa7324c2aaf82344cca0b0eba050a9f5c9053b308de4d65a054be1bd228292f9a318f146e338b736a12c1765686caca3f863488a453ab79ac703bfeda240d823ba80c96ca3bd01c821f3763b834fb71485364eca2c60be52ee48690741e950153791ea421b0376aec6d08c1309521537931a409f2c0b7e34667203740c1089541533982d27fb9743c6e78a7e4be2b18a1326c2a4750fa2ce5d2f1c8e19d92537f158c501938952328fd954bc72d7298774aeeab82112a43a77204a58f522e1db7d861de2939f54fc1062a83a7723d4aff647cd9e3877f06b96f04e7d1183e8de741fa25a73dd4f8a1dc83dc2782d3680ca0e63f01e997dba911a4f2f63ec958abee11c45dd722f743c1f5ac0ca195d7a3f4414a2f3e4a8f21cea32f4ee985a7586361102d5c83b697d28f1e47fcc7949acbb8959561b4f256e4f6dea7c511e3fbcd49ba64e11e47dc179724694bf12a8d81d4f82ab4a9944edce71e49dcf79d98524b8ac759184a0b1f87b624f2ad4713ff56a4a18c5b59194c2b6f456ee9035a3431bedf90e082ff184e9d7f9d056945b193164e68dc096d25a5ef58e249e1772935927163ad0ca8b5de88dc86629d16518cebd026521a6db04694ca8d514a2d28b6b330a4166e87b62098b9c514f377911b4838e76f7a4c71fe7d0ed2708ac75818540b1f830e27d84d8b2ac6dd90c104e3857b54715fac4286524c680cabc649d2a1247dcd12570ae790810457bb7b5c713f7c296418c573340656e3143a8ce02b96c85238870c22182f9ca1d51763c8108a092db61827d021047396d85238870c20585db8c716f7c52aa43fc594c6e06a9c42fb137cca125d0a3f85f42638f72f06d8bfce85f4a5b88f25be14de07ed2be36db7f862fe16724f09271ca2c717e7c6083d67dcc3ca005b7917723f8a755a8431be09ed2525f99535c254fe2629f521189b7b8471b731a40fc533348658e333d03e32de8a336f21f78163f6b0c698ca3dc7a047c1159561b65e01594e31a14519e304ba5cc62cd2cc9097c3ca3ed62853b96f054b676cf2ca305b7d13f2328a292dce18a7d06532662c71a67086bc44c2681f6b9ca9dc3742ea26d84467a0756e8274534c6991c6388576cb98b1449ac21972a784d15e7aa471ee1d2175115c5a9ca1d6cba5902e8a8768b1c6f810b4dbae78b3ab9b60ce126b0ae7900e82537fa7c71ae7efa7428e94b19595c1b6722bf291143b68d1c6b803da652ce28c3d9394bf458b36c66fe5344fc292a719709f5e82d44bf0465abc31be01d2abe05dacf1a6f2dd28bd04e331e756482fc87e5abc313e52d03363e5717abc711e5b8e3447702e9d01d77936644ec146d68853b911a5d7ef449ddfe925b88f1a7194f7410024c8142de218a70409c858769c1e719cc797210382b3690cb9c6b32140c146d69853b91165ced571e7ea5e37c79d9be764eca2c61ce52e64242c38488b39c6c9012061d12c3de6381f5f8494713203efc9c8824b6851c77809a4600b6bd4a9dc8232806d91671b060ac622cf184ac66e6ad451ee4606266951c73809e007a7e951c739fd83c09aea71c7eb1ae04c1ac3aef14c603d35ee28d7035b58e34ee516e09ad8730df0e7b1e7cf81fba97147793fca1762cf17cae0615adc311e1e1c3a127b8e0cbdaad2e38eb3beeaa413b1e7c449c334065ee3f055d1e7aa75d167dd566ae4516e1d8d3ea3f1673cfa8cef883e3b26a2cfc45dd1e7ae9dd167e7143df238a7bad1a71b7f0e449f03fba2cfbe5906df59865f8f3ecefff7ff7ffff7e8e30cbfb3d167761f3df238f71d883e07bad1a71b7fa6a2cfd44e6ae451eebc2bfadc35117d2676449f1de3d1677c34fa8cc69fadd167eb3a5ae431aebb2afa5c351c7d864f3a418f3bce1327bdaac69efaaaa123b4b8633c32347838f61c1e2c5fa0c61de5170aee8f3df7037fce1a772aff1cb826f65c036c893d5b80f5d4b8a35c0f9c498b3bc6338135d53deab8d735c00f4e33ee70fa07014cd2a28e7112c8d84d8d3acaddc80563ac51a7720c6500db22cf360c146c893c5b500497d0a28ef11248c6c90cbc2723272c9aa5c71ce7e38b9012161ca4c51ce3e400808c5dd498a3dc850c14dccc1a732a6f46997375dcb9bad7c6b8b3718ee06c5acc319e0d0132961da7471ce7f165c840824cd1228e714a900008eea3461ce57d100028f81dd68853f93b28bd7e3bea6cec25389f16719ce742e664fce8717abc711e5f893c0728fb69f1c6b85fd05b30ce1a6f2ac721bd0ade1573de85d24bf0465abc31be11d22b61c9d30cb84f2f41ea8594bf458b36c66fe584790bc658a34de518ca33d911717674c9d8ca1a6d2ab7221f4970eaeff458e3fcfd54c8912098b3c49ac239041d15bb68b1c6b80bdaeda178f35037c1a5c5638d974b215d12467be991c6b97784d405193396485338434667c59416698c536837c1267aa4716e82744b18ed638d3395fb4648dd90316389338533642ca998d2e28c710a5d266393d738537d13f232c0ca3ed62853b96f05cb677c428b32c619f2728a69a4994097135c573dcab05e01590e387a0f6b8ca9dc730cfacc788b16638c6f21f7a1588b33cf40fb105c6aee11c6ddc6903e52925f59234ce5af92521f50acd3228c711d8a5e33ee618d3095f722f79370c2217a7c716eaca0ef8cb7dde28bf95bc87d29ee63892f85f741fb129cfb1703ec5fe742fa82e05396e852f82904bd2ba6b4e8629c42fb13ac2edc638bfb6215d21f047396d85238876040c584165b8c13e81082f1ff1e5b7c31860c01c137ac91a5f04b080655bc408b2cc667a1c308ae72f7b8e27ef80ac83090f4354b5c299c4330b062428b2bc649d2a104e3c31e56dc17ab90a120f89425aa18774330b8e2b1b852f81874b88473fea6c714e7dfe7200d07c1cc2da698cf206850b19d25a6146e87b690d2688335a2546e8c526a018a755a4431ae43d164c68db546945a6f446e03297dc7124f0abf4b098d2a76d2e2897127b415c105ff31a0fe7701a415647c408b26c60f90d1d0adacd1a4f2d69620f2ad975852fc5b1134ac789cd1848f435b4ae9c47dee91c47ddf8929b504c5abb448627c158aa6255db2708f23ee8b4b92b4858cf76871c4f81e329abb8b358e54ded51e52fec94b1429fe534e685eb1c638c235687b29bdf8283d86388fbe38a5171e0aae678d2195d7a3a00f33d6aa7b0471d7b5c8fd00c1edd408a2bc1d823e398d16418ca7f50b72da438d1fca3d29a34f05e7d1e287f13c48bf20e3cbaed143fd33c8e8db820d8c1f5c8fd23f29978e5bec30ef949cfa070523d4d8a11c41413fe7d2718b1ce69d92d1d70523d4c8a11c41e9af944bc7356ea8774a4efd858211460e8ea0a0df73e9b8460df54ec9e8fb8211c60d8ea0f41ff24087163394df1ec868c08275d4a8310c690208f6522386722f040d715ed4382f350432f652e3857217321a52709a59bc30fb714853407007355a28ef80a039d2a9d53c56b81d7f6d6a1008b6b3c68aca3f86a041535a346d1e29dc6616e7d42428f810355228df0d41a3a6bcf0a05b9c303fb820a76681e0e7a97142f9f310346d4e9fa54609e5ae24685cc14fd538517f0a0d04c10dac31a2f206081a38e725336611c26c6649ce4d848277b34688ca77a3a091531eecb8c507f3ce604ecd04c1c5d4f8a0bc1882a616dc4d8d0ecabb2168ec9c561f538f0daec756a7dc5c28783f6b6ca87c3f0a1a3cc9e0d76991c1f8f541494d06c159ae1e175cfd2c089abd603b6b5ca8dc8e82864ff9a547cda282d93fbf34a7a683e097a951a1720304cd2fb8931a13947742d082392f9d318b0866d34b736e03146c618d0895bf818276143c448d07ca872068c99c563da51e0d5c9f5a95725ba0e0cdacd1a0f2cd2868cd54f0003516281f4049ed819c96ce984702b7e9a529a34d0523ac91a0721882762db881350e54de8082964df2bd53b428609cfa5e496d03c1b9563d0678b5732168df820fb1c680ca0fa1a08553c12e6a0450ee42496d849c961d71eb7fe64796a58c76165cc2daff2a2f81a0ad0bae65ee7d95d7a2a0b59394cfcbfb9ef2f345527b2163e51f4bed796e8fad44469b27362af7bcac8d241edf8db395fb5dd6d9188ff321d98df25ee7bad15278bc23f2c27da5f6b95af6bd90c8e3bf71bc72ed7135eb788c21689cad498fcb3a1b631086c495f2fee6da450ac380189efa6b95de56f4b315213214136b1e2db5afd5f2e81a12c3d1385993be36d1c91843d2384db9a7659d8631288371b9723fcbba1c0bc38210a717e4bdccb5301d03433332f3804a1f2bbae7e9448667e2d593527a58298fae2131448d63e5b57f55d73118c3d4f8b872ffcafa38c6509de21c4d7ad744e730c5600dc6764dfad644dbb1305c0869d9d5f29ee5ba7a590a0cd9c853ee92f72bd75d4f21326c13cfff834aaf2a5a9c213274136b1f2ea54f95f2f05a12c3d7385ea5f6a85a743cc6103666e5b53fd5a2598c616c9ca25c7b53cd9ac518ca537c4eb937657d8a2986b3f1794dfa52d6e79962481b5fd4a4274df4798c411d8c794dfad144dfc6c2b02224e635e94513cd6381a11d22f3ca7d286b9e1818de217291263d68a28b8881211ee3d21b95fb4fd68d4b6364984796dfa0dc7bb26e584e64a8479eb84d93be33d1b6271219ee11e635e93913cd4364c8c7c8bc26fd266b9e1819f621f23de55e93f56d6260e887c817956b8fa959a71203c33f243e2faffda5167d1e0b8cc1609caa527b4b2dfa14161889c69c4ae92ba56816633c1ab352e929459a658a31699cb05fde4f5cfb4fc01897c6dadfca7b89ebbeb51863d378d19d9af49189ee7c1ec6f8349e7ea5263d64a22b9f8e3146134be7e5b57754d7fc5212e334c239aab56f94aa7320325643e213a5969e51543e410a8c58e3b8ff93f70bd7c3c7618c5be3b5f729f78aacbdafc418bbc6f36e57ee1359b73f1363fc260ebd445efb43755d722889311ce134a9f486229d0691711c229b1e51ee0b598f6c220646b3f1aa5f28f784acbb5e8531a68da7ed94d75e505d3b0fc318d709ce92bc0fb8741624c6768c9cf83be51e90f5bb138981116eacbc5e5e5b9fbbae5f8931ce8da9b3246f7b4a9d358531d6239cf47be5965739731244c67b52acdcad525b5d2ddabd120b8c7ac5fe59f236e7d23f1bc6d88f81a31f506e71590f1c4d888cff603c77a76a696da56ae773b140134cf0a9a2dcd6b2caa720d10a63e08d77c86b3bab4577bc91106988c6f4d7256f652e7d7d1aa32d26386551b9b6b09ab5b81112ad3118333f91bc7db9f493192cd0200d3eba5fb9b6ad9ab5ffa390689331b2faa792b72c977eba9a186996061f5994d756555c8bef01a365c6c8732e96729bcad2c5cf21461aa7c1dbef532deda914fdfa6d60b4cf1879fa8552ae6da966e9c2a792024d34c15fde2a794b72e9d6bf84442b0d89257ff7b0bcb4a2e27af8ef9690020d35c1ea4ba45c5b50cdd225ab21d15683c15fffb7e4edc7a53dc780059a6b8c2cf99b07256f3b2e3df8374b8891269b60e66b455eda4d7195afcd40a2d50683f5d7495edb4c7569e77ab040c30d094eba53ca2d264b779e0429d0786360d9a717256f2d2e2d6e5d468c34e004cfbab0a87a4bf1aa72e1b320d18683c16b7748c55b891769c76bc102cd3824d870a5e4a58594225db90152a029c704475c2579691dc5a5ab8e801469ce31c0ec1ec94bcb282eed391142a449a788cd2d485e5a45716961ce8889669d209db220796911c5a5855312245a764860737b242fada1b8b467ce20051a774860730b52f196e0455a98334881061e12a4b91ba4eab50d54afd20d730952a09527e0f02b25e53afe6a9674e5e140a2a58714e04f2f9a485ec65d716972d19f424881d69e02bce45fef978ad7b156bd48f7ffeb4b20249a7c8af0940fdd2a29d73156b3a45b3ff4148889661f0d387cfb639297b1555c7aecb2c3018b34fd908095a7ef958ad7f154bd487b4f5f09a440fb4f0956bcfb4649b98ca39225ddf8ee1510139d301af0c61d8f483597b15372951ed9f146c0221d31a4002fd872b324f73a5eaabba49bb7bc00420af4c69480f5e7fc4a927b1d23d55dd2afce590fa444978c16e0908d97ee97947d6c7896b4ffd28d8740b048bf4c0978f6bb761d90944b1d0bb564490776bdebd9404a74ce9022b0ea93d74952f63afcaa6749baee93ab8098023d3458005e75ea6d1349d9eb90ab9e254d6e3af55540b0403f8d1680d59fbcf68024f73accaabba403d76e5e0d048bf4d66800ab365ff990a4924b1d56b5e422e9a12b37af028245fa6cb400ccbc6bdbfd9294bd0ca5e25992eedfb669060816e9b9d12270e85bcff9cf2a49d9cbd0299e25a9fee7396f3d148816e9bfd112c0cbdfbfed679254b397a1523c5749fad9b6f7bf1c2059a41787640053afdd7cf93d9254b3973a2c6af15c25e99ecb37bf760ac052a02f87680960fa0d5b2fbb5b077bf63a0caa67d7c1775fb6f50dd300c962a04b876809607aed962bf65649aab99ab7995bcd5592eade2bb6ac9d064816035d3b244b00cb5e3277c1eedfeb60ab6ade3e6e5a8d737fbffb82b9972c034896025d3c244b1cfce4751f1afbe6939c6bb5aa793bb869adc6b94f7e73ec43eb9eccc1c952a0ab8768163878d91bdef977fbbecb9e566b55f3a672d35aabb1e777f7fddd3bdfb00c7383590cf4f9904c3057569ef7e6dfdbb9ff18e7d55aab9a7b33b89bd65a95f31edbbff377369db75230572c057a7f9622e8292bced9b4f596cf1d9ce5fc566bad6ae6ee2f347737d35a6b35ce3f7bf073b76cdd74ce0a414f2992110653965204bd07874eb97cf3b64f3e3cf9b8f2999a99f636eff9ccbca7696f33e333d5c7271ffee4b6cd979f323488de528ae4848098b2942209f30fad3eebd7def27b7ff6e0170e3d7aa2f2055e4f3c7ae80b0ffed9efbde5d7ce5a3d84f993942239213aa6944b2925e3192e5cfeca938687d78d8e7e7c7c6262e29ea96eb7db9da5cfe79ced76bbdda97b262626c63f3e3aba6e78f8a4572e5f8867984b2925a784ff8c040056503820f622000070e8009d012a800280023e6d369849242322a1221568f8800d89676efc102d7a1f05d3e8ffe8dee7a8f14092efe9dfcb7f6bdf21e47fb97f61fc60e929e31e8ebe80309afe4f25fd6bf377bb4ff2ffe9bf947b86fec1fddff55fe003f61ba41ff64ffb5ea03f97ff8afddcf79ef419fdf7d403f6ffd673d40bfc77fd1f600f2f1f61ffed5ff67f77fe00ff97ff8effffec01ffefd403ff6fa807a9bfa27f78ff31f8dbfa01eb03f76ff75f8fbf877dfbdf03f69bf4f7ebd2f5f6f7d9ffb19e010ebbf30e605ee5e7aff73e64f7ade122fac7fd8f602fe69fd0fff3fb44ffa7ffd3cb8fd93ec09fcdffba7a767b16fdc9ffffee35fae7ff90435f621dd7d86736e410b61ae510e73b37601399f88248334e1bdf7ca8c8aba9fe3d1fdb2c9aac3527e6d9e50daf2423e020ab83522677e71e37ab89a55c758c7d88775f5a5b82ed561e4d7b002fb026f7e2a159d5ac78cf14d638fbec02c965e1e7dcbd5c5633f90eebec43baf7e5e6860fabf200f6f5062a1530fbafb10eec980fa971fb98547df33aaff9b6f281d2534ab8eb18f827dd36b73238b95b9576ae3ac63ec43bafb0c40a993035b2217b897f1cdf447c7ab89a55c757fc51814bd8659762ea4d88775b67c67eddd05e36b3ccc6a0103d6f83ec43bb8031eac757b9cf35f516d753d3040479121114ef5d9d9cc745ebba7f21dd6aaf95155a23073a8ec624a9e7d4561eb61e608f21d1f614a23758fca35e6c3b12a69571b48990ced2d65d4039f621dd6b6bb232d19a8a4a6dc12f7771764de8d5c757e3b113507fb485e67b79fdb3f90e8629fc2f3974c40219d62b8eb171acdff4c2a9a55c7580818c6f9c7f134ab7f4761e96ef6a1aa9742608ed0a58cc33ae023c890e0e86908adaf6ae36b7481893f95c4cae2671eb5eedef1e56c4f1be2d02db45a5703eebeb6936fe6e224a695703a03f377dc8929a17681ced7ff0c0b196059118c4791253437072313746ae3ac63e083d146fc4d2ae36130fa3d8f564d78f614e778cb7092e3ac63e10c93f171d0d631f6213e367bebed5c75846692886739267da4a528dc748eaaf795c4d28a181244075ed5c758b7b67fac5d7d88775a2ed63da4dd743fc55f2223ca47ec43bafb0ce067ea3f9a55c758057c03ecd97f21dd7d6bca236751c5e8883314461b35ffc8775f621d132dd10a6a2631f6215291d2fcdbe8e3ac63ec485a73a4c4e973a18de7ec23b1dd7d88775f7b96a2b1950eb5a6955ed31873f72a695c4d2ae3ac5b7fc010bb1a26866269571d631f6a3c9dba5674ea5b9e0df97ffda7fd78fe43bafb10eeb52402e799dc2608f224a6957272b7a6c06c524c4846b5abc3fced69fc589162557134ab8eb18f8285673d1407f21dd7d88775f621dd7d88775f621dd7d76fd30fbafb10eebec42d0e44676c5853f90eebec43bafb10eebec43bafad73af72f5803b24850e67490c80b2bdea75ac353d9f2b33f880f845d9ce3912534ab8eae6e37fd38eb18fb0c906b32f6feeaab897e10a8310f5fa4dfcf37d9767a3b457134ab8e57de432ed6031f621dc826f183023ac7224a6957265e560c0a690d5bbfec43baf99a46a6a173b5ccade570e43d57b7565d2929a55c758c6b181d5467dd279dd82022e84339c7d3e64e1ba71534aae1d266832a89e4ae269571d631f61935e3ccd63472aca9a556f799964eddf20deb8348346c43a1ae8a90aff19dc2d7d88775f621dd7c13f4535e69b3621dd6944e9f20c5ab86bda33d7bb2216eea688a4664a5fabc4d2ae3ac63ec43bad54d48e7439717fc38e645043c3f484d1094ce13b0311d96da48fb10eebec43bafb10eebe11c51e66cdc39e3f0c18e3a4136b77cfc009e15bec44fd8c3e9a55c758c7d88775f621d15844806d2ac507905bbb8f4a850f4c8dcdef0d38cd653d8648e1315f0775f621dd7d88775f621d10207f40b9c046b4f1ba81c69cfd50792c7e249b070645c5a56b15a1ba268268309867f21dd7d88775f621dc7ff3af94ad2f2e05c62629cb8ea7b65823ecced2850b91db6405b4f1515d788929a55c758c7d86493fc1067ae313c55e94163b2ccc6bec32e7812933cd684c79fc2e21f44cbbc1d52901791cd2ae3ac63ec43a1ac074a4ed4795bfd576c258048ef2b86f18908d80eebcec0a49dac8fc657715c40cf120f17441d5c4d2ae3ac5bfbdb0fef9a5eacb43e8aa90a2024b15f082f01b0479120cdf4b986b0da9eb29ccb22d8c7f303568754a4f998e8da13f90eeb53394e5ddad7ef3b69fc64e040b5d9b705ec8fb18fb10ee37ab17290ce5524b31906cf8eaa0ed1e77ad285cd02c536eb4b289b91069629390012fbd48ce0ba19943b983d5ee5dae10c13c6660e05876ddf672ae3ac63ec439f9f15eabeadc220bba575c54af6657fc101291a7cb88f362e06eabaa233ff67e32a0413e3588775f621dd7c43a09bba2d0573a3104b7966b24fe57134ab8eb17a01b47a70820e507fdad3398cfe43bafb10eeb690d809013fbe7831e332be62377be2cdc1ab89a55c74e20b4c70f27ff956d2023c8929a55c758c7d6fb242e10f4472ab777eefefa0c18e69643b8253878732d10a588f22d84ac42e8854a0bef3fc1881ff6d307056b3c2a9a55c758b6000fef55cd2f47d48a76d89ab58e506cb16d3e392b7c87667cbd44e0d29ef1e6bae35ac54ead7f41796141aa2cc67bd0345152c4fa99f66968ab8f4a20094bbfa7ea2ae8a8820ea872e099490261f207dbf1654e7185609bdf33d388bbe279846a72ffbe03bdac44ff55ef756a0d0fd12d891fe98ea2a2991914fdd815aefce2e53daf4aa7ce8165c1bf90670af0e84a00af698d72710227ec1d583bda42c1504cabbb8791fb6696477040790fbb4b32fd2044f480920dacb257650116b3e4a701aa4d48ec69e1d2aacd6e3f4027cf39156f2ad9202b41a4c87c0980d75966fa34f07f70ec2c95c87674178bd20c5fc5f56adf7caac32f87998a5f224d4293ac950a3307c4410fb8aff1d2a1c27a864d649446c74bcf0bfa2871224df06293144895c3537c5d246fb4187543562420d2d231d345b6e4b3583a3fdc7c8153a4785f3308079750aa7782412f157bb1d819d1d92560ca2cc832d9c3629b6a6758a1683e6a3dcb18b15265a2d36917d279178def2113aa6787aabc8771b87e3582c4a1ddadeecaa6982cef0da69b653113c48173c67a9c28d5f35a39737161d0fe0bfe8ff83b2a7fc6b30ea17674d2a0206bae328f33bec93075383dfdf1efa0dea41fd274b7cfae744c11a63807e7cf78220a6fc91c29ab2f8139f1922bf12e413f667b0666e6f77c243c39dbfbc33d44aa8634dd4d8ec559c6b78096e107851292373eca98f4bdaa54656328aeb91917b1649ba60a0d182bf4bfb50bb53d7b3f00f8da5fd667e3b69786c429bfe0937e9c8c080b64d419f8943883af7be84c0f650c905c0d03866121e8f4ffe9f105bdbe5af1274fae91b36ec1e7c2d86066c0f29c82d20868b0006d74ac27a46631645f6deeda8ee9c8ffbd06d9be1c160765e2c5a345021e265f184d926c0d2fd627562623acc6cdb81799c9a67a1a8e4c3b8e7a56359be02f413fbde8937991135924416a7975120f3cd5d9e502e156d40fd8fdb157117856e43044c0ee1235d6d6846ff601f78604b1929c324f05fb9cfa744367c816e80c11ac44f1b3fe13f3e4a709a8e1a5bb50b23391ac5e2741369f19cb4fd5cc5ded8089a275f7472f4d38604151dc47442b3eef94e16cbc988a7410bdcd9ac68cdbf9a438c234b158c0eaff9098e7f32a104cf46b540b7ea1b94426d3235e0c5722156bc662398d4a223ac3b9dfd2f868b88d06d000071ef2e4c666b61a3313b98c1a9abc46327e1167f0fabb90b57201df56aa2180c78e88c3510316ff25169a4b536818dba359f8f9c8833c73ea98c4bfc6dd33e9d6812b9119a41f5cfdab84a951f607704e2f900247f6b54fff9d8fcd312359b403f299fcc8c0338556380fd20d55600ed6a6212efe0f382e2e9704fc68318761dc70db9c25e1cd13593f3e767d41d3d93ef1a6048000f68a0e54497ba9d0969697009071600831545edf26cdbfda2278c2510a093331bb23ed2500003706843a31cd55fbe4981619e524f2982a9ce81dca7054cb5ff41ff887200061e2623a796b7aa0fc5fde468f377b6e20564671cb4db81602f4e75231f4d6fbe4b3f212fde33cc4e37f3cfd76db4f93d2a1ddceb30ea32edee91ebdf4bbb9d6c567c3c12cb5563418152181ba0a5a40abf87e18d43a08ab84e668bc0d48a62d748cfe52181aa340bf06b642e431e0243b23b5657bc5de91f38413517b495c307dba4aa60170314b9ccf9bd04b0c9d1a3490d222cd1b3f1ea49bb0e7c1a5a7ce309f491aeff59f2d1f9e41c556127bcd8bc8a074ad20cab5578378108ab85a63058a6b787f0177d77a8fc84da0fa1b3cef76a4e0c60a92f4cebf821d1c46c1323ff0e86365b89dcbe2004428e5a1ace6ddaba6971ac83fd64f6a052190cb08261b9e31554930179b29d28312a293ba4e9c6cbccdcb20afdca0ee7494dcc6bed41f26f28fdf29d01ceef1b65fef47f0ccc5791833b55f793d87639a1464cf080e542d9a4bb480359cec80fb0c7a8a369555fc474cdabffdeb4c50353c2f423852cae41e5301455818cd32a5726b0607b7476992220c04823d930e476a0ad91763249acd7a3a263dc3f217a61bfa78815790571f67188fe002617a4cd6bd8af9ec31523b359aeb9a2a112fb80da26d2352cce98ed6768af147dda03cbf8cd23de06d86316a399be4d6d8037f86e2cd57f71cead007da47641481834dd9313ead2fcf8a5d3c6f012c094a6529b724472c97128bc07eb5a5f3e0a4c982cfb634701b7a69b2d043ad9027843eb6aa4c24c9e3f25a9f35f581301771021e449c23c95ee47b2f491e78080b7f728fb08e9a64dc4aed00587ae13612711638e05284849051c722930d76e2598743ea5d903c4796f58ba17d3803b357df1f55bd8ab6bd18967b172fc36c7fc90c2ac15da2d07a7141b6b6f8f0a53647cd214d106b0d8eaea007dc7860c16fb028e5e9aa7dcefb6d9413407a74ac4cd00daff010e39e886540add2b401eaba8330a174a9772a9e305fb40f966dc69087819612742b7d30a9a7e065b26833e7d81278d4c51876e53db37da1d754db35f00d12475ef1c37383157f2c74aaf3efd69b774e344c0b19faa8a639b9394e7284b0d6919858806f9a520644d984e45f8017e4b81a8ae9c23b84c2927b3c744a650f1a76a43d00f2936470432629bce90c67b11d9419c8d4ea8cda9f537a716c768f9cb1f6b4e7f4abfa7b4caac6d1af671be182466481aa88887620cc033adbae863454af57c78fe332ac7d63296df9e9359af6f1da958d8fe31fb81ad9d4216a6299632e0eaf0324ac6493a7c0573ebadca3594c46886bf1d2bdc65298b83bc76dd0f9e9aca3f09dcc64013c68f43f7039ffaeafae1bfe40c880a6564e79ac4e7995d5459292f190c99a2eeb51af57b300e2f4ef2887f792b3f2d7430e0e0e81b7515ed1eeefcfc6806ce25e2a1853f7897a92ca7047c7b892ede9a6b8a06495052ce4cad18f72c06f3a208f8936fc2e20ba973bf982550456d638713cac3ad39ae0925597137a06418010ac4081acfa610dde53c4d906ef9619620873850e8f42c75a3c87d8d6c1c60f16b272a805ae36f7f57fd943dec739697a99df275152b56bcf24b5a6de4c5eea006ce1c01622db86b491c5c4d22d68dc475b29125e4db412c08fc0cab212ede963c69388d03c4995789b34317ff37aa663041df2252c3e4cefeff261aa3a423d5d736639fcc4f03f138c32bd5a6c23fe6aa0485be9e09c0bbb7a11e274210437c3e5fd7e73545f0b56e2cd61654fc097aa158e9cb0597bdb30d4ed816676dea5b28f9f2ae4d375603c2d9a1b02a5e14e1e4e25c4b7ac8884a37dc7c01e55c54fb982e61e4ce4a58361f3cea0023d5fe0d6ad18a823c4a2e85549c2bb1e1463bae95d36603bb0abb8276eb28beefaeb464b88ec92c548a435045fc295885261adbe45975d4d0800f64c641edbc10344c60401a6715ffc5fd0a01cfe356daf670476e457646272cc962e946fe0a9efedc1f9ed305c6daf9e3ef4b0a797a345e95896ec1d208b18ad86f829d4a24aec39fb6842c93bd4554e7d5a8dd460e8974923c8bedb0e90eb471d2ac4e0f19b1c005fa8d492eb9ebb99322511801fc4557da7c85b8a258a9f9eb8fa7082c520c220d44fd1ca5625f078b8e64f0f4d0a944790e230f2f5f0199feff70ecbfabc9740c1aafe913b5195a5d63b7b59418940e2721356b100bb428331573541a9fce33a3ff60dfcc92f786531a20ba4ff718547c5637c4e13770b9b8ccb45560f39a319b5853a33182340974a989a45c88fd0cdbb99aea6c276946d216b80a8c17653dc72987e8abd5faa2b9201bbec3d5eefed25d0394c5f26581089babac7fd0bf8d878fb7b78aaae68e6dcccb0fe8748ac89f0b15a597c5ecedc89b0f5e973ff461388cc075d4d21cf6ccdfd5fedacb48ba1a94d9910de6fa45d6a0d7b80d270e0509390b3f1d69d6f6131e60e18efca81283fdb6856865ea694902ad56228f2445c0346ea754182281af479a1535a2cab171b2bd3c63b20cad47c08cf71cb208254f526ea4d75e42013aa0efc809035b9154e06622df8696196b222525908379af04464be7ea34625c4d7e3b5ab602534c6d2625d923039c39e914ad2dfaf428c1c82cb2a63b45ce8c4b58679a6bf7135975fd3fe48d9f195bf3244ea2682fb01f8577234c9387b01f185941bf28e51d3dc8624ca792470fe0ff0bbd0ff91706f19cf395e2880bc6f908dbc81735ee59d57f8b0c4d502e294e5672f2ef5208cf0b4e93ccac09526fe39d7c97f516a40b022f505e13d7069ba1357e3fe0b5cd857c9e5d09f9bdb0e4f69e9c033b6f487c72215ce673bffa05895e22b430f9d035312bf737c7a742e069873bf0ee5d6c8f064a75b71801c2490f9628325c5238f1e4c87683910032785c48788b05887589d8bb55e2c466beed91a268ed1c2ae9e165c0665a4b0b3b98ab0ca9dd97174409dcf38b872bd94baa61bf888b4f4007096b2504fcc76438236b07222c0ab10bfe2c48092d4b44e9bee8f3a4880f4685ac42c8b251bfbef82a1668c3c433dde0f8ad530b041a1ceea15b9ed8ad39a49d7097aa6d3c134ccdd24bfac564dd7f2256fb601f2d797f09a83e313ddbfd640cd90e1560c3abd7173a0796fadeed6d9e876ca14ce315ecf0f49db2e31a001064860410323998d733f302b34b7fdb58fe490563e2ed574e9b87109dcde8ec47b19412fe2258bc0004931039e2733a3f568a251a40675a77da5df7f7e0c30553c64a81b1e8136b5061943d6120280bedfd456b1a11896ce4112e7418b53243d6101b0ee898788157fa20312f62ec679d16826b7da2580d2d2fe818f2838389aa265ce4d1d51745fd33e2920cc04b3a33184afec5fff3d210c9cd80a0da980abb49c40058a5192b90f800ba9eaa8082652758b4fa9540f0abc26b53982496e53996b7abe69c21394280d5c00c8742c7d90c0af138b2dea7e557f04004b1abd9529be082924595c5af26a192147b8d08bdb146b8f5d8e245d4029962e98994b7944ee0d5e67fd71ef09c3c6218a84b7e9eb758d6bfe86d85d451e4a63cfc54c0472ce321097f94a0178ea9222a4ece88b1e94c37caa1350202a6cd821d7060cd0b70f1d3c7a6c62062e0dbcf2ef14b0ce1e1f01df0899b26b93724e4c210ef87c0877cdd8131020f49c5741f3a035dd1bbff4abe0d41d0184a6ecc9eb4e557db797de033a98e4176fb747a9d98518b4d361359973554b1bd2c2259e3e55172b41b6d3587c0246b15f0784eaca1183950a4bf75d36a2441866ff44f56ce6a894b26c50cbeafbeb98f049919e9a82f77ed5fd0ea464dbaec9eb92e92008323a232e9849abbe64a524dfccf47e2e87179dadc202bbb7649bc593e00b7c97a05459a33f53bee21ee99ac85e14245bf613ea8e5b2279bf9be2556603b7d26b29abe0de34ea63e523de88a48c7691afb5834ce29aefe159938994212ac6019766ebad27c5a0e1e21760cdae6791918d6a79a5cdccfabdc492c152a72741b5948f8d621714beba2bfa06663d0ac0fa770ed5fb77c5dcb6d797fcce5fb67c441e437dab711103e3dfe05793e06ded2e35e1a4a585880e63367239a4c579d3137c9ee31c9e06425c445faac4d49b6af11145724b0e8a4f1a1ca55d62d90ccc685190ad3b5b7d0498731508919e678ea5f6bcd126e4fa5e85c8b3bce66efe7f49046b83891509fd82b253dd5eb8029bfc9cdb76e392b3b20b76355088351d019cbe8f1da648b8b3c0971039a05e2cffc41c7a7f5384f69bb58b47d2b73cfb3879af24d3ea28359a72fdc7ca64aa232e0b427f0560313c6336c2640f68dfc332e9f7912d12c17066be6289abf4999f7a3cbbb59d143e47429e6444243b3c6f758672d8310c498896b399f126abc1f4f6a44cb57f02c98389d5b03b63fb1740d3dd46070223cb6e334e1dd7fbb103c03721dc61d402b19db00afe67d6ad220eac7a69f9a1e753abe827eefa531b45094b9060515497b2383c3132c8297b69a1cebb2628c660112e4956eeef0709433d8b30bb1c71fae841cd81133bdc0fa77cc9bffffba0df280480dcb8b0bf50a3b011c886bd0e88fed156c47ece772ddd1c41e2f285cd8b4aa6a0c9adfafe86cad4f4fce0d489c8a0d48a70a56421429e29de8730df391a86991cddeb9dcc514b97830626ed6270992f9c47765a8809bcb5be90043f6a1294a8824ef7f5fbbe659a3166b57e4e14c8bd2713cf07d2766f29c432e497fbeaea5c3fd69c768b1b149651be9a9a8a6a90249b15115b9fdd2ff15ffffe5c9bc7eaa0b14ba1e50be5923099f4484e5d573aa7ff2207f55acae2f13dc0d045090b56ac0aee6f1c239a8bff820907f2d75139432bfbc8d629151e91a5df36a544f5dac8e48c13c2e501daced3a64a7cb48046bab08bfd58488afa7de8708dd9e41a80e6547d9051e0744cdca2fed4404677953630260bd51ec8e75dce174cb4da21f60f006ac5b0f91c10918f98f2617e4b62d36b6c4015cb62e1f90a0d3341ea439096c9dabf14a18b185788c1b4e7ac781d79f09788025583327006bd07eb743a581f96caf05daf0ceb47db63fedd80ccc6cc844b8da263006f141942bc89c0be1de0d4ac004fe1bd4fb0fa3c01e90f3d9daae71917ba055120422ba8ef021693bbb2c3084b07ae6dcf913a15d5aefc2227df01dbe1564c9116418b5c41a32d4493cf7666b0100a687b77972a8e4419aabb17f40fac24fcde6a396bf3fd6f7b5f1507c70399c4c1faf8c645f7295b79f29d5fc361bb61dc98bc3f01ed7cee49c963e59e98085099cd73f83dc078b0aaba8b1192cafc7d7b061ae3ce9962edd9895eb0c85f80708101229d0a4997b157ba6b863a4db54cf6a089e1e727f1f652580335691d4f57c5e72f16fe210082e1bd753cd84483a43ae7e636c53d1412823a3c87da388037e264d37bb6c203b9fbdcc1592d7750307c002b8a18bd291d56f756c84b25a4304dd0f79e83dda655d18db7888ff67f173e9a88314457eb797f9ffe3202b329a70ae077f1d873948f3706c0991cad32ce7201ba9b3a39de6d552274895f1c9cf8a8199789579dfdb0603c653f6fb400703efdc1b4276ff9b9ba0f9f1e0d9a82473e12071646d601a094ecd22b12969295dede5e461638e95975c6b329f5714f3ee8a0e47dea23036dadedaa0eafb6d778616386a4ee30997fe1c95cf3e56c60a9eb4192a5f977f9324ac9f17d7e51692da1bd6fa37a90857dd78d54d806abab204b18fa4d01ce45baf5afa0f5b8709ddee252f1b1313548da7450c80d34c0811c5d00eb73c7315094335b1988af57e0367173f94c527e1e348cdf88fd7cd41273a2a2bed5da7cb2a3053c6cff775ac9f277805c0013580f8dffb6a3cc142f018b98dcef73d723f8ca130a92ffe8a45350f63d3eae107218616d17cbdc12c7d9a2ac816ed7e0f04a3fabe5a42094b3aac7aa6067f5447625a5d1245b943ddd7a4165d7003b4c5ecf5f8abb9e91a087e561ed52d0e2a7e3266aed50b01fa91c9dd62a549a9f1217e040d992e33bcf36e86a9e4959ab89a76a8771a297ff5161cdc3355d09424943022a3eb57908a329be505923abf40cb67affb6f36e3f7a08e90e5c0d9ef5598f34f7c1bafe8a6d70899346e817e9f372f19955bbec1f58075da0e272270b13dc192b6a4b57703400abf89b1f55b01f81761f7c614421f7c1a5c83fab07963902941eecec1ce98c0781c65d5079f0f726473a377ba8dd1a5babcf41f6e73b81a4c6b197c37a5ed0b3945b6d73031d9a61540ebf74f3aa07b8b79c73a0726f62a490f443d9a795eaf07a236a776731a16938cf4c72cf6321e29da5fb579bc2f018fd7c23f18bf46fc13a3afc7b00fae49784caff551f9331f5ea35b87584b1e011010e9dd8c1300fbad6920e1e0d7900c77b4d49be4096d01da9a1131b1a64671e296bced0dcdb19eb744fd0f6d5759e0c4e39c35d54a4936a6ccb266ed254d43cb6631a6121354c5800fee0f099de4e2f2ee08763e0edd968958a66c0493c4fd2c653c2f926354d53cb4f4ef3e1011263dafb3da3fa275ed51174cca3c1e82383092a59399a3cf5d95d4f19278135c8d7869b736624366cbb5f63c91ea49906eb1bfc523aef24a7578db87dac2de2c0054063154ced3e4d1dc1b9bc15593fdea580da6dd2ba891239be291287e456ac3107678a5a4b0584ca216db01c73e3319e33f238d62fa533fb2592d8f7e03f7c547e52f8212f26c9a8a99b18d01cc4f66ee8bbe20e02860fa7209c49fa26d9c9379ea757a23a733597decfdf57eefb48150db9e5ac7db624d332f00b591fd70b9a2f15b3418d555542def4109c85ed4e8b641bdac66f755ee18c72d22ecea9218f9a34eea2d7bb03708001ca4251dae31d25c926181e3ffb78ccbca56a2e226893fc4187d80e93ef46240fbce2efed1cd29aea15f0f1ff5cf85880872135897aea0675ed426d61fc6aa13699f678b0274ed6833863e0cee8a4a97f4097efe1393a57026953ec46b2edfd6be97ad653cc9ec1535c814a7883651c4d365a8061420371be3f9b488c43ccbeee2976a72a0fbe65b633d7c0003075217ab076be8579bdfb5938b3b993c0c0cb33db910627b42285fa9c6185733424a40b35a0bb8a64306ec9c03bf2ee2f2af0b213267dc07bf3cf667e485280b5d793cdf8cfa86339de14e21b873a69fa5fd973cccda417c7b486a1554ad5f00204339dba038e1b3222fb0b18b40ae568f70f249ca6d1fdcf6dd69b3bc6e57103c84671808ef5087e5e60b1b7feb399432b8c47fbcbc2b2689c32e9c0214d24852641141c88db5d57fa50df3496432fe1273af3dcdb8925ceb44179a0ca7f34c9507b19647f156ac368ede71819e6104baed39523e621bc5a35bc26603f58bcbf6ed82612e0eae98307423c1f1dfe7eb3360f46fce27a5bbbd189ab3567607e226c117ee60ab29fa792162bbccd028a1fbbcc53ca19a3b197ca1ff692fa00cfe7091eb9baa801b2c72c8e2999406405f5d1e1ff700535cd82683ae6d6bed2e84674c05e37ddbb6c1a3ff58e7b819a222e91cb74cdcf4ace0671af6fd328c9a20e9ebc0dc3ffecd59c3723d8cad5339c47d32f948886eb51c6e97f73cb950f266b1da33fa4e9d999153beca42dfe17c4ebad2fc5a39e151ca0c37d1fd8754a40b8834bb072d087dbfa6cf692c8463f98d418aef919a487982c10fb017328c15c36ed3f7f8b35ea90d6e4ed6485c443b601fbfd418ee721100ac5aff66a9c4df5e8656a91fac66783d0abd998ad61884ec18b29150c1518a06397ee09cc8ca98d0fd534a2b7102cabfbda635ca9b4a08abbc92feadbf7430cde52330163118b0d5c90e1bca5ce382985ddd67270ad2bba2d335ed1e57f7f2320f2a8800122284b12ab1677d31ed5c5937c7a0a8f09d2f52579c649742cbad67c7b4acb16e4e8ec64a252b73d2d63293aae89b1cfe9228a4e72ff120c17a6f8ec3d486f6d02297c6266b5948c6d19037a1fc7ff206e22d54c7b5b282368b993f4c83b1882974685a3ece4c5281771926277e6e1c7814bd2cbbf8116ec4a3f3b9e8d4fcc35561cadcab743080a653ce9092c21c0d6556b7b2ed4a32d509dde3378353e795b00f297e0373d12ccf0d6c371ceb298025723c4909294224e62c0de8149751180a665b9a95493fb2ff1dfe13e3568c54c20196697e910b290eb9b084a76315d315dac204a283da43cfb2f82019c010d7ecd02f0d479d5604404ce8ee44a849254346aec72f30e79616ed5182a65db64aa71f37ae4167d7f30ea9078947ba81466f8a1653e23ccdceba6d422fc3140ecb9db22841d35c78dd05f860f2ae6174664b89e09413d0a9cb53842aeb238e31ae45724d133f881e2637253cdb81ee4401a64aa31d6f181c987733e495215eb0fd21e313a179631f6cda4e39f46f9492e95b0e5e70b417e201d6932e0ee7e895e14defcde15d964232719a73f6a1ba9eae70cb22ebb576dc867ff1af032fbea5d92b9e93f36fbc120000000045584946ba00000045786966000049492a000800000006001201030001000000010000001a01050001000000560000001b010500010000005e0000002801030001000000020000001302030001000000010000006987040001000000660000000000000048000000010000004800000001000000060000900700040000003032313001910700040000000102030000a00700040000003031303001a0030001000000ffff000002a00400010000008002000003a00400010000008002000000000000),
(29, 'Administrateur', 'admin@admin.fr', '$2b$10$XEBEXpbw96IQXVn9AS81d.2yCIBdPs8NPM8YALkSK0dw0JVy6lmjG', '1999-02-20', 'homme', 'France', 0x696d6167652d313731323931353334343636302d3232363536333837322e706e67);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
