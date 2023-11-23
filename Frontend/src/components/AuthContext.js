import React, { createContext, useContext, useState } from "react";

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

  return (
    <AuthContext.Provider value={{ isAuthenticated: isConnected, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
