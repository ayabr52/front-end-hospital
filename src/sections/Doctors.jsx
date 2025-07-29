import { Search, CalendarPlus } from 'lucide-react';
import React, { useState } from 'react';
import DoctorPublicAppointments from './DoctorPublicAppointments'; // استيراد المكون الجديد

export default function Doctors() {
  // بيانات الأطباء
  const doctors = [
    { name: 'جهاد موصلي', specialty: 'جراحة', image: 'https://placehold.co/200x200/CCCCCC/FFFFFF?text=Doctor+1', bio: 'طبيب جراح ذو خبرة واسعة في العمليات المعقدة.' },
    { name: 'لما قيسون', specialty: 'جراحة', image: 'https://placehold.co/200x200/CCCCCC/FFFFFF?text=Doctor+2', bio: 'متخصصة في جراحة الأطفال والجراحة العامة.' },
    { name: 'أغيد السلام', specialty: 'داخلية', image: 'https://placehold.co/200x200/CCCCCC/FFFFFF?text=Doctor+3', bio: 'استشاري أمراض باطنية، متخصص في أمراض الجهاز الهضمي.' },
    { name: 'حازم إمام', specialty: 'جراحة', image: 'https://placehold.co/200x200/CCCCCC/FFFFFF?text=Doctor+4', bio: 'جراح تجميل وترميم، حاصل على عدة جوائز.' },
    { name: 'كمال الجميل', specialty: 'داخلية', image: 'https://placehold.co/200x200/CCCCCC/FFFFFF?text=Doctor+5', bio: 'طبيب عام، يقدم استشارات شاملة ورعاية أولية.' },
    { name: 'أيهم شومان', specialty: 'جراحة', image: 'https://placehold.co/200x200/CCCCCC/FFFFFF?text=Doctor+6', bio: 'جراح أعصاب، متخصص في جراحة الدماغ والعمود الفقري.' },
    { name: 'فاطمة الزهراء', specialty: 'جلدية', image: 'https://placehold.co/200x200/CCCCCC/FFFFFF?text=Doctor+7', bio: 'أخصائية جلدية وتجميل، تهتم بصحة البشرة.' },
    { name: 'يوسف العبدالله', specialty: 'عصبية', image: 'https://placehold.co/200x200/CCCCCC/FFFFFF?text=Doctor+8', bio: 'أخصائي أمراض عصبية، يعالج الصداع النصفي والصرع.' },
    { name: 'نور الهدى', specialty: 'تخدير', image: 'https://placehold.co/200x200/CCCCCC/FFFFFF?text=Doctor+9', bio: 'طبيبة تخدير ذات خبرة في التخدير العام والنصفي.' },
  ];

  // فئات التخصصات للفلترة
  const filterCategories = ['الكل', 'جلدية', 'جراحة', 'عصبية', 'تخدير', 'داخلية'];

  // حالات البحث والفلترة
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('الكل');
  // حالة جديدة لتخزين الطبيب المختار لعرض مواعيده
  const [selectedDoctorForAppointments, setSelectedDoctorForAppointments] = useState(null);

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
                filteredDoctors.map((doctor, index) => (
                  <div
                    key={index}
                    // تغيير العنصر ليصبح زرًا أو div قابلًا للنقر
                    onClick={() => handleViewDoctorAppointments(doctor)}
                    className="relative bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group cursor-pointer" // أضف 'cursor-pointer'
                  >
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-48 object-cover object-center"
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
                        <p className="text-sm mt-2">انقر لعرض المواعيد</p> {/* إضافة نص إرشادي */}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="text-center mt-8">
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
