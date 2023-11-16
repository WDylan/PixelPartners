import React from "react";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import Profil from "../../components/Profil/Profil";

import "./PageProfil.css";

export default function PageProfil() {
  return (
    <div className="profilPage">
      <Nav />
      <Profil />
      <Footer />
    </div>
  );
}
