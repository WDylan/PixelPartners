import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Accueil from './Views/Accueil/Accueil';
import Connexion from './Views/Connexion/Connexion';
import Inscription from './Views/Inscription/Inscription'


function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Accueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
      </Routes>
    </div>
  )
}
export default App;
