// 📦src/components/layout/footer/PaymentIcons.tsx - UPDATED
"use client";

import React from 'react';

export const PaymentIcons: React.FC = () => {
  const paymentMethods = [
    { name: 'Visa', icon: 'VISA' },
    { name: 'Mastercard', icon: 'MC' },
    { name: 'Amex', icon: 'AMEX' },
    { name: 'PayPal', icon: 'PP' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {paymentMethods.map((method) => (
        <div
          key={method.name}
          className="px-2 py-1.5 bg-white/10 rounded text-xs text-gray-300"
          title={method.name}
        >
          {method.icon}
        </div>
      ))}
    </div>
  );
};