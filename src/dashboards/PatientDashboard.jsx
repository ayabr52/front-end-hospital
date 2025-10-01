// src/dashboards/PatientDashboard.jsx
import React, { useState, useEffect } from 'react'; // إضافة useEffect
import { getUserData, logout } from '../services/AuthService'; // تم التعديل لاستخدام getUserData
import { useNavigate } from 'react-router-dom';
import {
  Calendar, Bed, FileText, LogOut, User as UserIcon, Bell, Settings, RefreshCcwDot
} from 'lucide-react';

// استيراد مكونات أقسام المريض
import PatientAppointments from '../patient-sections/Appointments/PatientAppointments';
import PatientRoomBooking from '../patient-sections/Rooms/PatientRoomBooking';
import PatientMedicalFile from '../patient-sections/MedicalFile/PatientMedicalFile';
import { useNotification } from '../hooks/useNotification';
import Skeleton from 'react-loading-skeleton'

const PatientDashboard = () => {
  const [user, setUser] = useState(null); // استخدام حالة لتخزين بيانات المستخدم
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('appointments'); // القسم النشط الافتراضي
  const [toggleNotifications, setToggleNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const {
    error,
    isLoading,
    getNotifications,
  } = useNotification()
  useEffect(() => {
    // جلب بيانات المستخدم عند تحميل المكون
    const currentUserData = getUserData(); // استخدام getUserData
    const handleGetNotification = async () => {
      const resNotifications = await getNotifications()

      setNotifications(resNotifications)
    }
    if (currentUserData) {
      setUser(currentUserData);
      handleGetNotification()
    } else {
      // إذا لم يكن هناك مستخدم، أعد التوجيه إلى صفحة تسجيل الدخول
      navigate('/login');
    }
  }, [navigate]);
  useEffect(() => {
    if (!toggleNotifications) return;

    const handleClickOutside = () => {
      setToggleNotifications(false)
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleNotifications]);
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
  const handleToggleNotifications = () => {
    setToggleNotifications(!toggleNotifications);
  }
  if (!user) {
    // يمكنك عرض شاشة تحميل أو لا شيء حتى يتم تحميل بيانات المستخدم
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-blue-600 text-xl">جاري تحميل لوحة التحكم...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 paddingTop">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col p-4 shadow-lg fixed h-[calc(100dvh-70px)] right-0 bottom-0"> {/* fixed right-0 for RTL sidebar */}
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

        <nav className="h-fit max-h-full overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveSection('appointments')}
                className={`w-full text-right flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${activeSection === 'appointments' ? 'bg-blue-700' : ''
                  }`}
              >
                <Calendar size={20} className="ml-3" />
                مواعيدي
              </button>
            </li>
            {/* <li>
              <button
                onClick={() => setActiveSection('room-booking')}
                className={`w-full text-right flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
                  activeSection === 'room-booking' ? 'bg-blue-700' : ''
                }`}
              >
                <Bed size={20} className="ml-3" />
                حجز غرفة
              </button>
            </li> */}
            <li>
              <button
                onClick={() => setActiveSection('medical-file')}
                className={`w-full text-right flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${activeSection === 'medical-file' ? 'bg-blue-700' : ''
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
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">{user ? user.name : 'المريض'}</span>
            <img
              src="https://placehold.co/40x40/E0E7FF/0000FF?text=User"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-blue-500"
            />
            {/* أيقونة الجرس للإشعارات */}
            <div className="relative">
              <button
                onClick={() => handleToggleNotifications()}
                className='relative flex items-center cursor-pointer'>
                <Bell size={24} className="text-gray-600" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
              </button>
              <div className={`list-notifications absolute top-[calc(100%+10px)] left-0
              bg-white rounded-lg p-2 shadow-lg transition-all duration-300 w-60 ${toggleNotifications ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="notification flex flex-col gap-2 py-4 px-2">
                  <div className="header-notification flex justify-between items-center ">
                    <h3>الإشعارات</h3>
                    <button
                      className={`cursor-pointer text-gray-600 ${isLoading ? 'animate-spin' : ''}`}
                      onClick={() => getNotifications()}>
                      <RefreshCcwDot size={20} />
                    </button>
                  </div>
                  <ul className="list-notification flex flex-col gap-4">
                    {
                      isLoading ?
                        <li className='flex flex-col gap-2'>
                          <h3 className='text-base text-black font-bold'>
                            <Skeleton borderRadius={8} height={20} width={200} /></h3>
                          <p className='text-sm text-gray-600'>
                            <Skeleton borderRadius={8} height={30} width={200} /></p>
                        </li> :
                        error ?
                          <li className='flex flex-col gap-1'>
                            <h3>حدث خطأ</h3>
                            <p className='text-sm text-gray-600'>
                              {error}
                            </p>
                          </li>
                          :
                          notifications.length === 0 ?
                            <h2 className='text-center text-gray-600'>لا يوجد إشعارات</h2>

                            :
                            notifications.map((notification) => {
                              return <li key={notification?.data?.id}>
                                <h3 className='text-base text-black font-bold'>
                                  {notification?.data?.title}
                                </h3>
                                <p className='text-sm text-gray-600'>
                                  {
                                    notification?.data?.message
                                  }
                                </p>
                              </li>
                            })
                    }
                  </ul>

                </div>
              </div>
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
