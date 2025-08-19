import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("nexora_token"));

  const login = (jwt) => {
    setToken(jwt);
    localStorage.setItem("nexora_token", jwt);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("nexora_token");
  };

  const value = {
    isAuthenticated: Boolean(token),
    token,
    login,
    logout,
  };

  useEffect(() => {}, [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};