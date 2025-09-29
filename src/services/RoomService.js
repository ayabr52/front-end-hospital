// src/services/RoomService.js
import axios from 'axios';
import { getToken } from './AuthService'; // لاستخدام رمز التوثيق

const API_URL = import.meta.env.VITE_API_BASE_URL; // عنوان الـ API الأساسي من متغيرات البيئة

// دالة لجلب جميع الغرف
export const getRooms = async () => {
  try {
    const response = await axios.get(`${API_URL}/rooms`, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // إرسال رمز التوثيق
      },
    });
    return response.data.rooms; // إرجاع بيانات الغرف
  } catch (error) {
    console.error('Error fetching rooms:', error.response?.data || error.message);
    throw error;
  }
};

// دالة لإضافة غرفة جديدة
export const addRoom = async (roomData) => {
  try {
    const response = await axios.post(`${API_URL}/rooms`, roomData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.room; // إرجاع بيانات الغرفة المضافة
  } catch (error) {
    console.error('Error adding room:', error.response?.data || error.message);
    throw error;
  }
};

// دالة لتحديث غرفة موجودة
export const updateRoom = async (id, roomData) => {
  try {
    const response = await axios.put(`${API_URL}/rooms/${id}`, roomData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.room; // إرجاع بيانات الغرفة المحدثة
  } catch (error) {
    console.error('Error updating room:', error.response?.data || error.message);
    throw error;
  }
};

// دالة لحذف غرفة
export const deleteRoom = async (id) => {
  try {
    await axios.delete(`${API_URL}/rooms/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return true; // إرجاع true عند النجاح
  } catch (error) {
    console.error('Error deleting room:', error.response?.data || error.message);
    throw error;
  }
};
