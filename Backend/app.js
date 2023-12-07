const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 5000;

const morgan = require('morgan');
app.use(morgan('dev'));


// Configuration d'express-session
const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');

app.use(express.static(path.join(__dirname, 'image')));

// Middleware pour vérifier si l'utilisateur est connecté
const isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        // L'utilisateur est connecté, autorise l'accès
        return next();
    } else {
        // L'utilisateur n'est pas connecté, renvois une réponse d'erreur ou redirige vers la page de connexion
        return res.status(401).json({ error: 'Non autorisé' });
    }
};

// Middleware CORS
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));

// Journaux  pour déboguer
console.log('Before session middleware');

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        domain: 'localhost',
        httpOnly: true,
        secure: false,
        maxAge: null
    }
}));

// Journaux  pour déboguer
console.log('After session middleware');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Utilisateur MySQL
    password: 'root', // Mot de passe MySQL 
    database: 'pixelpartners', // Nom de la base de données
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données : ' + err.message);
    } else {
        console.log('Connecté à la base de données MySQL');
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'image'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

// Barre de recherche
app.get('/jeux/search', async (req, res) => {
    console.log('Requête de recherche reçue');
    try {
        const searchTerm = req.query.term;
        console.log('Search Term:', searchTerm);
        // Requête SQL pour la recherche par titre
        const sql = `
            SELECT *
            FROM jeux
            WHERE titre LIKE ?
        `;
        console.log('Generated SQL:', sql);

        const searchResults = await new Promise((resolve, reject) => {
            db.query(sql, [`%${searchTerm}%`], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        console.log('Search Results:', searchResults);

        // Retourne les résultats (un tableau de jeux) au format JSON
        res.json(searchResults);
    } catch (error) {
        console.error('Erreur côté serveur :', error);
        res.status(500).json({ error: 'Erreur côté serveur.' });
    }
});

// Vérifie l'état d'authentification
app.get('/checkAuthStatus', (req, res) => {
    if (req.session.user) {
        console.log("User authenticated:", req.session.user);
        // L'utilisateur est connecté, renvoi les informations de l'utilisateur
        res.status(200).json(req.session.user);
    } else {
        // L'utilisateur n'est pas connecté
        res.status(401).json({ error: 'Utilisateur non authentifié' });
    }
});

// INSCRIPTION ET CONNEXION
// Utilis multer avec la configuration de stockage définie
const upload = multer({ storage: storage });

// Route d'inscription
app.post('/register', async (req, res) => {
    const { username, email, password, dateNaissance } = req.body;

    // Vérifie les données d'entrée, s'assure que le nom d'utilisateur, l'adresse amil, le mot de passe et la date de naissance sont présents
    if (!username || !email || !password || !dateNaissance) {
        return res.status(400).send('Nom d\'utilisateur, adresse email, mot de passe requis et date de naissance requis');
    }

    try {
        // Hacher le mot de passe
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Enregistrement de l'utilisateur dans la base de données
        const query = 'INSERT INTO users (username, email, password, dateNaissance) VALUES (?, ?, ?, ?)';
        db.query(query, [username, email, hashedPassword, dateNaissance], (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'inscription : ' + err.message);
                res.status(500).send('Erreur lors de l\'inscription');
            } else {
                res.status(200).send('Inscription réussie !');
            }
        });
    } catch (error) {
        console.error('Erreur lors du hachage du mot de passe :' + error.message);
        res.status(500).send('Erreur lors de l\'inscription');
    }
});

// Endpoint pour vérifier si le nom d'utilisateur existe déjà
app.get('/checkUsername', (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: 'Le nom d\'utilisateur manquant dans la requête.' });
    }

    const query = 'SELECT COUNT(*) AS count FROM users WHERE username = ?';
    db.query(query, [username], (err, result) => {
        if (err) {
            console.error('Erreur lors de la vérification du nom d\'utilisateur : ' + err.message);
            return res.status(500).json({ error: 'Erreur lors de la vérification du nom d\'utilisateur.' });
        }

        const count = result[0].count;
        const exists = count > 0;

        res.json({ exists });
    });
});

