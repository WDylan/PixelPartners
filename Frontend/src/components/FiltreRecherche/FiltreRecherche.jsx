import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FiltreRecherche.css";

function FiltreRecherche() {
  const [jeux, setJeux] = useState([]);
  const [plateformes, setPlateformes] = useState([]);
  const [genres, setGenres] = useState([]);
  const [plateforme, setPlateforme] = useState("");
  const [genre, setGenre] = useState("");
  const [isOpenPlateformes, setIsOpenPlateformes] = useState(false);
  const [isOpenGenres, setIsOpenGenres] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resetButtonClicked, setResetButtonClicked] = useState(false); // Nouvel état
  const [gamesPerPage] = useState(10);

  const navigate = useNavigate();

  const goToJeu = (jeuId) => {
    // Naviguer vers la page du jeu avec l'ID
    navigate(`/jeu/${jeuId}`);
  };

  const fetchJeux = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/jeux?plateforme=${plateforme}&genre=${genre}`
      );
      setJeux(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des jeux:", error);
    }
  }, [plateforme, genre]);

  const fetchPlateformes = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/plateformes");
      setPlateformes(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des plateformes:", error);
    }
  }, []);

  const fetchGenres = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/genres");
      setGenres(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des genres:", error);
    }
  }, []);

  useEffect(() => {
    fetchJeux();
    fetchPlateformes();
    fetchGenres();
  }, [fetchJeux, fetchPlateformes, fetchGenres]);

  const formatFullDate = (dateStr) => {
    if (!dateStr) {
      return "";
    }
    const dateObj = new Date(dateStr);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
  };

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(jeux.length / gamesPerPage);

  // Calcul des index de début et de fin pour la pagination
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = jeux.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Remonte en haut de la page
  };

  const resetFilters = () => {
    setPlateforme("");
    setGenre("");
    setResetButtonClicked(true);
    setTimeout(() => {
      setResetButtonClicked(false);
    }, 500);
  };

  return (
    <div className="containerFiltre">
      <h1>Liste des jeux</h1>
      <div className="filtreDisplay">
        <div className="listFiltre">
          <div>
            <h1>Filtres</h1>
            <hr />
            <h3>Plateforme:</h3>
            <div className="dropdown">
              <div
                onClick={() => setIsOpenPlateformes(!isOpenPlateformes)}
                className="plateformeGenreButton"
              >
                {plateforme ? plateforme : "Sélectionnez une plateforme"}
              </div>
              {isOpenPlateformes && (
                <div className="dropdownContent">
                  {plateformes.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setPlateforme(p.nom);
                        setIsOpenPlateformes(false);
                      }}
                      className="plateformeGenreChoise"
                    >
                      {p.nom}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {plateforme && (
              <div className="selectedFilter">
                Plateforme sélectionnée : {plateforme}
              </div>
            )}
          </div>
          <div>
            <hr />
            <h3>Genre:</h3>
            <div className="dropdown">
              <div
                onClick={() => setIsOpenGenres(!isOpenGenres)}
                className="plateformeGenreButton"
              >
                {genre ? genre : "Sélectionnez un genre"}
              </div>
              {isOpenGenres && (
                <div className="dropdownContent">
                  {genres.map((g) => (
                    <div
                      key={g.id}
                      onClick={() => {
                        setGenre(g.nom);
                        setIsOpenGenres(false);
                      }}
                      className="plateformeGenreChoise"
                    >
                      {g.nom}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {genre && (
              <div className="selectedFilter">Genre sélectionné : {genre}</div>
            )}
            <hr />
          </div>
          <div className="containerButtonFiltre">
            <button
              onClick={resetFilters}
              className={`resetFiltre ${
                resetButtonClicked ? "resetButtonClicked" : ""
              }`}
            >
              Réinitialiser les filtres
            </button>
          </div>
        </div>
        <div className="listJeu">
          {currentGames.map((jeu) => (
            <div
              key={jeu.id}
              onClick={() => goToJeu(jeu.id)}
              className="caseJeu"
            >
              <div className="imgJeu">
                <img
                  className="imageJeu"
                  src={`img/jeux/${jeu.image}`}
                  alt={jeu.titre}
                />
              </div>
              <div>
                <h3 className="titreJeu">{jeu.titre}</h3>
                <p>{formatFullDate(jeu.dateSortie)}</p>
                <p className="descriptionJeu">{jeu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination */}
      <ul className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className="buttonPagination"
            key={index}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </ul>
    </div>
  );
}

export default FiltreRecherche;
