import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/profil", {
          withCredentials: true,  // Utilisation de withCredentials pour inclure les cookies dans la requête
        });

        console.log("Response data:", response.data);

        if (response.data) {
          setEditData((prevData) => ({
            ...prevData,
            username: response.data.username || "",
            email: response.data.email || "",
            password: "",
            dateNaissance: {
              jour: response.data.dateNaissance?.jour || "",
              mois: response.data.dateNaissance?.mois || "",
              annee: response.data.dateNaissance?.annee || "",
            },
          }));
        } else {
          console.error("La réponse ne contient pas de données utilisateur.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des informations de l'utilisateur :", error.message);
        // Vérifiez si l'erreur contient des informations supplémentaires
        console.error("Error details:", error.response?.data);
      }
    };

    getUserProfile();
  }, []);

  const handleInputChange = (field, value) => {
    setEditData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.post("http://localhost:5000/profil", editData, {
        withCredentials: true,  // Assurez-vous d'inclure les cookies dans la requête
      });
      console.log("Modifications enregistrées avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error.message);
      // Vérifiez si l'erreur contient des informations supplémentaires
      console.error("Error details:", error.response?.data);
      // Affichez un message d'erreur à l'utilisateur
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
