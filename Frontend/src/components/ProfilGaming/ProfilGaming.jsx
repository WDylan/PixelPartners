import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../AuthContext";

import "./ProfilGaming.css";

export default function ProfilGaming() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="containerProfilGaming">
        
    </div>
  )
}
