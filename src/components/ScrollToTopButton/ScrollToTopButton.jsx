import React from 'react';
import { ArrowUp } from 'lucide-react'; // استيراد أيقونة السهم للأعلى

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // للتمرير السلس
    });
  };

  return (
    <div className="fixed bottom-4 left-4 z-40"> {/* تحديد الموقع في أسفل اليسار */}
      <button
        onClick={scrollToTop}
        className="bg-blue-800 text-white p-4 rounded-full shadow-xl hover:bg-blue-900 transition-colors duration-300"
        aria-label="العودة لأعلى الصفحة"
      >
        <ArrowUp size={30} />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
