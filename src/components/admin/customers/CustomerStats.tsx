'use client';

import React from 'react';
import { Users, UserPlus, UserCheck, UserX } from 'lucide-react';

interface StatsProps {
  stats: {
    totalCustomers: number;
    activeCustomers: number;
    newCustomersThisMonth: number;
    blockedCustomers: number;
  };
}

export const CustomerStats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Customers</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalCustomers.toLocaleString()}</h3>
          </div>
          <div className="p-3 rounded-lg bg-indigo-100">
            <Users className="w-6 h-6 text-indigo-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Active Now</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.activeCustomers.toLocaleString()}</h3>
          </div>
          <div className="p-3 rounded-lg bg-green-100">
            <UserCheck className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">New (Month)</p>
            <h3 className="text-2xl font-bold text-gray-900">+{stats.newCustomersThisMonth}</h3>
          </div>
          <div className="p-3 rounded-lg bg-blue-100">
            <UserPlus className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Blocked</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.blockedCustomers}</h3>
          </div>
          <div className="p-3 rounded-lg bg-red-100">
            <UserX className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>
    </div>
  );
};
