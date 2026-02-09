// 📦 src/app/admin/notifications/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Search,
  Filter,
  X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { adminNotifications, AdminNotification, getUnreadCount } from '@/lib/data/notifications';
import { 
  NotificationCard, 
  NotificationFilters, 
  NotificationList, 
  NotificationStats,
  NotificationDetailModal
} from '@/components/admin/notifications';
import { cn } from '@/lib/utils/cn';

export default function AdminNotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<AdminNotification[]>(adminNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<AdminNotification | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [filters, setFilters] = useState<{
    type?: AdminNotification['type'];
    priority?: AdminNotification['priority'];
    read?: boolean;
  }>({});

  const unreadCount = getUnreadCount(notifications);

  // Filter and search notifications
  const filteredNotifications = useMemo(() => {
    let filtered = [...notifications];

    // Apply type filter
    if (filters.type) {
      filtered = filtered.filter(n => n.type === filters.type);
    }

    // Apply priority filter
    if (filters.priority !== undefined) {
      filtered = filtered.filter(n => n.priority === filters.priority);
    }

    // Apply read status filter
    if (filters.read !== undefined) {
      filtered = filtered.filter(n => n.read === filters.read);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        n =>
          n.title.toLowerCase().includes(query) ||
          n.message.toLowerCase().includes(query) ||
          n.type.toLowerCase().includes(query)
      );
    }

    // Sort by timestamp (newest first)
    return filtered.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [notifications, filters, searchQuery]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleDeleteAll = () => {
    if (confirm('Are you sure you want to delete all notifications?')) {
      setNotifications([]);
    }
  };

  const handleNotificationClick = (notification: AdminNotification) => {
    setSelectedNotification(notification);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedNotification(null);
  };

  const handleDetailModalRead = (id: string) => {
    handleMarkAsRead(id);
  };

  const handleDetailModalDelete = (id: string) => {
    handleDelete(id);
    handleCloseDetailModal();
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="w-7 h-7 text-primary" />
            Notifications
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and monitor all your store notifications
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
            >
              <CheckCheck className="w-4 h-4" />
              Mark All Read
            </button>
          )}
          <button
            onClick={handleDeleteAll}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>
      </div>

      {/* Stats */}
      <NotificationStats notifications={notifications} />

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium",
              showFilters
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            <Filter className="w-4 h-4" />
            Filters
            {(filters.type || filters.priority !== undefined || filters.read !== undefined) && (
              <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {[filters.type, filters.priority, filters.read !== undefined ? 'status' : null]
                  .filter(Boolean).length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="animate-fade-in">
          <NotificationFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            unreadCount={unreadCount}
            totalCount={notifications.length}
          />
        </div>
      )}

      {/* Notifications List */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {filteredNotifications.length === 0
              ? 'No Notifications'
              : `${filteredNotifications.length} Notification${filteredNotifications.length !== 1 ? 's' : ''}`}
          </h2>
          {filteredNotifications.length > 0 && (
            <div className="text-sm text-gray-600">
              {filteredNotifications.filter(n => !n.read).length} unread
            </div>
          )}
        </div>

        <NotificationList
          notifications={filteredNotifications}
          onRead={handleMarkAsRead}
          onDelete={handleDelete}
          onClick={handleNotificationClick}
        />
      </div>

      {/* Empty State Info */}
      {filteredNotifications.length === 0 && notifications.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-800">
            No notifications match your current filters. Try adjusting your search or filter criteria.
          </p>
        </div>
      )}

      {/* Notification Detail Modal */}
      <NotificationDetailModal
        notification={selectedNotification}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        onRead={handleDetailModalRead}
        onDelete={handleDetailModalDelete}
      />
    </div>
  );
}
