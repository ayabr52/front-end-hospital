// src/admin-sections/Pharmacy/MedicinesList.jsx
import React from 'react';
import { Edit, Trash2 } from 'lucide-react'; // استيراد أيقونات التعديل والحذف

const MedicinesList = ({ medicines, onEdit, onDelete, loading, error, successMessage }) => {
    // إذا كان هناك تحميل، اعرض رسالة التحميل
    if (loading) {
        return <p className="text-center text-blue-600">جاري تحميل الأدوية...</p>;
    }

    // إذا كان هناك خطأ، اعرض رسالة الخطأ
    if (error) {
        return <p className="text-center text-red-600">{error}</p>;
    }

    // إذا لم تكن هناك أدوية، اعرض رسالة مناسبة
    if (!medicines || medicines.length === 0) {
        return <p className="text-center text-gray-600">لا توجد أدوية لعرضها حاليًا.</p>;
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4 font-sans text-right" dir="rtl">
            {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                            الاسم
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            الاسم العلمي
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            الشركة المصنعة
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            الكمية المتوفرة
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            السعر
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            تاريخ الانتهاء
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                            الإجراءات
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {medicines.map((medicine) => (
                        <tr key={medicine.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {medicine.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {medicine.generic_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {medicine.manufacturer}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {medicine.stock_quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {parseFloat(medicine.price).toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(medicine.expiry_date).toLocaleDateString('ar-EG', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => onEdit(medicine)}
                                    className="text-blue-600 hover:text-blue-900 ml-4"
                                    title="تعديل"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => onDelete(medicine.id)}
                                    className="text-red-600 hover:text-red-900"
                                    title="حذف"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MedicinesList;
