import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/inventory";

// جلب جميع الأصناف
export const getInventory = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// إضافة صنف جديد
export const addInventoryItem = async (itemData) => {
  const response = await axios.post(API_URL, itemData);
  return response.data;
};

// تحديث صنف
export const updateInventoryItem = async (id, itemData) => {
  const response = await axios.put(`${API_URL}/${id}`, itemData);
  return response.data;
};

// حذف صنف
export const deleteInventoryItem = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
