import React from "react";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import Compte from "../../components/Compte/Compte";

import "./Profil.css";

export default function Profil() {
  return (
    <div className="profilPage">
      <Nav />
      <Compte />
      <Footer />
    </div>
  );
}
