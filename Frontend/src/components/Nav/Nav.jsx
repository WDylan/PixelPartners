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

  const handleSearch = async (event) => {
    if (event.key === "Enter") {
      try {
        const encodedSearchTerm = encodeURIComponent(searchTerm);
        console.log('URL de la requête:', `http://localhost:5000/jeux/search?term=${encodedSearchTerm}`);
        const response = await axios.get(`http://localhost:5000/jeux/search?term=${encodedSearchTerm}`);

        // Si un seul résultat est trouvé, redirige directement vers la page de détail du jeu
        if (response.data.length === 1) {
          const firstResult = response.data[0];
          navigate(`/jeu/${firstResult.id}`);
          // Vide les résultats de la recherche lors de la navigation vers une page de détail
          setSearchResults([]);
        } else {
          // Si plusieurs résultats, affiche les résultats ou redirige vers une page dédiée
          setSearchResults(response.data);
        }
      } catch (error) {
        console.error("Erreur lors de la recherche :", error.message);
      }
    }
  };

  const [searchResults, setSearchResults] = useState([]);

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
  const goToClassement = () => {
    // Naviguer vers la page Profil
    navigate("/classement");
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
