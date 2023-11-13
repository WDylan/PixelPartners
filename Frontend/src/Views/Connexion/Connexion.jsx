import React from "react";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import ConnexionForm from "../../components/ConnexionForm/ConnexionForm";

import "./Connexion.css";

export default function Connexion() {
  return (
    <div className="connexionPage">
      <Nav />
      <ConnexionForm />
      <Footer />
    </div>
  );
}
