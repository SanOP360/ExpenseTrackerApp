// AuthContext.js
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [idToken, setIdToken] = useState(
    localStorage.getItem("idToken") || null
  );
  const [loginCheck, setLoginCheck] = useState(!!idToken);

  useEffect(() => {
    localStorage.setItem("idToken", idToken);
    setLoginCheck(!!idToken);
  }, [idToken]);

  const login = (token) => {
    setIdToken(token);
  };

  const logout = () => {
    setIdToken(null);
  };

  return (
    <AuthContext.Provider value={{ idToken, login, logout, loginCheck }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
