import React from "react";
import Footer from "../../components/Footer/Footer";
import DescriptifJeu from "../../components/DescriptifJeu/DescriptifJeu";
import Nav from "../../components/Nav/Nav";
import { useParams } from "react-router-dom";

import "./Jeu.css";

export default function Jeu() {
  const { id } = useParams();
  return (
    <div className="jeuPage">
      <Nav />
      <DescriptifJeu jeuId={id} />
      <Footer />
    </div>
  );
}