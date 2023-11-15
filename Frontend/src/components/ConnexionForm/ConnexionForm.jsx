import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ConnexionForm.css";

export default function ConnexionForm({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleConnexion = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Response status:", response.status);

      if (response.status === 200) {
        // Appeler la fonction de rappel pour gérer la connexion réussie
        onLoginSuccess(true);

        // Rediriger l'utilisateur vers le profil
        navigate("/profil");
      } else {
        setMessage("Nom d'utilisateur ou mot de passe incorrect");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.message);
      if (error.response && error.response.status === 401) {
        setMessage("Nom d'utilisateur ou mot de passe incorrect");
      } else {
        setMessage(
          "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
        );
      }
    }
  };

  const handleKeydown = (event) => {
    if (event.key === "Enter") {
      // Appuyer sur Entrée dans le champ de mot de passe déclenche la connexion
      handleConnexion();
    }
  };

  return (
    <div className="formConnexion">
      <h2>Connexion à PixelPartners</h2>
      <hr />
      <label>Identifiant :</label>
      <div>
        <input
          type="text"
          placeholder="Identifiant"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <label>Mot de passe :</label>
      <div className="inputMdp">
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeydown}
        />
        <span>Mot de passe oublié ?</span>
      </div>
      <div className="buttonConnect">
        <button
          className="buttonConnexion"
          onClick={handleConnexion}
          onKeyDown={handleKeydown}
        >
          Valider
        </button>
        {message && <p>{message}</p>}
        <span>
          <br />
          Vous n'êtes pas encore membre ?<br />
          Rejoignez-nous !<br />
          <a href="/inscription">Inscription</a>
        </span>
      </div>
    </div>
  );
}