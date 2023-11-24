import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(() => {
    const storedIsConnected = localStorage.getItem("isConnected");
    return storedIsConnected ? JSON.parse(storedIsConnected) : false;
  });


  const [user, setUser] = useState(null);  // Ajout de l'état user

  const setConnected = (value) => {
    setIsConnected(value);
    localStorage.setItem("isConnected", JSON.stringify(value));
  };

  const login = (userData) => {  // Modification de la fonction login pour recevoir les données de l'utilisateur
    setConnected(true);
    setUser(userData);  // Mettre à jour l'état de l'utilisateur
  };

  const logout = () => {
    setConnected(false);
    setUser(null);  // Réinitialiser l'état de l'utilisateur lors de la déconnexion
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
        try {
            const response = await axios.get("http://localhost:5000/checkAuthStatus", {
                withCredentials: true
            });
            const userData = response.data;
            login(userData);
        } catch (error) {
            // Gérer l'erreur ou définir l'état isConnected sur false
            setConnected(false);
        }
    };
    checkAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: isConnected, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
