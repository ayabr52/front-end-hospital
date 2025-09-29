// src/services/DepartmentService.js
import axios from 'axios';
import { getToken } from './AuthService'; // لاستخدام رمز التوثيق

const API_URL = import.meta.env.VITE_API_BASE_URL; // عنوان الـ API الأساسي من متغيرات البيئة

// دالة لجلب جميع الأقسام
export const getDepartments = async () => {
  try {
    const response = await axios.get(`${API_URL}/departments`, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // إرسال رمز التوثيق
      },
    });
    return response.data.departments; // الـ API يعيد الأقسام داخل مفتاح 'departments'
  } catch (error) {
    console.error('Error fetching departments:', error.response?.data || error.message);
    throw error;
  }
};

// دالة لإضافة قسم جديد
export const addDepartment = async (departmentData) => {
  try {
    const response = await axios.post(`${API_URL}/departments`, departmentData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.department; // الـ API يعيد القسم المضاف داخل مفتاح 'department'
  } catch (error) {
    console.error('Error adding department:', error.response?.data || error.message);
    throw error;
  }
};

// دالة لتحديث قسم موجود
export const updateDepartment = async (id, departmentData) => {
  try {
    const response = await axios.put(`${API_URL}/departments/${id}`, departmentData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.department; // الـ API يعيد القسم المحدث داخل مفتاح 'department'
  } catch (error) {
    console.error('Error updating department:', error.response?.data || error.message);
    throw error;
  }
};

// دالة لحذف قسم
export const deleteDepartment = async (id) => {
  try {
    await axios.delete(`${API_URL}/departments/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return true; // إرجاع true عند النجاح
  } catch (error) {
    console.error('Error deleting department:', error.response?.data || error.message);
    throw error;
  }
};
