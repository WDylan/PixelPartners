// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Accueil from './Views/Accueil/Accueil';
import Connexion from './Views/Connexion/Connexion';
import Inscription from './Views/Inscription/Inscription';
import SupportGaming from './components/SupportGaming/SupportGaming';
import Compte from './components/Compte/Compte';
import Classement from './Views/Classement/Classement';
import PageProfil from './Views/PageProfil/PageProfil';
import Jeu from './Views/Jeu/Jeu'

import './App.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/profil" element={<PageProfil />}>
        <Route index element={<Compte />} />
        <Route path="compte" element={<Compte />} />
        <Route path="supportGaming" element={<SupportGaming />} />
      </Route>
      <Route path="/classement" element={<Classement />} />
      <Route path="/jeu/:id" element={<Jeu />} />
    </Routes>
  );
}

export default App;
