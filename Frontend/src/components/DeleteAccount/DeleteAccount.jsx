import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from '../AuthContext.js'

import "./DeleteAccount.css";

export default function DeleteAccount() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
            navigate("/connexion");
        }
    }, [isAuthenticated, navigate]);

    const handleDeleteAccount = async () => {
        try {
            const response = await axios.delete("http://localhost:5000/users", {
                withCredentials: true,
            });

            if (response.status === 200) {
                // Suppression réussie
                // Déconnecte l'utilisateur après la suppression du compte
                logout();
                // Redirige vers la page d'accueil
                navigate("/");
            } else {
                console.error('Échec de la suppression du compte');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du compte :', error);
        }
    };

    return (
        <div className="containerDelete">
            <div className="delete">
                <h2>Supprimer Compte</h2>
                <hr />
                <p>La suppression du compte est irrémédiable, une fois valider,<br /> il sera impossible de récupérer le compte.</p>
                <div className="containerButton">
                    <button className="buttonDelete" onClick={handleDeleteAccount}>Supprimer le compte</button>
                </div>
            </div>

        </div>
    );
};
