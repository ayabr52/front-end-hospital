// src/admin-sections/Pharmacy/AdminPharmacy.jsx
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import MedicinesList from './MedicinesList'; // المسار المعدل
import MedicineForm from './MedicineForm';   // المسار المعدل
import * as MedicineService from '../../services/MedicineService';
import * as AuthService from '../../services/AuthService'; // استيراد AuthService

const AdminPharmacy = () => {
    // حالة المصادقة والدور
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true); // لتمثيل التحقق الأولي من المصادقة

    const [medicines, setMedicines] = useState([]);
    const [viewMode, setViewMode] = useState('list'); // 'list', 'add', 'edit'
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [loading, setLoading] = useState(false); // للتحميل الخاص بعمليات الأدوية
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // دالة للتحقق من حالة المصادقة والدور
    const checkAuthAndRole = () => {
        const authenticated = AuthService.isAuthenticated();
        setIsAuthenticated(authenticated);

        if (authenticated) {
            const userData = AuthService.getUserData();
            if (userData && userData.role && userData.role.name) {
                setUserRole(userData.role.name);
            } else {
                setUserRole(null); // لا يوجد دور أو هيكل غير صحيح
            }
        } else {
            setUserRole(null);
        }
        setLoadingAuth(false); // تم الانتهاء من التحقق الأولي
    };

    // useEffect للاستماع إلى تغييرات المصادقة
    useEffect(() => {
        checkAuthAndRole(); // تحقق عند تحميل المكون لأول مرة

        // إضافة مستمع لحدث authChange
        window.addEventListener('authChange', checkAuthAndRole);

        // إزالة المستمع عند إلغاء تحميل المكون
        return () => {
            window.removeEventListener('authChange', checkAuthAndRole);
        };
    }, []); // تشغيل مرة واحدة عند التحميل

    // دالة لجلب جميع الأدوية
    const fetchMedicines = async () => {
        setLoading(true);
        setError('');
        setSuccessMessage('');
        try {
            const data = await MedicineService.fetchMedicines();
            // نفترض أن الـ API يعيد مصفوفة الأدوية مباشرة أو في خاصية 'medicines'
            setMedicines(data.medicines || data); // ضبط البيانات بناءً على استجابة الـ API
        } catch (err) {
            setError(err.response?.data?.message || 'فشل في جلب الأدوية.');
            console.error('Fetch medicines error:', err);
        } finally {
            setLoading(false);
        }
    };

    // جلب البيانات عند تغيير وضع العرض أو بعد التحقق من المصادقة والدور
    useEffect(() => {
        if (loadingAuth) return; // انتظر حتى يتم تحميل حالة المصادقة الأولية

        // السماح بالوصول إذا كان المدير أو الصيدلي
        if (!isAuthenticated || !(userRole === 'admin' || userRole === 'pharmacist')) {
            setError('غير مصرح لك بالوصول إلى هذه الصفحة.');
            setMedicines([]); // مسح أي بيانات سابقة
            return;
        }

        if (viewMode === 'list') {
            fetchMedicines();
        }
    }, [viewMode, isAuthenticated, userRole, loadingAuth]);

    const handleAddMedicine = () => {
        setSelectedMedicine(null);
        setViewMode('add');
    };

    const handleEditMedicine = (medicine) => {
        setSelectedMedicine(medicine);
        setViewMode('edit');
    };

    const handleDeleteMedicine = async (id) => {
        const isConfirmed = window.confirm('هل أنت متأكد أنك تريد حذف هذا الدواء؟');
        if (!isConfirmed) return;

        setLoading(true);
        setError('');
        setSuccessMessage('');
        try {
            const data = await MedicineService.deleteMedicine(id);
            setSuccessMessage(data.message || 'تم حذف الدواء بنجاح.');
            fetchMedicines();
        } catch (err) {
            setError(err.response?.data?.message || 'فشل في حذف الدواء.');
            console.error('Delete medicine error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveMedicine = async (medicineData) => {
        setLoading(true);
        setError('');
        setSuccessMessage('');
        try {
            let data;
            if (medicineData.id) {
                // تعديل دواء موجود
                data = await MedicineService.updateMedicine(medicineData.id, medicineData);
                setSuccessMessage(data.message || 'تم تحديث الدواء بنجاح.');
            } else {
                // إضافة دواء جديد
                data = await MedicineService.storeMedicine(medicineData);
                setSuccessMessage(data.message || 'تم إضافة الدواء بنجاح.');
            }
            setViewMode('list');
            fetchMedicines();
        } catch (err) {
            setError(err.response?.data?.message || 'فشل في حفظ بيانات الدواء.');
            if (err.response?.data?.errors) {
                const validationErrors = Object.values(err.response.data.errors).flat().join(', ');
                setError(validationErrors);
            }
            console.error('Save medicine error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelForm = () => {
        setViewMode('list');
        setSelectedMedicine(null);
    };

    // عرض رسالة التحميل أثناء التحقق من المصادقة
    if (loadingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-xl text-gray-700">جاري التحقق من المصادقة...</p>
            </div>
        );
    }

    // عرض رسالة عدم التصريح إذا لم يكن المستخدم مديرًا أو صيدليًا
    if (!isAuthenticated || !(userRole === 'admin' || userRole === 'pharmacist')) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-xl text-red-600">{error || 'غير مصرح لك بالوصول إلى هذه الصفحة.'}</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto my-8 font-sans text-right" dir="rtl">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-800">إدارة الصيدلية (الأدوية)</h3>
                {viewMode === 'list' && (
                    <button
                        onClick={handleAddMedicine}
                        className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200 shadow-md"
                    >
                        <Plus size={20} className="ml-2" />
                        إضافة دواء
                    </button>
                )}
            </div>

            {loading && <p className="text-blue-600 text-center mb-4">جاري المعالجة...</p>}
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}
            {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}

            {viewMode === 'list' && (
                <MedicinesList
                    medicines={medicines}
                    onEdit={handleEditMedicine}
                    onDelete={handleDeleteMedicine}
                    loading={loading}
                    error={error}
                    successMessage={successMessage}
                />
            )}
            {(viewMode === 'add' || viewMode === 'edit') && (
                <MedicineForm
                    medicine={selectedMedicine}
                    onSubmit={handleSaveMedicine}
                    onCancel={handleCancelForm}
                />
            )}
        </div>
    );
};

export default AdminPharmacy;
