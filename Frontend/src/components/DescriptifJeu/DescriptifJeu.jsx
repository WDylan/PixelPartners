import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

import "./DescriptifJeu.css";

export default function DescriptifJeu() {
  const { id } = useParams(); // Récupére l'ID du jeu depuis les paramètres d'URL
  const { isAuthenticated, user } = useAuth(); // Utilise useAuth pour obtenir l'état d'authentification
  const [jeu, setJeu] = useState(null);
  const [plateformes, setPlateformes] = useState([]);
  const [genres, setGenres] = useState([]);
  const [noteHovered, setNoteHovered] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [userNote, setUserNote] = useState(null); // Ajout de l'état pour stocker la note de l'utilisateur
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moyenneNotes, setMoyenneNotes] = useState(null);
  const [commentaire, setCommentaire] = useState("");
  const [commentaires, setCommentaires] = useState([]);


  const navigate = useNavigate();

  const notes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Fonction pour récupérer la note utilisateur
  const fetchNote = async () => {
    try {
      if (isAuthenticated && user && jeu) {
        console.log("ID utilisateur:", user.id);
        console.log("ID jeu:", jeu.id);

        const noteResponse = await axios.get(
          `http://localhost:5000/notes/${user.id}/${jeu.id}`,
          { withCredentials: true }
        );
        console.log("Réponse de la requête GET :", noteResponse.data);
        setUserNote(noteResponse.data.length > 0 ? noteResponse.data[0].note : null);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la note :", error.message);
      if (error.response) {
        console.error("Réponse du serveur :", error.response.data);
      }
    }
  };

  const fetchCommentaires = async () => {
    try {
      const commentairesResponse = await axios.get(`http://localhost:5000/commentaires/${id}`);
      console.log("Réponse de la requête GET commentaires :", commentairesResponse.data);
      setCommentaires(commentairesResponse.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des commentaires :", error.message);
      if (error.response) {
        console.error("Réponse du serveur :", error.response.data);
      }
    }
  };

  useEffect(() => {
    const fetchJeuAndNote = async () => {
      try {
        // Récupère les informations du jeu
        console.log("Fetching jeu and note...");
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

        // Appelle la fonction pour récupérer la note de l'utilisateur
        fetchNote(); // Utilisation de 'await' pour s'assurer que la note est récupérée avant de continuer

        // Récupérer la moyenne des notes pour le jeu
        const moyenneResponse = await axios.get(`http://localhost:5000/notes/moyenne/${id}`);

        setMoyenneNotes(moyenneResponse.data.moyenne);
        // Appelle la fonction pour récupérer les commentaires
        await fetchCommentaires();
      } catch (error) {
        console.error("Erreur lors de la récupération du jeu:", error);
        console.error("Error fetching jeu and note:", error);
      }
    };

    fetchJeuAndNote();
  }, [id, isAuthenticated, user]);

  const handleNoteSelected = async (note) => {
    try {
      console.log("isAuthenticated:", isAuthenticated);
      console.log("user:", user);
      console.log("jeu:", jeu);

      if (isAuthenticated && user && jeu) {
        console.log("Making request with user.id:", user.id);

        const commentaire = "";

        const response = await axios.post("http://localhost:5000/notes", {
          id_user: user.id,
          id_jeu: jeu.id,
          note: note,
          commentaire: commentaire || "", // Utilisez une chaîne vide si aucun commentaire n'est fourni
        });

        console.log("Note sélectionnée :", note);
        console.log("Reponse status :", response.status);
        setSelectedNote(note);
        setNoteHovered(null);

        // Appelle la fonction pour mettre à jour la note de l'utilisateur après la sélection
        await fetchNote();
      } else {
        console.error("Utilisateur non authentifié ou ID du jeu manquant :", user, jeu);
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleReviewSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/notes", {
        id_user: user.id,
        id_jeu: jeu.id,
        note: selectedNote,
        commentaire: commentaire,
      });

      await fetchNote();

      closeModal();
    } catch (error) {
      console.error("Erreur lors de la soumission de la revue :", error.message);
      if (error.response) {
        console.error("Réponse du serveur :", error.response.data);
      }
    }
  };

  const getColorClass = (note) => {
    if (note >= 0 && note <= 3) {
      return "noteRouge";
    } else if (note >= 4 && note <= 6) {
      return "noteJaune";
    } else if (note >= 7 && note <= 10) {
      return "noteVert";
    } else {
      return ""; // Valeur par défaut
    }
  };

  return (
    <div className="formJeu">
      <div>
        <p>{jeu.titre}</p>
        <p>Date de sortie: {formatFullDate(jeu.dateSortie)}</p>
        <hr />
        <p>Note utilisateurs :  <span className={`carre ${getColorClass(moyenneNotes)}`}>{moyenneNotes}</span></p>
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
                onClick={() => handleNoteSelected(note)}
              ></div>
            ))}
            <div
              className={`rond ${noteHovered !== null ? `note${noteHovered}` : selectedNote !== null ? `note${selectedNote}` : userNote !== null ? `note${userNote}` : ""}`}
            >
              {(noteHovered !== null || selectedNote !== null || userNote !== null) && (
                <div className="noteText">{noteHovered !== null ? noteHovered : selectedNote !== null ? selectedNote : userNote}</div>
              )}
            </div>
          </div>
        )}
        {/* Bouton pour ouvrir la fenêtre modale */}
        <button onClick={openModal}>Ajouter ma revue</button>
        {/* Fenêtre modale */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Ajouter ma revue</h2>
              </div>
              <p>{jeu.titre}</p>
              <hr />
              <div className="modal-content">
                <p>Note :</p>
                {/* Ajouter la barre de notes à la fenêtre modale */}
                <div
                  className={`rond ${noteHovered !== null ? `note${noteHovered}` : selectedNote !== null ? `note${selectedNote}` : ""}`}
                >
                  {(noteHovered !== null || selectedNote !== null) && (
                    <div className="noteText">{noteHovered !== null ? noteHovered : selectedNote}</div>
                  )}
                </div>
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
                      onClick={() => setSelectedNote(note)}
                    ></div>
                  ))}
                </div>
                <hr />
                <p>Ecrivez une revue pour {jeu.titre}</p>
                <textarea
                  value={commentaire}
                  onChange={(e) => setCommentaire(e.target.value)}
                ></textarea>
                <button onClick={handleReviewSubmit}>Poster</button>
                <button onClick={closeModal}>Annuler</button>
              </div>
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
      {commentaires.length > 0 && (
        <div>
          <h2>Commentaires</h2>
          {commentaires.map((commentaire, index) => (
            <div key={index}>
              <p>Note: <span className={`carre ${getColorClass(commentaire.note)}`}>{commentaire.note}</span></p>
              <p>Date: {commentaire.date_note}</p>
              <p>
                Utilisateur: {commentaire.id_user ? (commentaire.username ? commentaire.username : "Profil supprimé") : "Profil supprimé"}
              </p>
              <p>Commentaire: {commentaire.commentaire}</p>
            </div>
          ))}
        </div>
      )}
    </div >
  );
} 