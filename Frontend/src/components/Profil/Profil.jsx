// Profil.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./Profil.css";

const Profil = () => {
  return (
    <div className="profilContainer">
      <div className="parametres">
        <li>Paramètres</li>
        <ul>
          <li>
            <Link to="compte">Compte</Link>
          </li>
          <li>
            <Link to="supportGaming">Support Gaming</Link>
          </li>
          {/* Ajoutez d'autres liens si nécessaire */}
        </ul>
      </div>
      <div className="profil-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Profil;
