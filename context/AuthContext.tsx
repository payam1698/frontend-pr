import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// آدرس بک‌اِند شما
const API_URL = "https://frontend-pr--mesmaeeilz.replit.app:3001/api";

export interface UserData {
  id?: number;
  fullNameFa: string;
  fullNameEn: string;
  phone: string; 
  role: 'admin' | 'student';
}

interface AuthContextType {
  user: UserData | null;
  login: (phone: string, password: string) => Promise<boolean>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// ۱. اضافه کردن کلمه export به ابتدای تعریف Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('currentUser');
      if (token && storedUser) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (phone: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { phone, password });
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      return true;
    } catch (error) {
      return false;
    }
  };

  const register = async (data: any) => {
    await axios.post(`${API_URL}/auth/register`, data);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ۲. حتماً این تابع را در انتهای فایل اضافه یا اصلاح کنید
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};