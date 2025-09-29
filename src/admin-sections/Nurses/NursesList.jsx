// src/components/NursesList.jsx
import React from 'react';
import { Edit, Trash2, Info } from 'lucide-react'; // استخدام أيقونات lucide-react لتوحيد الواجهة

/**
 * A component to display a list of nurses with options to edit and delete.
 *
 * @param {Array} nurses - The list of nurses to display.
 * @param {Function} onEdit - The function to call when the edit button is clicked.
 * @param {Function} onDelete - The function to call when the delete button is clicked.
 * @param {boolean} loading - A boolean to indicate if the data is being loaded.
 * @param {string} error - An error message to display.
 * @param {string} successMessage - A success message to display.
 * @param {string} currentUserRole - The role of the currently authenticated user (e.g., 'admin', 'nurse').
 * @param {string} currentUserId - The ID of the currently authenticated user.
 */
const NursesList = ({
    nurses,
    onEdit,
    onDelete,
    loading,
    error,
    successMessage,
}) => {

    // المسار الأساسي للخادم، يمكن جعله متغير بيئة لاحقاً
    const API_BASE_URL = 'http://127.0.0.1:8000'; 

    if (loading) {
        return <p className="text-blue-600 text-center mt-4">جاري تحميل الممرضين...</p>;
    }

    if (error) {
        return <p className="text-red-600 text-center mt-4">{error}</p>;
    }

    if (!nurses || nurses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-md text-gray-600" dir="rtl">
                <Info size={48} className="text-blue-500 mb-4" />
                <p className="text-lg font-medium mb-2">لا يوجد ممرضون لعرضهم حاليًا.</p>
                <p className="text-sm">يمكنك إضافة ممرض جديد.</p>
            </div>
        );
    }

    return (
        <div className="p-6 font-sans text-right" dir="rtl">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">قائمة الممرضين</h2>

            {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}

            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
                <table className="min-w-full bg-white border-collapse">
                    <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th className="py-3 px-4 text-right text-gray-600 font-semibold text-sm uppercase tracking-wider">الصورة</th>
                            <th className="py-3 px-4 text-right text-gray-600 font-semibold text-sm uppercase tracking-wider">الاسم</th>
                            <th className="py-3 px-4 text-right text-gray-600 font-semibold text-sm uppercase tracking-wider">البريد الإلكتروني</th>
                            <th className="py-3 px-4 text-right text-gray-600 font-semibold text-sm uppercase tracking-wider">التخصص</th>
                            <th className="py-3 px-4 text-right text-gray-600 font-semibold text-sm uppercase tracking-wider">القسم</th>
                            <th className="py-3 px-4 text-center text-gray-600 font-semibold text-sm uppercase tracking-wider">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {nurses.map((nurse) => (
                            <tr key={nurse.id} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="py-3 px-4 whitespace-nowrap">
                                    <img
                                        // هنا يتم التعديل لإضافة المسار الأساسي
                                        src={nurse.image ? `${API_BASE_URL}${nurse.image}` : `https://placehold.co/50x50/aabbcc/ffffff?text=Nurse`}
                                        alt={nurse.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-300 shadow-sm"
                                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/50x50/aabbcc/ffffff?text=Nurse`; }}
                                    />
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap text-gray-800 font-medium">{nurse.name}</td>
                                <td className="py-3 px-4 whitespace-nowrap text-gray-600 text-sm">{nurse.user?.email || 'N/A'}</td>
                                <td className="py-3 px-4 whitespace-nowrap text-gray-600 text-sm">{nurse.specialty || 'غير محدد'}</td>
                                <td className="py-3 px-4 whitespace-nowrap text-gray-600 text-sm">{nurse.department?.name || 'غير محدد'}</td>
                                <td className="py-3 px-4 text-center whitespace-nowrap">
                                    <div className="flex justify-center items-center space-x-2 space-x-reverse">
                                        {/* زر التعديل: يظهر للمسؤول أو للممرض الذي يعدل بياناته */}
                                        {
                                            <button
                                                onClick={() => onEdit(nurse)}
                                                className="text-blue-600 hover:text-blue-800 transition-colors duration-150 p-2 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                                title="تعديل"
                                            >
                                                <Edit size={20} />
                                            </button>
                                        }
                                        {/* زر الحذف: يظهر فقط للمسؤول */}
                                        {
                                            <button
                                                onClick={() => onDelete(nurse.id)}
                                                className="text-red-600 hover:text-red-800 transition-colors duration-150 p-2 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                                title="حذف"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        }
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NursesList;
