import axios from "axios";
import { getToken } from './AuthService'; // لاستخدام رمز التوثيق

const API_URL = import.meta.env.VITE_API_BASE_URL; // عنوان الـ API الأساسي من متغيرات البيئة


// دالة للتحقق من الحساب
export const verifyUser = async (verifyData) => {
    try {
        const response = await axios.post(`${API_URL}/verify-club`, verifyData, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error Verify:', error.response?.data || error.message);
        throw error;
    }
};
