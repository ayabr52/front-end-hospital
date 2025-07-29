// src/dashboards/PharmacistDashboard.jsx
import React, { useState } from 'react';
import { getCurrentUser, logout } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import {
  Pill, FileText, LogOut, User as UserIcon, Bell, Settings
} from 'lucide-react';

// استيراد مكونات أقسام الصيدلي
import PharmacistMedicines from '../pharmacist-sections/Medicines/PharmacistMedicines';
import PharmacistPrescriptions from '../pharmacist-sections/Prescriptions/PharmacistPrescriptions';

const PharmacistDashboard = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('medicines'); // القسم النشط الافتراضي

  const handleLogout = () => {
    logout();
    navigate('/login'); // التوجيه إلى صفحة تسجيل الدخول بعد تسجيل الخروج
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'medicines':
        return <PharmacistMedicines />;
      case 'prescriptions':
        return <PharmacistPrescriptions />;
      default:
        return <PharmacistMedicines />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col p-4 shadow-lg fixed h-full right-0"> {/* fixed right-0 for RTL sidebar */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">مستشفى الدكتور</h1>
          <h2 className="text-xl">فرزات أيوب الجامعي</h2>
          <div className="mt-4">
            <img
              src="https://placehold.co/80x80/E0E7FF/0000FF?text=Pharmacist"
              alt="Pharmacist Avatar"
              className="w-20 h-20 rounded-full border-2 border-blue-500 mx-auto mb-2 object-cover"
            />
            <p className="text-lg font-semibold">{user ? user.name : 'الصيدلي'}</p>
            <p className="text-sm text-blue-200">{user ? user.email : ''}</p>
          </div>
        </div>

        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveSection('medicines')}
                className={`w-full text-right flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
                  activeSection === 'medicines' ? 'bg-blue-700' : ''
                }`}
              >
                <Pill size={20} className="ml-3" />
                إدارة الأدوية
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('prescriptions')}
                className={`w-full text-right flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
                  activeSection === 'prescriptions' ? 'bg-blue-700' : ''
                }`}
              >
                <FileText size={20} className="ml-3" />
                الوصفات الطبية
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
        {/* Top Bar (يمكن تخصيصه أكثر للصيدلي) */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 flex justify-between items-center text-right">
          <h2 className="text-xl font-semibold text-blue-800">
            {activeSection === 'medicines' && 'إدارة الأدوية'}
            {activeSection === 'prescriptions' && 'الوصفات الطبية'}
          </h2>
          <div className="flex items-center space-x-4 space-x-reverse">
            <span className="text-gray-700 font-medium">{user ? user.name : 'الصيدلي'}</span>
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

export default PharmacistDashboard;
