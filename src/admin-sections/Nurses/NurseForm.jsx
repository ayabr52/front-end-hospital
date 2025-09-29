// src/components/NurseForm.jsx
import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const getInitialFormData = (nurseData) => {
    if (nurseData) {
        return {
            id: nurseData.id,
            name: nurseData.name || '',
            email: nurseData.user?.email || '',
            password: '',
            password_confirmation: '',
            phone: nurseData.user?.phone || '',
            national_id: nurseData.national_id || '',
            address: nurseData.user?.address || '',
            dob: nurseData.user?.dob ? new Date(nurseData.user.dob).toISOString().split('T')[0] : '',
            gender: nurseData.gender || '',
            specialty: nurseData.specialty || '',
            bio: nurseData.bio || '',
            image: nurseData.image || '', // رابط الصورة الحالي
            department_id: nurseData.department_id || '',
        };
    }
    return {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        national_id: '',
        address: '',
        dob: '',
        gender: '',
        specialty: '',
        bio: '',
        image: '',
        department_id: '',
    };
};

const NurseForm = ({ nurse, onSubmit, onCancel, departments = [], errors = {} }) => {
    const [formData, setFormData] = useState(() => getInitialFormData(nurse));
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        setFormData(getInitialFormData(nurse));
        setImageFile(null);
    }, [nurse]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files && files[0]) {
            const file = files[0];
            setImageFile(file);
            const imageUrl = URL.createObjectURL(file);
            setFormData({ ...formData, image: imageUrl });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData, imageFile);
    };

    const getErrorMessage = (field) => {
        if (errors[field] && errors[field].length > 0) {
            return <p className="text-red-500 text-xs mt-1">{errors[field][0]}</p>;
        }
        return null;
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto my-8 font-sans text-right" dir="rtl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                {nurse ? 'تعديل بيانات الممرض' : 'إضافة ممرض جديد'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">الاسم:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    {getErrorMessage('name')}
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">البريد الإلكتروني:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required={!nurse}
                    />
                    {getErrorMessage('email')}
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">كلمة المرور:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required={!nurse}
                    />
                    {getErrorMessage('password')}
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password_confirmation">تأكيد كلمة المرور:</label>
                    <input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required={!nurse}
                    />
                    {getErrorMessage('password_confirmation')}
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">الهاتف:</label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {getErrorMessage('phone')}
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="national_id">الرقم الوطني:</label>
                    <input
                        type="text"
                        name="national_id"
                        id="national_id"
                        value={formData.national_id}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {getErrorMessage('national_id')}
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">العنوان:</label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {getErrorMessage('address')}
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">تاريخ الميلاد:</label>
                    <input
                        type="date"
                        name="dob"
                        id="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {getErrorMessage('dob')}
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">الجنس:</label>
                    <select
                        name="gender"
                        id="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">اختر</option>
                        <option value="male">ذكر</option>
                        <option value="female">أنثى</option>
                    </select>
                    {getErrorMessage('gender')}
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialty">التخصص:</label>
                    <input
                        type="text"
                        name="specialty"
                        id="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {getErrorMessage('specialty')}
                </div>
                <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">السيرة الذاتية:</label>
                    <textarea
                        name="bio"
                        id="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows="3"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                    {getErrorMessage('bio')}
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">الصورة:</label>
                    <div className="flex items-center gap-4">
                        {formData.image ? (
                            <img
                                src={formData.image}
                                alt="Nurse"
                                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                            />
                        ) : (
                            <FaUserCircle className="w-24 h-24 text-gray-400" />
                        )}
                        <input
                            type="file"
                            name="image"
                            id="image"
                            onChange={handleChange}
                            className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                        />
                    </div>
                    {getErrorMessage('image')}
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department_id">القسم:</label>
                    <select
                        name="department_id"
                        id="department_id"
                        value={formData.department_id}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">اختر قسم</option>
                        {departments.map(dept => (
                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))}
                    </select>
                    {getErrorMessage('department_id')}
                </div>
                <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                    >
                        {nurse ? 'تحديث' : 'إضافة'}
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

export default NurseForm;
