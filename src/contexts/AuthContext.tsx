import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'administrator' | 'citizen';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  verified: boolean;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  verifyAccount: (code: string) => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@bewareme.com',
    role: 'administrator',
    verified: true,
    name: 'Emergency Admin'
  },
  {
    id: '2',
    email: 'citizen@bewareme.com',
    role: 'citizen',
    verified: true,
    name: 'John Citizen'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [pendingVerification, setPendingVerification] = useState<User | null>(null);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('beware-me-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would be an API call
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      if (!foundUser.verified) {
        setPendingVerification(foundUser);
        return false;
      }
      setUser(foundUser);
      localStorage.setItem('beware-me-user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string, role: UserRole): Promise<boolean> => {
    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      email,
      role,
      verified: false,
      name
    };
    
    setPendingVerification(newUser);
    return true;
  };

  const verifyAccount = async (code: string): Promise<boolean> => {
    // Mock verification - accept any 6-digit code
    if (code.length === 6 && pendingVerification) {
      const verifiedUser = { ...pendingVerification, verified: true };
      setUser(verifiedUser);
      localStorage.setItem('beware-me-user', JSON.stringify(verifiedUser));
      setPendingVerification(null);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setPendingVerification(null);
    localStorage.removeItem('beware-me-user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      verifyAccount,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};