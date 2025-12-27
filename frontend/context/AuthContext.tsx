import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

/**
 * تنظیم آدرس بک‌اِند بر اساس دامنه شما و پورت فعال PM2
 * نکته: اگر از HTTPS استفاده می‌کنید و خطای Mixed Content گرفتید، 
 * سایت را با http://ravankargah.com باز کنید یا تنظیمات .htaccess را اعمال کنید.
 */
const API_URL = "/api";

export interface UserData {
  id?: number;
  name: string;
  full_name_en?: string;
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

// صادر کردن Context برای استفاده در کل پروژه
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // بررسی وضعیت ورود کاربر هنگام بارگذاری اولیه سایت
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('currentUser');

      console.log('🔐 Auth Init - Token exists:', !!token);
      console.log('🔐 Auth Init - Stored user exists:', !!storedUser);

      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          // قرار دادن توکن در تمام درخواست‌های بعدی axios
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setUser(parsedUser);
          console.log('✅ Auth Restored - Current Role:', parsedUser.role?.toUpperCase());
          console.log('✅ Auth Restored - User:', parsedUser.name);
        } catch (error) {
          console.error("Error parsing stored user:", error);
          localStorage.removeItem('token');
          localStorage.removeItem('currentUser');
        }
      } else {
        console.log('⚠️ No auth data found - User not logged in');
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (phone: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { phone, password });
      const { token, user: userData } = response.data.data;

      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(userData));

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      
      console.log('🔑 Login Success - Current Role:', userData.role?.toUpperCase());
      console.log('🔑 Login Success - User:', userData.name);
      return true;
    } catch (error) {
      console.error("Login attempt failed:", error);
      return false;
    }
  };

  const register = async (data: any) => {
    try {
      await axios.post(`${API_URL}/auth/register`, data);
    } catch (error) {
      console.error("Registration error:", error);
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
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// هوک اختصاصی برای دسترسی راحت به اطلاعات کاربری در کامپوننت‌ها (مثل Navbar)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};