// Endpoint pour vérifier si l'adresse email existe déjà
app.get('/checkEmail', (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: 'Adresse email manquante dans la requête.' });
    }

    const query = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            console.error('Erreur lors de la vérification de l\'adresse email : ' + err.message);
            return res.status(500).json({ error: 'Erreur lors de la vérification de l\'adresse email.' });
        }

        const count = result[0].count;
        const exists = count > 0;

        res.json({ exists });
    });
});

// Route de connexion
app.post('/login', async (req, res) => {
    console.log('Requête de connexion reçue');
    const { username, password } = req.body;

    // Vérifie les données d'entrée, s'assure que le nom d'utilisateur et le mot de passe sont présents
    if (!username || !password) {
        return res.status(400).json({ error: 'Nom d\'utilisateur et mot de passe requis' });
    }

    try {
        // Récupére toutes les informations de l'utilisateur de la base de données
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], async (err, result) => {
            if (err) {
                console.error('Erreur lors de la récupération des informations de l\'utilisateur :', err.message);
                return res.status(500).json({ error: 'Erreur lors de la connexion' });
            }

            if (result.length === 0) {
                console.log('Nom d\'utilisateur non trouvé');
                return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
            }

            const { id, username, email, password: hashedPassword, dateNaissance, genre, pays, adresse, codePostal, ville, telephone, telephonePortable, image } = result[0];

            // Vérifie le mot de passe
            const passwordMatch = await bcrypt.compare(password, hashedPassword);
            if (passwordMatch) {
                // Création d'une session côté serveur avec toutes les informations de l'utilisateur
                req.session.user = {
                    id,
                    username,
                    email,
                    password,
                    dateNaissance,
                    genre,
                    pays,
                    adresse,
                    codePostal,
                    ville,
                    telephone,
                    telephonePortable,
                    image
                };

                // Renvoyer l'identifiant de session au client
                const sessionId = req.sessionID; // Récupérer l'identifiant de session
                res.status(200).json({ message: 'Connexion réussie', sessionId, user: req.session.user });
            } else {
                res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
            }
        });
    } catch (error) {
        console.error('Erreur lors de la vérification du mot de passe :', error.message);
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
});

// PARTIE CHARGEMENT ET AFFICHAGE DES DONNEES UTILISATEUR
// Route protégée pour obtenir les informations de l'utilisateur connecté
app.get('/profil', isLoggedIn, (req, res) => {
    if (req.session.user) {
        // L'utilisateur est authentifié, fournir toutes les données du profil
        const { id, username, email, dateNaissance, genre, pays, adresse, codePostal, ville, telephone, telephonePortable, image } = req.session.user;
        res.json({ id, username, email, dateNaissance, genre, pays, adresse, codePostal, ville, telephone, telephonePortable, image });
    }
});

