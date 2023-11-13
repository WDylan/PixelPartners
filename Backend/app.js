const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

const jwt = require("jsonwebtoken");

app.use(cors({
    origin: '*',
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

// Middleware pour vérifier le jeton d'authentification
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ error: "Accès interdit" });
    }

    jwt.verify(token, "votre-secret", (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Jeton d'authentification non valide" });
        }

        req.user = decoded;
        next();
    });
};

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
        // Récupérer le mot de passe haché de la base de données
        const query = 'SELECT password FROM users WHERE username = ?';
        db.query(query, [username], async (err, result) => {
            if (err) {
                console.error('Erreur lors de la récupération du mot de passe :', err.message);
                return res.status(500).json({ error: 'Erreur lors de la connexion' });
            }

            console.log('Résultat de la requête de récupération du mot de passe :', result);

            if (result.length === 0) {
                console.log('Nom d\'utilisateur non trouvé');
                return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
            }

            const hashedPassword = result[0].password;

            // Vérifier le mot de passe
            const passwordMatch = await bcrypt.compare(password, hashedPassword);
            if (passwordMatch) {
                const token = jwt.sign({ username: username }, "votre-secret", { expiresIn: "30d" });
                res.status(200).json({ token });
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
app.get('/profil', verifyToken, async (req, res) => {
    try {
        // Vous pouvez accéder à l'utilisateur connecté via req.user
        const username = res.user.username;

        // Récupérez les informations de l'utilisateur à partir de la base de données
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], (err, result) => {
            if (err) {
                console.error('Erreur lors de la récupération des informations de l\'utilisateur :', err.message);
                res.status(500).json({ error: 'Erreur lors de la récupération des informations de l\'utilisateur' });
            } else {
                const userData = result[0];
                res.json(userData);
            }
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des informations de l\'utilisateur' });
    }
})

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