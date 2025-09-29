import React from 'react';
import { Edit, Trash2, Info } from 'lucide-react';

// استقبل 'departments' كـ prop لتمكين عرض اسم القسم
const DoctorsList = ({ doctors, onEdit, onDelete, departments = [] }) => {
    if (!doctors || doctors.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-md text-gray-600">
                <Info size={48} className="text-blue-500 mb-4" />
                <p className="text-lg font-medium mb-2">لا يوجد أطباء لعرضهم حاليًا.</p>
                <p className="text-sm">يمكنك إضافة طبيب جديد باستخدام زر "إضافة طبيب" أعلاه.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
            <table className="min-w-full bg-white border-collapse">
                <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                        <th className="py-3 px-4 text-right text-gray-600 font-semibold text-sm uppercase tracking-wider">
                            الصورة
                        </th>
                        <th className="py-3 px-4 text-right text-gray-600 font-semibold text-sm uppercase tracking-wider">
                            الاسم
                        </th>
                        <th className="py-3 px-4 text-right text-gray-600 font-semibold text-sm uppercase tracking-wider">
                            البريد الإلكتروني
                        </th>
                        <th className="py-3 px-4 text-right text-gray-600 font-semibold text-sm uppercase tracking-wider">
                            القسم
                        </th>
                        <th className="py-3 px-4 text-right text-gray-600 font-semibold text-sm uppercase tracking-wider">
                            الاختصاص
                        </th>
                        <th className="py-3 px-4 text-center text-gray-600 font-semibold text-sm uppercase tracking-wider">
                            الإجراءات
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {doctors.map((doctor) => {
                        // البحث عن اسم القسم باستخدام department_id
                        const departmentName = departments.find(
                            (dept) => dept.id === doctor.department_id
                        )?.name || 'غير محدد';

                        // بناء المسار الكامل للصورة
                        const imageUrl = doctor.image 
                            ? `http://127.0.0.1:8000${doctor.image}`
                            : 'https://placehold.co/50x50/F3F4F6/6B7280?text=Dr';

                        return (
                            <tr key={doctor.id} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="py-3 px-4 whitespace-nowrap">
                                    {/*
                                        هنا يتم جلب الصورة:
                                        - 'doctor.image' هو الرابط الذي يأتي من الـ API.
                                        - إذا كان 'doctor.image' فارغًا أو غير موجود، يتم استخدام صورة placeholder.
                                        - 'onError' يتعامل مع حالات فشل تحميل الصورة من الـ API.
                                    */}
                                    <img
                                        src={imageUrl} // هذا هو المكان الذي يتم فيه استخدام رابط الصورة من الـ API
                                        alt={`صورة ${doctor.name}`}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-300 shadow-sm"
                                        onError={(e) => {
                                            e.target.onerror = null; // يمنع حلقة لا نهائية في حالة فشل fallback
                                            e.target.src = 'https://placehold.co/50x50/F3F4F6/6B7280?text=Dr'; // صورة بديلة عند الفشل
                                        }}
                                    />
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap text-gray-800 font-medium">
                                    {doctor.name}
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap text-gray-600 text-sm">
                                    {doctor.user?.email || 'N/A'} {/* الوصول إلى البريد الإلكتروني من كائن user */}
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap text-gray-600 text-sm">
                                    {departmentName}
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap text-gray-600 text-sm">
                                    {doctor.specialty || 'غير محدد'}
                                </td>
                                <td className="py-3 px-4 text-center whitespace-nowrap">
                                    <div className="flex justify-center items-center space-x-2 space-x-reverse">
                                        <button
                                            onClick={() => onEdit(doctor)}
                                            className="text-blue-600 hover:text-blue-800 transition-colors duration-150 p-2 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                            title="تعديل"
                                        >
                                            <Edit size={20} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(doctor.id)}
                                            className="text-red-600 hover:text-red-800 transition-colors duration-150 p-2 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                            title="حذف"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DoctorsList;
