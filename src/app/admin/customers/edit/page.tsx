'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CustomerForm } from '@/components/admin/customers/CustomerForm';

function EditCustomerContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // Mock data fetch based on ID
  // In real app, fetch data here using SWR or useEffect
  const mockCustomer = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    status: 'active',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'USA',
    notes: 'Premium customer since 2023.'
  };

  if (!id) return <div>Invalid Customer ID</div>;

  return <CustomerForm initialData={mockCustomer} isEdit={true} />;
}

export default function EditCustomerPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditCustomerContent />
    </Suspense>
  );
}
