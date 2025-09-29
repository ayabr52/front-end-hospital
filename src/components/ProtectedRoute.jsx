// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, isAuthorized } from '../services/AuthService'; // استيراد وظائف المصادقة

const ProtectedRoute = ({ children, requiredRoles }) => {
  if (!isAuthenticated()) {
    // إذا لم يكن المستخدم مسجلاً الدخول، أعد توجيهه إلى صفحة تسجيل الدخول
    return <Navigate to="/login" replace />;
  }

  // استخدام isAuthorized للتحقق من الدور
  if (!isAuthorized(requiredRoles)) {
    // إذا كان المستخدم مسجلاً الدخول ولكن ليس لديه الدور المطلوب، أعد توجيهه إلى الصفحة الرئيسية
    alert('ليس لديك الصلاحيات الكافية للوصول إلى هذه الصفحة.');
    return <Navigate to="/" replace />;
  }

  return children; // إذا كان مصرحًا له، اعرض المكونات الفرعية
};

export default ProtectedRoute;
