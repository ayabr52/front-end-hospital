// src/services/NurseService.js
import axios from 'axios';
import { getToken } from './AuthService'; // لاستخدام رمز التوثيق

const API_URL = import.meta.env.VITE_API_BASE_URL; // عنوان الـ API الأساسي من متغيرات البيئة

// دالة لجلب جميع الممرضين
export const getNurses = async () => {
    try {
        const response = await axios.get(`${API_URL}/nurses`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data.nurses;
    } catch (error) {
        console.error('Error fetching nurses:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لإضافة ممرض جديد
export const addNurse = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/nurses`, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data.nurse;
    } catch (error) {
        console.error('Error adding nurse:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لتحديث ممرض موجود
export const updateNurse = async (id, data) => {
    try {
        const response = await axios.post(`${API_URL}/nurses/${id}`, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data.nurse;
    } catch (error) {
        console.error('Error updating nurse:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لحذف ممرض
export const deleteNurse = async (id) => {
    try {
        await axios.delete(`${API_URL}/nurses/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return true;
    } catch (error) {
        console.error('Error deleting nurse:', error.response?.data || error.message);
        throw error;
    }
};
