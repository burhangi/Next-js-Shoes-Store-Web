// 📦 src/components/admin/dashboard/RevenueChart.tsx
'use client';

import React from 'react';

export const RevenueChart: React.FC = () => {
  const data = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 8000 },
    { month: 'May', revenue: 7500 },
    { month: 'Jun', revenue: 9000 },
    { month: 'Jul', revenue: 12000 },
    { month: 'Aug', revenue: 11000 },
    { month: 'Sep', revenue: 14000 },
    { month: 'Oct', revenue: 13000 },
    { month: 'Nov', revenue: 16000 },
    { month: 'Dec', revenue: 18000 },
  ];

  const maxRevenue = Math.max(...data.map(d => d.revenue));

  return (
    <div className="relative">
      <div className="flex items-end justify-between h-64">
        {data.map((item, index) => {
          const height = (item.revenue / maxRevenue) * 100;
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-8 bg-gradient-to-t from-[#FF6B35] to-[#FF6B35]/70 rounded-t-lg transition-all duration-300 hover:opacity-80"
                style={{ height: `${height}%` }}
              />
              <span className="mt-2 text-xs text-gray-600">{item.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};