import axios from 'axios';
import { getToken } from './AuthService'; // لاستخدام رمز التوثيق

const API_URL = import.meta.env.VITE_API_BASE_URL; // عنوان الـ API الأساسي من متغيرات البيئة

export const getPrescriptionsApi = async () => {
    try {
        const response=await axios.get(`${API_URL}/prescriptions`,{
            headers:{
                Authorization:`Bearer ${getToken()}`,
                "Content-Type":'application/json'
            }
        })
        return response.data
    } catch (error) {
        console.error('Error fetching prescriptions:', error.response?.data || error.message);
        throw error;
    }
}