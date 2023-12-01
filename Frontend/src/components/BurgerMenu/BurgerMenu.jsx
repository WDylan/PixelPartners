// BurgerMenu.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./BurgerMenu.css";

const BurgerMenu = ({ isOpen, toggleMenu }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleDeconnexion = async () => {
    // Ajoutez une fenêtre de confirmation avant de déconnecter
    const confirmLogout = window.confirm(
      "Êtes-vous sûr de vouloir vous déconnecter ?"
    );
    if (!confirmLogout) {
      return; // Annule la déconnexion si l'utilisateur annule
    }
    try {
      await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });
      // Déconnectez l'utilisateur en utilisant la méthode du contexte d'authentification
      logout();
      // Redirigez l'utilisateur après la déconnexion
      navigate("/");

      console.log("Déconnexion réussie");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error.message);
      // Affiche un message d'erreur à l'utilisateur
      alert("Erreur lors de la déconnexion. Veuillez réessayer.");
    }
  };

  const goToConnexion = () => {
    navigate("/connexion");
    toggleMenu(); // Ferme le menu après la navigation
  };

  const goToInscription = () => {
    navigate("/inscription");
    toggleMenu();
  };

  const goToAccueil = () => {
    navigate("/");
    toggleMenu();
  };

  const goToProfil = () => {
    navigate("/profil");
    toggleMenu();
  };

  const goToClassement = () => {
    navigate("/classement");
    toggleMenu();
  };

  return (
    <div className={`burger-menu ${isOpen ? "open" : ""}`}>
      {/* Les trois lignes du menu hamburger */}
      <div className="burger-bars" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {isOpen && (
        <ul className="burger-menu-links">
          <li onClick={goToAccueil}>Accueil</li>
          <li onClick={goToClassement}>Classement</li>
          {isAuthenticated ? (
            <>
              <li onClick={goToProfil}>Profil</li>
              <li onClick={handleDeconnexion}>Déconnexion</li>
            </>
          ) : (
            <>
              <li onClick={goToInscription}>Inscription</li>
              <li onClick={goToConnexion}>Connexion</li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default BurgerMenu;
