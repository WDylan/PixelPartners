import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Compte.css";

export default function Compte() {
  const [editData, setEditData] = useState({
    username: "",
    email: "",
    password: "",
    dateNaissance: {
      jour: "",
      mois: "",
      annee: "",
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    // fonction pour récupérer les informations de l'utilisateur
    const getUserProfil = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // L'utilisateur n'est pas connecter, le rediriger vers la page de connexion
          navigate("/connexion");
          return;
        }

        const response = await axios.get("http://localhost:5000/profil", {
          headers: {
            Authorization: token,
          },
        });

        // Mettrre à jour l'état avec les informations de l'utilisateur
        setEditData({
          username: response.data.username,
          email: response.data.email,
          password: "",
          dateNaissance: {
            jour: response.data.dateNaissance.jour,
            mois: response.data.dateNaissance.mois,
            annee: response.data.dateNaissance.annee,
          },
        });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des information de l'utilisateur :",
          error.message
        );
        // Gérez l'erreur, par exemple, déconnectez l'utilisateur s'il y a un problème avec le jeton
      }
    };
    // Appel de la fonction pour récupérer les informations de l'utilisateur
    getUserProfil();
  }, [navigate]);

  const handleInputChange = (field, value) => {
    setEditData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/connexion");
        return;
      }

      await axios.post("http://localhost:5000/profil", editData, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error.message);
    }
  };

  return (
    <div className="formCompte">
      <div className="parametres">
        <li>Paramètres</li>
        <ul>
          <li>Compte</li>
          <li>Profil</li>
          <li>Notifications</li>
          <li>Audios</li>
          <li>Accessibilité</li>
          <li>A propos de </li>
        </ul>
      </div>
      <div className="content">
        <h2>Compte</h2>
        <label>Nom d'utilisateur : </label>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={editData.username}
          onChange={(e) => handleInputChange("username", e.target.value)}
        />

        <label>Adresse email : </label>
        <input
          type="text"
          placeholder="Adresse email"
          value={editData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />

        <label>Mot de passe :</label>
        <input
          type="password"
          placeholder="Mot de passe"
          value={editData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
        />

        <label>Date de naissance : </label>

        <input
          type="text"
          placeholder="Jour"
          value={editData.dateNaissance.jour}
          onChange={(e) =>
            handleInputChange("dateNaissance", {
              ...editData.dateNaissance,
              jour: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Mois"
          value={editData.dateNaissance.mois}
          onChange={(e) =>
            handleInputChange("dateNaissance", {
              ...editData.dateNaissance,
              mois: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Année"
          value={editData.dateNaissance.annee}
          onChange={(e) =>
            handleInputChange("dateNaissance", {
              ...editData.dateNaissance,
              annee: e.target.value,
            })
          }
        />

        <div className="buttonRegistration">
          <button className="buttonValider" onClick={handleSaveChanges}>
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}
