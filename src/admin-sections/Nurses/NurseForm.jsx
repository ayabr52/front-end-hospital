// src/admin-sections/Nurses/NurseForm.jsx
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const NurseForm = ({ nurseToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    address: '',
    gender: '',
    mobile: '',
    department_id: '',
    specialty_id: '',
    rating: '', // يمكن إزالة التقييم للممرضين إذا لم يكن مطلوبًا
    description: '',
    birth_date: '',
    hire_date: '',
    image: 'https://placehold.co/200x200/CCCCCC/FFFFFF?text=Nurse',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (nurseToEdit) {
      setFormData({
        ...nurseToEdit,
        password: '', // لا تعرض كلمة المرور الأصلية لأسباب أمنية
      });
    } else {
      setFormData({
        first_name: '', last_name: '', email: '', password: '', address: '',
        gender: '', mobile: '', department_id: '', specialty_id: '', rating: '',
        description: '', birth_date: '', hire_date: '',
        image: 'https://placehold.co/200x200/CCCCCC/FFFFFF?text=Nurse',
      });
    }
  }, [nurseToEdit]);

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
        {nurseToEdit ? 'تعديل بيانات الممرض' : 'إضافة ممرض جديد'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4 text-right">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="first_name" className="block text-gray-700 text-sm font-bold mb-2">الاسم الأول</label>
            <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
          </div>
          <div>
            <label htmlFor="last_name" className="block text-gray-700 text-sm font-bold mb-2">الاسم الأخير</label>
            <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
          </div>
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
            required={!nurseToEdit}
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
          <label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">رقم الموبايل</label>
          <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
        </div>

        <div>
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">العنوان</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">الجنس</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right appearance-none bg-white pr-8" required>
              <option value="">اختر الجنس</option>
              <option value="ذكر">ذكر</option>
              <option value="أنثى">أنثى</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700 mt-8">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          <div>
            <label htmlFor="department_id" className="block text-gray-700 text-sm font-bold mb-2">القسم</label>
            <select id="department_id" name="department_id" value={formData.department_id} onChange={handleChange} className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right appearance-none bg-white pr-8" required>
              <option value="">اختر القسم</option>
              <option value="النسائية والتوليد">النسائية والتوليد</option>
              <option value="العناية المركزة">العناية المركزة</option>
              {/* أضف الأقسام الحقيقية هنا */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700 mt-8">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="specialty_id" className="block text-gray-700 text-sm font-bold mb-2">الاختصاص</label>
          <select id="specialty_id" name="specialty_id" value={formData.specialty_id} onChange={handleChange} className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right appearance-none bg-white pr-8" required>
            <option value="">اختر الاختصاص</option>
            <option value="تمريض عام">تمريض عام</option>
            <option value="تمريض عناية مركزة">تمريض عناية مركزة</option>
            {/* أضف الاختصاصات الحقيقية هنا */}
          </select>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700 mt-8">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">الوصف</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right h-24 resize-none"></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="birth_date" className="block text-gray-700 text-sm font-bold mb-2">تاريخ الميلاد</label>
            <input type="date" id="birth_date" name="birth_date" value={formData.birth_date} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
          </div>
          <div>
            <label htmlFor="hire_date" className="block text-gray-700 text-sm font-bold mb-2">تاريخ التعيين</label>
            <input type="date" id="hire_date" name="hire_date" value={formData.hire_date} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
          </div>
        </div>

        <div>
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">صورة الممرض (URL)</label>
          <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" />
        </div>

        <div className="flex justify-end space-x-4 space-x-reverse">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
          >
            {nurseToEdit ? 'حفظ التعديلات' : 'إضافة'}
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

export default NurseForm;
