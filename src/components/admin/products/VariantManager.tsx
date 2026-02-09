'use client';

import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Variant {
  id: string;
  option1: string; // Size
  option2: string; // Color
  price: number;
  stock: number;
}

interface VariantManagerProps {
  variants: Variant[];
  onChange: (variants: Variant[]) => void;
}

export const VariantManager: React.FC<VariantManagerProps> = ({ variants, onChange }) => {
  // Simple variant generation logic for creating UI
  const addVariant = () => {
    const newVariant: Variant = {
      id: Math.random().toString(36).substr(2, 9),
      option1: '',
      option2: '',
      price: 0,
      stock: 0
    };
    onChange([...variants, newVariant]);
  };

  const updateVariant = (index: number, field: keyof Variant, value: any) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    onChange(newVariants);
  };

  const removeVariant = (index: number) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    onChange(newVariants);
  };

  return (
    <div className="space-y-4">
      {variants.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Size</th>
                <th className="px-3 py-2 text-left font-medium">Color</th>
                <th className="px-3 py-2 text-left font-medium">Price</th>
                <th className="px-3 py-2 text-left font-medium">Stock</th>
                <th className="px-3 py-2 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {variants.map((variant, idx) => (
                <tr key={variant.id || idx}>
                  <td className="p-2">
                    <input
                      type="text"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded"
                      placeholder="e.g. 42"
                      value={variant.option1}
                      onChange={(e) => updateVariant(idx, 'option1', e.target.value)}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded"
                      placeholder="e.g. Red"
                      value={variant.option2}
                      onChange={(e) => updateVariant(idx, 'option2', e.target.value)}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded"
                      placeholder="0.00"
                      value={variant.price}
                      onChange={(e) => updateVariant(idx, 'price', e.target.value)}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded"
                      placeholder="0"
                      value={variant.stock}
                      onChange={(e) => updateVariant(idx, 'stock', e.target.value)}
                    />
                  </td>
                  <td className="p-2">
                    <button
                      type="button"
                      onClick={() => removeVariant(idx)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        type="button"
        onClick={addVariant}
        className="flex items-center gap-2 text-sm font-medium text-[#FF6B35] hover:text-[#E85A28]"
      >
        <Plus className="w-4 h-4" />
        Add Variant
      </button>
    </div>
  );
};
