import { createContext, useEffect, useState } from "react";
import { storage } from "../utils/storage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(storage.getUser());

  const [token, setToken] = useState(storage.getToken());

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = (token, user) => {
    storage.setToken(token);
    storage.setUser(user);

    setToken(token);
    setUser(user);
  };

  const logout = () => {
    storage.clear();

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;