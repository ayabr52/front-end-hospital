import React, { useState } from 'react';
import { Plus, UserCog, User } from 'lucide-react'; // استيراد الأيقونات المطلوبة
import { Link } from 'react-router-dom'; // لاستخدام Link للتنقل
import { getCurrentUser } from '../../services/AuthService'; // استيراد خدمة الحصول على المستخدم الحالي

const FloatingActionsButton = () => {
  const [isOpen, setIsOpen] = useState(false); // حالة لفتح/إغلاق الأزرار الإضافية
  const user = getCurrentUser(); // الحصول على معلومات المستخدم الحالي

  // دالة مساعدة لتحديد مسار لوحة التحكم بناءً على الدور
  const getDashboardPath = (role) => {
    if (!role) return '/login'; // إذا لم يكن هناك دور، وجه لصفحة تسجيل الدخول
    switch (role) {
      case 'admin': return '/dashboard/admin';
      case 'patient': return '/dashboard/patient';
      case 'doctor': return '/dashboard/doctor';
      case 'accountant': return '/dashboard/accountant';
      case 'nurse': return '/dashboard/nurse';
      case 'pharmacist': return '/dashboard/pharmacist';
      case 'receptionist': return '/dashboard/receptionist';
      default: return '/login'; // مسار افتراضي في حال عدم تطابق الدور
    }
  };

  // دالة مساعدة لتحديد مسار الملف الشخصي بناءً على الدور


  // تحديد المسارات بناءً على دور المستخدم الحالي
  const dashboardPath = getDashboardPath(user?.role);

  return (
    <div
      className="fixed bottom-4 right-4 z-40 flex flex-col-reverse items-end" // تحديد الموقع في أسفل اليمين، وتكديس العناصر من الأسفل للأعلى
      onMouseEnter={() => setIsOpen(true)} // فتح القائمة عند تمرير الماوس فوق الحاوية بأكملها
      onMouseLeave={() => setIsOpen(false)} // إغلاق القائمة عند إزالة الماوس من الحاوية بأكملها
    >
      {/* الزر الرئيسي (يظل في الأسفل بسبب flex-col-reverse) */}
      <button
        className="bg-blue-800 text-white p-4 rounded-full shadow-xl hover:bg-blue-900 transition-colors duration-300"
        aria-label="إجراءات إضافية"
      >
        <Plus size={30} />
      </button>

      {/* حاوية الأزرار الإضافية (تظهر فوق الزر الرئيسي) */}
      <div
        className={`flex flex-col space-y-3 mb-3 transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none' // translate-y-full لإخفائها بالكامل لأسفل
        }`}
      >

        {/* زر لوحة تحكم المسؤول / لوحة التحكم الخاصة بالدور */}
        {user && ( // عرض الزر فقط إذا كان المستخدم مسجلاً دخوله
          <Link
            to={dashboardPath} // المسار الديناميكي للوحة التحكم
            className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-end space-x-2 space-x-reverse" // RTL: النص أولاً ثم الأيقونة
            aria-label="لوحة التحكم"
            onClick={() => setIsOpen(false)} // إغلاق القائمة عند النقر
          >
            <span className="text-sm font-medium">لوحة التحكم</span>
            <UserCog size={20} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default FloatingActionsButton;
