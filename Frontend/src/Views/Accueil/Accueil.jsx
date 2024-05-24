import React from "react";
import "./Accueil.css";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import { Carousel } from "../../components/Carousel/Carousel";
import carouselData from "../../data/carouselData.json";
const { slides } = carouselData;

export default function Accueil() {
  return (
    <div className="accueilPage">
      <Nav />
      {/* <div className="accueilContainer">
        <div className="titreAccueil">
          <h1>Nouvelles sorties</h1>
          <Carousel data={slides} />
        </div>
        <div className="titreAccueil">
          <h1>Prochaines sorties</h1>
          <Carousel data={slides} />
        </div>
        <div className="titreAccueil">
          <h1>Les mieux notés</h1>
          <Carousel data={slides} />
        </div>
      </div>
      <Footer /> */}
    </div>
  );
}
