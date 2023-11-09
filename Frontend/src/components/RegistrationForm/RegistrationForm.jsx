import React, { useState } from "react";
import axios from "axios";

import "./RegistrationForm.css";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [message, setMessage] = useState("");

  // Regex pour valider une adresse email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Regex pour valider un mot de passe (8 à 72 caractères, au moins 1 chiffre, 1 minuscule et 1 majuscule)
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,72}$/;

  const handleRegister = async () => {
    // Vérification des champs de confirmation
    if (email !== confirmEmail) {
      setMessage("La confirmation de l'adresse email ne correspond pas.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("La confirmation du mot de passe ne correspond pas.");
    }

    // Validation de l'adresse email avec regex
    if (!emailRegex.test(email)) {
      setMessage("Adresse email invalide.");
      return;
    }

    // Validation du mot de passe avec regex
    if (!passwordRegex.test(password)) {
      setMessage(
        "Mot de passe invalide. Assurez vous qu'il a entre 8 et 72 caractères, au moins 1 chiffre, 1 minuscule et 1 majuscule."
      );
      return;
    }

    try {
      // Vérification si l'adresse email est déjà utilisée
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        setMessage("Cette adresse email est déjà utilisée.");
        return;
      }

      // Vérification si l'username est déjà utilisé
      const usernameExists = await checkUsernameExists(username);
      if (usernameExists) {
        setMessage("Cet username est déjà utilisé.");
        return;
      }

      // Si tout est valide, effectue l'inscription
      const response = await axios.post("http://localhost:5000/register", {
        username,
        email,
        password,
        dateNaissance,
      });
      setMessage(response.data);

      // Réinitialisez les états après une inscription réussie
      if (response.status === 200) {
        setUsername("");
        setEmail("");
        setConfirmEmail("");
        setPassword("");
        setConfirmPassword("");
        setDateNaissance("");
      }
    } catch (error) {
      setMessage("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };
  const [emailExists, setEmailExists] = useState(false);
  // Fonction pour vérifier si l'adresse email est déjà utilisée
  const checkEmailExists = async (emailToCheck) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/checkEmail?email=${emailToCheck}`
      );
      setEmailExists(response.data.exists);
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de l'adresse email :",
        error.message
      );
    }
  };

  // Fonction pour vérifier si l'username est déjà utilisé
  const checkUsernameExists = async (usernameToCheck) => {
    return false;
  };
  return (
    <div className="formInscription">
      <h2>Inscription à PixelPartners</h2>
      <hr />
      <label>* Nom d'utilisateur : </label>
      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nom d'utilisateur"
        />
      </div>
      <label>*Adresse email : </label>
      <div>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            checkEmailExists(e.target.value);
          }}
          placeholder="Adresse email"
        />
      </div>
      <label>*Confirmation Adresse email : </label>
      <div>
        <input
          type="text"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
          placeholder="Confirmation Adresse Email"
        />
      </div>
      <label>
        *Mot de passe : <br />
        <span>
          <ul>
            votre mot de passe doit contenir : <br />
            <li>8 à 72 caractères</li>
            <li>1 chiffre</li>
            <li>1 minuscule</li>
            <li>1 majuscule</li>
          </ul>
        </span>
      </label>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
        />
      </div>
      <label>*Confirmation Mot de passe : </label>
      <div>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmation mot de passe"
        />
      </div>
      <label>*Date de naissance : </label>
      <div>
        <input
          type="date"
          value={dateNaissance}
          onChange={(e) => setDateNaissance(e.target.value)}
        />
      </div>
      <div className="buttonRegistration">
        <button className="buttonEnvoyer" onClick={handleRegister}>
          Envoyer
        </button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegistrationForm;
