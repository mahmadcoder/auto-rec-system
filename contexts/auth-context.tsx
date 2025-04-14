"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAuthLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

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
    <AuthContext.Provider value={{ isAuthenticated, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 