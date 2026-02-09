// 📦 src/components/admin/orders/RefundDialog.tsx
'use client';

import React, { useState } from 'react';
import { X, DollarSign, AlertCircle, CheckCircle, CreditCard, RefreshCw } from 'lucide-react';

interface RefundDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: {
    amount: number;
    reason: string;
    refundTo: 'original' | 'store_credit';
    notes: string;
  }) => void;
  orderNumber: string;
  customerName: string;
  orderTotal: number;
  maxRefund: number;
}

export const RefundDialog: React.FC<RefundDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  orderNumber,
  customerName,
  orderTotal,
  maxRefund
}) => {
  const [amount, setAmount] = useState(maxRefund.toString());
  const [reason, setReason] = useState('');
  const [refundTo, setRefundTo] = useState<'original' | 'store_credit'>('original');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const refundAmount = parseFloat(amount);
      if (refundAmount > maxRefund || refundAmount <= 0) {
        alert('Invalid refund amount');
        return;
      }

      await onConfirm({
        amount: refundAmount,
        reason,
        refundTo,
        notes
      });
      
      onClose();
    } catch (error) {
      console.error('Refund failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reasons = [
    'Customer changed mind',
    'Wrong item shipped',
    'Damaged during shipping',
    'Defective product',
    'Late delivery',
    'Other'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      {/* Dialog */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Process Refund</h2>
              <p className="text-sm text-gray-600">
                Order #{orderNumber} • {customerName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Order Total</p>
                  <p className="text-2xl font-bold text-gray-900">${orderTotal.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Max Refund</p>
                  <p className="text-2xl font-bold text-green-600">${maxRefund.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Refund Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max={maxRefund}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none"
                  required
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Maximum refundable amount: ${maxRefund.toFixed(2)}
              </p>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Refund Reason
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none"
                required
              >
                <option value="">Select a reason</option>
                {reasons.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Refund Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Refund To
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRefundTo('original')}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    refundTo === 'original'
                      ? 'border-[#FF6B35] bg-[#FF6B35]/5'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-full ${refundTo === 'original' ? 'bg-[#FF6B35]/10' : 'bg-gray-100'}`}>
                      <CreditCard className={`w-5 h-5 ${refundTo === 'original' ? 'text-[#FF6B35]' : 'text-gray-400'}`} />
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900">Original Payment Method</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Refund to the original credit card or PayPal account
                  </p>
                </button>
                
                <button
                  type="button"
                  onClick={() => setRefundTo('store_credit')}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    refundTo === 'store_credit'
                      ? 'border-[#FF6B35] bg-[#FF6B35]/5'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-full ${refundTo === 'store_credit' ? 'bg-[#FF6B35]/10' : 'bg-gray-100'}`}>
                      <RefreshCw className={`w-5 h-5 ${refundTo === 'store_credit' ? 'text-[#FF6B35]' : 'text-gray-400'}`} />
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900">Store Credit</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Issue store credit for future purchases
                  </p>
                </button>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Internal Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none"
                placeholder="Add any internal notes about this refund..."
              />
            </div>

            {/* Warning */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-800">Important Notice</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Once processed, refunds cannot be undone. Please double-check all information before confirming.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Process Refund
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};