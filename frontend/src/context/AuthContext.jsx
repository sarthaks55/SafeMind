import { createContext, useContext, useState } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return {
        token,
        userId: decoded.userId,
        email: decoded.email,
        fullName: decoded.fullName,
        role: decoded.role,
      };
    } catch {
      localStorage.removeItem("token");
      return null;
    }
  });

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);

    setAuth({
      token,
      userId: decoded.userId,
      email: decoded.email,
      fullName: decoded.fullName,
      role: decoded.role,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
