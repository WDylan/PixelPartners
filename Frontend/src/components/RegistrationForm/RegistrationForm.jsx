import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./RegistrationForm.css";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");

  // Regex pour valider une adresse email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Regex pour valider un mot de passe (8 à 72 caractères, au moins 1 chiffre, 1 minuscule et 1 majuscule)
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,72}$/;

  const [usernameExists, setUsernameExists] = useState(false);
  // Fonction pour vérifier si le nom d'utilisateur est déjà utilisé
  const checkUsernameExists = async (usernameToCheck) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/checkUsername?username=${usernameToCheck.toLowerCase()}`
      );
      setUsernameExists(response.data.exists);
    } catch (error) {
      console.error(
        "Erreur lors de la vérification du nom d'utilisateur :",
        error.message
      );
    }
  };
  const [emailExists, setEmailExists] = useState(false);
  // Fonction pour vérifier si l'adresse email est déjà utilisée
  const checkEmailExists = async (emailToCheck) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/checkEmail?email=${emailToCheck.toLowerCase()}`
      );
      setEmailExists(response.data.exists);
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de l'adresse email :",
        error.message
      );
    }
  };

  const navigate = useNavigate();

  const handleRegister = async () => {
    // Vérification des champs de confirmation
    if (email !== confirmEmail) {
      setMessage("La confirmation de l'adresse email ne correspond pas.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("La confirmation du mot de passe ne correspond pas.");
      return;
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
    // Vérification si le nom d'utilisateur est déjà utilisé
    if (usernameExists) {
      setMessage(
        "Ce nom d'utilisateur est déjà utilisé. Veuillez en choisir un autre."
      );
      return;
    }
    // Vérification si l'adresse email est déjà utilisée
    if (emailExists) {
      setMessage(
        "Cette adresse email est déjà utilisée. Veuillez en choisir une autre."
      );
      return;
    }

    // Convertir les chaînes en entiers
    const dayInt = parseInt(day, 10);
    const monthInt = parseInt(month, 10);
    const yearInt = parseInt(year, 10);
    const maxDay = 31;
    const maxMonth = 12;

    // Récupérer l'année actuelle
    const currentYear = new Date().getFullYear();

    // Vérifier la validité de la date de naissance
    if (
      isNaN(dayInt) ||
      isNaN(monthInt) ||
      isNaN(yearInt) || // Vérifie si les valeurs sont des nombres
      dayInt < 1 ||
      dayInt > maxDay || // Vérifie le jour
      monthInt < 1 ||
      monthInt > maxMonth || // Vérifie le mois
      yearInt >= currentYear // Vérifie l'année (ne peut pas être supérieure ou égale à la date actuelle)
    ) {
      let errorMessage = "Date de naissance invalide. ";

      if (dayInt < 1 || dayInt > maxDay) {
        errorMessage += "Le jour doit être compris entre 1 et 31. ";
      }

      if (monthInt < 1 || monthInt > maxMonth) {
        errorMessage += "Le mois doit être compris entre 1 et 12. ";
      }

      if (yearInt >= currentYear) {
        errorMessage +=
          "L'année de naissance doit être antérieure à la date actuelle.";
      }

      setMessage(errorMessage);
      return;
    }

    // Formatage de la date de naissance
    const formattedDate = `${year}-${month}-${day}`;

    try {
      // Vérification si le nom d'utilisateur est déjà utilisé
      const usernameExists = await checkUsernameExists(username.toLowerCase());
      if (usernameExists) {
        setMessage("Ce nom d'utilisateur est déjà utilisé.");
        return;
      }
      // Vérification si l'adresse email est déjà utilisée
      const emailExists = await checkEmailExists(email.toLowerCase());
      if (emailExists) {
        setMessage("Cette adresse email est déjà utilisée.");
        return;
      }

      // Si tout est valide, effectue l'inscription
      const response = await axios.post("http://localhost:5000/register", {
        username,
        email,
        password,
        dateNaissance: formattedDate,
      });
      setMessage(response.data);

      // Réinitialise les états après une inscription réussie
      if (response.status === 200) {
        setUsername("");
        setEmail("");
        setConfirmEmail("");
        setPassword("");
        setConfirmPassword("");
        setDay("");
        setMonth("");
        setYear("");
        // Redirige vers la page de connexion
        navigate("/connexion");
      }
    } catch (error) {
      setMessage("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  const handleKeydown = (event) => {
    if (event.key === "Enter") {
      // Appuyer sur Entrée dans le champ de mot de passe déclenche la connexion
      handleRegister();
    }
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
          onChange={(e) => {
            setUsername(e.target.value);
            // Appel de la fonction pour vérifier si le nom d'utilisateur existe déjà
            checkUsernameExists(e.target.value);
          }}
          placeholder="Nom d'utilisateur"
        />
        {usernameExists && (
          <p className="red">Ce nom d'utilisateur est déjà utilisé.</p>
        )}
      </div>
      <label>*Adresse email : </label>
      <div>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            // Appel de la fonction pour vérifier si l'adresse email existe déjà
            checkEmailExists(e.target.value);
          }}
          placeholder="Adresse email"
        />
        {emailExists && (
          <p className="red">Cette adresse email est déjà utilisée.</p>
        )}
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
      <div className="inputDateNaissance">
        <div>
          <input
            className="inputJour"
            type="text"
            placeholder="Jour"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
        <div>
          <input
            className="inputJour"
            type="text"
            placeholder="Mois"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
        <div>
          <input
            className="inputJour"
            type="text"
            placeholder="Année"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            onKeyDown={handleKeydown}
          />
        </div>
      </div>
      <div className="buttonRegistration">
        <button
          className="buttonEnvoyer"
          onClick={handleRegister}
          onKeyDown={handleKeydown}
        >
          Envoyer
        </button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegistrationForm;
