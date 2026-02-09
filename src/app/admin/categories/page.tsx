'use client';

import React, { useState } from 'react';
import { Plus, Search, Grid, List, FolderOpen, FileText, Trash2, Edit } from 'lucide-react';
import Link from 'next/link';

// Mock Data
const MOCK_CATEGORIES = [
  { id: '1', name: 'Running', slug: 'running', description: 'Running shoes and accessories', productCount: 245, subcategories: 3, status: 'active' },
  { id: '2', name: 'Lifestyle', slug: 'lifestyle', description: 'Casual and everyday wear', productCount: 189, subcategories: 5, status: 'active' },
  { id: '3', name: 'Basketball', slug: 'basketball', description: 'Basketball shoes and gear', productCount: 98, subcategories: 2, status: 'active' },
  { id: '4', name: 'Training', slug: 'training', description: 'Workout and fitness shoes', productCount: 134, subcategories: 2, status: 'active' },
  { id: '5', name: 'Skate', slug: 'skate', description: 'Skateboarding shoes', productCount: 76, subcategories: 1, status: 'active' },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setCategories(prev => prev.filter(c => c.id !== itemToDelete));
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600">Organize your products into categories</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}><Grid className="w-4 h-4 text-gray-600" /></button>
            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}><List className="w-4 h-4 text-gray-600" /></button>
          </div>
          <Link href="/admin/categories/create" className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E85A28] transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" />
            New Category
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search categories..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none text-sm" />
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50"><FolderOpen className="w-6 h-6 text-blue-600" /></div>
                <button onClick={() => handleDelete(category.id)} className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded"><Trash2 className="w-4 h-4" /></button>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{category.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2"><FileText className="w-4 h-4" /><span>{category.productCount} products</span></div>
                <span>{category.subcategories} sub</span>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                <Link href={`/admin/categories/${category.id}/edit`} className="flex-1 text-center py-2 text-sm font-medium text-[#FF6B35] hover:text-[#E85A28]">Edit</Link>
                <Link href={`/products?category=${category.slug}`} className="flex-1 text-center py-2 text-sm font-medium text-gray-700 hover:text-gray-900">View</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
           <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                   <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Name</th>
                   <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Products</th>
                   <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Status</th>
                   <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((cat) => (
                  <tr key={cat.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 flex items-center gap-3"><FolderOpen className="w-4 h-4 text-blue-600" /><span className="font-medium">{cat.name}</span></td>
                    <td className="py-4 px-6 text-sm text-gray-600">{cat.productCount}</td>
                    <td className="py-4 px-6"><span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">{cat.status}</span></td>
                    <td className="py-4 px-6 flex items-center gap-2">
                      <Link href={`/admin/categories/${cat.id}/edit`} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></Link>
                      <button onClick={() => handleDelete(cat.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
           </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4"><Trash2 className="w-6 h-6 text-red-600" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Category</h3>
              <p className="text-gray-600">Are you sure? This action cannot be undone.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}