'use client';

import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, subDays, startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear } from 'date-fns';

interface DateRangePickerProps {
  dateRange: { from: Date; to: Date };
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
  presets?: Array<{ label: string; days?: number; months?: number; custom?: () => { from: Date; to: Date } }>;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  dateRange,
  onDateRangeChange,
  presets = [
    { label: 'Today', days: 0 },
    { label: 'Yesterday', days: 1 },
    { label: 'Last 7 days', days: 7 },
    { label: 'Last 30 days', days: 30 },
    { label: 'Last 90 days', days: 90 },
    { 
      label: 'This month', 
      custom: () => ({
        from: startOfMonth(new Date()),
        to: new Date()
      })
    },
    { 
      label: 'Last month', 
      custom: () => ({
        from: startOfMonth(subMonths(new Date(), 1)),
        to: endOfMonth(subMonths(new Date(), 1))
      })
    },
    { 
      label: 'This year', 
      custom: () => ({
        from: startOfYear(new Date()),
        to: new Date()
      })
    },
  ],
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customRange, setCustomRange] = useState({
    from: format(dateRange.from, 'yyyy-MM-dd'),
    to: format(dateRange.to, 'yyyy-MM-dd'),
  });

  const handlePresetSelect = (preset: typeof presets[0]) => {
    let from: Date;
    let to: Date = new Date();

    if (preset.custom) {
      const range = preset.custom();
      from = range.from;
      to = range.to;
    } else if (preset.days !== undefined) {
      from = subDays(to, preset.days);
    } else if (preset.months !== undefined) {
      from = subMonths(to, preset.months);
    } else {
      from = to;
    }

    onDateRangeChange({ from, to });
    setIsOpen(false);
  };

  const handleCustomRangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDateRangeChange({
      from: new Date(customRange.from),
      to: new Date(customRange.to),
    });
    setIsOpen(false);
  };

  const handlePreviousPeriod = () => {
    const diff = dateRange.to.getTime() - dateRange.from.getTime();
    const newFrom = new Date(dateRange.from.getTime() - diff);
    const newTo = new Date(dateRange.to.getTime() - diff);
    onDateRangeChange({ from: newFrom, to: newTo });
  };

  const handleNextPeriod = () => {
    const diff = dateRange.to.getTime() - dateRange.from.getTime();
    const newFrom = new Date(dateRange.from.getTime() + diff);
    const newTo = new Date(dateRange.to.getTime() + diff);
    if (newTo <= new Date()) {
      onDateRangeChange({ from: newFrom, to: newTo });
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-2">
        <button
          onClick={handlePreviousPeriod}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Previous period"
        >
          <ChevronLeft className="w-4 h-4 text-gray-500" />
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors"
        >
          <Calendar className="w-4 h-4" />
          <span>
            {format(dateRange.from, 'MMM dd')} - {format(dateRange.to, 'MMM dd, yyyy')}
          </span>
          <ChevronDown className="w-4 h-4" />
        </button>

        <button
          onClick={handleNextPeriod}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Next period"
          disabled={dateRange.to >= new Date()}
        >
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Select Date Range</h3>
              <p className="text-sm text-gray-600 mt-1">Choose a preset or set custom dates</p>
            </div>

            <div className="p-4 border-b border-gray-200">
              <div className="grid grid-cols-2 gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => handlePresetSelect(preset)}
                    className="px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleCustomRangeSubmit} className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Range
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="date"
                        value={customRange.from}
                        onChange={(e) => setCustomRange(prev => ({ ...prev, from: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none"
                      />
                      <span className="text-xs text-gray-500 mt-1 block">From</span>
                    </div>
                    <div>
                      <input
                        type="date"
                        value={customRange.to}
                        onChange={(e) => setCustomRange(prev => ({ ...prev, to: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none"
                      />
                      <span className="text-xs text-gray-500 mt-1 block">To</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E85A28] text-sm font-medium"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};