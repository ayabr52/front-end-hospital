import React from 'react'

export default function ContactUs() {
  return (
    <section id="contact-form" className="container mx-auto p-4 md:p-8 my-12"> {/* New ID for form section */}
      <h2 id='contact' className="text-3xl md:text-4xl font-bold text-blue-800 mb-8 text-right relative pb-2">
        تواصل معنا
        <span className="absolute bottom-0 right-0 w-16 h-1 bg-blue-600 rounded-full"></span>
      </h2>
      <div className="flex flex-col md:flex-row-reverse gap-8">
        {/* Contact Form */}
        <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
          <form className="space-y-6 text-right">
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                الاسم
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right"
                placeholder="ادخل اسمك"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right"
                placeholder="ادخل بريدك الإلكتروني"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                رقم الهاتف
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right"
                placeholder="ادخل رقم هاتفك"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                الرسالة
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 resize-none text-right"
                placeholder="اكتب رسالتك هنا"
              ></textarea>
            </div>
            <div className="text-left"> {/* Button alignment */}
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-300"
              >
                إرسال الرسالة
              </button>
            </div>
          </form>
        </div>

        {/* Map Placeholder */}
        <div className="md:w-1/2">
          <iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d37086.38334473705!2d36.36229371893054!3d34.75548843029116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x1523b7230259da95%3A0x3bd1f10d634e969f!2zUThKSis1OTXYjCDYp9mE2YXYstmK2YbYqdiMINiz2YjYsdmK2Kc!3m2!1d34.780394699999995!2d36.3309717!5e0!3m2!1sar!2snl!4v1753955071075!5m2!1sar!2snl" width="600" height="450"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </section>
  );
}
