import React, { useState } from "react";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import FiltreRecherche from "../../components/FiltreRecherche/FiltreRecherche";

import "./Classement.css";

export default function Classement() {
    return (
        <div className="classementPage">
            <Nav />
            <FiltreRecherche />
            <Footer />
        </div>
    )
}