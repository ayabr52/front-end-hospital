// src/sections/Doctors.jsx
import { Search, CalendarPlus } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import DoctorPublicAppointments from './DoctorPublicAppointments'; // استيراد المكون الجديد
import { getDoctors } from '../services/DoctorService'; // استيراد خدمة الأطباء

export default function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // فئات التخصصات للفلترة (يمكن أن تكون ديناميكية أيضاً إذا كانت الـ API توفرها)
    const filterCategories = ['الكل', 'جلدية', 'جراحة', 'عصبية', 'تخدير', 'داخلية'];

    // حالات البحث والفلترة
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('الكل');
    // حالة جديدة لتخزين الطبيب المختار لعرض مواعيده
    const [selectedDoctorForAppointments, setSelectedDoctorForAppointments] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const data = await getDoctors();
                setDoctors(data);
            } catch (err) {
                setError('فشل في جلب الأطباء. يرجى المحاولة مرة أخرى لاحقاً.');
                console.error('Error fetching doctors:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    // دالة لمعالجة تغيير حقل البحث
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // دالة لمعالجة النقر على زر الفلترة
    const handleFilterClick = (category) => {
        setSelectedSpecialty(category);
    };

    // دالة لمعالجة النقر على بطاقة الطبيب لعرض مواعيده
    const handleViewDoctorAppointments = (doctor) => {
        setSelectedDoctorForAppointments(doctor);
    };

    // دالة للعودة من عرض مواعيد الطبيب إلى قائمة الأطباء
    const handleBackToDoctorsList = () => {
        setSelectedDoctorForAppointments(null);
    };

    // تصفية الأطباء بناءً على البحث والتخصص المحدد
    const filteredDoctors = doctors.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = selectedSpecialty === 'الكل' || doctor.specialty === selectedSpecialty;
        return matchesSearch && matchesSpecialty;
    });

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen">
                <main className="flex-grow container mx-auto p-4 md:p-8" id="doctors">
                    <p className="text-center text-blue-600 text-lg">جاري تحميل الأطباء...</p>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col min-h-screen">
                <main className="flex-grow container mx-auto p-4 md:p-8" id="doctors">
                    <p className="text-center text-red-600 text-lg">{error}</p>
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto p-4 md:p-8" id="doctors">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8 text-right relative pb-2">
                    أطباؤنا
                    <span className="absolute bottom-0 right-0 w-16 h-1 bg-blue-600 rounded-full"></span>
                </h2>

                {/* عرض قائمة الأطباء أو مواعيد الطبيب المختار */}
                {selectedDoctorForAppointments ? (
                    <DoctorPublicAppointments
                        doctor={selectedDoctorForAppointments}
                        onBack={handleBackToDoctorsList}
                    />
                ) : (
                    <>
                        {/* شريط البحث */}
                        <div className="mb-8 flex justify-center">
                            <div className="relative w-full max-w-xl">
                                <input
                                    type="text"
                                    placeholder="ابحث عن اسم الطبيب..."
                                    className="w-full p-3 pr-12 pl-4 rounded-full border-2 border-blue-300 focus:outline-none focus:border-blue-600 text-right"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <Search size={24} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        {/* أزرار الفلترة */}
                        <div className="mb-8 flex flex-wrap justify-center gap-3">
                            {filterCategories.map((category, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleFilterClick(category)}
                                    className={`px-6 py-2 rounded-full transition-colors duration-200 shadow-md ${
                                        selectedSpecialty === category
                                            ? 'bg-blue-800 text-white' // اللون عند التحديد
                                            : 'bg-blue-600 text-white hover:bg-blue-700' // اللون الافتراضي عند عدم التحديد
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* شبكة الأطباء */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredDoctors.length === 0 ? (
                                <p className="col-span-full text-center text-gray-600 text-lg">لا يوجد أطباء مطابقون لنتائج البحث أو الفلترة.</p>
                            ) : (
                                filteredDoctors.map((doctor) => (
                                    <div
                                        key={doctor.id} // استخدام id الخاص بالطبيب من الـ API
                                        onClick={() => handleViewDoctorAppointments(doctor)}
                                        className="relative bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group cursor-pointer"
                                    >
                                        <img
                                            src={doctor.image 
                            ? `http://127.0.0.1:8000${doctor.image}`
                            : 'https://placehold.co/200x200/F3F4F6/6B7280?text=Dr'} // استخدام صورة الطبيب من الـ API أو صورة بديلة
                                            alt={doctor.name}
                                            className="w-full h-48 object-cover object-center"
                                            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/200x200/CCCCCC/FFFFFF?text=${doctor.name}`; }} //fallback image
                                        />
                                        <div className="bg-blue-800 text-white p-4 text-center">
                                            <h3 className="text-xl font-semibold mb-1">{doctor.name}</h3>
                                            <p className="text-sm">{doctor.specialty}</p>
                                        </div>

                                        {/* طبقة المعلومات عند التمرير بالماوس */}
                                        <div className="absolute inset-0 bg-blue-900 bg-opacity-80 text-white flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="text-center">
                                                <h3 className="text-xl font-bold mb-2">{doctor.name}</h3>
                                                <p className="text-lg mb-2">{doctor.specialty}</p>
                                                <p className="text-sm italic">{doctor.bio}</p>
                                                <p className="text-sm mt-2">انقر لعرض المواعيد</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="text-center mt-8">
                            {/* هذا الزر يمكن أن يظل لغرض "عرض المزيد" إذا كانت هناك صفحة منفصلة لذلك */}
                            <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-lg text-lg">
                                عرض الجميع
                            </button>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
