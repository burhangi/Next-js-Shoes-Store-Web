'use client';

import React from 'react';

interface InventoryFormProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const InventoryForm: React.FC<InventoryFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SKU (Stock Keeping Unit)
          </label>
          <input
            type="text"
            value={data.sku}
            onChange={(e) => onChange('sku', e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Barcode (ISBN, UPC, GTIN)
          </label>
          <input
            type="text"
            value={data.barcode}
            onChange={(e) => onChange('barcode', e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          id="trackQuantity"
          checked={data.trackQuantity}
          onChange={(e) => onChange('trackQuantity', e.target.checked)}
          className="w-4 h-4 text-[#FF6B35] border-gray-300 rounded focus:ring-[#FF6B35]"
        />
        <label htmlFor="trackQuantity" className="text-sm text-gray-700">Track quantity</label>
      </div>

      {data.trackQuantity && (
        <div className="md:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            min="0"
            value={data.quantity}
            onChange={(e) => onChange('quantity', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none"
          />
        </div>
      )}
    </div>
  );
};
