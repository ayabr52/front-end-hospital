// src/services/MedicineService.js
import axios from 'axios';
import { getToken } from './AuthService'; // استيراد دالة getToken من AuthService

const API_URL = import.meta.env.VITE_API_BASE_URL;

// إنشاء مثيل axios مع إعدادات افتراضية
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// إضافة interceptor لإضافة التوكن لكل الطلبات الصادرة
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// جلب جميع الأدوية
export const fetchMedicines = async () => {
    try {
        const response = await api.get('/medicines');
        // نفترض أن الـ API يعيد الأدوية مباشرة في response.data
        // أو قد تحتاج إلى response.data.medicines بناءً على هيكل الـ API الخاص بك
        return response.data;
    } catch (error) {
        console.error('Error fetching medicines:', error.response?.data || error.message);
        throw error;
    }
};

// جلب تفاصيل دواء واحد
export const getMedicine = async (id) => {
    try {
        const response = await api.get(`/medicines/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching medicine with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// إضافة دواء جديد
export const storeMedicine = async (medicineData) => {
    try {
        const response = await api.post('/medicines', medicineData);
        return response.data;
    } catch (error) {
        console.error('Error storing medicine:', error.response?.data || error.message);
        throw error;
    }
};

// تحديث بيانات دواء
export const updateMedicine = async (id, medicineData) => {
    try {
        const response = await api.put(`/medicines/${id}`, medicineData);
        return response.data;
    } catch (error) {
        console.error(`Error updating medicine with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// حذف دواء
export const deleteMedicine = async (id) => {
    try {
        const response = await api.delete(`/medicines/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting medicine with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};
