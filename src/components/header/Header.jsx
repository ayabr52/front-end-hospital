// src/components/header/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { isAuthenticated, getUserData, logout } from '../../services/AuthService'; // استخدام getUserData

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  // دالة لتهيئة حالة المصادقة بناءً على localStorage
  const checkAuthStatus = () => {
    const authStatus = isAuthenticated();
    setIsLoggedIn(authStatus);
    if (authStatus) {
      const userData = getUserData(); // استخدام getUserData
      if (userData) {
        setUserName(userData.name);
        setUserRole(userData.role.name); // الوصول إلى اسم الدور
      }
    } else {
      setUserName('');
      setUserRole('');
    }
  };

  useEffect(() => {
    // التحقق من حالة المصادقة عند تحميل المكون لأول مرة
    checkAuthStatus();

    // إضافة مستمع لحدث 'authChange'
    window.addEventListener('authChange', checkAuthStatus);

    // إزالة المستمع عند إلغاء تحميل المكون لتجنب تسرب الذاكرة
    return () => {
      window.removeEventListener('authChange', checkAuthStatus);
    };
  }, []); // تشغيل مرة واحدة عند التحميل والإزالة عند إلغاء التحميل

  const handleLogout = async () => {
    await logout();
    // حالة isLoggedIn و userName و userRole ستتحدث تلقائياً بفضل مستمع الحدث
    navigate('/login');
  };

  const getDashboardLink = () => {
    switch (userRole) {
      case 'admin':
        return '/dashboard/admin';
      case 'patient':
        return '/dashboard/patient';
      case 'doctor':
        return '/dashboard/doctor';
      case 'nurse':
        return '/dashboard/nurse';
      case 'receptionist':
        return '/dashboard/receptionist';
      case 'accountant':
        return '/dashboard/accountant';
      case 'pharmacist':
        return '/dashboard/pharmacist';
      default:
        return '/';
    }
  };

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 space-x-reverse">
          <img src="https://farzathpu.com/wp-content/uploads/2025/03/photo_2025-03-23_21-11-11-removebg-preview.png" alt="Hospital Logo" className="h-10 w-10 rounded-full" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">الرئيسية</Link>
          <Link to="/#services" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">خدماتنا</Link>
          <Link to="/#doctors" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">أطباؤنا</Link>
          <Link to="/#tips" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">نصائح صحية</Link>
          <Link to="/#about" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">عن المستشفى</Link>
          <Link to="/#departments" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">الأقسام</Link>
          <Link to="/#contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">اتصل بنا</Link>
          
          {isLoggedIn ? (
            <>
              <Link to={getDashboardLink()} className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200 flex items-center">
                <User size={18} className="ml-1" />
                لوحة التحكم ({userName})
              </Link>
              <button onClick={handleLogout} className="text-red-600 font-semibold hover:text-red-800 transition-colors duration-200 flex items-center">
                <LogOut size={18} className="ml-1" />
                خروج
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200">تسجيل الدخول</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200">تسجيل جديد</Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white py-4 shadow-lg absolute w-full top-full right-0 text-right">
          <ul className="flex flex-col space-y-4 px-4">
            <li><Link to="/" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>الرئيسية</Link></li>
            <li><Link to="/#services" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>خدماتنا</Link></li>
            <li><Link to="/#doctors" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>أطباؤنا</Link></li>
            <li><Link to="/#tips" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>نصائح صحية</Link></li>
            <li><Link to="/#about" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>عن المستشفى</Link></li>
            <li><Link to="/#departments" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>الأقسام</Link></li>
            <li><Link to="/#contact" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>اتصل بنا</Link></li>
            
            {isLoggedIn ? (
              <>
                <li>
                  <Link to={getDashboardLink()} className="block text-blue-600 font-semibold hover:text-blue-800" onClick={() => setIsMobileMenuOpen(false)}>
                    لوحة التحكم ({userName})
                  </Link>
                </li>
                <li>
                  <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="block text-red-600 font-semibold hover:text-red-800 w-full text-right">
                    خروج
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="block text-blue-600 font-semibold hover:text-blue-800" onClick={() => setIsMobileMenuOpen(false)}>تسجيل الدخول</Link></li>
                <li><Link to="/register" className="block bg-blue-600 text-white px-4 py-2 rounded-full text-center hover:bg-blue-700" onClick={() => setIsMobileMenuOpen(false)}>تسجيل جديد</Link></li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
