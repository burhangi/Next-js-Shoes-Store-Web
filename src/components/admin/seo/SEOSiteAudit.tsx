// 📦 components/admin/seo/SEOSiteAudit.tsx
'use client';

import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Info, RefreshCw, Download } from 'lucide-react';
import { SEOSiteAudit } from '@/lib/data/seo';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';

interface SEOSiteAuditProps {
  audits: SEOSiteAudit[];
  onRunAudit?: () => void;
  onExport?: () => void;
}

export const SEOSiteAuditComponent: React.FC<SEOSiteAuditProps> = ({
  audits,
  onRunAudit,
  onExport,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(audits.map(a => a.category)));
  const filteredAudits = selectedCategory
    ? audits.filter(a => a.category === selectedCategory)
    : audits;

  const getSeverityIcon = (severity: SEOSiteAudit['severity']) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getSeverityBadge = (severity: SEOSiteAudit['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const criticalCount = audits.filter(a => a.severity === 'critical').length;
  const warningCount = audits.filter(a => a.severity === 'warning').length;
  const infoCount = audits.filter(a => a.severity === 'info').length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Site Audit</h3>
          <p className="text-sm text-gray-600 mt-1">Identify and fix SEO issues on your website</p>
        </div>
        <div className="flex items-center gap-2">
          {onExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          )}
          {onRunAudit && (
            <Button
              onClick={onRunAudit}
              className="bg-primary hover:bg-primary-dark text-white flex items-center gap-2"
              size="sm"
            >
              <RefreshCw className="w-4 h-4" />
              Run Audit
            </Button>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-sm font-semibold text-red-700">Critical</span>
          </div>
          <p className="text-2xl font-bold text-red-700">{criticalCount}</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-700">Warnings</span>
          </div>
          <p className="text-2xl font-bold text-yellow-700">{warningCount}</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Info</span>
          </div>
          <p className="text-2xl font-bold text-blue-700">{infoCount}</p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
            !selectedCategory
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors capitalize",
              selectedCategory === category
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Audit Issues */}
      <div className="space-y-4">
        {filteredAudits.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-gray-600">No issues found! Your site is optimized.</p>
          </div>
        ) : (
          filteredAudits.map((audit) => (
            <div
              key={audit.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5">
                  {getSeverityIcon(audit.severity)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{audit.issue}</h4>
                      <span className={cn(
                        "inline-block px-2 py-1 text-xs font-semibold rounded-md border",
                        getSeverityBadge(audit.severity)
                      )}>
                        {audit.severity}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        {audit.category} • {audit.affectedPages} pages affected
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{audit.description}</p>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Recommended Fix:</p>
                    <p className="text-sm text-gray-600">{audit.fix}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
