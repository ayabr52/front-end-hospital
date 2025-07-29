// src/admin-sections/Overview/OverviewContent.jsx
import React from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line
} from 'recharts';

// بيانات وهمية للمخططات
const patientsData = [
  { name: 'يناير', 'مرضى جدد': 400, 'إجمالي المرضى': 2400 },
  { name: 'فبراير', 'مرضى جدد': 300, 'إجمالي المرضى': 2210 },
  { name: 'مارس', 'مرضى جدد': 200, 'إجمالي المرضى': 2290 },
  { name: 'أبريل', 'مرضى جدد': 278, 'إجمالي المرضى': 2000 },
  { name: 'مايو', 'مرضى جدد': 189, 'إجمالي المرضى': 2181 },
  { name: 'يونيو', 'مرضى جدد': 239, 'إجمالي المرضى': 2500 },
  { name: 'يوليو', 'مرضى جدد': 349, 'إجمالي المرضى': 2100 },
];

const occupancyData = [
  { name: 'النسائية', 'نسبة الإشغال': 75 },
  { name: 'القلبية', 'نسبة الإشغال': 90 },
  { name: 'الأطفال', 'نسبة الإشغال': 60 },
  { name: 'العناية المركزة', 'نسبة الإشغال': 95 },
  { name: 'الجراحة', 'نسبة الإشغال': 80 },
];

const OverviewContent = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-right">الرئيسية</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Bar Chart - New vs Total Patients */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner h-80 flex flex-col items-center justify-center">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">المرضى الجدد وإجمالي المرضى (شهرياً)</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={patientsData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="مرضى جدد" fill="#8884d8" name="مرضى جدد" radius={[10, 10, 0, 0]} />
              <Bar dataKey="إجمالي المرضى" fill="#82ca9d" name="إجمالي المرضى" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: Line Chart - Department Occupancy Rate */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner h-80 flex flex-col items-center justify-center">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">نسبة إشغال الأقسام (%)</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={occupancyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="نسبة الإشغال" stroke="#ffc658" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;
