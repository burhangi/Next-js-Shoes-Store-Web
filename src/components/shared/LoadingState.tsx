// 📄 /components/shared/LoadingState.tsx
"use client";

import React from 'react';

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35]"></div>
      <p className="text-gray-600 mt-4">{message}</p>
    </div>
  );
};