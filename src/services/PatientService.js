// src/services/PatientService.js
import axios from 'axios';
import { getToken } from './AuthService'; // لاستخدام رمز التوثيق

const API_URL = import.meta.env.VITE_API_BASE_URL; // عنوان الـ API الأساسي من متغيرات البيئة

// دالة لجلب جميع المرضى
export const getPatients = async () => {
  try {
    const response = await axios.get(`${API_URL}/patients`, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // إرسال رمز التوثيق
      },
    });
    return response.data.patients; // الـ API يعيد المرضى داخل مفتاح 'patients'
  } catch (error) {
    console.error('Error fetching patients:', error.response?.data || error.message);
    throw error;
  }
};

// دالة لإضافة مريض جديد
export const addPatient = async (patientData) => {
  try {
    const response = await axios.post(`${API_URL}/patients`, patientData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.patient; // الـ API يعيد المريض المضاف داخل مفتاح 'patient'
  } catch (error) {
    console.error('Error adding patient:', error.response?.data || error.message);
    throw error;
  }
};

// دالة لتحديث مريض موجود
export const updatePatient = async (id, patientData) => {
  try {
    const response = await axios.put(`${API_URL}/patients/${id}`, patientData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.patient; // الـ API يعيد المريض المحدث داخل مفتاح 'patient'
  } catch (error) {
    console.error('Error updating patient:', error.response?.data || error.message);
    throw error;
  }
};

// دالة لحذف مريض
export const deletePatient = async (id) => {
  try {
    await axios.delete(`${API_URL}/patients/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return true; // إرجاع true عند النجاح
  } catch (error) {
    console.error('Error deleting patient:', error.response?.data || error.message);
    throw error;
  }
};
