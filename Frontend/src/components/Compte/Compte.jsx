import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Compte.css";
import { CountryDropdown } from "react-country-region-selector";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
    genre: "",
    pays: "",
    adresse: "",
    codePostal: "",
    ville: "",
    telephone: "",
    telephonePortable: "",
    image: null,
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
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
            genre: response.data.genre || "",
            pays: response.data.pays || "",
            adresse: response.data.adresse || "",
            codePostal: response.data.codePostal || "",
            ville: response.data.ville || "",
            telephone: response.data.telephone || "",
            telephonePortable: response.data.telephonePortable || "",
            image: response.data.image || null,
          }));
          const imageUrl = response.data.image;

          if (imageUrl instanceof Blob) {
            setProfileImageUrl(URL.createObjectURL(imageUrl));
          } else {
            console.error("L'image n'est pas au format attendu :", imageUrl);
          }
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
      } else if (field === "image") {
        // Gestion du champ d'image
        const newEditData = {
          ...prevData,
          image: value,
        };
        console.log("Chemin de l'image côté client :", newEditData.image);
        // Mise à jour de profileImageUrl
        setProfileImageUrl(URL.createObjectURL(value));
        return newEditData;
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
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="formCompte">
      <div className="compte">
        <h2>Compte</h2>
        <hr></hr>
        <div className="comptePseudo">
          <div className="imgProfil">
            {editData.image && (
              <img
                className="imageProfil"
                src={
                  profileImageUrl || `http://localhost:5000/${editData.image}`
                }
                alt="Profile"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleInputChange("image", e.target.files[0])}
            />
            {console.log(
              "Chemin de l'image côté client :",
              `http://localhost:5000/${editData.image}`
            )}
          </div>
          <div className="labelCompte">
          </div>
          <div className="inputCompte">
            <input
              className="inputComptePseudo"
              type="text"
              placeholder="Nom d'utilisateur"
              value={editData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              readOnly={!isEditMode} // Empêcher la modification si le mode édition est désactivé
            />
          </div>
        </div>
        <hr />

        <div className="divisionCompte">
          <div className="labelCompte">
            <label>Adresse email : </label>
            <label>Mot de passe :</label>
            <label>Date de naissance : </label>
            <label>Genre : </label>
            <label>Pays : </label>
            <strong>Pays :</strong>
            <label>Adresse : </label>
            <label>Code Postal : </label>
            <label>Ville : </label>
            <label>Téléphone : </label>
            <label>Téléphone Portable : </label>
          </div>
          <div className="inputCompte">
            <div>
              <input
                className="inputCompteText"
                type="text"
                placeholder="Adresse email"
                value={editData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                readOnly={!isEditMode}
              />
            </div>
            <div className="inputMdp">
              <input
                className="inputCompteText"
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={editData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                readOnly={!isEditMode}
              />
              <span
                className="passwordToggleIcon2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="compteDate">
              <input
                className="inputCompteDate"
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
                className="inputCompteDate"
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
                className="inputCompteDate"
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
            </div>
            <div className="compteGenre">
              <input
                className="inputCompteRadio"
                type="radio"
                id="homme"
                name="genre"
                value="homme"
                checked={editData.genre === "homme"}
                onChange={() => handleInputChange("genre", "homme")}
                readOnly={!isEditMode}
              />
              <label htmlFor="homme">Homme</label>
              <input
                className="inputCompteRadio"
                type="radio"
                id="femme"
                name="genre"
                value="femme"
                checked={editData.genre === "femme"}
                onChange={() => handleInputChange("genre", "femme")}
                readOnly={!isEditMode}
              />
              <label htmlFor="femme">Femme</label>
              <input
                className="inputCompteRadio"
                type="radio"
                id="nonRenseigne"
                name="genre"
                value="nonRenseigne"
                checked={editData.genre === "nonRenseigne"}
                onChange={() => handleInputChange("genre", "nonRenseigne")}
                readOnly={!isEditMode}
              />
              <label htmlFor="nonRenseigne">Non renseigné</label>
            </div>
            <div>
              <CountryDropdown
                className="inputComptePays"
                country={editData.pays || "France"}
                placeholder="Pays"
                onChange={(selectedCountry) =>
                  handleInputChange("pays", selectedCountry)
                }
                disableWhenEmpty={true}
                readOnly={!isEditMode}
              />
              <div>{editData.pays}</div>
            </div>
            <div>
              <input
                className="inputCompteText"
                type="text"
                placeholder="Adresse"
                value={editData.adresse}
                onChange={(e) => handleInputChange("adresse", e.target.value)}
                readOnly={!isEditMode}
              />
            </div>
            <div>
              <input
                className="inputCompteText"
                type="text"
                placeholder="Code Postal"
                value={editData.codePostal}
                onChange={(e) =>
                  handleInputChange("codePostal", e.target.value)
                }
                readOnly={!isEditMode}
              />
            </div>
            <div>
              <input
                className="inputCompteText"
                type="text"
                placeholder="Ville"
                value={editData.ville}
                onChange={(e) => handleInputChange("ville", e.target.value)}
                readOnly={!isEditMode}
              />
            </div>
            <div>
              <input
                className="inputCompteText"
                type="text"
                placeholder="Téléphone"
                value={editData.telephone}
                onChange={(e) => handleInputChange("telephone", e.target.value)}
                readOnly={!isEditMode}
              />
            </div>
            <div>
              <input
                className="inputCompteText"
                type="text"
                placeholder="Téléphone Portable"
                value={editData.telephonePortable}
                onChange={(e) =>
                  handleInputChange("telephonePortable", e.target.value)
                }
                readOnly={!isEditMode}
              />
            </div>
          </div>
        </div>
        <div className="buttonCompte">
          {!isEditMode && (
            <button className="buttonModif" onClick={() => setIsEditMode(true)}>
              Modifier
            </button>
          )}
          {isEditMode && (
            <div className="buttonValidModif">
              <button className="buttonModif" onClick={handleSaveChanges}>
                Valider Modification
              </button>
              <button
                className="buttonModif"
                onClick={() => setIsEditMode(false)}
              >
                Annuler
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
