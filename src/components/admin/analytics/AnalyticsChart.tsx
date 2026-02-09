'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, Download, Maximize2 } from 'lucide-react';

export type ChartType = 'line' | 'bar' | 'area' | 'pie';
export type ChartData = Array<Record<string, any>>;

interface AnalyticsChartProps {
  data: ChartData;
  type?: ChartType;
  title?: string;
  description?: string;
  height?: number;
  xAxisKey?: string;
  yAxisKeys?: string[];
  colors?: string[];
  showLegend?: boolean;
  showTooltip?: boolean;
  grid?: boolean;
  stacked?: boolean;
  fillOpacity?: number;
  strokeWidth?: number;
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  data,
  type = 'line',
  title,
  description,
  height = 300,
  xAxisKey = 'date',
  yAxisKeys = ['value'],
  colors = ['#FF6B35', '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'],
  showLegend = true,
  showTooltip = true,
  grid = true,
  stacked = false,
  fillOpacity = 0.1,
  strokeWidth = 2,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const renderLineChart = () => (
    <LineChart data={data}>
      {grid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
      <XAxis 
        dataKey={xAxisKey} 
        stroke="#6B7280"
        fontSize={12}
      />
      <YAxis 
        stroke="#6B7280"
        fontSize={12}
      />
      {showTooltip && (
        <Tooltip
          contentStyle={{
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            backgroundColor: 'white',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
      )}
      {showLegend && <Legend />}
      {yAxisKeys.map((key, index) => (
        <Line
          key={key}
          type="monotone"
          dataKey={key}
          stroke={colors[index % colors.length]}
          strokeWidth={strokeWidth}
          dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: colors[index % colors.length] }}
        />
      ))}
    </LineChart>
  );

  const renderBarChart = () => (
    <BarChart data={data}>
      {grid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />}
      <XAxis 
        dataKey={xAxisKey} 
        stroke="#6B7280"
        fontSize={12}
      />
      <YAxis 
        stroke="#6B7280"
        fontSize={12}
      />
      {showTooltip && (
        <Tooltip
          contentStyle={{
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            backgroundColor: 'white',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
          formatter={(value: number) => [value.toLocaleString(), 'Value']}
        />
      )}
      {showLegend && <Legend />}
      {yAxisKeys.map((key, index) => (
        <Bar
          key={key}
          dataKey={key}
          fill={colors[index % colors.length]}
          radius={[4, 4, 0, 0]}
          stackId={stacked ? 'stack' : undefined}
        />
      ))}
    </BarChart>
  );

  const renderAreaChart = () => (
    <AreaChart data={data}>
      {grid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
      <XAxis 
        dataKey={xAxisKey} 
        stroke="#6B7280"
        fontSize={12}
      />
      <YAxis 
        stroke="#6B7280"
        fontSize={12}
      />
      {showTooltip && (
        <Tooltip
          contentStyle={{
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            backgroundColor: 'white',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
      )}
      {showLegend && <Legend />}
      {yAxisKeys.map((key, index) => (
        <Area
          key={key}
          type="monotone"
          dataKey={key}
          stroke={colors[index % colors.length]}
          strokeWidth={strokeWidth}
          fill={colors[index % colors.length]}
          fillOpacity={fillOpacity}
        />
      ))}
    </AreaChart>
  );

  const renderPieChart = () => {
    const pieData = data.map((item, index) => ({
      name: item[xAxisKey] || item.name,
      value: item[yAxisKeys[0]] || item.value,
      color: colors[index % colors.length],
    }));

    return (
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {showTooltip && (
          <Tooltip
            formatter={(value: number) => [value.toLocaleString(), 'Value']}
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              backgroundColor: 'white',
            }}
          />
        )}
        {showLegend && <Legend />}
      </PieChart>
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return renderLineChart();
      case 'bar':
        return renderBarChart();
      case 'area':
        return renderAreaChart();
      case 'pie':
        return renderPieChart();
      default:
        return renderLineChart();
    }
  };

  const handleDownload = () => {
    // Implement chart download functionality
    console.log('Download chart');
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const chartContainerClass = isFullscreen
    ? 'fixed inset-0 z-50 bg-white p-8'
    : 'relative';

  return (
    <div className={chartContainerClass}>
      {(title || description) && (
        <div className="flex items-start justify-between mb-6">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Download chart"
            >
              <Download className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={handleFullscreen}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              <Maximize2 className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      )}

      <div style={{ height: isFullscreen ? 'calc(100vh - 200px)' : `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {/* Chart Stats */}
      {data.length > 0 && type !== 'pie' && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {yAxisKeys.map((key, index) => {
            const values = data.map(d => d[key]).filter(v => typeof v === 'number');
            const avg = values.reduce((a, b) => a + b, 0) / values.length;
            const max = Math.max(...values);
            const min = Math.min(...values);
            const trend = data.length >= 2 
              ? (values[values.length - 1] - values[0]) / values[0] * 100
              : 0;

            return (
              <div key={key} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <div className={`flex items-center gap-1 text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {trend >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{Math.abs(trend).toFixed(1)}%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Avg:</span>
                    <span className="font-medium">{avg.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2
                    })}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Max:</span>
                    <span className="font-medium">{max.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Min:</span>
                    <span className="font-medium">{min.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isFullscreen && (
        <div className="fixed bottom-8 right-8">
          <button
            onClick={handleFullscreen}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            Exit Fullscreen
          </button>
        </div>
      )}
    </div>
  );
};