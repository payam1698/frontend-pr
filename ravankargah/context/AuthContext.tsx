
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ScoreReport } from '../utils/mcmiScoring';

export interface UserData {
  fullNameFa: string;
  fullNameEn: string;
  age: number;
  gender: 'male' | 'female';
  education: string;
  maritalStatus: string;
  mobile: string; // Username
  nationalCode: string; // Password
  role: 'admin' | 'user';
  mcmiStatus?: 'none' | 'approved'; // Simplified status
  mcmiReport?: ScoreReport | null;
}

interface AuthContextType {
  user: UserData | null;
  login: (mobile: string, code: string) => boolean;
  register: (data: UserData) => void;
  updateUser: (data: Partial<UserData>) => void;
  logout: () => void;
  isAuthenticated: boolean;
  // Admin helpers
  getAllUsers: () => UserData[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  // Load user from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUser = (data: Partial<UserData>) => {
    if (!user) return;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Update in the registered users list as well to persist across sessions
    const usersStr = localStorage.getItem('registeredUsers');
    if (usersStr) {
        const users: UserData[] = JSON.parse(usersStr);
        const index = users.findIndex(u => u.mobile === user.mobile);
        if (index !== -1) {
            users[index] = updatedUser;
            localStorage.setItem('registeredUsers', JSON.stringify(users));
        }
    }
  };

  const login = (mobile: string, code: string): boolean => {
    const usersStr = localStorage.getItem('registeredUsers');
    const users: UserData[] = usersStr ? JSON.parse(usersStr) : [];
    
    const foundUser = users.find(u => u.mobile === mobile && u.nationalCode === code);

    if (foundUser) {
      // Simulate Admin logic (Backdoor for demo)
      if (mobile === '09120000000' && foundUser.role !== 'admin') {
          foundUser.role = 'admin';
      }
      
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = (data: UserData) => {
    const usersStr = localStorage.getItem('registeredUsers');
    const users: UserData[] = usersStr ? JSON.parse(usersStr) : [];
    
    const existingIndex = users.findIndex(u => u.mobile === data.mobile);
    
    // Default to user, ensure mcmiStatus is none
    const newUser = { ...data, role: data.role || 'user', mcmiStatus: 'none' as const };

    if (existingIndex >= 0) {
        users[existingIndex] = newUser; 
    } else {
        users.push(newUser);
    }
    
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  // --- Admin Helpers ---
  const getAllUsers = (): UserData[] => {
    const usersStr = localStorage.getItem('registeredUsers');
    return usersStr ? JSON.parse(usersStr) : [];
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, register, updateUser, logout, isAuthenticated: !!user,
      getAllUsers
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
