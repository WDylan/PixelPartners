import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/profil", {
          withCredentials: true,
        });

        console.log("Response data:", response.data);

        if (response.data) {
          setEditData((prevData) => ({
            ...prevData,
            username: response.data.username || "",
            email: response.data.email || "",
            password: response.data.password || "",
            dateNaissance: formatDateNaissance(response.data.dateNaissance),
          }));
        } else {
          console.error("La réponse ne contient pas de données utilisateur.");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur :",
          error.message
        );

        if (error.response && error.response.status === 401) {
          // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
          navigate("/connexion");
        }
      }
    };

    getUserProfile();
  }, [navigate]);

  // Ajoutez cette vérification au début de la fonction pour s'assurer que l'utilisateur est connecté
  useEffect(() => {
    // Vérifiez ici si l'utilisateur est connecté, sinon, redirigez-le vers la page de connexion
    const checkIfLoggedIn = async () => {
      try {
        const response = await axios.get("http://localhost:5000/checklogin", {
          withCredentials: true,
        });

        if (response.data && response.data.isLoggedIn) {
          // L'utilisateur est connecté, continuez comme d'habitude
        } else {
          // L'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
          navigate("/connexion");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de la connexion :",
          error.message
        );
      }
    };

    checkIfLoggedIn();
  }, [navigate]); // Ajoutez navigate comme dépendance

  const formatDateNaissance = (date) => {
    if (!date) {
      return {
        jour: "",
        mois: "",
        annee: "",
      };
    }

    const formattedDate = new Date(date);
    return {
      jour: formattedDate.getDate().toString(),
      mois: (formattedDate.getMonth() + 1).toString(),
      annee: formattedDate.getFullYear().toString(),
    };
  };

  const handleInputChange = (field, value) => {
    setEditData((prevData) => {
      if (field === "password") {
        // Si le champ est le mot de passe, assurez-vous de le gérer correctement
        return {
          ...prevData,
          password: value,
        };
      } else if (field === "dateNaissance") {
        // Si le champ est la date de naissance, assurez-vous de le gérer correctement
        return {
          ...prevData,
          dateNaissance: {
            ...prevData.dateNaissance,
            ...value,
          },
        };
      } else {
        // Pour les autres champs, procédez comme d'habitude
        return {
          ...prevData,
          [field]: value,
        };
      }
    });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.post("http://localhost:5000/profil", editData, {
        withCredentials: true,
      });
      console.log("Modifications enregistrées avec succès !");
      setIsEditMode(false); // Désactive le mode édition après l'enregistrement
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
          readOnly={!isEditMode} // Empêcher la modification si le mode édition est désactivé
        />

        <label>Adresse email : </label>
        <input
          type="text"
          placeholder="Adresse email"
          value={editData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          readOnly={!isEditMode}
        />

        <label>Mot de passe :</label>
        <input
          type="password"
          placeholder="Mot de passe"
          value={editData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          readOnly={!isEditMode}
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
          readOnly={!isEditMode}
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
          readOnly={!isEditMode}
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
          readOnly={!isEditMode}
        />
        {!isEditMode && (
          <button onClick={() => setIsEditMode(true)}>Modifier</button>
        )}
        <div className="buttonRegistration">
          <button className="buttonValider" onClick={handleSaveChanges}>
            Valider Modification
          </button>
        </div>
      </div>
    </div>
  );
}
