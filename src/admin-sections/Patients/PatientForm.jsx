// src/admin-sections/Patients/PatientForm.jsx
import React, { useState, useEffect } from 'react';

const PatientForm = ({ patient, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    national_id: '', // حقل جديد
    address: '',
    dob: '', // حقل جديد لتاريخ الميلاد
    gender: '', // حقل جديد للجنس
    password: '', // حقل جديد لكلمة المرور (للإضافة فقط)
    password_confirmation: '', // حقل جديد لتأكيد كلمة المرور (للإضافة فقط)
  });

  useEffect(() => {
    // إذا كان هناك مريض للتعديل، قم بتعبئة النموذج ببياناته
    if (patient) {
      setFormData({
        id: patient.id || '',
        name: patient.name || '',
        email: patient.user?.email || '', // البريد الإلكتروني يأتي من كائن user
        phone: patient.phone || '',
        national_id: patient.national_id || '',
        address: patient.address || '',
        dob: patient.dob ? patient.dob.split('T')[0] : '', // تنسيق تاريخ الميلاد لـ input type="date"
        gender: patient.gender || '',
        password: '', // لا نعبئ كلمة المرور عند التعديل
        password_confirmation: '', // لا نعبئ تأكيد كلمة المرور عند التعديل
      });
    } else {
      // إذا لم يكن هناك مريض (وضع الإضافة)، قم بمسح النموذج
      setFormData({
        id: '',
        name: '',
        email: '',
        phone: '',
        national_id: '',
        address: '',
        dob: '',
        gender: '',
        password: '',
        password_confirmation: '',
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // التحقق من تطابق كلمتي المرور عند الإضافة
    if (!patient && formData.password !== formData.password_confirmation) {
      alert('كلمة المرور وتأكيد كلمة المرور غير متطابقين.'); // Placeholder for custom message box
      return;
    }
    onSubmit(formData); // إرسال بيانات النموذج إلى دالة الحفظ في المكون الأب
  };

  const isAdding = !patient; // لتحديد ما إذا كنا في وضع الإضافة

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="text-xl font-semibold text-gray-700 mb-4">
        {isAdding ? 'إضافة مريض جديد' : 'تعديل بيانات المريض'}
      </h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم الكامل</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        {isAdding && ( // حقول كلمة المرور تظهر فقط عند الإضافة
          <>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">كلمة المرور</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required={isAdding} // مطلوب فقط عند الإضافة
              />
            </div>
            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">تأكيد كلمة المرور</label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required={isAdding} // مطلوب فقط عند الإضافة
              />
            </div>
          </>
        )}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="national_id" className="block text-sm font-medium text-gray-700">الرقم الوطني</label>
          <input
            type="text"
            id="national_id"
            name="national_id"
            value={formData.national_id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">العنوان</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">تاريخ الميلاد</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">الجنس</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="">اختر الجنس</option>
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isAdding ? 'إضافة' : 'تحديث'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
