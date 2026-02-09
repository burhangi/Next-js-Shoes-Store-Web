// 📦 src/app/admin/orders/returns/page.tsx
'use client';

import React, { useState } from 'react';
import { RefreshCw, DollarSign, Package, AlertCircle, CheckCircle } from 'lucide-react';

interface ReturnItem {
  id: string;
  orderNumber: string;
  customerName: string;
  date: string;
  reason: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'requested' | 'approved' | 'received' | 'refunded' | 'rejected';
  refundType: 'refund' | 'exchange' | 'store_credit';
}

const mockReturnItems: ReturnItem[] = [
  {
    id: '1',
    orderNumber: 'ORD-008',
    customerName: 'Lisa Anderson',
    date: '2024-01-12',
    reason: 'Wrong size',
    items: [{ name: 'Nike Air Max 270', quantity: 1, price: 129.99 }],
    total: 129.99,
    status: 'requested',
    refundType: 'refund'
  },
  {
    id: '2',
    orderNumber: 'ORD-019',
    customerName: 'John Miller',
    date: '2024-01-11',
    reason: 'Damaged item',
    items: [{ name: 'Adidas Ultraboost 23', quantity: 1, price: 189.99 }],
    total: 189.99,
    status: 'approved',
    refundType: 'exchange'
  },
  {
    id: '3',
    orderNumber: 'ORD-020',
    customerName: 'Sarah Johnson',
    date: '2024-01-10',
    reason: 'Changed mind',
    items: [
      { name: 'Puma RS-X', quantity: 1, price: 110.00 },
      { name: 'Nike Metcon 8', quantity: 1, price: 130.00 }
    ],
    total: 240.00,
    status: 'received',
    refundType: 'store_credit'
  },
  {
    id: '4',
    orderNumber: 'ORD-021',
    customerName: 'Mike Wilson',
    date: '2024-01-09',
    reason: 'Not as described',
    items: [{ name: 'Converse Chuck 70', quantity: 1, price: 95.00 }],
    total: 95.00,
    status: 'refunded',
    refundType: 'refund'
  }
];

export default function ReturnsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [returns, setReturns] = useState<ReturnItem[]>(mockReturnItems);

  const filteredReturns = returns.filter(item => {
    const matchesSearch = item.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: ReturnItem['status']) => {
    switch (status) {
      case 'requested': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'received': return 'bg-purple-100 text-purple-800';
      case 'refunded': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRefundTypeColor = (type: ReturnItem['refundType']) => {
    switch (type) {
      case 'refund': return 'bg-red-50 text-red-700 border-red-200';
      case 'exchange': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'store_credit': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleApproveReturn = (id: string) => {
    setReturns(prev => prev.map(item => 
        item.id === id ? { ...item, status: 'approved' } : item
    ));
    alert(`Return ${id} approved. Awaiting item receipt.`);
  };

  const handleRejectReturn = (id: string) => {
    if(confirm('Are you sure you want to reject this return request?')) {
        setReturns(prev => prev.map(item => 
            item.id === id ? { ...item, status: 'rejected' } : item
        ));
    }
  };

  const handleIssueRefund = (id: string) => {
      setReturns(prev => prev.map(item =>
          item.id === id ? { ...item, status: 'refunded' } : item
      ));
      alert('Refund processed successfully.');
  };

  const handleMarkReceived = (id: string) => {
      setReturns(prev => prev.map(item =>
          item.id === id ? { ...item, status: 'received' } : item
      ));
      alert('Return item marked as received.');
  };

  const handleProcessBatch = () => {
      alert('Batch processing started...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Returns & Refunds</h1>
          <p className="text-gray-600">Manage customer returns and refund requests</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleProcessBatch}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Process Batch
          </button>
        </div>
      </div>

      {/* Return Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Returns</p>
              <h3 className="text-2xl font-bold text-gray-900">
                  {returns.filter(r => r.status === 'requested').length}
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-yellow-100">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Refunds</p>
              <h3 className="text-2xl font-bold text-gray-900">
                  ${returns.filter(r => r.status === 'refunded').reduce((acc, curr) => acc + curr.total, 0).toFixed(2)}
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-red-100">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Processing</p>
              <h3 className="text-2xl font-bold text-gray-900">2.5 days</h3>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <RefreshCw className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <h3 className="text-2xl font-bold text-gray-900">
                  {Math.round((returns.filter(r => ['refunded', 'rejected'].includes(r.status)).length / returns.length) * 100)}%
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search returns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white"
            >
              <option value="all">All Status</option>
              <option value="requested">Requested</option>
              <option value="approved">Approved</option>
              <option value="received">Received</option>
              <option value="refunded">Refunded</option>
              <option value="rejected">Rejected</option>
            </select>
            <select className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white">
              <option>All Reasons</option>
              <option>Wrong Size</option>
              <option>Damaged</option>
              <option>Changed Mind</option>
              <option>Not as Described</option>
            </select>
          </div>
        </div>
      </div>

      {/* Returns Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Return #</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Order #</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Customer</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Reason</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Items</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Type</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReturns.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <span className="font-medium text-[#FF6B35]">RTN-{item.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-gray-900">{item.orderNumber}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-900">{item.customerName}</span>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600">{item.reason}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      {item.items.map((product, idx) => (
                        <div key={idx} className="text-sm text-gray-600">
                          {product.quantity} × {product.name}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">${item.total.toFixed(2)}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRefundTypeColor(item.refundType)}`}>
                      {item.refundType.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {item.status === 'requested' && (
                        <>
                          <button
                            onClick={() => handleApproveReturn(item.id)}
                            className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectReturn(item.id)}
                            className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {item.status === 'approved' && (
                        <button 
                            onClick={() => handleMarkReceived(item.id)}
                            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Mark Received
                        </button>
                      )}
                      {item.status === 'received' && (
                        <button 
                            onClick={() => handleIssueRefund(item.id)}
                            className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                          Issue Refund
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredReturns.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No returns found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery 
              ? `No returns match "${searchQuery}"`
              : 'No return requests at the moment'
            }
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E85A28] text-sm font-medium"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}