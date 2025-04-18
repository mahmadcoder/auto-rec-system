"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  user: { name?: string } | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAuthLoading: true,
  user: null,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [user, setUser] = useState<{ name?: string } | null>(null);

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    // Check authentication status here
    const checkAuth = async () => {
      try {
        // Always set authenticated to true to allow access without login
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(true); // Even on error, keep authenticated true
      } finally {
        setIsAuthLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAuthLoading, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 