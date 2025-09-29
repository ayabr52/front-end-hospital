// src/services/AuthService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL; // استخدام متغير البيئة
const USER_TOKEN_KEY = 'userToken'; // مفتاح لتخزين رمز التوثيق
const USER_DATA_KEY = 'userData';   // مفتاح لتخزين بيانات المستخدم

// دالة مساعدة لإرسال حدث مخصص عند تغيير حالة المصادقة
const dispatchAuthChangeEvent = () => {
  window.dispatchEvent(new Event('authChange'));
};

// دالة لتسجيل الدخول
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    if (response.data.access_token) {
      // دمج الدور داخل كائن المستخدم (بناءً على شكل الاستجابة)
      const userWithRole = {
        ...response.data.user,
        role: {
          name: response.data.role
        }
      };

      localStorage.setItem(USER_TOKEN_KEY, response.data.access_token);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userWithRole));
      dispatchAuthChangeEvent(); // إرسال الحدث بعد تسجيل الدخول بنجاح
    }

    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error; // إعادة رمي الخطأ لكي يتم التعامل معه في المكون
  }
};

// دالة لتسجيل مستخدم جديد
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

// دالة لتسجيل الخروج
export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  } catch (error) {
    console.error('Logout error:', error.response?.data || error.message);
  } finally {
    localStorage.removeItem(USER_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    dispatchAuthChangeEvent();
  }
};

// دالة للحصول على رمز التوثيق المخزن
export const getToken = () => {
  return localStorage.getItem(USER_TOKEN_KEY);
};

// دالة للحصول على بيانات المستخدم المخزنة
export const getUserData = () => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
};

// دالة للتحقق مما إذا كان المستخدم مسجلاً الدخول
export const isAuthenticated = () => {
  return !!getToken();
};

// دالة للتحقق من دور المستخدم
export const isAuthorized = (requiredRoles) => {
  const user = getUserData();
  if (!user || !user.role) return false;
  if (!requiredRoles || requiredRoles.length === 0) return true;

  return requiredRoles.includes(user.role.name);
};

// دالة للحصول على معلومات المستخدم من API (مثلاً عند تحميل التطبيق)
export const fetchCurrentUser = async () => {
  try {
    const token = getToken();
    if (!token) return null;

    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // تأكد من أن استجابة /user تحتوي على role
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error('Failed to fetch current user:', error.response?.data || error.message);
    logout();
    return null;
  }
};
