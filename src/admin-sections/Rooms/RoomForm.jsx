// src/admin-sections/Rooms/RoomForm.jsx
import React, { useState, useEffect } from 'react';

const RoomForm = ({ roomToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    room_number: '', // تم التعديل من 'code'
    type: '',        // إضافة حقل النوع
    capacity: '',    // تم التعديل من 'bed_capacity'
    status: 'available', // إضافة حقل الحالة مع قيمة افتراضية
    notes: '',       // إضافة حقل الملاحظات
    department_id: '', // معرف القسم
  });

  useEffect(() => {
    if (roomToEdit) {
      setFormData({
        ...roomToEdit,
        // تأكد من أن department_id هو المعرف وليس الكائن
        department_id: roomToEdit.department ? roomToEdit.department.id : '',
      });
    } else {
      setFormData({
        room_number: '', type: '', capacity: '', status: 'available', notes: '', department_id: '',
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
          <label htmlFor="room_number" className="block text-gray-700 text-sm font-bold mb-2">رقم الغرفة</label>
          <input type="text" id="room_number" name="room_number" value={formData.room_number} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
        </div>
        <div>
          <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">نوع الغرفة</label>
          <select id="type" name="type" value={formData.type} onChange={handleChange} className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right appearance-none bg-white pr-8" required>
            <option value="">اختر نوع الغرفة</option>
            <option value="private">خاصة</option>
            <option value="semi-private">شبه خاصة</option>
            <option value="ward">جناح</option>
            <option value="ICU">عناية مركزة (ICU)</option>
            <option value="OR">غرفة عمليات (OR)</option>
            {/* أضف أنواع الغرف الأخرى حسب الحاجة */}
          </select>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700 mt-8">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
        <div>
          <label htmlFor="capacity" className="block text-gray-700 text-sm font-bold mb-2">السعة (عدد الأسرة)</label>
          <input type="number" id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" min="0" required />
        </div>
        <div>
          <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">الحالة</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right appearance-none bg-white pr-8" required>
            <option value="available">متاحة</option>
            <option value="occupied">مشغولة</option>
            <option value="maintenance">صيانة</option>
            <option value="cleaning">تنظيف</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700 mt-8">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
        <div>
          <label htmlFor="notes" className="block text-gray-700 text-sm font-bold mb-2">ملاحظات</label>
          <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right h-24 resize-none"></textarea>
        </div>
        <div>
          <label htmlFor="department_id" className="block text-gray-700 text-sm font-bold mb-2">القسم المرتبط</label>
          <select id="department_id" name="department_id" value={formData.department_id} onChange={handleChange} className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right appearance-none bg-white pr-8">
            <option value="">-- اختر القسم --</option>
            {/* هذه الخيارات يجب أن تأتي من API الأقسام في تطبيق حقيقي */}
            <option value="1">قسم العناية المركزة</option>
            <option value="2">قسم النسائية والتوليد</option>
            <option value="3">قسم العمليات الجراحية</option>
            <option value="4">قسم الداخلية</option>
            <option value="5">قسم الأطفال</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700 mt-8">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
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
