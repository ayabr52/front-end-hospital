import React, { useState, useEffect } from 'react';
import * as AuthService from '../../services/AuthService'; // استيراد AuthService

const MedicineForm = ({ medicine, onSubmit, onCancel }) => {
    const [currentUserRole, setCurrentUserRole] = useState(null);

    // دالة لتهيئة بيانات النموذج
    const getInitialFormData = (medicineData) => {
        if (medicineData) {
            return {
                id: medicineData.id,
                name: medicineData.name || '',
                generic_name: medicineData.generic_name || '',
                manufacturer: medicineData.manufacturer || '',
                dosage_form: medicineData.dosage_form || '',
                strength: medicineData.strength || '',
                stock_quantity: medicineData.stock_quantity || 0,
                price: medicineData.price || 0.00,
                expiry_date: medicineData.expiry_date || '',
                description: medicineData.description || '',
            };
        }
        return {
            name: '',
            generic_name: '',
            manufacturer: '',
            dosage_form: '',
            strength: '',
            stock_quantity: 0,
            price: 0.00,
            expiry_date: '',
            description: '',
        };
    };

    const [formData, setFormData] = useState(() => getInitialFormData(medicine));

    // useEffect للاستماع إلى تغييرات المصادقة وتحديث الدور
    useEffect(() => {
        const updateAuthInfo = () => {
            const userData = AuthService.getUserData();
            if (userData) {
                setCurrentUserRole(userData.role?.name || null);
            } else {
                setCurrentUserRole(null);
            }
        };

        updateAuthInfo(); // تحديث عند تحميل المكون لأول مرة

        // إضافة مستمع لحدث authChange
        window.addEventListener('authChange', updateAuthInfo);

        // إزالة المستمع عند إلغاء تحميل المكون
        return () => {
            window.removeEventListener('authChange', updateAuthInfo);
        };
    }, []);

    // تحديث formData عندما يتغير medicine prop (في حالة التعديل)
    useEffect(() => {
        setFormData(getInitialFormData(medicine));
    }, [medicine]);


    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? parseFloat(value) : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    // دالة للتحقق مما إذا كان المستخدم لديه صلاحية التعديل/الحفظ
    const canManageMedicines = currentUserRole === 'admin' || currentUserRole === 'pharmacist';

    // تحديد ما إذا كان الحقل معطلاً بناءً على الدور
    const isDisabled = (field) => {
        // إذا لم يكن لديه صلاحية الإدارة، فكل الحقول معطلة
        if (!canManageMedicines) {
            return true;
        }
        // إذا كان لديه صلاحية، فلا يتم تعطيل الحقول
        return false;
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto my-8 font-sans text-right" dir="rtl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                {medicine ? 'تعديل بيانات الدواء' : 'إضافة دواء جديد'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        الاسم:
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        disabled={isDisabled('name')}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="generic_name">
                        الاسم العلمي:
                    </label>
                    <input
                        type="text"
                        name="generic_name"
                        id="generic_name"
                        value={formData.generic_name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        disabled={isDisabled('generic_name')}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="manufacturer">
                        الشركة المصنعة:
                    </label>
                    <input
                        type="text"
                        name="manufacturer"
                        id="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        disabled={isDisabled('manufacturer')}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dosage_form">
                        شكل الجرعة:
                    </label>
                    <input
                        type="text"
                        name="dosage_form"
                        id="dosage_form"
                        value={formData.dosage_form}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        disabled={isDisabled('dosage_form')}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="strength">
                        القوة:
                    </label>
                    <input
                        type="text"
                        name="strength"
                        id="strength"
                        value={formData.strength}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        disabled={isDisabled('strength')}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock_quantity">
                        الكمية المتوفرة:
                    </label>
                    <input
                        type="number"
                        name="stock_quantity"
                        id="stock_quantity"
                        value={formData.stock_quantity}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        disabled={isDisabled('stock_quantity')}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        السعر:
                    </label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        step="0.01"
                        required
                        disabled={isDisabled('price')}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiry_date">
                        تاريخ الانتهاء:
                    </label>
                    <input
                        type="date"
                        name="expiry_date"
                        id="expiry_date"
                        value={formData.expiry_date}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        disabled={isDisabled('expiry_date')}
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        الوصف:
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        disabled={isDisabled('description')}
                    ></textarea>
                </div>
                <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                        disabled={!canManageMedicines} // تم التعديل هنا
                    >
                        {medicine ? 'تحديث' : 'إضافة'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                    >
                        إلغاء
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MedicineForm;