// Route pour mettre à jour les informations du profil utilisateur
app.post('/profil', isLoggedIn, upload.single('image'), async (req, res) => {
    if (req.session.user) {
        console.log("Données de modification reçues :", req.body);
        console.log("Chemin du fichier côté serveur :", req.file ? req.file.filename : null);
        // L'utilisateur est authentifié, peut maintenant traiter les données de modification
        const {
            username,
            email,
            password,
            dateNaissance,
            genre,
            pays,
            adresse,
            codePostal,
            ville,
            telephone,
            telephonePortable,
        } = req.body;

        // Obtiens les données de l'image depuis multer
        const image = req.file ? req.file.buffer : null;

        // S'assure que la date de naissance est fournie avant de la mettre à jour
        if (dateNaissance) {
            const { jour, mois, annee } = dateNaissance;

            // Vérifie si le mot de passe a été modifié
            const updatePasswordPart = password ? ', password=?' : '';
            const updatePasswordValues = password ? [password] : [];

            const updateQuery = `UPDATE users SET username=?, email=?${updatePasswordPart}, dateNaissance=?, genre=?, pays=?, adresse=?, codePostal=?, ville=?, telephone=?, telephonePortable=?, image=? WHERE id=?`;

            db.query(updateQuery, [
                username,
                email,
                ...updatePasswordValues,
                `${annee}-${mois}-${jour}`,
                genre,
                pays,
                adresse,
                codePostal,
                ville,
                telephone,
                telephonePortable,
                // Obtiens les données de l'image depuis multer
                req.file ? req.file.filename : null,
                req.session.user.id
            ], async (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Erreur lors de la mise à jour du profil :', updateErr.message);
                    res.status(500).json({ error: 'Erreur lors de la mise à jour du profil' });
                } else {
                    // Si le mot de passe a été modifié, ré-hasher le nouveau mot de passe
                    if (password) {
                        const saltRounds = 10;
                        const hashedPassword = await bcrypt.hash(password, saltRounds);
                        db.query('UPDATE users SET password=? WHERE id=?', [hashedPassword, req.session.user.id], (hashErr, hashResult) => {
                            if (hashErr) {
                                console.error('Erreur lors du hachage du nouveau mot de passe :', hashErr.message);
                                res.status(500).json({ error: 'Erreur lors de la mise à jour du mot de passe' });
                            } else {
                                console.log('Profil mis à jour avec succès !');
                                // Met à jour les données de session avec les nouvelles informations
                                req.session.user = {
                                    ...req.session.user,
                                    username,
                                    email,
                                    dateNaissance: `${annee}-${mois}-${jour}`,
                                    genre,
                                    pays,
                                    adresse,
                                    codePostal,
                                    ville,
                                    telephone,
                                    telephonePortable,
                                    image: req.file ? req.file.filename : req.session.user.image,
                                };
                                res.status(200).json({ message: 'Mise à jour du profil réussie' });
                            }
                        });
                    } else {
                        console.log('Profil mis à jour avec succès !');
                        // Met à jour les données de session avec les nouvelles informations
                        req.session.user = {
                            ...req.session.user,
                            username,
                            email,
                            dateNaissance: `${annee}-${mois}-${jour}`,
                            genre,
                            pays,
                            adresse,
                            codePostal,
                            ville,
                            telephone,
                            telephonePortable,
                            image: req.file ? req.file.filename : req.session.user.image,
                        };
                        res.status(200).json({ message: 'Mise à jour du profil réussie' });
                    }
                }
            });
        } else {
            // Si la date de naissance n'est pas fournie, met à jour les autres champs sans toucher à la date de naissance existante
            const updateQuery =
                'UPDATE users SET username=?, email=?, genre=?, pays=?, adresse=?, codePostal=?, ville=?, telephone=?, telephonePortable=?, image=? WHERE id=?';

            db.query(updateQuery, [
                username,
                email,
                genre,
                pays,
                adresse,
                codePostal,
                ville,
                telephone,
                telephonePortable,
                req.file ? req.file.filename : null, // Utilise req.file.path pour obtenir le chemin du fichier téléchargé
                req.session.user.id
            ], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Erreur lors de la mise à jour du profil :', updateErr.message);
                    res.status(500).json({ error: 'Erreur lors de la mise à jour du profil' });
                } else {
                    console.log('Profil mis à jour avec succès !');
                    // Met à jour les données de session avec les nouvelles informations
                    req.session.user = {
                        ...req.session.user,
                        username,
                        email,
                        genre,
                        pays,
                        adresse,
                        codePostal,
                        ville,
                        telephone,
                        telephonePortable,
                        image: req.file ? req.file.filename : req.session.user.image,
                    };
                    res.status(200).json({ message: 'Mise à jour du profil réussie' });
                }
            });
        }
    } else {
        // L'utilisateur n'est pas authentifié, renvois une erreur 401
        res.status(401).json({ error: 'Non autorisé' });
    }
});

// PARTIE JEUX
app.get('/plateformes', (req, res) => {
    db.query('SELECT * FROM plateformes', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des plateformes.' });
        }
        res.json(results);
    });
});

app.get('/genres', (req, res) => {
    db.query('SELECT * FROM genres', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des genres.' });
        }
        res.json(results);
    });
});

