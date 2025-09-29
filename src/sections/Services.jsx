import React from 'react'
import {
  Pill, Microscope, Ambulance, Clock, HeartPulse, Search, ChevronDown,
  Facebook, MessageSquareText, Phone, Menu, X, UserPlus, LogIn
} from 'lucide-react';
export default function Services() {
  const services = [
    { name: 'صيدلية', icon: Pill },
    { name: 'تحاليل مخبرية', icon: Microscope },
    { name: 'استقبال حالات اسعافية طارئة', icon: Ambulance },
    { name: 'حملة عيادات مجانية', icon: HeartPulse }, // Corrected icon for this service
    { name: 'خدمات على مدار الساعة', icon: Clock },
  ];

  return (
    <div className="flex flex-col min-h-screen" id="services">
      <main className="flex-grow container mx-auto p-4 md:p-8" > {/* Added id for services section */}
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8 text-right relative pb-2">
          خدماتنا
          <span className="absolute bottom-0 right-0 w-16 h-1 bg-blue-600 rounded-full"></span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-blue-800 text-white rounded-lg p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <service.icon size={64} className="mb-4 text-blue-300" />
              <h3 className="text-xl font-semibold">{service.name}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
