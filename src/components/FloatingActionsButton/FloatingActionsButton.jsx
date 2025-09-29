import React, { useState, useEffect, useRef } from 'react';
import {
  Plus, User, LogOut, Calendar, Stethoscope, Pill, DollarSign,
  FileText, Bed, LayoutDashboard, Users
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserData, logout } from '../../services/AuthService';

/**
 * مكون زر الإجراءات العائمة الذي يعرض قائمة عمودية من الخيارات
 * بناءً على حالة تسجيل دخول المستخدم ودوره.
 */
const FloatingActionsButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  // التحقق من حالة المصادقة عند تحميل المكون
  useEffect(() => {
    const checkAuthStatus = () => {
      const authStatus = isAuthenticated();
      setIsLoggedIn(authStatus);
      if (authStatus) {
        const userData = getUserData();
        if (userData && userData.role) {
          setUserRole(userData.role.name);
        }
      } else {
        setUserRole('');
      }
    };
    checkAuthStatus();
  }, []);

  // دالة تسجيل الخروج
  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/login');
  };

  // تحديد رابط لوحة التحكم بناءً على دور المستخدم
  const getDashboardLink = () => {
    switch (userRole) {
      case 'admin': return '/dashboard/admin';
      case 'patient': return '/dashboard/patient';
      case 'doctor': return '/dashboard/doctor';
      case 'nurse': return '/dashboard/nurse';
      case 'receptionist': return '/dashboard/receptionist';
      case 'accountant': return '/dashboard/accountant';
      case 'pharmacist': return '/dashboard/pharmacist';
      default: return '/';
    }
  };

  // تحديد الإجراءات المتاحة بناءً على دور المستخدم
  const getActionsBasedOnRole = () => {
    const commonActions = [
      { icon: <User size={20} />, label: 'لوحة التحكم', link: getDashboardLink(), onClick: () => setIsOpen(false) },
      { icon: <LogOut size={20} />, label: 'تسجيل الخروج', onClick: () => { handleLogout(); setIsOpen(false); } },
    ];

    const guestActions = [
      { icon: <User size={20} />, label: 'تسجيل الدخول', link: '/login', onClick: () => setIsOpen(false) },
      { icon: <Plus size={20} />, label: 'تسجيل جديد', link: '/register', onClick: () => setIsOpen(false) },
    ];

    if (!isLoggedIn) return guestActions;

    switch (userRole) {
      case 'patient':
        return [
          { icon: <Calendar size={20} />, label: 'مواعيدي', link: '/dashboard/patient', onClick: () => setIsOpen(false) },
          { icon: <FileText size={20} />, label: 'ملفي الطبي', link: '/dashboard/patient?section=medical-file', onClick: () => setIsOpen(false) },
          { icon: <Bed size={20} />, label: 'حجز غرفة', link: '/dashboard/patient?section=room-booking', onClick: () => setIsOpen(false) },
          ...commonActions,
        ];
      case 'doctor':
        return [...commonActions];
      case 'admin':
        return [
          { icon: <LayoutDashboard size={20} />, label: 'لوحة تحكم المدير', link: '/dashboard/admin', onClick: () => setIsOpen(false) },
          ...commonActions,
        ];
      case 'pharmacist':
        return [
          { icon: <Pill size={20} />, label: 'إدارة الصيدلية', link: '/dashboard/pharmacist', onClick: () => setIsOpen(false) },
          ...commonActions,
        ];
      case 'accountant':
        return [
          { icon: <DollarSign size={20} />, label: 'إدارة الحسابات', link: '/dashboard/accountant', onClick: () => setIsOpen(false) },
          ...commonActions,
        ];
      case 'receptionist':
        return [
          { icon: <Calendar size={20} />, label: 'إدارة المواعيد', link: '/dashboard/receptionist', onClick: () => setIsOpen(false) },
          { icon: <Users size={20} />, label: 'إدارة المرضى', link: '/dashboard/receptionist?section=patients', onClick: () => setIsOpen(false) },
          { icon: <Bed size={20} />, label: 'إدارة الغرف', link: '/dashboard/receptionist?section=rooms', onClick: () => setIsOpen(false) },
          ...commonActions,
        ];
      case 'nurse':
        return [
          { icon: <Bed size={20} />, label: 'إدارة الغرف', link: '/dashboard/nurse', onClick: () => setIsOpen(false) },
          { icon: <FileText size={20} />, label: 'سجلات المرضى', link: '/dashboard/nurse?section=patient-records', onClick: () => setIsOpen(false) },
          ...commonActions,
        ];
      default:
        return guestActions;
    }
  };

  const actions = getActionsBasedOnRole();

  // معالجة فتح القائمة عند تمرير الماوس
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  // معالجة إغلاق القائمة عند مغادرة الماوس مع تأخير
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  // ثوابت لتحديد حجم وموضع الأزرار
  const buttonSize = 64;
  const subButtonSize = 44;
  const spacing = 60; // المسافة العمودية بين الأزرار الفرعية

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* الأزرار الفرعية */}
      {actions.map((action, index) => {
        // حساب موضع كل زر فرعي لترتيبها عمودياً
        const yOffset = (index + 1) * spacing;

        // إنشاء العنصر المناسب (Link أو Button)
        const ActionElement = action.link ? Link : 'button';

        return (
          <div
            key={index}
            className={`absolute flex items-center space-x-2 space-x-reverse transition-all ease-out transform group ${
              isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
            }`}
            style={{
              transform: isOpen
                ? `translateY(-${yOffset}px) scale(1)` // استخدام translateY للترتيب العمودي
                : `translateY(0px) scale(0)`,
              transitionDelay: isOpen
                ? `${index * 0.05}s`
                : `${(actions.length - 1 - index) * 0.05}s`,
              transformOrigin: '50% 50%',
              bottom: `${buttonSize / 2 - subButtonSize / 2}px`,
              right: `${buttonSize / 2 - subButtonSize / 2}px`,
            }}
          >
            <span className="bg-white text-gray-800 text-xs font-medium px-3 py-1 rounded-md shadow-lg border border-gray-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {action.label}
            </span>
            <ActionElement
              to={action.link}
              onClick={action.onClick}
              className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-3 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300"
              style={{ width: subButtonSize, height: subButtonSize }}
            >
              {action.icon}
            </ActionElement>
          </div>
        );
      })}

      {/* الزر الرئيسي */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform ${isOpen ? 'rotate-45' : ''} hover:scale-110`}
        aria-label="إجراءات سريعة"
        style={{ width: buttonSize, height: buttonSize }}
      >
        <Plus size={30} />
      </button>
    </div>
  );
};

export default FloatingActionsButton;