app.get('/jeux', (req, res) => {
    const { plateforme, genre } = req.query;
    let sql = `
        SELECT jeux.*, GROUP_CONCAT(DISTINCT genres.nom) AS genres, GROUP_CONCAT(DISTINCT plateformes.nom) AS plateformes
        FROM jeux
        LEFT JOIN jeux_genres ON jeux.id = jeux_genres.id_jeu
        LEFT JOIN genres ON jeux_genres.id_genre = genres.id
        LEFT JOIN jeux_plateformes ON jeux.id = jeux_plateformes.id_jeu
        LEFT JOIN plateformes ON jeux_plateformes.id_plateforme = plateformes.id
    `;
    const filters = [];
    if (plateforme) {
        filters.push(`plateformes.nom = '${plateforme}'`);
    }
    if (genre) {
        filters.push(`genres.nom = '${genre}'`);
    }
    if (filters.length > 0) {
        sql += ` WHERE ${filters.join(' AND ')}`;
    }
    sql += ' GROUP BY jeux.id';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des jeux.' });
        }
        res.json(results);
    });
});

app.get('/jeux/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM jeux WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération du jeu.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Jeu non trouvé.' });
        }
        const jeu = results[0];
        res.json(jeu);
    });
});

app.get('/jeux/:id/plateformes', (req, res) => {
    const jeuId = req.params.id;

    // Requête SQL pour récupérer les plateformes associées à un jeu spécifique
    const sql = `
        SELECT p.nom
        FROM plateformes p
        JOIN jeux_plateformes jp ON p.id = jp.id_plateforme
        WHERE jp.id_jeu = ?
    `;
    // Exécution de la requête SQL avec le paramètre du jeuId
    db.query(sql, [jeuId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des plateformes.' });
        }
        res.json(results);
    });
});

app.get('/jeux/:id/genres', (req, res) => {
    const jeuId = req.params.id;

    // Requête SQL pour récupérer les genres associés à un jeu spécifique
    const sql = `
        SELECT g.nom
        FROM genres g
        JOIN jeux_genres jg ON g.id = jg.id_genre
        WHERE jg.id_jeu = ?
    `;
    // Exécution de la requête SQL avec le paramètre du jeuId
    db.query(sql, [jeuId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des genres.' });
        }
        res.json(results);
    });
});

