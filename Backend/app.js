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


// Configuration d'express-session
const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');

app.use(express.static(path.join(__dirname, './image')));

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
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
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
        // Utilisation du chemin absolu pour éviter des problèmes de résolution de chemin
        cb(null, path.join(__dirname, 'image'));
    },
    filename: function (req, file, cb) {
      // Générer un nom de fichier unique, par exemple, la date actuelle
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

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
                res.status(200).json({ message: 'Connexion réussie', sessionId: req.sessionID, user: req.session.user });
            } else {
                res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
            }

        });
    } catch (error) {
        console.error('Erreur lors de la vérification du mot de passe :', error.message);
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
});



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



// Servez l'application React depuis le backend
app.use(express.static(path.join(__dirname, 'PixelPartners/Frontend')));

// Route par défaut pour servir l'application React
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'PixelPartners/Frontend', ''));
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});