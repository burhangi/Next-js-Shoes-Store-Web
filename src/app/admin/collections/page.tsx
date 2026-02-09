'use client';

import React, { useState } from 'react';
import { Plus, Search, Trash2, Edit, Tag, Layers, Package } from 'lucide-react';
import Link from 'next/link';

// Mock Data
const MOCK_COLLECTIONS = [
  { id: '1', name: 'Summer 2024', description: 'New summer arrivals', productCount: 45, status: 'active' },
  { id: '2', name: 'Winter Essentials', description: 'Keep warm this winter', productCount: 32, status: 'active' },
  { id: '3', name: 'Flash Sale', description: 'Limited time offers', productCount: 12, status: 'draft' },
];

export default function CollectionsPage() {
  const [collections, setCollections] = useState(MOCK_COLLECTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const filteredCollections = collections.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setCollections(prev => prev.filter(c => c.id !== itemToDelete));
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Collections</h1>
        <Link href="/admin/collections/create" className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E85A28]">
          <Plus className="w-4 h-4" /> New Collection
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="relative max-w-md">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
           <input type="text" placeholder="Search collections..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-[#FF6B35]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCollections.map((collection) => (
          <div key={collection.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-purple-100 rounded-lg"><Layers className="w-6 h-6 text-purple-600" /></div>
              <div className="flex gap-2">
                <Link href={`/admin/collections/${collection.id}/edit`} className="p-1 hover:bg-gray-100 rounded text-blue-500"><Edit className="w-4 h-4" /></Link>
                <button onClick={() => handleDelete(collection.id)} className="p-1 hover:bg-red-50 rounded text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <h3 className="font-bold text-lg mb-1">{collection.name}</h3>
            <p className="text-gray-500 text-sm mb-4">{collection.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Package className="w-4 h-4" /> {collection.productCount} Products
            </div>
          </div>
        ))}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
           <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center">
             <h3 className="font-bold text-lg mb-2">Delete Collection</h3>
             <p className="text-gray-500 mb-6">Are you sure?</p>
             <div className="flex gap-4">
               <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-2 border rounded-lg">Cancel</button>
               <button onClick={confirmDelete} className="flex-1 py-2 bg-red-600 text-white rounded-lg">Delete</button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
