import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./DescriptifJeu.css";

export default function DescriptifJeu() {
    const { id } = useParams(); // Récupérer l'ID du jeu depuis les paramètres d'URL
    const [jeu, setJeu] = useState(null);
    const [plateformes, setPlateformes] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchJeu = async () => {
            try {
                // Récupére les informations du jeu
                const response = await axios.get(`http://localhost:5000/jeux/${id}`);
                setJeu(response.data);

                // Récupérer les plateformes associées au jeu
                const plateformesResponse = await axios.get(`http://localhost:5000/jeux/${id}/plateformes`);
                setPlateformes(plateformesResponse.data);

                // Récupérer les genres associés au jeu
                const genresResponse = await axios.get(`http://localhost:5000/jeux/${id}/genres`);
                setGenres(genresResponse.data);
            } catch (error) {
                console.error("Erreur lors de la récupération du jeu:", error);
            }
        };

        fetchJeu();
    }, [id]);

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

    if (!jeu) {
        return <p>Chargement en cours...</p>;
    }

    return (
        <div className="formJeu">
            <div>
                <p>{jeu.titre}</p>
                <p>Date de sortie: {formatFullDate(jeu.dateSortie)}</p>
                <p>Résumé: {jeu.description}</p>
            </div>
            <div>
                <p>Plateforme : {plateformes.map((plateforme) => plateforme.nom).join(', ')}</p>
                <p>Date de sortie: {formatFullDate(jeu.dateSortie)}</p>
            </div>
            <div>
                <p>Developpeur : {jeu.developpeur}</p>
                <p>Éditeur : {jeu.editeur}</p>
            </div>
            <div>Genres : {genres.map((genre) => genre.nom).join(', ')}</div>
        </div>
    )
}