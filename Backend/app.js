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
        // L'utilisateur est connecté, autorisez l'accès
        return next();
    } else {
        // L'utilisateur n'est pas connecté, renvoyez une réponse d'erreur ou redirigez-le vers la page de connexion
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

        // Retournez les résultats (un tableau de jeux) au format JSON
        res.json(searchResults);
    } catch (error) {
        console.error('Erreur côté serveur :', error);
        res.status(500).json({ error: 'Erreur côté serveur.' });
    }
});

// INSCRIPTION ET CONNEXION
// Utilisez multer avec la configuration de stockage définie
const upload = multer({ storage: storage });

// Route d'inscription
app.post('/register', async (req, res) => {
    const { username, email, password, dateNaissance } = req.body;

    // Vérifiez les données d'entrée, par exemple, assurez-vous que le nom d'utilisateur, l'adresse amil, le mot de passe et la date de naissance sont présents
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
    const { username, password } = req.body;

    // Vérifiez les données d'entrée, assurez-vous que le nom d'utilisateur et le mot de passe sont présents
    if (!username || !password) {
        return res.status(400).json({ error: 'Nom d\'utilisateur et mot de passe requis' });
    }

    try {
        // Récupérer toutes les informations de l'utilisateur de la base de données
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

            // Vérifier le mot de passe
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
        // L'utilisateur est authentifié, vous pouvez maintenant traiter les données de modification
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

        // Obtenez les données de l'image depuis multer
        const image = req.file ? req.file.buffer : null;

        // Assurez-vous que la date de naissance est fournie avant de la mettre à jour
        if (dateNaissance) {
            const { jour, mois, annee } = dateNaissance;

            // Vérifiez si le mot de passe a été modifié
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
                // Obtenez les données de l'image depuis multer
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
                                // Mettez à jour les données de session avec les nouvelles informations
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
                        // Mettez à jour les données de session avec les nouvelles informations
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
            // Si la date de naissance n'est pas fournie, mettez à jour les autres champs sans toucher à la date de naissance existante
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
                req.file ? req.file.filename : null, // Utilisez req.file.path pour obtenir le chemin du fichier téléchargé
                req.session.user.id
            ], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Erreur lors de la mise à jour du profil :', updateErr.message);
                    res.status(500).json({ error: 'Erreur lors de la mise à jour du profil' });
                } else {
                    console.log('Profil mis à jour avec succès !');
                    // Mettez à jour les données de session avec les nouvelles informations
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
        // L'utilisateur n'est pas authentifié, renvoyez une erreur 401
        res.status(401).json({ error: 'Non autorisé' });
    }
});

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

    console.log("Donnée note reçue :", req.body)

    const sql = 'INSERT INTO notes (id_user, id_jeu, note, commentaire) VALUES (?,?,?,?)';

    try {
        await db.query(sql, [id_user, id_jeu, note, commentaire]);
        res.status(201).json({ message: 'Évaluation ajoutée avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'évaluation :', error)
        res.status(500).json({ error: 'Erreur côté serveur' });
    }
})

// Récupération des évaluation d'un jeu
app.get('/jeux/:id/notes', async (req, res) => {
    const jeuId = req.params.id;
    const sql = 'SELECT * FROM notes WHERE id_jeu = ?';

    try {
        const notes = await db.query(sql, [jeuId]);
        res.json(notes);
    } catch (error) {
        console.error('Erreur lors de la récupération des évaluations : ', error);
        res.status(500).json({ error: 'Erreur côté serveur' });
    }
})
// Vérifie l'état d'authentification
app.get('/checkAuthStatus', (req, res) => {
    if (req.session.user) {
        // L'utilisateur est connecté, renvoi les informations de l'utilisateur
        res.json(req.session.user);
    } else {
        // L'utilisateur n'est pas connecté
        res.status(401).json({ error: 'Non autorisé' });
    }
});

// Routes API
// Route par défaut pour servir l'application React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'PixelPartners/Frontend', ''));
});

// Servez l'application React depuis le backend
app.use(express.static(path.join(__dirname, 'PixelPartners/Frontend')));


// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
}); 
