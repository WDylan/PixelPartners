import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Compte from "../Compte/Compte";

import "./Profil.css";

const Profil = () => {
  return (
    <Router>
      <div className="container">
        <div className="parametres">
          <li>Paramètres</li>
          <ul>
            <li>
              <Link to="/compte">Compte</Link>
            </li>
            <li>
              <Link to="/profil">Profil</Link>
            </li>
            <li>
              <Link to="/notifications">Notifications</Link>
            </li>
            <li>
              <Link to="/audios">Audios</Link>
            </li>
            <li>
              <Link to="/accessibilite">Accessibilité</Link>
            </li>
            <li>
              <Link to="/a-propos-de">A propos de</Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route path="/compte" component={Compte} />
          {/* <Route path="/supportGaming" component={SupportGaming} /> */}
          {/* <Route path="/notifications" component={Notifications} />
          <Route path="/audios" component={Audios} />
          <Route path="/accessibilite" component={Accessibilite} />
          <Route path="/a-propos-de" component={AProposDe} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default Profil;
