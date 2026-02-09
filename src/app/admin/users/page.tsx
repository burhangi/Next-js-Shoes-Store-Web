// 📦 src/app/admin/users/page.tsx - Admin User Management
'use client';

import React, { useState, useMemo } from 'react';
import { Users, Plus, Search, X } from 'lucide-react';
import { adminUsers, AdminUser, currentAdminUser } from '@/lib/data/admin';
import { AdminUserCard, AdminUserFilters } from '@/components/admin/users';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils/cn';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(adminUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<{
    role?: AdminUser['role'];
    status?: AdminUser['status'];
  }>({});

  const filteredUsers = useMemo(() => {
    let filtered = [...users];

    if (filters.role) {
      filtered = filtered.filter(u => u.role === filters.role);
    }

    if (filters.status) {
      filtered = filtered.filter(u => u.status === filters.status);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        u =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query) ||
          u.role.toLowerCase().includes(query) ||
          u.department?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [users, filters, searchQuery]);

  const handleEdit = (user: AdminUser) => {
    alert(`Edit user: ${user.name}`);
  };

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  const handleSuspend = (userId: string) => {
    if (confirm('Are you sure you want to suspend this user?')) {
      setUsers(prev =>
        prev.map(u =>
          u.id === userId ? { ...u, status: 'suspended' as const } : u
        )
      );
    }
  };

  const handleCreateUser = () => {
    alert('Create new admin user');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-7 h-7 text-primary" />
            Admin Users
          </h1>
          <p className="text-gray-600 mt-1">
            Manage admin users and their permissions
          </p>
        </div>
        <Button
          onClick={handleCreateUser}
          className="bg-primary hover:bg-primary-dark text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search users by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              showFilters && "bg-primary text-white border-primary"
            )}
          >
            Filters
          </Button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="animate-fade-in">
          <AdminUserFilters
            filters={filters}
            onFilterChange={setFilters}
            totalCount={users.length}
          />
        </div>
      )}

      {/* Users Grid */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {filteredUsers.length} User{filteredUsers.length !== 1 ? 's' : ''}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <AdminUserCard
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSuspend={handleSuspend}
              currentUserId={currentAdminUser.id}
            />
          ))}
        </div>
        {filteredUsers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No users found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
