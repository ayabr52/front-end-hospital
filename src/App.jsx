import './App.css'
import Home from './sections/Home';
import Services from './sections/Services';
import Doctors from './sections/Doctors';
import Tips from './sections/Tips';
import Header from './components/header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import About from './sections/About.jsx';
import Departments from './sections/Departments.jsx';
import ContactUs from './sections/ContactUs.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FloatingActionsButton from './components/FloatingActionsButton/FloatingActionsButton.jsx'; // تأكد من المسار الصحيح للملف
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminDashboard from './dashboards/AdminDashboard.jsx';
import PatientDashboard from './dashboards/PatientDashboard.jsx';
import DoctorDashboard from './dashboards/DoctorDashboard.jsx';
import ReceptionistDashboard from './dashboards/ReceptionistDashboard.jsx';
import NurseDashboard from './dashboards/NurseDashboard.jsx';
import AccountantDashboard from './dashboards/AccountantDashboard.jsx';
import PharmacistDashboard from './dashboards/PharmacistDashboard.jsx';

function App() {

  return (
     <Router>
      <div className="font-inter antialiased text-gray-900 bg-gray-50 scroll-smooth">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

        {/* Header and Footer are always visible */}
        <Header />

        <Routes>
          {/* المسار الرئيسي الذي يعرض جميع أقسام الصفحة الرئيسية */}
          <Route path="/" element={
            <>
              <Home/>
              <Services/>
              <Doctors/>
              <About/>
              <Departments/>
              <Tips />
              <ContactUs/>
              <FloatingActionsButton />
              <ScrollToTopButton />
            </>
          } />

          {/* مسارات صفحات تسجيل الدخول والتسجيل */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* مسارات لوحات التحكم المحمية بالأدوار */}
          <Route path="/dashboard/admin" element={
            <ProtectedRoute requiredRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/patient" element={
            <ProtectedRoute requiredRoles={['patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/doctor" element={
            <ProtectedRoute requiredRoles={['doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/nurse" element={
            <ProtectedRoute requiredRoles={['nurse']}>
              <NurseDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/receptionist" element={
            <ProtectedRoute requiredRoles={['receptionist', 'admin']} /* موظف الاستقبال لديه صلاحيات الأدمن في بعض الجوانب */>
              <ReceptionistDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/accountant" element={
            <ProtectedRoute requiredRoles={['accountant']}>
              <AccountantDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/pharmacist" element={
            <ProtectedRoute requiredRoles={['pharmacist', 'admin']} /* الصيدلي قد يحتاج صلاحيات الأدمن لإدارة المخزون */>
              <PharmacistDashboard />
            </ProtectedRoute>
          } />

        </Routes>

        <Footer />
      </div>
    </Router>



  );






}

export default App
