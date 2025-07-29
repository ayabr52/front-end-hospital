import React from 'react'

export default function About() {
  return (
    <section id="about" className="container mx-auto p-4 md:p-8 my-12">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8 text-right relative pb-2">
        حول
        <span className="absolute bottom-0 right-0 w-16 h-1 bg-blue-600 rounded-full"></span>
      </h2>
      <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-8">
        <div className="md:w-1/2">
          {/*  */}
          <img
            src="https://placehold.co/600x400/0000FF/FFFFFF?text=Hospital+Building"
            alt="Hospital Building"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 text-right">
          <p className="text-lg text-gray-700 leading-relaxed">
            افتتح مستشفى الدكتور فرزات أيوب بجامعة الحواش الخاصة في منطقة وادي النضارة بريف حمص الغربي عام 2020 وتم تسليمه إلى كلية الطب البشري في الجامعة ليصبح مستشفى تعليميًا لطلاب كلية الطب ويقدم خدماته الطبية والعلاجية للمواطنين بطاقة استيعابية تبلغ 110 أسرة ويضم عيادات خارجية بكل الاختصاصات الطبية.
          </p>
        </div>
      </div>
    </section>
  );
}
