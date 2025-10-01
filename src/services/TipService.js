import axios from 'axios';
import { getToken } from './AuthService'; // لاستخدام رمز التوثيق

const API_URL = import.meta.env.VITE_API_BASE_URL; // عنوان الـ API الأساسي من متغيرات البيئة

export const getTips = async () => {
    try {
        const response = await axios.get(`${API_URL}/tips`, {
            headers: {
                Authorization: `Bearer ${getToken()}`, // إرسال رمز التوثيق
            },
        });
        return response.data.tips; // إرجاع بيانات النصائح
    } catch (error) {
        console.error('Error fetching tips:', error.response?.data || error.message);
        throw error;
    }
};
// دالة لإضافة نصيحة جديدة
export const addTip = async (tipData) => {
    try {
        const response = await axios.post(`${API_URL}/tips`, tipData, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data.room; // إرجاع بيانات النصيحة المضافة
    } catch (error) {
        console.error('Error adding tip:', error.response?.data || error.message);
        throw error;
    }
};



// دالة لتحديث نصيحة موجودة
export const updateTip = async (id, tipData) => {
    try {
      const response = await axios.put(`${API_URL}/tips/${id}`, tipData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.room; // إرجاع بيانات النصيحة المحدثة
    } catch (error) {
      console.error('Error updating tip:', error.response?.data || error.message);
      throw error;
    }
  };
  
  // دالة لحذف النصيحة
  export const deleteTip = async (id) => {
    try {
      await axios.delete(`${API_URL}/tips/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return true; // إرجاع true عند النجاح
    } catch (error) {
      console.error('Error deleting tip:', error.response?.data || error.message);
      throw error;
    }
  };
  