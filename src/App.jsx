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
import { Routes, Route, useLocation } from 'react-router-dom';
import FloatingActionsButton from './components/FloatingActionsButton/FloatingActionsButton.jsx';
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminDashboard from './dashboards/AdminDashboard.jsx';
import PatientDashboard from './dashboards/PatientDashboard.jsx';
import DoctorDashboard from './dashboards/DoctorDashboard.jsx';
import ReceptionistDashboard from './dashboards/ReceptionistDashboard.jsx';
import NurseDashboard from './dashboards/NurseDashboard.jsx';
import AccountantDashboard from './dashboards/AccountantDashboard.jsx';
import PharmacistDashboard from './dashboards/PharmacistDashboard.jsx';
import React, { useEffect } from 'react';

function App() {
    // استخدام useLocation هنا صحيح لأنه سيتم عرض App داخل BrowserRouter في main.jsx
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const elementId = location.hash.substring(1);
            const element = document.getElementById(elementId);

            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]);

    return (
        // لا يوجد <Router> هنا، فقط div الرئيسي
        <div className="font-inter antialiased text-gray-900 bg-gray-50 scroll-smooth">
            <Header />

            <Routes>
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

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

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
                    <ProtectedRoute requiredRoles={['receptionist', 'admin']}>
                        <ReceptionistDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/dashboard/accountant" element={
                    <ProtectedRoute requiredRoles={['accountant']}>
                        <AccountantDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/dashboard/pharmacist" element={
                    <ProtectedRoute requiredRoles={['pharmacist', 'admin']}>
                        <PharmacistDashboard />
                    </ProtectedRoute>
                } />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;
