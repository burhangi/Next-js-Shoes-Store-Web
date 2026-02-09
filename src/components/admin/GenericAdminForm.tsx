'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Upload, X } from 'lucide-react';
import Link from 'next/link';

interface GenericFormProps {
  title: string;
  initialData?: any;
  type: 'category' | 'brand' | 'collection';
}

export const GenericAdminForm: React.FC<GenericFormProps> = ({ title, initialData, type }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    status: initialData?.status || 'active',
    image: initialData?.image || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    // Redirect based on type
    router.back();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5 text-gray-500" /></button>
          <h1 className="text-2xl font-bold text-gray-900">{initialData ? `Edit ${title}` : `Create ${title}`}</h1>
        </div>
        <div className="flex gap-3">
           <button type="button" onClick={() => router.back()} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Discard</button>
           <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E85A28] disabled:opacity-50">
             {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
             Save
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35]" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-6 rounded-xl border border-gray-200">
             <label className="block text-sm font-medium text-gray-700 mb-4">Status</label>
             <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
               <option value="active">Active</option>
               <option value="draft">Draft</option>
             </select>
           </div>
           
           <div className="bg-white p-6 rounded-xl border border-gray-200">
             <label className="block text-sm font-medium text-gray-700 mb-4">Image</label>
             <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50">
               <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
               <p className="text-sm text-gray-500">Click to upload image</p>
             </div>
           </div>
        </div>
      </div>
    </form>
  );
};
