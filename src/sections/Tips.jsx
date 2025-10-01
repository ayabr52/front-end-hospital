import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { getTips } from '../services/TipService';

export default function Tips() {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const data = await getTips();
        setTips(data);
      } catch (err) {
        setError('فشل في جلب النصائح. يرجى المحاولة مرة أخرى لاحقاً.');
        console.error('Error fetching tips:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow container mx-auto p-4 md:p-8" id="doctors">
          <p className="text-center text-blue-600 text-lg">جاري تحميل النصائح...</p>
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
      <main className="flex-grow container mx-auto p-4 md:p-8" id="tips"> {/* Added id for tips section */}
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8 text-right relative pb-2">
          نصائح
          <span className="absolute bottom-0 right-0 w-16 h-1 bg-blue-600 rounded-full"></span>
        </h2>

        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none text-right"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-lg font-semibold text-gray-800">{tip.title}</span>
                <ChevronDown
                  size={24}
                  className={`text-gray-600 transition-transform duration-300 ${openAccordion === index ? 'rotate-180' : ''
                    }`}
                />
              </button>
              {openAccordion === index && (
                <div
                  className="p-4 text-gray-700 leading-relaxed text-right"
                >
                  <ul className='list-disc ps-5'>
                    {
                      tip.items.map((e) => {
                        return <li key={e.tip_id}>
                          {
                            e.content
                          }
                        </li>
                      })
                    }
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
