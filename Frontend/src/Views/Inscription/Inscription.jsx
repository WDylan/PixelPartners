import React from "react";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

import "./Inscription.css";

export default function Inscription() {
  return (
    <div className="inscriptionPage">
      <Nav />
      <RegistrationForm />
      <Footer />
    </div>
  );
}
