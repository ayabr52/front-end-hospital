import React from 'react'

export default function PlaceholderSection({ id, title }) {
  return (
  <section id={id} className="container mx-auto p-8 my-12 bg-gray-100 rounded-lg shadow-md text-center">
    <h2 className="text-3xl font-bold text-blue-800 mb-4">{title}</h2>
    <p className="text-gray-700">هذا قسم {title}، يمكن إضافة المحتوى هنا لاحقًا.</p>
  </section>
  )
}
