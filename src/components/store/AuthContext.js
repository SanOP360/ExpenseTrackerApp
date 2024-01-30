// AuthContext.js
import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [idToken, setIdToken] = useState(
    localStorage.getItem("idToken") || null
  );
  


  const login = (token) => {
    setIdToken(token);
    localStorage.setItem("idToken", token);
  };

  const logout = () => {
    setIdToken(null);
    localStorage.removeItem("idToken");
  };


  const loginCheck = !!idToken;

  return (
    <AuthContext.Provider value={{ idToken, login, logout, loginCheck }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
