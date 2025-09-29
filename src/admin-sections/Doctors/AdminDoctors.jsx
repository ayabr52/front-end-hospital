import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import DoctorsList from './DoctorsList';
import DoctorForm from './DoctorForm';
import { addDoctor, updateDoctor, deleteDoctor } from '../../services/DoctorService'; // استيراد خدمات الأطباء
import { getDoctors } from '../../services/DoctorService'; // استيراد getDoctors أيضًا
import { getDepartments } from '../../services/DepartmentService';

const AdminDoctors = () => {
    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [viewMode, setViewMode] = useState('list'); // 'list', 'add', 'edit'
    const [selectedDoctor, setSelectedDoctor] = useState(null); // للطبيب الذي يتم تعديله
    const [loading, setLoading] = useState(true); // حالة التحميل
    const [error, setError] = useState(null); // حالة الأخطاء
    const [formErrors, setFormErrors] = useState({}); // لتخزين أخطاء التحقق من صحة النموذج

    // دالة لجلب الأطباء من الـ API
    const fetchDoctors = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getDoctors();
            setDoctors(data);
        } catch (err) {
            setError('فشل في جلب الأطباء: ' + (err.response?.data?.message || err.message));
            console.error('Failed to fetch doctors:', err);
        } finally {
            setLoading(false);
        }
    };

    // دالة لجلب الأقسام من الـ API
    const fetchDepartments = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getDepartments();
            setDepartments(data);
        } catch (err) {
            setError('فشل في جلب الأقسام: ' + (err.response?.data?.message || err.message));
            console.error('Failed to fetch departments:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors(); // جلب الأطباء عند تحميل المكون
        fetchDepartments(); // جلب الأقسام عند تحميل المكون
    }, []);

    const handleAddDoctor = () => {
        setSelectedDoctor(null); // للتأكد من أن النموذج فارغ للإضافة
        setViewMode('add');
        setFormErrors({}); // مسح الأخطاء عند فتح نموذج جديد
    };

    const handleEditDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setViewMode('edit');
        setFormErrors({}); // مسح الأخطاء عند فتح نموذج التعديل
    };

    const handleDeleteDoctor = async (id) => {
        // استخدام رسالة مخصصة بدلاً من window.confirm
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذا الطبيب؟')) { // Placeholder for custom modal
            try {
                await deleteDoctor(id);
                alert('تم حذف الطبيب بنجاح.'); // Placeholder for custom message box
                fetchDoctors(); // إعادة جلب الأطباء بعد الحذف
            } catch (err) {
                alert('فشل في حذف الطبيب: ' + (err.response?.data?.message || err.message)); // Placeholder for custom message box
                console.error('Failed to delete doctor:', err);
            }
        }
    };

    const handleSaveDoctor = async (doctorData) => {
        setError(null);
        setFormErrors({}); // مسح أخطاء النموذج السابقة

        const formData = new FormData();

        // إضافة جميع الحقول النصية إلى FormData
        // تأكد من أن 'name' يتم إرساله كحقل واحد إذا كان الـ backend يتوقعه كذلك
        // أو أرسل first_name و last_name إذا كان الـ backend يتعامل معهما منفصلين
        formData.append('name', doctorData.name);
        formData.append('email', doctorData.email);
        formData.append('phone', doctorData.phone || '');
        formData.append('address', doctorData.address || '');
        formData.append('specialty', doctorData.specialty);
        formData.append('bio', doctorData.bio || '');
        formData.append('gender', doctorData.gender);
        formData.append('national_id', doctorData.national_id || '');
        formData.append('dob', doctorData.dob || '');
        formData.append('department_id', doctorData.department_id);

        // إضافة حقول كلمة المرور بشكل شرطي
        if (doctorData.password) {
            formData.append('password', doctorData.password);
            formData.append('password_confirmation', doctorData.password_confirmation);
        }

        // إضافة ملف الصورة إذا تم اختياره
        if (doctorData.selectedImageFile) {
            formData.append('image', doctorData.selectedImageFile);
        } else if (doctorData.image === null && selectedDoctor?.image) {
            // إذا كان المستخدم قد أزال الصورة الموجودة (عن طريق مسح حقل الملف)
            // يمكن إرسال إشارة للـ backend لحذف الصورة
            // هذا يتطلب تعديل في الـ backend للتعامل مع 'image_cleared'
            formData.append('image_cleared', 'true');
        }


        try {
            if (selectedDoctor && selectedDoctor.id) {
                // تعديل طبيب موجود
                // عند إرسال FormData مع PUT/PATCH، يجب استخدام POST مع حقل _method
                formData.append('_method', 'PUT');
                await updateDoctor(selectedDoctor.id, formData);
                alert('تم تحديث بيانات الطبيب بنجاح.'); // Placeholder for custom message box
            } else {
                // إضافة طبيب جديد
                await addDoctor(formData);
                alert('تم إضافة الطبيب بنجاح.'); // Placeholder for custom message box
            }
            setViewMode('list'); // العودة إلى عرض القائمة
            fetchDoctors(); // إعادة جلب الأطباء بعد الحفظ
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            const validationErrors = err.response?.data?.errors;

            if (validationErrors) {
                setFormErrors(validationErrors);
            }
            setError('فشل في حفظ الطبيب: ' + errorMessage);
            console.error('Failed to save doctor:', err.response?.data || err.message);
        }
    };

    const handleCancelForm = () => {
        setViewMode('list');
        setSelectedDoctor(null);
        setError(null); // مسح الأخطاء عند الإلغاء
        setFormErrors({}); // مسح أخطاء النموذج
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-blue-600 text-lg">جاري تحميل الأطباء والأقسام...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">خطأ!</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-800">إدارة الأطباء</h3>
                {viewMode === 'list' && (
                    <button
                        onClick={handleAddDoctor}
                        className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
                    >
                        <Plus size={20} className="ml-2" />
                        إضافة طبيب
                    </button>
                )}
            </div>

            {viewMode === 'list' && (
                <DoctorsList
                    doctors={doctors}
                    departments={departments} // تأكد من تمرير الأقسام هنا أيضًا إذا كانت DoctorsList تحتاجها
                    onEdit={handleEditDoctor}
                    onDelete={handleDeleteDoctor}
                />
            )}
            {(viewMode === 'add' || viewMode === 'edit') && (
                <DoctorForm
                    doctor={selectedDoctor}
                    onSubmit={handleSaveDoctor}
                    onCancel={handleCancelForm}
                    departments={departments}
                    errors={formErrors} // تمرير أخطاء التحقق من صحة النموذج
                />
            )}
        </div>
    );
};

export default AdminDoctors;
