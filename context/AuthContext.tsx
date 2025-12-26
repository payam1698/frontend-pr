import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = (import.meta as any).env?.VITE_API_URL || "http://localhost:3001/api"; 

export interface UserData {
  id?: number;
  fullNameFa: string;
  fullNameEn: string;
  phone: string; 
  role: 'admin' | 'student';
  mcmiStatus?: 'none' | 'approved';
}

interface AuthContextType {
  user: UserData | null;
  login: (phone: string, password: string) => Promise<boolean>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

axios.defaults.baseURL = API_URL;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true); // اضافه کردن حالت لودینگ برای جلوگیری از پرش صفحه

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('currentUser');

      if (token && storedUser) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          // اختیاری: می‌توانید اینجا یک درخواست به /auth/me بزنید تا از صحت توکن مطمئن شوید
          setUser(JSON.parse(storedUser));
        } catch (e) {
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (phone: string, password: string): Promise<boolean> => {
    try {
      // توجه: در بک‌اِند شما فیلد پسورد احتمالاً nationalCode است، چک کنید
      const response = await axios.post(`/auth/login`, { phone, password });
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
      await axios.post(`/auth/register`, data);
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
      {!loading && children}
    </AuthContext.Provider>
  );
};