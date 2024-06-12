import React from "react";
import { useNavigate } from "react-router-dom";
import "../resetCSS.css";
import "./Footer.css";

function Footer() {
  const navigate = useNavigate();
  const goToAccueil = () => {
    // Navigue vers la page d'Accueil
    navigate("/");
  };

  return (
    <footer>
      <div className="footerLinks">
        <div className="footerLink">
          <ul>
            <li onClick={goToAccueil}>Accueil</li>
            <li>FAQ</li>
            <li>Contact</li>
            <li>Mentions légales</li>
          </ul>
        </div>
        <div className="footerSocials">
          <img className="facebook" src="/img/icons/facebook.png"></img>
          <img className="twitter" src="/img/icons/twitter.png"></img>
          <img className="instagram" src="/img/icons/instagram.png"></img>
        </div>
        <div className="footerSlogan">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
