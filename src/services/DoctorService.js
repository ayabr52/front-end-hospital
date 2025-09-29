import axios from 'axios';
import { getToken } from './AuthService'; // لاستخدام رمز التوثيق

const API_URL = import.meta.env.VITE_API_BASE_URL; // عنوان الـ API الأساسي من متغيرات البيئة

// دالة لجلب جميع الأطباء
export const getDoctors = async () => {
    try {
        const response = await axios.get(`${API_URL}/doctors`, {
            headers: {
                Authorization: `Bearer ${getToken()}`, // إرسال رمز التوثيق
            },
        });
        return response.data.doctors; // الـ API يعيد الأطباء داخل مفتاح 'doctors'
    } catch (error) {
        console.error('Error fetching doctors:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لإضافة طبيب جديد
// تتوقع الآن FormData كـ data
export const addDoctor = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/doctors`, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                // لا تحدد 'Content-Type': 'multipart/form-data' هنا.
                // Axios والمتصفح سيتوليان ذلك تلقائيًا عند إرسال FormData.
            },
        });
        return response.data.doctor; // الـ API يعيد الطبيب المضاف داخل مفتاح 'doctor'
    } catch (error) {
        console.error('Error adding doctor:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لتحديث طبيب موجود
// تتوقع الآن FormData كـ data
export const updateDoctor = async (id, data) => {
    try {
        // بما أننا نرسل _method=PUT داخل FormData، يجب أن يكون الطلب POST
        const response = await axios.post(`${API_URL}/doctors/${id}`, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                // لا تحدد 'Content-Type': 'multipart/form-data' هنا.
                // Axios والمتصفح سيتوليان ذلك تلقائيًا عند إرسال FormData.
            },
        });
        return response.data.doctor; // الـ API يعيد الطبيب المحدث داخل مفتاح 'doctor'
    } catch (error) {
        console.error('Error updating doctor:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لحذف طبيب
export const deleteDoctor = async (id) => {
    try {
        await axios.delete(`${API_URL}/doctors/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return true; // إرجاع true عند النجاح
    } catch (error) {
        console.error('Error deleting doctor:', error.response?.data || error.message);
        throw error;
    }
};
