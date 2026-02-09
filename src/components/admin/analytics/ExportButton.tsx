'use client';

import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, FileBarChart, Check, Loader2 } from 'lucide-react';

interface ExportButtonProps {
  onExport?: (format: 'csv' | 'pdf' | 'excel') => Promise<void>;
  data?: any;
  fileName?: string;
  className?: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  onExport,
  data,
  fileName = 'analytics-data',
  className = '',
}) => {
  const [exporting, setExporting] = useState<string | null>(null);
  const [exported, setExported] = useState(false);

  const handleExport = async (format: 'csv' | 'pdf' | 'excel') => {
    setExporting(format);
    
    try {
      if (onExport) {
        await onExport(format);
      } else {
        // Default export implementation
        await defaultExport(format, data, fileName);
      }
      
      setExporting(null);
      setExported(true);
      
      // Reset success state after 3 seconds
      setTimeout(() => setExported(false), 3000);
    } catch (error) {
      console.error('Export failed:', error);
      setExporting(null);
      alert('Export failed. Please try again.');
    }
  };

  const defaultExport = async (format: 'csv' | 'pdf' | 'excel', data: any, fileName: string) => {
    // Simulate export delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    switch (format) {
      case 'csv':
        exportToCSV(data, fileName);
        break;
      case 'pdf':
        exportToPDF(data, fileName);
        break;
      case 'excel':
        exportToExcel(data, fileName);
        break;
    }
  };

  const exportToCSV = (data: any, fileName: string) => {
    // Convert data to CSV string
    const csvContent = 'data:text/csv;charset=utf-8,' + 
      Object.keys(data[0] || {}).join(',') + '\n' +
      data.map((row: any) => Object.values(row).join(',')).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    triggerDownload(encodedUri, `${fileName}.csv`);
  };

  const exportToPDF = (data: any, fileName: string) => {
    // In a real app, use a PDF library like jsPDF or pdfmake
    console.log('PDF export:', data);
    alert('PDF export functionality would be implemented with a PDF library');
  };

  const exportToExcel = (data: any, fileName: string) => {
    // In a real app, use a library like xlsx
    console.log('Excel export:', data);
    alert('Excel export functionality would be implemented with an Excel library');
  };

  const triggerDownload = (uri: string, fileName: string) => {
    const link = document.createElement('a');
    link.setAttribute('href', uri);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (exported) {
    return (
      <div className="flex items-center gap-2 px-4 py-2.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
        <Check className="w-4 h-4" />
        Exported successfully
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      <button
        disabled={!!exporting}
        className="flex items-center gap-2 px-4 py-2.5 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E85A28] disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
      >
        {exporting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Exporting {exporting.toUpperCase()}...
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Export Data
          </>
        )}
      </button>

      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2">
          <button
            onClick={() => handleExport('csv')}
            disabled={!!exporting}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Export as CSV
          </button>
          <button
            onClick={() => handleExport('excel')}
            disabled={!!exporting}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileBarChart className="w-4 h-4" />
            Export as Excel
          </button>
          <button
            onClick={() => handleExport('pdf')}
            disabled={!!exporting}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileText className="w-4 h-4" />
            Export as PDF
          </button>
        </div>
      </div>
    </div>
  );
};