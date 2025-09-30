// src/sections/Departments.jsx
import React, { useState, useEffect } from 'react';
import { getDepartments } from '../services/DepartmentService'; // استيراد خدمة الأقسام

export default function Departments() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await getDepartments();
                setDepartments(data);
            } catch (err) {
                setError('فشل في جلب الأقسام. يرجى المحاولة مرة أخرى لاحقاً.');
                console.error('Error fetching departments:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    if (loading) {
        return (
            <section id="departments" className="container mx-auto p-4 md:p-8 my-12 text-center">
                <p className="text-blue-600 text-lg">جاري تحميل الأقسام...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section id="departments" className="container mx-auto p-4 md:p-8 my-12 text-center">
                <p className="text-red-600 text-lg">{error}</p>
            </section>
        );
    }

    return (
        <section id="departments" className="container mx-auto p-4 md:p-8 my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8 text-right relative pb-2">
                أقسامنا
                <span className="absolute bottom-0 right-0 w-16 h-1 bg-blue-600 rounded-full"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {departments.length === 0 ? (
                    <p className="col-span-full text-center text-gray-600 text-lg">لا توجد أقسام لعرضها حالياً.</p>
                ) : (
                    departments.map((dept) =>{                        
                        return  <div
                        key={dept.id} // استخدام id الخاص بالقسم من الـ API
                        className="bg-blue-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col items-center p-4"
                    >
                        <div className="wrapper-icon h-20 w-20 rounded-full overflow-hidden">
                            <img
                                src={dept.image || `https://placehold.co/400x250/0000FF/FFFFFF?text=${dept.name}`} // استخدام صورة القسم من الـ API أو صورة بديلة
                                alt={dept.name}
                                className="object-cover w-full h-full object-center"
                                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x250/0000FF/FFFFFF?text=${dept.name}`; }} //fallback image
                            />
                        </div>
                        <div className=" text-white p-4 text-center">
                            <h3 className="text-xl font-semibold">{dept.name}</h3>
                        </div>
                    </div>
                    })
                )}
            </div>
        </section>
    );
}
