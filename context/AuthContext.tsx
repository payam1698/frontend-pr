import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// آدرس بک‌اِند ریپلیت شما - پورت 3001
const API_URL = "https://frontend-pr--mesmaeeilz.replit.app:3001/api";

export interface UserData {
  id?: number;
  fullNameFa: string;
  fullNameEn: string;
  phone: string; 
  role: 'admin' | 'student';
  // سایر فیلدها طبق دیتابیس
}

interface AuthContextType {
  user: UserData | null;
  login: (phone: string, password: string) => Promise<boolean>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  // چک کردن توکن هنگام لود شدن سایت
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('currentUser');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
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
      console.error("Login Error:", error);
      return false;
    }
  };

  const register = async (data: any) => {
    try {
      await axios.post(`${API_URL}/auth/register`, data);
      // بعد از ثبت‌نام، یوزر می‌تواند لاگین کند
    } catch (error) {
      console.error("Registration Error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, register, logout, isAuthenticated: !!user 
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