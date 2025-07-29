import { LogIn, LogOut, Menu, UserPlus, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../../services/AuthService'; // استيراد خدمة الحصول على المستخدم الحالي

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook to programmatically navigate
  const currentUser = getCurrentUser(); // الحصول على معلومات المستخدم الحالي

  const navItems = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'الخدمات', href: '#services' },
    { name: 'أطباؤنا', href: '#doctors' },
    { name: 'حول', href: '#about' },
    { name: 'أقسامنا', href: '#departments' },
    { name: 'النصائح', href: '#tips' },
    { name: 'تواصل معنا', href: '#contact' },

  ];

  const handleLogout = () => {
    logout(); // استدعاء دالة تسجيل الخروج
    navigate('/login'); // التوجيه إلى صفحة تسجيل الدخول
    setIsMobileMenuOpen(false); // إغلاق قائمة الجوال بعد تسجيل الخروج
  };

  return (
    <header className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        {/* Logo on the right */}
        <div className="order-1 md:order-none">
          <img
            src="https://farzathpu.com/wp-content/uploads/2025/03/photo_2025-03-23_21-11-11-removebg-preview.png"
            alt="Logo"
            className="h-14 w-auto"
          />
        </div>

        {/* Login/Register/Logout Buttons (Left side for desktop) */}
        <div className="hidden md:flex space-x-2 order-3">
          {!currentUser ? ( // شرط لإظهار أزرار تسجيل الدخول/التسجيل إذا لم يكن المستخدم مسجلاً دخوله
            <>
              <Link
                to="/register" // Use Link for navigation
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <UserPlus size={18} className="ml-1" />
                تسجيل مريض جديد
              </Link>
              <Link
                to="/login" // Use Link for navigation
                className="bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-900 transition-colors duration-200 flex items-center"
              >
                <LogIn size={18} className="ml-1" />
                تسجيل الدخول
              </Link>
            </>
          ) : ( // إظهار زر تسجيل الخروج إذا كان المستخدم مسجلاً دخوله
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors duration-200 flex items-center"
            >
              <LogOut size={18} className="ml-1" />
              تسجيل الخروج
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden order-4">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-blue-800 focus:outline-none">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Navigation (Right side, ordered RTL) */}
        <nav className="hidden md:flex flex-grow justify-around space-x-8 text-lg font-medium text-gray-700 order-2">
          <ul className="flex flex-row space-x-8 ">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="hover:text-blue-600 transition-colors duration-200 focus:outline-none"
                  onClick={() => {
                    // Navigate to home path first, then scroll
                    if (window.location.pathname !== '/') {
                      navigate('/');
                      setTimeout(() => {
                        document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                      }, 100); // Small delay to allow navigation
                    } else {
                      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Navigation (Conditional Rendering) */}
        {isMobileMenuOpen && (
          <nav className="md:hidden w-full mt-4 flex flex-col items-center space-y-4 text-lg font-medium text-gray-700 order-5">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => {
                  if (window.location.pathname !== '/') {
                    navigate('/');
                    setTimeout(() => {
                      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  } else {
                    document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-center py-2 hover:bg-gray-100 rounded-md transition-colors duration-200 focus:outline-none"
              >
                {item.name}
              </a>
            ))}
            {/* Login/Register/Logout Buttons for Mobile */}
            {!currentUser ? ( // شرط لإظهار أزرار تسجيل الدخول/التسجيل إذا لم يكن المستخدم مسجلاً دخوله
              <div className="w-full flex flex-col space-y-2 mt-4">
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <UserPlus size={18} className="ml-1" />
                  تسجيل مريض جديد
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-900 transition-colors duration-200 flex items-center justify-center"
                >
                  <LogIn size={18} className="ml-1" />
                  تسجيل الدخول
                </Link>
              </div>
            ) : ( // إظهار زر تسجيل الخروج إذا كان المستخدم مسجلاً دخوله
              <div className="w-full flex flex-col space-y-2 mt-4">
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <LogOut size={18} className="ml-1" />
                  تسجيل الخروج
                </button>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
