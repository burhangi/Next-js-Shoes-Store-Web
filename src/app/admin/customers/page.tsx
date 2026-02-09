'use client';

import React, { useState, useMemo } from 'react';
import { Download, Plus, Upload } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CustomerStats } from '@/components/admin/customers/CustomerStats';
import { CustomerFilters } from '@/components/admin/customers/CustomerFilters';
import { CustomerTable, CustomerTableRow } from '@/components/admin/customers/CustomerTable';

// Mock data
const mockCustomers: CustomerTableRow[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    status: 'active',
    totalSpent: 1250.50,
    ordersCount: 15,
    lastOrderDate: '2024-01-28',
    joinDate: '2023-01-15',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    status: 'active',
    totalSpent: 3450.00,
    ordersCount: 28,
    lastOrderDate: '2024-01-29',
    joinDate: '2022-11-20',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    status: 'inactive',
    totalSpent: 450.25,
    ordersCount: 3,
    lastOrderDate: '2023-12-10',
    joinDate: '2023-06-05',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.w@example.com',
    phone: '+1 (555) 456-7890',
    status: 'blocked',
    totalSpent: 0,
    ordersCount: 0,
    lastOrderDate: '-',
    joinDate: '2024-01-10',
  },
  {
    id: '5',
    name: 'David Lee',
    email: 'david.lee@example.com',
    status: 'active',
    totalSpent: 890.75,
    ordersCount: 8,
    lastOrderDate: '2024-01-25',
    joinDate: '2023-03-12',
  }
];

export default function CustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<CustomerTableRow[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Stats calculation
  const stats = useMemo(() => {
    return {
      totalCustomers: customers.length,
      activeCustomers: customers.filter(c => c.status === 'active').length,
      newCustomersThisMonth: customers.filter(c => {
         const joinDate = new Date(c.joinDate);
         const now = new Date();
         return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
      }).length,
      blockedCustomers: customers.filter(c => c.status === 'blocked').length
    };
  }, [customers]);

  // Filtering and Sorting
  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    // Filter by search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(lowerQuery) ||
        c.email.toLowerCase().includes(lowerQuery) ||
        (c.phone && c.phone.includes(lowerQuery))
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(c => c.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
        case 'oldest':
          return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
        case 'highest_spent':
          return b.totalSpent - a.totalSpent;
        case 'most_orders':
          return b.ordersCount - a.ordersCount;
        default:
          return 0;
      }
    });

    return result;
  }, [customers, searchQuery, statusFilter, sortBy]);

  // Handlers
  const handleView = (id: string) => {
    router.push(`/admin/customers/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/customers/edit?id=${id}`); // Or create a dedicated edit page like [id]/edit
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      setCustomers(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleStatusChange = (id: string, newStatus: 'active' | 'inactive' | 'blocked') => {
    const action = newStatus === 'blocked' ? 'block' : 'unblock';
    if (window.confirm(`Are you sure you want to ${action} this customer?`)) {
        setCustomers(prev => prev.map(c => 
            c.id === id ? { ...c, status: newStatus } : c
        ));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage your customer base and view insights</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
            <Download className="w-4 h-4" />
            Export
          </button>
          <Link
            href="/admin/customers/create"
            className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E85A28] transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Customer
          </Link>
        </div>
      </div>

      {/* Stats */}
      <CustomerStats stats={stats} />

      {/* Filters */}
      <CustomerFilters 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <CustomerTable 
          customers={filteredCustomers}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
        
        {/* Pagination (Static for now) */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {filteredCustomers.length} of {customers.length} customers
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 bg-[#FF6B35] text-white rounded-lg text-sm">
              1
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
