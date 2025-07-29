// src/admin-sections/Pharmacy/MedicineForm.jsx
import React, { useState, useEffect } from 'react';

const MedicineForm = ({ medicineToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    expiry_date: '',
    description: '',
  });

  useEffect(() => {
    if (medicineToEdit) {
      setFormData(medicineToEdit);
    } else {
      setFormData({
        name: '', quantity: '', price: '', expiry_date: '', description: '',
      });
    }
  }, [medicineToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-right">
        {medicineToEdit ? 'تعديل بيانات الدواء' : 'إضافة دواء جديد'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4 text-right">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">اسم الدواء</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">الكمية المتوفرة</label>
          <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
        </div>
        <div>
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">السعر</label>
          <input type="number" step="0.01" id="price" name="price" value={formData.price} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
        </div>
        <div>
          <label htmlFor="expiry_date" className="block text-gray-700 text-sm font-bold mb-2">تاريخ الانتهاء</label>
          <input type="date" id="expiry_date" name="expiry_date" value={formData.expiry_date} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">الوصف</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right h-24 resize-none"></textarea>
        </div>
        <div className="flex justify-end space-x-4 space-x-reverse">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
          >
            {medicineToEdit ? 'حفظ التعديلات' : 'إضافة'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-6 py-2 rounded-full hover:bg-gray-500 transition-colors duration-200"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicineForm;
