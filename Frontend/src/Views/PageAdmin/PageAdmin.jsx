import React from "react";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import AdminPanel from "../../components/AdminPanel/AdminPanel";

import "./PageAdmin.css";

export default function PanelAdmin() {
  return (
    <div>
      <Nav />
      <AdminPanel />
      <Footer />
    </div>
  );
}
