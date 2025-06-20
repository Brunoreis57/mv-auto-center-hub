
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'funcionario' | 'administrador' | 'desenvolvedor';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: Record<string, { password: string; user: User }> = {
  'funcionario@mvauto.com': {
    password: '123456',
    user: {
      id: '1',
      name: 'João Silva',
      email: 'funcionario@mvauto.com',
      role: 'funcionario'
    }
  },
  'admin@mvauto.com': {
    password: '123456',
    user: {
      id: '2',
      name: 'Maria Santos',
      email: 'admin@mvauto.com',
      role: 'administrador'
    }
  },
  'dev@mvauto.com': {
    password: '123456',
    user: {
      id: '3',
      name: 'Carlos Desenvolvedor',
      email: 'dev@mvauto.com',
      role: 'desenvolvedor'
    }
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('mv-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const userData = mockUsers[email];
    
    if (userData && userData.password === password) {
      setUser(userData.user);
      localStorage.setItem('mv-user', JSON.stringify(userData.user));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mv-user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
