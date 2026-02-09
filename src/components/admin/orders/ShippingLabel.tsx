// 📦 src/components/admin/orders/ShippingLabel.tsx
'use client';

import React from 'react';
import { Printer, Download, Copy, Check } from 'lucide-react';
import { OrderAddress } from '@/lib/types/order';

interface ShippingLabelProps {
  orderNumber: string;
  shippingAddress: OrderAddress;
  trackingNumber?: string;
  shippingMethod: string;
  weight?: string;
  dimensions?: string;
  className?: string;
}

export const ShippingLabel: React.FC<ShippingLabelProps> = ({
  orderNumber,
  shippingAddress,
  trackingNumber,
  shippingMethod,
  weight = '2.5 lbs',
  dimensions = '12 × 8 × 4 in',
  className = ''
}) => {
  const [copied, setCopied] = React.useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implement PDF download
    console.log('Download shipping label');
  };

  const handleCopyTracking = () => {
    if (trackingNumber) {
      navigator.clipboard.writeText(trackingNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Shipping Label</h3>
          <p className="text-sm text-gray-600">Order #{orderNumber}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E85A28] text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      {/* Label Preview */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sender Info */}
          <div>
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">FROM</h4>
              <div className="text-sm text-gray-900">
                <p className="font-semibold">Your Store Name</p>
                <p>123 Commerce Street</p>
                <p>San Francisco, CA 94107</p>
                <p>United States</p>
                <p className="mt-2">Phone: (555) 123-4567</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">SHIP VIA</h4>
              <p className="text-sm font-semibold text-gray-900">{shippingMethod}</p>
              {trackingNumber && (
                <div className="mt-2">
                  <p className="text-sm font-semibold text-gray-900">TRACKING #</p>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                      {trackingNumber}
                    </code>
                    <button
                      onClick={handleCopyTracking}
                      className="p-1 hover:bg-gray-100 rounded"
                      title={copied ? 'Copied!' : 'Copy tracking number'}
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recipient Info */}
          <div>
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">TO</h4>
              <div className="text-sm text-gray-900">
                <p className="font-semibold">{shippingAddress.name}</p>
                <p>{shippingAddress.street}</p>
                <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}</p>
                <p>{shippingAddress.country}</p>
                {shippingAddress.phone && (
                  <p className="mt-2">Phone: {shippingAddress.phone}</p>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">PACKAGE INFO</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600">Weight</p>
                  <p className="text-sm font-semibold text-gray-900">{weight}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Dimensions</p>
                  <p className="text-sm font-semibold text-gray-900">{dimensions}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Service</p>
                  <p className="text-sm font-semibold text-gray-900">Ground</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Label #</p>
                  <p className="text-sm font-semibold text-gray-900">SL-{orderNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barcode Placeholder */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="h-24 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center rounded">
            <div className="text-center">
              <p className="text-sm text-gray-600">BARCODE AREA</p>
              <p className="text-xs text-gray-500">For scanning at carrier facilities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <span className="font-semibold">Printing Instructions:</span> Use standard 4x6 label paper. 
          Ensure the print scale is set to 100%. Cut along the dotted line after printing.
        </p>
      </div>
    </div>
  );
};