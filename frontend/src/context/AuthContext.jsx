import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import { storage } from "../utils/storage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = storage.getToken();
    const savedUser = storage.getUser();

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }

    setLoading(false);
  }, []);

  const login = useCallback((token, user) => {
    storage.setToken(token);
    storage.setUser(user);

    setToken(token);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    storage.clear();

    setToken(null);
    setUser(null);
  }, []);

  const hasRole = useCallback(
    (...roles) => {
      if (!user) return false;

      return roles.includes(user.role);
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,

        login,
        logout,

        hasRole,

        isAuthenticated: !!token,

        isAdmin: user?.role === "ADMIN",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;