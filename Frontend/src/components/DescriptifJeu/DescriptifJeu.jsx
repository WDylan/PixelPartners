import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

import "./DescriptifJeu.css";

export default function DescriptifJeu() {
  const { id } = useParams(); // Récupérer l'ID du jeu depuis les paramètres d'URL
  const { isAuthenticated, user } = useAuth(); // Utilise useAuth pour obtenir l'état d'authentification
  const [jeu, setJeu] = useState(null);
  const [plateformes, setPlateformes] = useState([]);
  const [genres, setGenres] = useState([]);
  const [noteHovered, setNoteHovered] = useState(null);

  const notes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJeu = async () => {
      try {
        // Récupére les informations du jeu
        const response = await axios.get(`http://localhost:5000/jeux/${id}`);
        const fetchedJeu = response.data;
        setJeu(fetchedJeu);

        console.log("Jeux API Response:", response.data);

        // Récupérer les plateformes associées au jeu
        const plateformesResponse = await axios.get(
          `http://localhost:5000/jeux/${id}/plateformes`
        );
        setPlateformes(plateformesResponse.data);

        // Récupérer les genres associés au jeu
        const genresResponse = await axios.get(
          `http://localhost:5000/jeux/${id}/genres`
        );
        setGenres(genresResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du jeu:", error);
      }
    };

    fetchJeu();
  }, [id, isAuthenticated, user]);

  const handleNoteSelected = async (note) => {
    try {
      console.log("isAuthenticated:", isAuthenticated);
      console.log("user:", user);
      console.log("jeu:", jeu);

      if (isAuthenticated && user && jeu) {
        console.log("Making request with user.id:", user.id);
        const response = await axios.post("http://localhost:5000/notes", {
          id_user: user.id,
          id_jeu: jeu.id,
          note: note,
          commentaire: "",
        });

        console.log("Note sélectionnée :", note);
        console.log("Reponse status :", response.status);
      } else {
        console.error(
          "Utilisateur non authentifié ou ID du jeu manquant :",
          user,
          jeu
        );
        navigate("/connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la sélection de la note :", error.message);
      if (error.response) {
        console.error("Réponse du serveur:", error.response.data);
      }
    }
  };

  const formatFullDate = (dateStr) => {
    if (!dateStr) {
      return "";
    }
    const dateObj = new Date(dateStr);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""
      }${day}`;
  };

  if (!jeu) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <div className="formJeu">
      <div>
        <p>{jeu.titre}</p>
        <p>Date de sortie: {formatFullDate(jeu.dateSortie)}</p>
        <hr />
        <p>
          Note utilisateur :
        </p>
        <p>Ma note</p>
        {jeu && (
          <div className="barre">
            {notes.map((note, index) => (
              <div
                key={index}
                className={`cellule note${note} 
          ${index === 0 ? "arrondieGauche" : ""}
          ${index === 10 ? "arrondieDroite" : ""}
          ${index < 4 ? "noteRouge" : index < 7 ? "noteJaune" : "noteVert"}
        `}
                onMouseEnter={() => setNoteHovered(note)}
                onMouseLeave={() => setNoteHovered(null)}
                onClick={() => handleNoteSelected(note)} // Ajout de la note lors du clic
              ></div>
            ))}
            <div
              className={`rond ${noteHovered !== null ? `note${noteHovered}` : ""
                }`}
            >
              {noteHovered !== null && (
                <div className="noteText">{noteHovered}</div>
              )}
            </div>
          </div>
        )}
      </div>
      <div>
        <p>Résumé: {jeu.description}</p>
        <div>
          <div>
            <p>
              Plateforme :{" "}
              {plateformes.map((plateforme) => plateforme.nom).join(", ")}
            </p>
            <p>Date de sortie: {formatFullDate(jeu.dateSortie)}</p>
          </div>
          <div>
            <p>Developpeur : {jeu.developpeur}</p>
            <p>Éditeur : {jeu.editeur}</p>
          </div>
          <div>Genres : {genres.map((genre) => genre.nom).join(", ")}</div>
        </div>
      </div>
    </div>
  );
} 