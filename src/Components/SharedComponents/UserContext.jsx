import React, { createContext, useState, useContext } from 'react';

// Créez un contexte pour l'utilisateur
const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Initialiser l'état de l'utilisateur

  // Mettre à jour les données de l'utilisateur
  const setUserData = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
