// src/admin-sections/Nurses/AdminNurses.jsx
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import NurseList from './NursesList';
import NurseForm from './NurseForm';
import { addNurse, updateNurse, deleteNurse, getNurses } from '../../services/NurseService';
import { getDepartments } from '../../services/DepartmentService';

const AdminNurses = () => {
    const [departments, setDepartments] = useState([]);
    const [nurses, setNurses] = useState([]);
    const [viewMode, setViewMode] = useState('list');
    const [selectedNurse, setSelectedNurse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    const fetchNurses = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getNurses();
            setNurses(data);
        } catch (err) {
            setError('فشل في جلب الممرضين: ' + (err.response?.data?.message || err.message));
            console.error('Failed to fetch nurses:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchDepartments = async () => {
        try {
            const data = await getDepartments(); // تم تصحيح اسم الدالة هنا
            setDepartments(data);
        } catch (err) {
            console.error('فشل في جلب الأقسام:', err);
            setError('فشل في جلب الأقسام: ' + (err.response?.data?.message || err.message));
        }
    };

    useEffect(() => {
        fetchNurses();
        fetchDepartments();
    }, []);

    const handleAddNurse = () => {
        setSelectedNurse(null);
        setViewMode('add');
        setFormErrors({});
    };

    const handleEditNurse = (nurse) => {
        setSelectedNurse(nurse);
        setViewMode('edit');
        setFormErrors({});
    };

    const handleDeleteNurse = async (id) => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذا الممرض؟')) {
            try {
                await deleteNurse(id);
                alert('تم حذف الممرض بنجاح.');
                fetchNurses();
            } catch (err) {
                alert('فشل في حذف الممرض: ' + (err.response?.data?.message || err.message));
                console.error('Failed to delete nurse:', err);
            }
        }
    };

    const handleSaveNurse = async (nurseData, imageFile) => {
        setError(null);
        setFormErrors({});

        const formData = new FormData();

        // إضافة الحقول إلى FormData
        // تم تبسيط هذه الحلقة لتكون أكثر وضوحًا
        for (const key in nurseData) {
            if (Object.prototype.hasOwnProperty.call(nurseData, key)) {
                // تجنب إضافة حقل الصورة الذي هو URL
                if (key === 'image' && typeof nurseData[key] === 'string') {
                    continue;
                }
                // تجنب إرسال حقول كلمة المرور الفارغة عند التعديل
                if ((key === 'password' || key === 'password_confirmation') && !nurseData[key] && selectedNurse) {
                    continue;
                }
                formData.append(key, nurseData[key] || '');
            }
        }

        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            if (selectedNurse && selectedNurse.id) {
                formData.append('_method', 'PUT');
                await updateNurse(selectedNurse.id, formData);
                alert('تم تحديث بيانات الممرض بنجاح.');
            } else {
                await addNurse(formData);
                alert('تم إضافة الممرض بنجاح.');
            }
            setViewMode('list');
            fetchNurses();
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            const validationErrors = err.response?.data?.errors;
            if (validationErrors) {
                setFormErrors(validationErrors);
            }
            setError('فشل في حفظ الممرض: ' + errorMessage);
            console.error('Failed to save nurse:', err.response?.data || err.message);
        }
    };

    const handleCancelForm = () => {
        setViewMode('list');
        setSelectedNurse(null);
        setError(null);
        setFormErrors({});
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-blue-600 text-lg">جاري تحميل الممرضين والأقسام...</p>
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
                <h3 className="text-2xl font-semibold text-gray-800">إدارة الممرضين</h3>
                {viewMode === 'list' && (
                    <button
                        onClick={handleAddNurse}
                        className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
                    >
                        <Plus size={20} className="ml-2" />
                        إضافة ممرض
                    </button>
                )}
            </div>

            {viewMode === 'list' && (
                <NurseList
                    nurses={nurses}
                    departments={departments}
                    onEdit={handleEditNurse}
                    onDelete={handleDeleteNurse}
                />
            )}
            {(viewMode === 'add' || viewMode === 'edit') && (
                <NurseForm
                    nurse={selectedNurse}
                    onSubmit={handleSaveNurse}
                    onCancel={handleCancelForm}
                    departments={departments}
                    errors={formErrors}
                />
            )}
        </div>
    );
};

export default AdminNurses;
