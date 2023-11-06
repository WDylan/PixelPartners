import React, { useState } from "react";
import "./Nav.css";

function Nav() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      // Lancer la recherche ici (par exemple, appeler une fonction pour effectuer la recherche)
      console.log(`Recherche: ${searchTerm}`);
    }
  };
  return (
    <header>
      <div className="navBar">
        <li className="logoNav">
          <img src="./img/9555325.resize.jpg" alt="img" />
        </li>
        <li>
          <input
            className="rechercheNav"
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
        </li>
        <li className="classementNav">
          Classement
          <ul className="navbarClassement">
            <li className="vide"></li>
            <li>
              <a href="./">Note</a>
            </li>
            <li>
              <a href="./">Sortie</a>
            </li>
            <li>
              <a href="./">Prochainement</a>
            </li>
          </ul>
        </li>
        <li className="titreNav">
          Titre
          <ul className="navbarTitre">
            <li className="vide"></li>
            <li>
              <a href="./">Option 1</a>
            </li>
            <li>
              <a href="./">Option 2</a>
            </li>
            <li>
              <a href="./">Option 3</a>
            </li>
          </ul>
        </li>
        <div>
          <button className="connexion">Connexion</button>
          <button className="inscription">Inscription</button>
        </div>
      </div>
    </header>
  );
}

export default Nav;
