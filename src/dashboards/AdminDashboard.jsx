// src/dashboards/AdminDashboard.jsx
import React, { useState } from 'react';
import { getCurrentUser, logout } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building, Stethoscope, Bed, Users, User, Pill, DollarSign, LogOut,
  Home as HomeIcon, Bell, Settings
} from 'lucide-react';

// استيراد جميع مكونات الأقسام
import OverviewContent from '../admin-sections/Overview/OverviewContent';
import AdminDepartments from '../admin-sections/Departments/AdminDepartments';
import AdminDoctors from '../admin-sections/Doctors/AdminDoctors';
import AdminRooms from '../admin-sections/Rooms/AdminRooms';
import AdminPatients from '../admin-sections/Patients/AdminPatients';
import AdminNurses from '../admin-sections/Nurses/AdminNurses';
import AdminPharmacy from '../admin-sections/Pharmacy/AdminPharmacy';
import AdminAccounts from '../admin-sections/Accounts/AdminAccounts';


const AdminDashboard = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview'); // الحالة لتحديد القسم النشط

  const handleLogout = () => {
    logout();
    navigate('/login'); // التوجيه إلى صفحة تسجيل الدخول بعد تسجيل الخروج
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewContent />;
      case 'departments':
        return <AdminDepartments />;
      case 'doctors':
        return <AdminDoctors />;
      case 'rooms':
        return <AdminRooms />;
      case 'patients':
        return <AdminPatients />;
      case 'nurses':
        return <AdminNurses />;
      case 'pharmacy':
        return <AdminPharmacy />;
      case 'accounts':
        return <AdminAccounts />;
      default:
        return <OverviewContent />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col p-4 shadow-lg fixed h-full right-0"> {/* fixed right-0 for RTL sidebar */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">مستشفى الدكتور</h1>
          <h2 className="text-xl">فرزات أيوب الجامعي</h2>
        </div>

        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveSection('overview')}
                className={`w-full text-right flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
                  activeSection === 'overview' ? 'bg-blue-700' : ''
                }`}
              >
                <HomeIcon size={20} className="ml-3" /> {/* أيقونة الرئيسية */}
                الرئيسية
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('departments')}
                className={`w-full text-right flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
                  activeSection === 'departments' ? 'bg-blue-700' : ''
                }`}
              >
                <Building size={20} className="ml-3" />
                الأقسام
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('doctors')}
                className={`w-full text-right flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
                  activeSection === 'doctors' ? 'bg-blue-700' : ''
                }`}
              >
                <Stethoscope size={20} className="ml-3" />
                الأطباء
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('rooms')}
                className={`w-full text-right flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
                  activeSection === 'rooms' ? 'bg-blue-700' : ''
                }`}
              >
                <Bed size={20} className="ml-3" />
                الغرف الداخلية
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('patients')}
                className={`w-full text-right flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
                  activeSection === 'patients' ? 'bg-blue-700' : ''
                }`}
              >
                <Users size={20} className="ml-3" />
                المرضى
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('nurses')}
                className={`w-full text-right flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
                  activeSection === 'nurses' ? 'bg-blue-700' : ''
                }`}
              >
                <User size={20} className="ml-3" />
                الممرضين
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('pharmacy')}
                className={`w-full text-right flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
                  activeSection === 'pharmacy' ? 'bg-blue-700' : ''
                }`}
              >
                <Pill size={20} className="ml-3" />
                الصيدلية
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('accounts')}
                className={`w-full text-right flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
                  activeSection === 'accounts' ? 'bg-blue-700' : ''
                }`}
              >
                <DollarSign size={20} className="ml-3" />
                رموز التوثيق
              </button>
            </li>
          </ul>
        </nav>

        <div className="mt-auto"> {/* Push logout to bottom */}
          <button
            onClick={handleLogout}
            className="w-full text-right flex items-center p-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-200"
          >
            <LogOut size={20} className="ml-3" />
            خروج
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-8 mr-64"> {/* mr-64 to offset fixed sidebar */}
        {/* Top Bar */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 flex justify-between items-center text-right">
          <h2 className="text-xl font-semibold text-blue-800">
            {/* عرض اسم القسم النشط هنا */}
            {activeSection === 'overview' && 'الرئيسية'}
            {activeSection === 'departments' && 'الأقسام'}
            {activeSection === 'doctors' && 'الأطباء'}
            {activeSection === 'rooms' && 'الغرف الداخلية'}
            {activeSection === 'patients' && 'المرضى'}
            {activeSection === 'nurses' && 'الممرضين'}
            {activeSection === 'pharmacy' && 'الصيدلية'}
            {activeSection === 'accounts' && 'رموز التوثيق'}
          </h2>
          <div className="flex items-center space-x-4 space-x-reverse">
            <span className="text-gray-700 font-medium">{user ? user.name : 'المستخدم'}</span>
            <img
              src="https://placehold.co/40x40/E0E7FF/0000FF?text=User"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-blue-500"
            />
            {/* أيقونة الجرس للإشعارات */}
            <div className="relative">
              <Bell size={24} className="text-gray-600" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
            </div>
            {/* أيقونة الإعدادات */}
            <Settings size={24} className="text-gray-600" />
          </div>
        </div>

        {/* Content based on activeSection */}
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
