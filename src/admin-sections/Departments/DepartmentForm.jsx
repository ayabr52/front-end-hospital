// src/admin-sections/Departments/DepartmentForm.jsx
import React, { useState, useEffect } from 'react';

const DepartmentForm = ({ departmentToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    specialty: '',
  });

  useEffect(() => {
    if (departmentToEdit) {
      setFormData({
        name: departmentToEdit.name,
        description: departmentToEdit.description,
        specialty: departmentToEdit.specialty,
        id: departmentToEdit.id, // احتفظ بالمعرف للتعديل
      });
    } else {
      // مسح النموذج عند إضافة جديد
      setFormData({
        name: '',
        description: '',
        specialty: '',
      });
    }
  }, [departmentToEdit]);

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
        {departmentToEdit ? 'تعديل قسم' : 'إضافة قسم جديد'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4 text-right">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            الاسم
          </label>
          <input
            type="text"
            id="name"
            name="name" // إضافة اسم للحقل
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            الوصف
          </label>
          <textarea
            id="description"
            name="description" // إضافة اسم للحقل
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right h-24 resize-none"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="specialty" className="block text-gray-700 text-sm font-bold mb-2">
            الاختصاص
          </label>
          <input
            type="text"
            id="specialty"
            name="specialty" // إضافة اسم للحقل
            value={formData.specialty}
            onChange={handleChange}
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right"
            required
          />
        </div>
        <div className="flex justify-end space-x-4 space-x-reverse">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
          >
            {departmentToEdit ? 'حفظ التعديلات' : 'إضافة'}
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

export default DepartmentForm;
