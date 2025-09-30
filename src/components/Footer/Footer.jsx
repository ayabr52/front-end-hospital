import { Facebook, Phone, MessageSquareText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white" id="contact">
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-right" dir="rtl">
          
          {/* ✅ القسم : الأقسام */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-white pb-2 inline-block">الأقسام</h4>
            <ul className="space-y-2 text-sm">
              <li>العناية المركزة</li>
              <li>قسم الجراحة</li>
              <li>قسم الأطفال</li>
              <li>الصيدلية</li>
            </ul>
          </div>

          {/* ✅ القسم : خدماتنا */}
          <div className='mx-auto'>
            <h4 className="text-lg font-semibold mb-4 border-b border-white pb-2 inline-block">خدماتنا</h4>
            <ul className="space-y-2 text-sm">
              <li>تحاليل مخبرية</li>
              <li>خدمات على مدار الساعة</li>
            </ul>
          </div>

          {/* ✅ القسم : التواصل */}
          <div className='mx-auto'>
            <h4 className="text-lg font-semibold mb-4 border-b border-white pb-2 inline-block">التواصل</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Facebook size={18} className="text-white" />
                <span>فيسبوك</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquareText size={18} className="text-white" />
                <span>واتساب</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-white" />
                <span dir="ltr">031-2081</span>
              </li>
              <li className="text-sm mt-2">اتصال مباشر بأي وقت</li>
            </ul>
          </div>

          {/* ✅ الشعار واسم المشفى */}
          <div className="flex flex-col items-end md:items-start mx-auto">
            <img
              src="https://farzathpu.com/wp-content/uploads/2025/03/photo_2025-03-23_21-11-11-removebg-preview.png"
              alt="Logo"
              className="h-16 w-auto"
            />
            <p className="text-sm leading-tight text-right">
              <span className="font-semibold">مستشفى الدكتور<br />فرزات أيوب الجامعي</span>
            </p>
          </div>
        </div>

        {/* حقوق النشر */}
        <div className="border-t border-white mt-8 pt-6 text-center text-sm">
          جميع الحقوق محفوظة © 2025 مستشفى الدكتور فرزات أيوب الجامعي
        </div>
      </div>
    </footer>
  );
}