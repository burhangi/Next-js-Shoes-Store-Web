'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change (mobile UX) or window resize?
  // User said: "sidebar item clicked navbar will be closed" - This logic goes here or in Sidebar.

  return (
    <AdminContext.Provider value={{ sidebarOpen, setSidebarOpen, toggleSidebar: () => setSidebarOpen(prev => !prev) }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
