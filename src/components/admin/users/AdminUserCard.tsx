// 📦 components/admin/users/AdminUserCard.tsx
'use client';

import React from 'react';
import { User, Mail, Phone, Shield, MoreVertical, Edit, Trash2, Ban } from 'lucide-react';
import { AdminUser, getRoleBadgeColor, getStatusBadgeColor } from '@/lib/data/admin';
import { cn } from '@/lib/utils/cn';

interface AdminUserCardProps {
  user: AdminUser;
  onEdit?: (user: AdminUser) => void;
  onDelete?: (userId: string) => void;
  onSuspend?: (userId: string) => void;
  currentUserId?: string;
}

export const AdminUserCard: React.FC<AdminUserCardProps> = ({
  user,
  onEdit,
  onDelete,
  onSuspend,
  currentUserId,
}) => {
  const isCurrentUser = user.id === currentUserId;
  const canEdit = !isCurrentUser;

  const getTimeAgo = (timestamp?: string) => {
    if (!timestamp) return 'Never';
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Avatar */}
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0",
            "bg-gradient-to-br from-primary to-primary-dark"
          )}>
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
              {isCurrentUser && (
                <span className="px-2 py-0.5 bg-primary text-white text-xs font-semibold rounded">
                  You
                </span>
              )}
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="truncate">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{user.phone}</span>
                </div>
              )}
              {user.department && (
                <div className="text-xs text-gray-500">{user.department}</div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className={cn(
                "px-2 py-1 text-xs font-semibold rounded-md border capitalize",
                getRoleBadgeColor(user.role)
              )}>
                {user.role.replace('_', ' ')}
              </span>
              <span className={cn(
                "px-2 py-1 text-xs font-semibold rounded-md border capitalize",
                getStatusBadgeColor(user.status)
              )}>
                {user.status}
              </span>
              {user.twoFactorEnabled && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-md border border-blue-200 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  2FA
                </span>
              )}
            </div>
            {user.lastLogin && (
              <p className="text-xs text-gray-500 mt-2">
                Last login: {getTimeAgo(user.lastLogin)}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        {canEdit && (
          <div className="relative group">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <div className="py-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(user)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit User
                  </button>
                )}
                {onSuspend && user.status === 'active' && (
                  <button
                    onClick={() => onSuspend(user.id)}
                    className="w-full px-4 py-2 text-left text-sm text-yellow-600 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Ban className="w-4 h-4" />
                    Suspend
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(user.id)}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete User
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
