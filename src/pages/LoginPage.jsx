// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Eye, EyeOff, Fingerprint } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/AuthService'; // استيراد خدمة المصادقة الحقيقية

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // حالة لتخزين رسائل الخطأ
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => { // جعل الدالة غير متزامنة
    e.preventDefault();
    setError(''); // مسح أي أخطاء سابقة
    try {
      const response = await login(email, password); // استدعاء دالة تسجيل الدخول من AuthService
      if (response && response.access_token) {
        alert(`مرحباً ${response.user.name}! تم تسجيل الدخول بنجاح كـ ${response.user.role.name}.`);
        // التوجيه إلى لوحة التحكم المناسبة بناءً على الدور
        switch (response.user.role.name) {
          case 'admin':
            navigate('/dashboard/admin');
            break;
          case 'patient':
            navigate('/dashboard/patient');
            break;
          case 'doctor':
            navigate('/dashboard/doctor');
            break;
          case 'nurse':
            navigate('/dashboard/nurse');
            break;
          case 'receptionist':
            navigate('/dashboard/receptionist');
            break;
          case 'accountant':
            navigate('/dashboard/accountant');
            break;
          case 'pharmacist':
            navigate('/dashboard/pharmacist');
            break;
          default:
            navigate('/'); // العودة للصفحة الرئيسية إذا كان الدور غير معروف
        }
      } else {
        setError('فشل تسجيل الدخول. استجابة غير متوقعة من الخادم.');
      }
    } catch (err) {
      // التعامل مع الأخطاء من الـ API
      const errorMessage = err.response?.data?.message || 'فشل تسجيل الدخول. يرجى التحقق من البريد الإلكتروني وكلمة المرور.';
      setError(errorMessage);
      console.error('Login failed:', err);
    }
  };

  return (
    <section id="login" className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8 relative pb-2 inline-block">
          تسجيل الدخول
          <span className="absolute bottom-0 right-0 w-16 h-1 bg-blue-600 rounded-full left-0 mx-auto"></span>
        </h2>
        <div className="flex justify-center mb-8">
          <Fingerprint size={100} className="text-blue-600 mx-auto" />
        </div>
        <form className="space-y-6 text-right" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              البريد الإلكتروني / اسم المستخدم
            </label>
            <input
              type="text"
              id="email"
              name="email"
              required
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right"
              placeholder="ادخل بريدك الإلكتروني أو اسم المستخدم"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              كلمة المرور
            </label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              name="password"
              required
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right pr-10"
              placeholder="ادخل كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute left-3 top-1/2 mt-3 text-gray-500 focus:outline-none"
            >
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <div className="text-left">
            <Link to="/reset-password" className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800">
              هل نسيت كلمة المرور؟
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-300"
            >
              تسجيل الدخول
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
