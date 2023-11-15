import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";
import axios from "axios";

function Nav() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isConnected, setIsConnected] = useState(() => {
    const storedIsConnected = localStorage.getItem("isConnected");
    return storedIsConnected ? JSON.parse(storedIsConnected) : false;
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Mettre à jour le localStorage lorsque isConnected change
    localStorage.setItem("isConnected", JSON.stringify(isConnected));
  }, [isConnected]);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      // Lancer la recherche ici (par exemple, appeler une fonction pour effectuer la recherche)
      console.log(`Recherche: ${searchTerm}`);
    }
  };
  const goToConnexion = () => {
    // Naviguer vers la page de connexion
    navigate("/connexion");
  };

  const goToInscription = () => {
    // Naviguer vers la page d'inscription
    navigate("/inscription");
  };

  const goToAccueil = () => {
    // Naviguer vers la page d'Accueil
    navigate("/");
  };
  const goToProfil = () => {
    // Naviguer vers la page Profil
    navigate("/profil");
  };

  const handleDeconnexion = async () => {
    try {
      // Effectuez la déconnexion coté serveur
      await axios.post("http://localhost:5000/logout");
      setIsConnected(false);
      // Rediriger l'utilisateur après la déconnexion
      navigate("/");

      // Affichage d'un message de déconnexion réussie coté client
      console.log("Déconnexion réussie");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error.message);
    }
  };

  return (
    <header>
      <div className="navBar">
        <li className="logoNav" onClick={goToAccueil}>
          <img className="logo" src="./img/logo.png" alt="img" />
        </li>
        <li>
          <input
            className="rechercheNav"
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
        </li>
        <li className="classementNav">
          Classement
          <ul className="navbarClassement">
            <li className="vide"></li>
            <li>
              <a href="./">Note</a>
            </li>
            <li>
              <a href="./">Sortie</a>
            </li>
            <li>
              <a href="./">Prochainement</a>
            </li>
          </ul>
        </li>
        <li className="titreNav">
          Titre
          <ul className="navbarTitre">
            <li className="vide"></li>
            <li>
              <a href="./">Option 1</a>
            </li>
            <li>
              <a href="./">Option 2</a>
            </li>
            <li>
              <a href="./">Option 3</a>
            </li>
          </ul>
        </li>
        <div>
          {console.log("isConnected:", isConnected)}
          {isConnected ? (
            <>
              <button className="deconnexion" onClick={handleDeconnexion}>
                Déconnexion
              </button>
              <button className="profil" onClick={goToProfil}>
                Profil
              </button>
            </>
          ) : (
            <>
              <button className="connexion" onClick={goToConnexion}>
                Connexion
              </button>
              <button className="inscription" onClick={goToInscription}>
                Inscription
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Nav;
