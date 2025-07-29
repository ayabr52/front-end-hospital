import React from 'react'

export default function Departments() {
  const departments = [
    { name: 'قسم العناية المركزة', image: 'https://placehold.co/400x250/0000FF/FFFFFF?text=ICU' },
    { name: 'قسم النسائية والولادة', image: 'https://placehold.co/400x250/0000FF/FFFFFF?text=Maternity' },
    { name: 'قسم العمليات الجراحية', image: 'https://placehold.co/400x250/0000FF/FFFFFF?text=Surgery' },
    { name: 'القسطرة وجراحة القلب', image: 'https://placehold.co/400x250/0000FF/FFFFFF?text=Cardiology' },
    // Add more departments as needed based on your content
  ];

  return (
    <section id="departments" className="container mx-auto p-4 md:p-8 my-12">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8 text-right relative pb-2">
        أقسامنا
        <span className="absolute bottom-0 right-0 w-16 h-1 bg-blue-600 rounded-full"></span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.map((dept, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={dept.image}
              alt={dept.name}
              className="w-full h-48 object-cover object-center"
            />
            <div className="bg-blue-800 text-white p-4 text-center">
              <h3 className="text-xl font-semibold">{dept.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
