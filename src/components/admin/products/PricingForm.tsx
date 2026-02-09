'use client';

import React from 'react';

interface PricingFormProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const PricingForm: React.FC<PricingFormProps> = ({ data, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price ($)
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={data.price}
          onChange={(e) => onChange('price', parseFloat(e.target.value) || '')}
          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Compare at Price ($)
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={data.compareAtPrice}
          onChange={(e) => onChange('compareAtPrice', parseFloat(e.target.value) || '')}
          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cost per Item ($)
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={data.costPerItem}
          onChange={(e) => onChange('costPerItem', parseFloat(e.target.value) || '')}
          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none"
        />
        <p className="text-xs text-gray-500 mt-1">Customers won't see this</p>
      </div>
    </div>
  );
};
