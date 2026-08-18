import { createContext, useContext, useState } from "react";
import { getCurrentUser, loginUser, logoutUser } from "../utils/localStorage";

const AuthContext = createContext();

// Centralized authentication state so every page/component sees the same,
// always-current login status instead of each one reading localStorage separately.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser());

  const login = (email, password, remember = false) => {
    const result = loginUser(email, password, remember);
    if (result.success) {
      setUser({ name: result.user.name, email: result.user.email });
    }
    return result;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
