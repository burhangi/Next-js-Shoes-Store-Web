// 📦src/lib/data/users.ts
import { User } from '../types';

export const mockUser: User = {
  id: 'USR-001',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 123-4567',
  role: 'user',
  membership: 'gold',
  points: 1250,
  joinedDate: '2023-01-15',
  status: 'active'
};

export const mockUsers: User[] = [
  mockUser,
  {
    id: 'user_002',
    name: 'Sarah Miller',
    email: 'sarah.m@example.com',
    role: 'user',
    membership: 'premium',
    points: 850,
    joinedDate: '2023-03-22',
    status: 'active'
  },
  {
    id: 'user_003',
    name: 'Mike Chen',
    email: 'mike.chen@example.com',
    role: 'admin',
    membership: 'premium',
    points: 2100,
    joinedDate: '2022-11-05',
    status: 'active'
  }
];

// Re-export the type for convenience
export type { User };