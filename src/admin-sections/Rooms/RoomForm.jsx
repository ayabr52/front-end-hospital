// src/admin-sections/Rooms/RoomForm.jsx
import React, { useState, useEffect } from 'react';

const RoomForm = ({ roomToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    code: '',
    department_id: '',
    specialty_id: '',
    floor_number: '',
    bed_capacity: '',
  });

  useEffect(() => {
    if (roomToEdit) {
      setFormData(roomToEdit);
    } else {
      setFormData({
        code: '', department_id: '', specialty_id: '', floor_number: '', bed_capacity: '',
      });
    }
  }, [roomToEdit]);

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
        {roomToEdit ? 'تعديل بيانات الغرفة' : 'إضافة غرفة جديدة'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4 text-right">
        <div>
          <label htmlFor="code" className="block text-gray-700 text-sm font-bold mb-2">رمز الغرفة</label>
          <input type="text" id="code" name="code" value={formData.code} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
        </div>
        <div>
          <label htmlFor="department_id" className="block text-gray-700 text-sm font-bold mb-2">القسم المرتبط</label>
          <select id="department_id" name="department_id" value={formData.department_id} onChange={handleChange} className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right appearance-none bg-white pr-8" required>
            <option value="">اختر القسم</option>
            <option value="النسائية والتوليد">النسائية والتوليد</option>
            <option value="جراحة القلب">جراحة القلب</option>
            {/* أضف الأقسام الحقيقية هنا */}
          </select>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700 mt-8">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
        <div>
          <label htmlFor="specialty_id" className="block text-gray-700 text-sm font-bold mb-2">الاختصاص</label>
          <select id="specialty_id" name="specialty_id" value={formData.specialty_id} onChange={handleChange} className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right appearance-none bg-white pr-8" required>
            <option value="">اختر الاختصاص</option>
            <option value="جراحة">جراحة</option>
            <option value="داخلية">داخلية</option>
            {/* أضف الاختصاصات الحقيقية هنا */}
          </select>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700 mt-8">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="floor_number" className="block text-gray-700 text-sm font-bold mb-2">الطابق</label>
            <input type="number" id="floor_number" name="floor_number" value={formData.floor_number} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
          </div>
          <div>
            <label htmlFor="bed_capacity" className="block text-gray-700 text-sm font-bold mb-2">عدد الأسرة</label>
            <input type="number" id="bed_capacity" name="bed_capacity" value={formData.bed_capacity} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
          </div>
        </div>
        <div className="flex justify-end space-x-4 space-x-reverse">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
          >
            {roomToEdit ? 'حفظ التعديلات' : 'إضافة'}
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

export default RoomForm;
