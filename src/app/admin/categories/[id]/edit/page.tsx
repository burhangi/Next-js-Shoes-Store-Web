'use client';

import React from 'react';
import { GenericAdminForm } from '@/components/admin/GenericAdminForm';
import { useParams } from 'next/navigation';

export default function EditCategoryPage() {
  const params = useParams();
  const mockData = { name: 'Running', description: 'Running shoes', status: 'active' };
  
  return <GenericAdminForm title="Category" type="category" initialData={mockData} />;
}
