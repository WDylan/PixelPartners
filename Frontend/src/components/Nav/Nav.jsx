import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Nav.css";
import axios from "axios";

function Nav() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(0);

  // Utilisation du contexte d'authentification

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const encodedSearchTerm = encodeURIComponent(searchTerm);
      const response = await axios.get(
        `http://localhost:5000/jeux/search?term=${encodedSearchTerm}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error.message);
    }
  };
  const handleChange = (event) => {
    // Réinitialise le timeout à chaque frappe
    clearTimeout(typingTimeout);

    // Configure un nouveau timeout
    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 300); // Met la durée en millisecondes

    setTypingTimeout(timeoutId);

    // Met à jour le terme de recherche
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    // Nettoie le timeout lorsque le composant est démonté ou lorsque searchTerm change
    return () => {
      clearTimeout(typingTimeout);
    };
  }, [typingTimeout, searchTerm]);

  const goToConnexion = () => {
    // Navigue vers la page de connexion
    navigate("/connexion");
  };

  const goToInscription = () => {
    // Navigue vers la page d'inscription
    navigate("/inscription");
  };

  const goToAccueil = () => {
    // Navigue vers la page d'Accueil
    navigate("/");
  };
  const goToProfil = () => {
    // Navigue vers la page Profil
    navigate("/profil");
  };
  const goToClassement = () => {
    // Navigue vers la page Profil
    navigate("/classement");
  };

  const handleDeconnexion = async () => {
    try {
      // Effectue la déconnexion coté serveur
      await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });
      // Mettez à jour le statut d'authentification local
      console.log("Avant déconnexion - isAuthenticated :", isAuthenticated);

      logout();
      // Mettez à jour le statut d'authentification local après la déconnexion
      console.log("Après déconnexion - isAuthenticated :", isAuthenticated);

      // Redirige l'utilisateur après la déconnexion
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
            onChange={handleChange}
            onKeyDown={handleSearch}
          />
        </li>
        {searchResults.length > 0 && (
          <div className="search-results">
            <h3>Résultats de la recherche :</h3>
            <ul>
              {searchResults.map((result) => (
                <li key={result.id}>
                  <a href={`/jeu/${result.id}`}>{result.titre}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <li className="classementNav" onClick={goToClassement}>
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
          {isAuthenticated ? (
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