// PARTIE NOTE
// Ajout évaluation
app.post('/notes', async (req, res) => {
    const { id_user, id_jeu, note, commentaire } = req.body;
    console.log("Donnée note reçue :", req.body);
    const sql = `
        INSERT INTO notes (id_user, id_jeu, note, commentaire) 
        VALUES (?,?,?,?)
        ON DUPLICATE KEY UPDATE note = VALUES(note), commentaire = VALUES(commentaire)
    `;
    try {
        await db.query(sql, [id_user, id_jeu, note, commentaire]);
        res.status(201).json({ message: 'Évaluation ajoutée ou mise à jour avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout ou de la mise à jour de l\'évaluation :', error);
        res.status(500).json({ error: 'Erreur côté serveur' });
    }
});

app.get('/notes/moyenne/:id_jeu', (req, res) => {
    const { id_jeu } = req.params;
    console.log('Requête GET /notes/moyenne/:id_jeu');
    console.log('ID jeu :', id_jeu);

    try {
        // Effectue la requête SQL pour calculer la moyenne
        const query = `
            SELECT AVG(note) AS moyenne
            FROM notes
            WHERE id_jeu = ?
        `;
        console.log('Query:', query);

        db.query(query, [id_jeu], (error, results) => {
            if (error) {
                console.error('Erreur lors de la requête SQL pour la moyenne des notes. Requête :', query);
                res.status(500).json({ error: 'Erreur côté serveur' });
            } else {
                // Utilise des logs pour vérifier les résultats
                console.log('Résultat de la requête SQL pour la moyenne des notes :', results);

                // Envoie la réponse au client
                if (results && results.length > 0) {
                    console.log('Moyenne des notes pour le jeu avec l\'ID', id_jeu, ':', results);
                    res.status(200).json({ moyenne: results[0].moyenne });
                } else {
                    console.log('Aucun résultat trouvé pour la moyenne des notes.');
                    res.status(404).json({ error: 'Aucune note trouvée pour ce jeu' });
                }
            }
        });
    } catch (error) {
        // Gère les erreurs correctement
        console.error('Erreur lors du calcul de la moyenne des notes :', error);
        res.status(500).json({ error: 'Erreur côté serveur' });
    }
});

// Récupére les commentaires utilisateur sur le jeu
app.get('/commentaires/:id_jeu', async (req, res) => {
    const { id_jeu } = req.params;
    console.log('Requête GET /commentaires/:id_jeu');
    console.log('ID jeu :', id_jeu);

    try {
        // Effectue la requête SQL pour récupérer les commentaires
        const query = `
            SELECT notes.note, notes.commentaire, notes.id_user, notes.date_note, users.username
            FROM notes
            LEFT JOIN users ON notes.id_user = users.id
            WHERE notes.id_jeu = ?
        `;
        console.log('Query:', query);

        db.query(query, [id_jeu], (error, results) => {
            if (error) {
                console.error('Erreur lors de la requête SQL pour les commentaires. Requête :', query);
                res.status(500).json({ error: 'Erreur côté serveur' });
            } else {
                // Utilise des logs pour vérifier les résultats
                console.log('Résultat de la requête SQL pour les commentaires :', results);

                // Envoie la réponse au client
                res.status(200).json(results);
            }
        });
    } catch (error) {
        // Gère les erreurs correctement
        console.error('Erreur lors de la récupération des commentaires :', error);
        res.status(500).json({ error: 'Erreur côté serveur' });
    }
});


// Récupére la note de l'utilisateur sur le jeu
app.get('/notes/:id_user/:id_jeu', async (req, res) => {
    const { id_user, id_jeu } = req.params;
    console.log('Requête GET /notes/:id_user/:id_jeu');
    console.log('ID utilisateur :', id_user);
    console.log('ID jeu :', id_jeu);

    try {
        // Effectue la requête SQL
        const result = await performSQLQuery(id_user, id_jeu);

        // Utilise des logs pour vérifier les résultats
        console.log('Résultat de la requête SQL :', result);

        // Envoie la réponse au client
        res.status(200).json(result);
    } catch (error) {
        // Gère les erreurs correctement
        console.error('Erreur lors de la récupération de la note :', error);
        res.status(500).json({ error: 'Erreur côté serveur' });
    }
});

async function performSQLQuery(id_user, id_jeu) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT note, commentaire
            FROM notes
            WHERE id_user = ? AND id_jeu = ?
        `;

        db.query(query, [id_user, id_jeu], (error, results) => {
            if (error) {
                // Gère les erreurs correctement
                console.error('Erreur lors de la requête SQL :', error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// PARTIE DECONNEXION
// Route de déconnexion
app.post('/logout', (req, res) => {
    console.log("Route de déconnexion atteinte");
    req.session.destroy((err) => {
        if (err) {
            console.error('Erreur lors de la déconnexion :', err);
            res.status(500).json({ error: 'Erreur lors de la déconnexion' });
        } else {
            res.clearCookie('connect.sid'); // Efface le cookie de session
            res.status(200).json({ message: 'Déconnexion réussie' });
        }
    });
});

//ROUTE SUPPRESSION COMPTE
app.delete('/users', isLoggedIn, async (req, res) => {
    const id_user = req.session.user.id; // Utilise req.session.user.id pour récupérer l'id de l'utilisateur connecté
    try {
        const query = 'DELETE FROM users WHERE id = ?';
        await db.query(query, [id_user]);

        // Déconnecte l'utilisateur après la suppression du compte
        req.session.destroy((err) => {
            if (err) {
                console.error('Erreur lors de la déconnexion :', err);
                res.status(500).json({ error: 'Erreur lors de la déconnexion' });
            } else {
                res.clearCookie('connect.sid'); // Efface le cookie de session
                res.status(200).json({ message: 'Compte utilisateur supprimé avec succès' });
            }
        });
    } catch (error) {
        console.error('Erreur lors de la suppression du compte utilisateur :', error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression du compte utilisateur' });
    }
});

// Routes API
// Route par défaut pour servir l'application React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'PixelPartners/Frontend', ''));
});

// Sert l'application React depuis le backend
app.use(express.static(path.join(__dirname, 'PixelPartners/Frontend')));


// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
}); 