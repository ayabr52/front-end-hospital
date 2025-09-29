import React, { useState, useEffect } from 'react';

const DoctorForm = ({ doctor, onSubmit, onCancel, departments = [], errors = {} }) => {
    // تهيئة حالة النموذج ببيانات الطبيب إذا كان الوضع تعديل، وإلا ففارغ
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: doctor?.user?.email || '', // الوصول إلى البريد الإلكتروني من كائن user
        phone: doctor?.user?.phone || '',
        address: doctor?.user?.address || '',
        specialty: doctor?.specialty || '',
        bio: doctor?.bio || '',
        image: doctor?.image || '',
        selectedImageFile: null,
        imageUrlPreview: doctor?.image ? `http://127.0.0.1:8000${doctor.image}` : '', // تم تعديله هنا
        gender: doctor?.user?.gender || '',
        national_id: doctor?.user?.national_id || '',
        dob: doctor?.user?.dob ? doctor.user.dob.split('T')[0] : '',
        department_id: doctor?.department_id || '',
        password: '',
        password_confirmation: '',
    });

    // تأثير لملء بيانات النموذج عندما تتغير خاصية 'doctor' (للتعديل)
    useEffect(() => {
        if (doctor) {
            const nameParts = doctor.name ? doctor.name.split(' ') : ['', ''];
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';

            setFormData({
                first_name: firstName,
                last_name: lastName,
                email: doctor.user?.email || '',
                phone: doctor.user?.phone || '',
                address: doctor.user?.address || '',
                specialty: doctor.specialty || '',
                bio: doctor.bio || '',
                image: doctor.image || '',
                selectedImageFile: null,
                imageUrlPreview: doctor.image ? `http://127.0.0.1:8000${doctor.image}` : '', // تم تعديله هنا
                gender: doctor.user?.gender || '',
                national_id: doctor.user?.national_id || '',
                dob: doctor.user?.dob ? doctor.user.dob.split('T')[0] : '',
                department_id: doctor.department_id || '',
                password: '',
                password_confirmation: '',
            });
        } else {
            // مسح النموذج لطبيب جديد
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                address: '',
                specialty: '',
                bio: '',
                image: '',
                selectedImageFile: null,
                imageUrlPreview: '',
                gender: '',
                national_id: '',
                dob: '',
                department_id: '',
                password: '',
                password_confirmation: '',
            });
        }
    }, [doctor]);

    // دالة لمعالجة التغييرات في حقول الإدخال النصية والاختيار
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    /**
     * معالجة تغيير حقل إدخال الملف.
     * تقوم بتخزين كائن الملف وإنشاء URL معاينة له.
     * @param {Object} e - كائن الحدث.
     */
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    selectedImageFile: file,
                    imageUrlPreview: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setFormData((prevData) => ({
                ...prevData,
                selectedImageFile: null,
                imageUrlPreview: doctor?.image ? `http://127.0.0.1:8000${doctor.image}` : '', // تم تعديله هنا
                image: doctor?.image || '',
            }));
        }
    };

    // دالة لمعالجة إرسال النموذج
    const handleSubmit = (e) => {
        e.preventDefault();

        const combinedName = `${formData.first_name} ${formData.last_name}`.trim();

        const dataToSend = {
            name: combinedName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            specialty: formData.specialty,
            bio: formData.bio,
            gender: formData.gender,
            national_id: formData.national_id,
            dob: formData.dob,
            department_id: formData.department_id,
            image: formData.image,
            selectedImageFile: formData.selectedImageFile,
        };

        if (formData.password) {
            dataToSend.password = formData.password;
            dataToSend.password_confirmation = formData.password_confirmation;
        }

        if (doctor && doctor.id) {
            dataToSend.id = doctor.id;
        }

        onSubmit(dataToSend);
    };

    const isAddingNewDoctor = !doctor || !doctor.id;

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {isAddingNewDoctor ? 'إضافة طبيب جديد' : 'تعديل بيانات الطبيب'}
            </h2>

            {/* الاسم الأول والاسم الأخير */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                        الاسم الأول <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                            errors.name || errors.first_name ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {(errors.name || errors.first_name) && <p className="text-red-500 text-xs mt-1">{errors.name?.[0] || errors.first_name?.[0]}</p>}
                </div>
                <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                        الاسم الأخير <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                            errors.name || errors.last_name ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {(errors.name || errors.last_name) && <p className="text-red-500 text-xs mt-1">{errors.name?.[0] || errors.last_name?.[0]}</p>}
                </div>
            </div>

            {/* البريد الإلكتروني */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    البريد الإلكتروني <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
            </div>

            {/* رقم الهاتف والرقم الوطني */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        رقم الهاتف
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone[0]}</p>}
                </div>
                <div>
                    <label htmlFor="national_id" className="block text-sm font-medium text-gray-700 mb-1">
                        الرقم الوطني
                    </label>
                    <input
                        type="text"
                        id="national_id"
                        name="national_id"
                        value={formData.national_id}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                            errors.national_id ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.national_id && <p className="text-red-500 text-xs mt-1">{errors.national_id[0]}</p>}
                </div>
            </div>

            {/* العنوان وتاريخ الميلاد */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        العنوان
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                            errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address[0]}</p>}
                </div>
                <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                        تاريخ الميلاد
                    </label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                            errors.dob ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob[0]}</p>}
                </div>
            </div>

            {/* الاختصاص والقسم */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
                        الاختصاص <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="specialty"
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                            errors.specialty ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.specialty && <p className="text-red-500 text-xs mt-1">{errors.specialty[0]}</p>}
                </div>
                <div>
                    <label htmlFor="department_id" className="block text-sm font-medium text-gray-700 mb-1">
                        القسم <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="department_id"
                        name="department_id"
                        value={formData.department_id}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                            errors.department_id ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                        <option value="">اختر القسم</option>
                        {departments ? (
                            departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>لا توجد أقسام متاحة</option>
                        )}
                    </select>
                    {errors.department_id && <p className="text-red-500 text-xs mt-1">{errors.department_id[0]}</p>}
                </div>
            </div>

            {/* السيرة الذاتية (Bio) */}
            <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    السيرة الذاتية
                </label>
                <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        errors.bio ? 'border-red-500' : 'border-gray-300'
                    }`}
                ></textarea>
                {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio[0]}</p>}
            </div>

            {/* حقل إدخال ملف الصورة */}
            <div>
                <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-1">
                    الصورة الشخصية
                </label>
                <input
                    type="file"
                    id="imageFile"
                    name="imageFile"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        errors.image ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image[0]}</p>}

                {/* معاينة الصورة */}
                {formData.imageUrlPreview && (
                    <div className="mt-4">
                        <p className="block text-sm font-medium text-gray-700 mb-2">معاينة الصورة:</p>
                        <img
                            src={formData.imageUrlPreview}
                            alt="معاينة الصورة الشخصية"
                            className="w-32 h-32 object-cover rounded-full border border-gray-300 shadow-sm"
                        />
                    </div>
                )}
            </div>

            {/* الجنس */}
            <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                    الجنس <span className="text-red-500">*</span>
                </label>
                <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        errors.gender ? 'border-red-500' : 'border-gray-300'
                    }`}
                >
                    <option value="">اختر الجنس</option>
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender[0]}</p>}
            </div>

            {/* حقول كلمة المرور (مطلوبة فقط للطبيب الجديد) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        كلمة المرور {isAddingNewDoctor && <span className="text-red-500">*</span>}
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required={isAddingNewDoctor}
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
                </div>
                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                        تأكيد كلمة المرور {isAddingNewDoctor && <span className="text-red-500">*</span>}
                    </label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        required={isAddingNewDoctor}
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                            errors.password_confirmation ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation[0]}</p>}
                </div>
            </div>

            {/* أزرار الإجراءات */}
            <div className="flex justify-end space-x-3 space-x-reverse mt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    إلغاء
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    {isAddingNewDoctor ? 'إضافة طبيب' : 'حفظ التعديلات'}
                </button>
            </div>
        </form>
    );
};

export default DoctorForm;
