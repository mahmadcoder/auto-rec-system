"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  subscription?: {
    status: 'active' | 'inactive' | 'trial';
    plan?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // TODO: Implement actual session check
      // For now, check localStorage
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      setError('Authentication check failed');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Implement actual login logic
      // This is a placeholder
      const mockUser: User = {
        id: '1',
        email,
        name: 'Test User',
        subscription: {
          status: 'trial',
        },
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Implement actual logout logic
      localStorage.removeItem('user');
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
      setError('Logout failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Implement actual signup logic
      // This is a placeholder
      const mockUser: User = {
        id: '1',
        email,
        name,
        subscription: {
          status: 'trial',
        },
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (err) {
      console.error('Signup failed:', err);
      setError('Signup failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
