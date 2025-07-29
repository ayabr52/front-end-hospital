// src/dashboards/PatientDashboard.jsx
import React, { useState } from 'react';
import { getCurrentUser, logout } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import {
  Calendar, Bed, FileText, LogOut, User as UserIcon, Bell, Settings // UserIcon renamed to avoid conflict
} from 'lucide-react';

// استيراد مكونات أقسام المريض
import PatientAppointments from '../patient-sections/Appointments/PatientAppointments';
import PatientRoomBooking from '../patient-sections/Rooms/PatientRoomBooking';
import PatientMedicalFile from '../patient-sections/MedicalFile/PatientMedicalFile';

const PatientDashboard = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('appointments'); // القسم النشط الافتراضي

  const handleLogout = () => {
    logout();
    navigate('/login'); // التوجيه إلى صفحة تسجيل الدخول بعد تسجيل الخروج
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'appointments':
        return <PatientAppointments />;
      case 'room-booking':
        return <PatientRoomBooking />;
      case 'medical-file':
        return <PatientMedicalFile />;
      default:
        return <PatientAppointments />;
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
              src="https://placehold.co/80x80/E0E7FF/0000FF?text=Patient"
              alt="Patient Avatar"
              className="w-20 h-20 rounded-full border-2 border-blue-500 mx-auto mb-2 object-cover"
            />
            <p className="text-lg font-semibold">{user ? user.name : 'المريض'}</p>
            <p className="text-sm text-blue-200">{user ? user.email : ''}</p>
          </div>
        </div>

        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveSection('appointments')}
                className={`w-full text-right flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
                  activeSection === 'appointments' ? 'bg-blue-700' : ''
                }`}
              >
                <Calendar size={20} className="ml-3" />
                مواعيدي
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('room-booking')}
                className={`w-full text-right flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
                  activeSection === 'room-booking' ? 'bg-blue-700' : ''
                }`}
              >
                <Bed size={20} className="ml-3" />
                حجز غرفة
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('medical-file')}
                className={`w-full text-right flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
                  activeSection === 'medical-file' ? 'bg-blue-700' : ''
                }`}
              >
                <FileText size={20} className="ml-3" />
                ملفي الطبي
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
        {/* Top Bar (يمكن تخصيصه أكثر للمريض) */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 flex justify-between items-center text-right">
          <h2 className="text-xl font-semibold text-blue-800">
            {activeSection === 'appointments' && 'مواعيدي'}
            {activeSection === 'room-booking' && 'حجز الغرف'}
            {activeSection === 'medical-file' && 'ملفي الطبي'}
          </h2>
          <div className="flex items-center space-x-4 space-x-reverse">
            <span className="text-gray-700 font-medium">{user ? user.name : 'المريض'}</span>
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

export default PatientDashboard;
