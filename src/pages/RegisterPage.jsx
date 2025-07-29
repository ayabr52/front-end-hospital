// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { registerPatient } from '../services/AuthService'; // استيراد خدمة المصادقة

const RegisterPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationalId: '',
    address: '',
    dob: '',
    gender: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('كلمة المرور وتأكيد كلمة المرور غير متطابقين!');
      return;
    }
    const newUser = registerPatient(formData); // محاولة تسجيل المريض
    if (newUser) {
      alert(`مرحباً ${newUser.name}! تم تسجيل حسابك بنجاح كمريض.`);
      navigate('/dashboard/patient'); // توجيه المريض الجديد إلى لوحة تحكم المريض
    } else {
      alert('فشل التسجيل. يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <section id="register" className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8 relative pb-2 inline-block">
          تسجيل مريض جديد
          <span className="absolute bottom-0 right-0 w-16 h-1 bg-blue-600 rounded-full left-0 mx-auto"></span>
        </h2>
        <form className="space-y-6 text-right" onSubmit={handleSubmit}>
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                الاسم الأول <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right"
                placeholder="ادخل اسمك الأول"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                الاسم الأخير <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right"
                placeholder="ادخل اسمك الأخير"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              البريد الإلكتروني <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right"
              placeholder="ادخل بريدك الإلكتروني"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
              رقم الهاتف <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right"
              placeholder="ادخل رقم هاتفك"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* National ID & Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nationalId" className="block text-gray-700 text-sm font-bold mb-2">
                الرقم الوطني <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nationalId"
                name="nationalId"
                required
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right"
                placeholder="ادخل رقمك الوطني"
                value={formData.nationalId}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                العنوان <span className="text-red-500">*</span>
              </label>
              <select
                id="address"
                name="address"
                required
                className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right appearance-none bg-white pr-8"
                value={formData.address}
                onChange={handleChange}
              >
                <option value="">اختر محافظتك</option>
                <option value="homs_hawash">حمص حواش</option>
                <option value="damascus">دمشق</option>
                <option value="aleppo">حلب</option>
                {/* Add more options as needed */}
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          {/* Date of Birth & Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="dob" className="block text-gray-700 text-sm font-bold mb-2">
                تاريخ الميلاد <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                required
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">
                الجنس <span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                required
                className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right appearance-none bg-white pr-8"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">اختر جنسك</option>
                <option value="male">ذكر</option>
                <option value="female">أنثى</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                كلمة المرور <span className="text-red-500">*</span>
              </label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                required
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right pr-10"
                placeholder="ادخل كلمة المرور"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute left-3 top-1/2 mt-3 text-gray-500 focus:outline-none"
              >
                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                تأكيد كلمة المرور <span className="text-red-500">*</span>
              </label>
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                required
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right pr-10"
                placeholder="أعد كتابة كلمة المرور"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute left-3 top-1/2 mt-3 text-gray-500 focus:outline-none"
              >
                {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="text-left">
            <Link
              to="/login"
              className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
            >
              هل لديك حساب بالفعل؟ تسجيل الدخول
            </Link>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-300"
            >
              تسجيل
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
