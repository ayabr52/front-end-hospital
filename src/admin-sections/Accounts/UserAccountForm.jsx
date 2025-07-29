// src/admin-sections/Accounts/UserAccountForm.jsx
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const UserAccountForm = ({ userToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.name,
        email: userToEdit.email,
        password: '', // لا تعرض كلمة المرور الأصلية لأسباب أمنية
        role: userToEdit.role,
      });
    } else {
      setFormData({
        name: '', email: '', password: '', role: '',
      });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-right">
        {userToEdit ? 'تعديل حساب المستخدم' : 'إضافة حساب مستخدم جديد'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4 text-right">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">الاسم</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">البريد الإلكتروني</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
        </div>
        <div className="relative">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">كلمة السر</label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right pr-10"
            required={!userToEdit}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute left-3 top-1/2 mt-3 text-gray-500 focus:outline-none"
          >
            {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div>
          <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">الدور</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange} className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right appearance-none bg-white pr-8" required>
            <option value="">اختر الدور</option>
            <option value="admin">مدير</option>
            <option value="doctor">طبيب</option>
            <option value="patient">مريض</option>
            <option value="nurse">ممرض</option>
            <option value="receptionist">موظف استقبال</option>
            <option value="accountant">محاسب</option>
            <option value="pharmacist">صيدلي</option>
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
            {userToEdit ? 'حفظ التعديلات' : 'إضافة'}
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

export default UserAccountForm;
