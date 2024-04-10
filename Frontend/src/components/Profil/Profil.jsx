// Profil.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Profil.css";

const Profil = () => {
  return (
    <div className="profilContainer">
      <div className="parametres">
        <h2>Paramètres</h2>
        <NavLink to="compte" className="menuProfil" >
          <div activeClassName="activeLink" >Compte</div>
        </NavLink>
        <NavLink to="profilGaming" className="menuProfil" >
          <div activeClassName="activeLink" >Profil Gaming</div>
        </NavLink>
        <NavLink to="deleteAccount" className="menuProfil">
          <div activeClassName="activeLink">Supprimer Compte</div>
        </NavLink>
      </div>
      <div className="profilContent">
        <Outlet />
      </div>
    </div>
  );
};

export default Profil;
