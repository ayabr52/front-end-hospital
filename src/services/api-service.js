// src/services/api-service.js
import axios from 'axios';
import { getToken } from './AuthService'; // تأكد من وجود هذا المسار

// عنوان الـ API الأساسي من متغيرات البيئة
const API_URL = import.meta.env.VITE_API_BASE_URL;

// ===============================================
// الدوال الخاصة بالأطباء (Doctors)
// ===============================================

// دالة لجلب جميع الأطباء
export const getDoctors = async () => {
    try {
        const response = await axios.get(`${API_URL}/doctors`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data.doctors;
    } catch (error) {
        console.error('Error fetching doctors:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لجلب طبيب واحد
export const getDoctor = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/doctors/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data.doctor;
    } catch (error) {
        console.error('Error fetching doctor:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لإضافة طبيب جديد (Admin only)
export const addDoctor = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/doctors`, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'multipart/form-data', // غالباً ما يكون هناك رفع ملفات (صورة)
            },
        });
        return response.data.doctor;
    } catch (error) {
        console.error('Error adding doctor:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لتحديث بيانات طبيب (Admin or doctor himself)
export const updateDoctor = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/doctors/${id}`, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data.doctor;
    } catch (error) {
        console.error('Error updating doctor:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لحذف طبيب (Admin only)
export const deleteDoctor = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/doctors/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting doctor:', error.response?.data || error.message);
        throw error;
    }
};

// ===============================================
// الدوال الخاصة بالمرضى (Patients)
// ===============================================

// دالة لجلب جميع المرضى
export const getPatients = async () => {
    try {
        const response = await axios.get(`${API_URL}/patients`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data.patients;
    } catch (error) {
        console.error('Error fetching patients:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لإضافة مريض جديد
export const addPatient = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/patients`, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data.patient;
    } catch (error) {
        console.error('Error adding patient:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لتحديث بيانات مريض
export const updatePatient = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/patients/${id}`, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data.patient;
    } catch (error) {
        console.error('Error updating patient:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لحذف مريض
export const deletePatient = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/patients/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting patient:', error.response?.data || error.message);
        throw error;
    }
};

// ===============================================
// الدوال الخاصة بالسجلات الطبية (Medical Records)
// ===============================================

// دالة لجلب السجلات الطبية
// الباك إند سيقوم بتصفية السجلات بناءً على دور المستخدم
export const getMedicalRecords = async () => {
    try {
        const response = await axios.get(`${API_URL}/medical-records`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data.medical_records;
    } catch (error) {
        console.error('Error fetching medical records:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لإضافة سجل طبي جديد
export const addMedicalRecord = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/medical-records`, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data.medical_record;
    } catch (error) {
        console.error('Error adding medical record:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لتحديث سجل طبي
export const updateMedicalRecord = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/medical-records/${id}`, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data.medical_record;
    } catch (error) {
        console.error('Error updating medical record:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لحذف سجل طبي
export const deleteMedicalRecord = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/medical-records/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting medical record:', error.response?.data || error.message);
        throw error;
    }
};

// ===============================================
// الدوال الخاصة بالتحاليل المخبرية (Lab Tests)
// ===============================================

// دالة لجلب التحاليل المخبرية
// الباك إند سيقوم بتصفية التحاليل بناءً على دور المستخدم
export const getLabTests = async () => {
    try {
        const response = await axios.get(`${API_URL}/lab-tests`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data.lab_tests;
    } catch (error) {
        console.error('Error fetching lab tests:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لإضافة تحليل مخبري جديد
export const addLabTest = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/lab-tests`, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data.lab_test;
    } catch (error) {
        console.error('Error adding lab test:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لتحديث تحليل مخبري
export const updateLabTest = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/lab-tests/${id}`, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data.lab_test;
    } catch (error) {
        console.error('Error updating lab test:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لحذف تحليل مخبري
export const deleteLabTest = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/lab-tests/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting lab test:', error.response?.data || error.message);
        throw error;
    }
};

// ===============================================
// الدوال الخاصة بالمواعيد (Appointments)
// ===============================================

// دالة لجلب جميع المواعيد
// الباك إند سيقوم بتصفية المواعيد بناءً على دور المستخدم
export const getAppointments = async () => {
    try {
        const response = await axios.get(`${API_URL}/appointments`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data.appointments;
    } catch (error) {
        console.error('Error fetching appointments:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لإضافة موعد جديد
export const addAppointment = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/appointments`, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data.appointment;
    } catch (error) {
        console.error('Error adding appointment:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لتحديث موعد
export const updateAppointment = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/appointments/${id}`, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data.appointment;
    } catch (error) {
        console.error('Error updating appointment:', error.response?.data || error.message);
        throw error;
    }
};

// دالة لحذف موعد
export const deleteAppointment = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/appointments/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting appointment:', error.response?.data || error.message);
        throw error;
    }
};
