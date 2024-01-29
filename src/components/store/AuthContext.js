import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [idToken, setIdToken] = useState(
    localStorage.getItem("idToken") || null
  );

  useEffect(() => {

    localStorage.setItem("idToken", idToken);
  }, [idToken]);

  const login = (token) => {
    setIdToken(token);
  };

  const logout = () => {
    setIdToken(null);
  };

  return (
    <AuthContext.Provider value={{ idToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
