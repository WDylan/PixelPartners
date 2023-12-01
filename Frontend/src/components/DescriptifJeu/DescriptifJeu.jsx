import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import YouTube from "react-youtube";

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
        setUserNote(
          noteResponse.data.length > 0 ? noteResponse.data[0].note : null
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la note :",
        error.message
      );
      if (error.response) {
        console.error("Réponse du serveur :", error.response.data);
      }
    }
  };

  const fetchCommentaires = async () => {
    try {
      const commentairesResponse = await axios.get(
        `http://localhost:5000/commentaires/${id}`
      );
      console.log(
        "Réponse de la requête GET commentaires :",
        commentairesResponse.data
      );
      setCommentaires(commentairesResponse.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des commentaires :",
        error.message
      );
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
        const moyenneResponse = await axios.get(
          `http://localhost:5000/notes/moyenne/${id}`
        );

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
    return `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
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
      console.error(
        "Erreur lors de la soumission de la revue :",
        error.message
      );
      if (error.response) {
        console.error("Réponse du serveur :", error.response.data);
      }
    }
  };

  const extractVideoId = (videoUrl) => {
    const urlParams = new URLSearchParams(new URL(videoUrl).search);
    return urlParams.get("v");
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
    <div className="containerFormJeu">
      <div className="descriptifJeu">
        <div>
          {jeu.video && (
            <YouTube
              videoId={extractVideoId(jeu.video)}
              opts={{ width: "760", height: "415" }}
              onReady={(e) => e.target.pauseVideo()}
            />
          )}
          {!jeu.video && <p>Aucune vidéo disponible pour ce jeu.</p>}
        </div>
        <div className="infosJeu">
          <h1>{jeu.titre}</h1>
          <div>
            <span className="labelJeu">Date de sortie : </span>
            <span>{formatFullDate(jeu.dateSortie)}</span>
            <hr />
          </div>
          <div className="moyenneUtilisateurs">
            <span className="labelJeu">Note utilisateurs : </span>
            <span className={`carre ${getColorClass(moyenneNotes)}`}>
              {moyenneNotes}
            </span>
          </div>
          <div>
            <span className="labelJeu">Ma note</span>
            <div className="noteUtilisateur">
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
                    className={`rond ${
                      noteHovered !== null
                        ? `note${noteHovered}`
                        : selectedNote !== null
                        ? `note${selectedNote}`
                        : userNote !== null
                        ? `note${userNote}`
                        : ""
                    }`}
                  >
                    {(noteHovered !== null ||
                      selectedNote !== null ||
                      userNote !== null) && (
                      <div className="noteText">
                        {noteHovered !== null
                          ? noteHovered
                          : selectedNote !== null
                          ? selectedNote
                          : userNote}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="containerButtonRevue">
            <button className="buttonRevue" onClick={openModal}>
              Ajouter ma revue
            </button>
          </div>
          {/* Fenêtre modale */}
          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <div className="modal-header">
                  <h>Ajouter ma revue</h>
                </div>
                <p className="labelJeu">
                  <h2>{jeu.titre}</h2>
                </p>
                <hr />
                <div className="modal-content">
                  <p>Note :</p>
                  <div className="noteModal">
                    <div
                      className={`rond ${
                        noteHovered !== null
                          ? `note${noteHovered}`
                          : selectedNote !== null
                          ? `note${selectedNote}`
                          : ""
                      }`}
                    >
                      {(noteHovered !== null || selectedNote !== null) && (
                        <div className="noteText">
                          {noteHovered !== null ? noteHovered : selectedNote}
                        </div>
                      )}
                    </div>
                    <div className="barre">
                      {notes.map((note, index) => (
                        <div
                          key={index}
                          className={`cellule note${note} 
                        ${index === 0 ? "arrondieGauche" : ""}
                        ${index === 10 ? "arrondieDroite" : ""}
                        ${
                          index < 4
                            ? "noteRouge"
                            : index < 7
                            ? "noteJaune"
                            : "noteVert"
                        }
                      `}
                          onMouseEnter={() => setNoteHovered(note)}
                          onMouseLeave={() => setNoteHovered(null)}
                          onClick={() => setSelectedNote(note)}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <hr />
                  <p>Ecrivez une revue pour {jeu.titre}</p>
                  <textarea
                    className="commentaireModal"
                    value={commentaire}
                    onChange={(e) => setCommentaire(e.target.value)}
                  ></textarea>
                  <div className="buttonsModal">
                    <button
                      className="buttonModal"
                      onClick={handleReviewSubmit}
                    >
                      Poster
                    </button>
                    <button className="buttonModal" onClick={closeModal}>
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="complementDescriptifJeu">
        <h1>Détails</h1>
        <hr />
        <div className="displayDescriptifJeu">
          <div className="resumePart">
            <span className="labelJeu">Résumé</span>
            <br />
            <br />
            <span>{jeu.description}</span>
          </div>
          <div className="editionParts">
            <div className="editionPart1">
              <p>
                <span className="labelJeu">Plateforme : </span>
                {plateformes.map((plateforme) => plateforme.nom).join(", ")}
              </p>
              <p>
                <span className="labelJeu">Date de sortie : </span>
                {formatFullDate(jeu.dateSortie)}
              </p>
            </div>
            <div className="editionPart2">
              <p>
                <span className="labelJeu">Developpeur : </span>
                {jeu.developpeur}
              </p>
              <p>
                <span className="labelJeu">Éditeur : </span>
                {jeu.editeur}
              </p>
            </div>
            <div className="editionPart3">
              <p>
                <span className="labelJeu">Genres : </span>
                {genres.map((genre) => genre.nom).join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      {commentaires.length > 0 && (
        <div>
          <h2>Commentaires</h2>
          <div className="listeCommentaire">
            {commentaires.map((commentaire, index) => (
              <div key={index} className="caseCommentaire">
                <p className="enteteCommentaire">
                  <span className={`carre ${getColorClass(commentaire.note)}`}>
                    {commentaire.note}
                  </span>
                  <span className="userName">
                    {commentaire.id_user
                      ? commentaire.username
                        ? commentaire.username
                        : "Profil supprimé"
                      : "Profil supprimé"}
                  </span>
                </p>
                <hr />
                <p>
                  <span className="labelJeu">Date : </span>
                  {commentaire.date_note}
                </p>
                <hr />
                <p>
                  <span className="labelJeu">Commentaire : </span>
                  <span className="commentaire">
                    {" "}
                    {commentaire.commentaire}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
