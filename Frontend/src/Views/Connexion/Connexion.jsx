import React, { useState } from "react";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import ConnexionForm from "../../components/ConnexionForm/ConnexionForm";

import "./Connexion.css";

export default function Connexion() {
  const [isConnected, setIsConnected] = useState(false);

  // Fonction pour mettre à jour l'état de connexion
  const handleLoginSuccess = (success) => {
    console.log("Login success:", success);
    setIsConnected(success);
    localStorage.setItem("isConnected", JSON.stringify(success));
  };

  console.log("Is connected at start:", isConnected);

  return (
    <div className="connexionPage">
      <Nav isConnected={isConnected} />
      <ConnexionForm onLoginSuccess={handleLoginSuccess} />
      <Footer />
    </div>
  );
}
