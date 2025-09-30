// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/AuthService'; // استيراد خدمة التسجيل الحقيقية

const RegisterPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  // فصل firstName و lastName كحالات منفصلة لسهولة الإدارة
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    national_id: '',
    address: '',
    dob: '',
    gender: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password_confirmation) {
      setError('كلمة المرور وتأكيد كلمة المرور غير متطابقين!');
      return;
    }

    // بناء حقل 'name' الكامل قبل الإرسال
    const fullName = `${firstName} ${lastName}`.trim();
    if (!fullName) {
      setError('الاسم الكامل مطلوب.');
      return;
    }

    try {
      const response = await register({
        name: fullName, // إرسال الاسم الكامل هنا
        email: formData.email,
        phone: formData.phone,
        national_id: formData.national_id,
        address: formData.address,
        dob: formData.dob,
        gender: formData.gender,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        role_id: 4 // تعيين role_id = 4 للمريض
      });

      if (response && response.message) {
        alert(`تم تسجيل حسابك بنجاح! يرجى تسجيل الدخول.`);
        navigate('/login');
      } else {
        setError('فشل التسجيل. استجابة غير متوقعة من الخادم.');
      }
    } catch (err) {
      const errorMessages = err.response?.data?.errors;
      if (errorMessages) {
        console.error('Validation Errors from API:', errorMessages);
        let formattedErrors = '';
        for (const key in errorMessages) {
          formattedErrors += `${errorMessages[key].join(', ')}\n`;
        }
        setError(formattedErrors);
      } else {
        setError(err.response?.data?.message || 'فشل التسجيل. يرجى المحاولة مرة أخرى.');
      }
      console.error('Registration failed:', err);
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} // تحديث حالة الاسم الأول مباشرة
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} // تحديث حالة الاسم الأخير مباشرة
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
              <label htmlFor="national_id" className="block text-gray-700 text-sm font-bold mb-2">
                الرقم الوطني <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="national_id"
                name="national_id"
                required
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right"
                placeholder="ادخل رقمك الوطني"
                value={formData.national_id}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                العنوان <span className="text-red-500">*</span>
              </label>
              <div className="wrapper-input relative">
                <select
                  id="address"
                  name="address"
                  required
                  className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right appearance-none bg-white pr-8"
                  value={formData.address}
                  onChange={handleChange}
                >
                  <option value="">اختر محافظتك</option>
                  <option value="homs_hawash">حمص </option>
                  <option value="damascus">دمشق</option>
                  <option value="aleppo">حلب</option>

                  {/* Add more options as needed */}
                </select>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
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
              <div className="wrapper-input relative">
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
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                كلمة المرور <span className="text-red-500">*</span>
              </label>
              <div className="wrapper-input relative">
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
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
                >
                  {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="relative">
              <label htmlFor="password_confirmation" className="block text-gray-700 text-sm font-bold mb-2">
                تأكيد كلمة المرور <span className="text-red-500">*</span>
              </label>
              <div className="wrapper-input relative">
                <input
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  id="password_confirmation"
                  name="password_confirmation"
                  required
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right pr-10"
                  placeholder="أعد كتابة كلمة المرور"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
                >
                  {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>
          <div className='relative flex items-center gap-8'>
            <label htmlFor="confirm_by" className="block text-gray-700 text-sm font-bold mb-2">
                تحقق عن طريق <span className="text-red-500">*</span>
            </label>  
            <div className="wrapper-checkbox text-lg flex items-center gap-2">
              <input type="radio" name="confirm_by" value={'sms'} id="sms_verify" />
              <label htmlFor="sms_verify">SMS</label>
            </div>
            <div className="wrapper-checkbox text-lg flex items-center gap-2">
              <input type="radio" name="confirm_by" value={'email'} id="email_verify" />
              <label htmlFor="email_verify">Email</label>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

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
