import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./FiltreRecherche.css";

function FiltreRecherche() {
  const [jeux, setJeux] = useState([]);
  const [plateformes, setPlateformes] = useState([]);
  const [genres, setGenres] = useState([]);
  const [plateforme, setPlateforme] = useState('');
  const [genre, setGenre] = useState('');

  const fetchJeux = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/jeux?plateforme=${plateforme}&genre=${genre}`);
      setJeux(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des jeux:', error);
    }
  }, [plateforme, genre]);

  const fetchPlateformes = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/plateformes');
      setPlateformes(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des plateformes:', error);
    }
  }, []);

  const fetchGenres = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/genres');
      setGenres(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des genres:', error);
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
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  };

  return (
    <div className="listFiltre">
      <h1>Liste des jeux</h1>
      <div>
        <label>Plateforme:</label>
        <select onChange={(e) => setPlateforme(e.target.value)}>
          <option value="">Toutes les plateformes</option>
          {plateformes.map((p) => (
            <option key={p.id} value={p.nom}>
              {p.nom}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Genre:</label>
        <select onChange={(e) => setGenre(e.target.value)}>
          <option value="">Tous les genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.nom}>
              {g.nom}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {jeux.map((jeu) => (
          <li key={jeu.id}>
            <h3>{jeu.titre}</h3>
            <p>{formatFullDate(jeu.dateSortie)}</p>
            <p>{jeu.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FiltreRecherche;
