// src/services/AuthService.js

const USER_STORAGE_KEY = 'currentUser';

// محاكاة تسجيل الدخول: تخزين معلومات المستخدم والدور في localStorage
export const login = (email, password) => {
  // في تطبيق حقيقي، هنا سترسل طلب POST إلى API للمصادقة
  // بناءً على البريد الإلكتروني وكلمة المرور، سيقوم الخادم بإرجاع معلومات المستخدم ودوره
  // سنقوم هنا بمحاكاة أدوار مختلفة بناءً على البريد الإلكتروني
  let user = null;
  if (email === 'admin@example.com' && password === 'password') {
    user = { id: 'admin1', name: 'مدير النظام', email: email, role: 'admin' };
  } else if (email === 'patient@example.com' && password === 'password') {
    user = { id: 'patient1', name: 'مريض تجريبي', email: email, role: 'patient' };
  } else if (email === 'doctor@example.com' && password === 'password') {
    user = { id: 'doctor1', name: 'د. أحمد', email: email, role: 'doctor' };
  } else if (email === 'nurse@example.com' && password === 'password') {
    user = { id: 'nurse1', name: 'ممرضة سارة', email: email, role: 'nurse' };
  } else if (email === 'reception@example.com' && password === 'password') {
    user = { id: 'reception1', name: 'موظف استقبال', email: email, role: 'receptionist' };
  } else if (email === 'accountant@example.com' && password === 'password') {
    user = { id: 'accountant1', name: 'محاسب خالد', email: email, role: 'accountant' };
  } else if (email === 'pharmacist@example.com' && password === 'password') {
    user = { id: 'pharmacist1', name: 'صيدلي علي', email: email, role: 'pharmacist' };
  } else if (email === 'receptionist@example.com' && password === 'password') {
    user = { id: 'receptionist1', name: ' موظف الاستقبال مازن', email: email, role: 'receptionist' };
  }

  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    return user;
  }
  return null; // فشل تسجيل الدخول
};

// محاكاة تسجيل مريض جديد: تخزين معلومات المريض الجديد ودوره
export const registerPatient = (patientData) => {
  // في تطبيق حقيقي، هنا سترسل طلب POST إلى API لتسجيل مريض جديد
  // بعد التسجيل الناجح، سيعود الخادم بمعلومات المريض الجديد
  const newUser = {
    id: `patient_${Date.now()}`, // معرف فريد مؤقت
    name: patientData.firstName + ' ' + patientData.lastName,
    email: patientData.email,
    role: 'patient', // الدور الافتراضي للمريض الجديد
    ...patientData // إضافة باقي البيانات
  };
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
  return newUser;
};

// تسجيل الخروج: إزالة معلومات المستخدم من localStorage
export const logout = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
};

// الحصول على معلومات المستخدم الحالي من localStorage
export const getCurrentUser = () => {
  const userStr = localStorage.getItem(USER_STORAGE_KEY);
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

// التحقق مما إذا كان المستخدم مسجلاً الدخول
export const isAuthenticated = () => {
  return !!getCurrentUser();
};

// التحقق من دور المستخدم
export const isAuthorized = (requiredRoles) => {
  const user = getCurrentUser();
  if (!user) return false;
  if (!requiredRoles || requiredRoles.length === 0) return true; // إذا لم تكن هناك أدوار مطلوبة، فالمستخدم مصرح له
  return requiredRoles.includes(user.role);
};
