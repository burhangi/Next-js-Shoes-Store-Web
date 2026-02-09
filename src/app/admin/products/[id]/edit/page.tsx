'use client';

import React from 'react';
import { ProductForm } from '@/components/admin/products/ProductForm';
import { useParams } from 'next/navigation';

export default function EditProductPage() {
  const params = useParams();
  
  // Mock Data Simulation based on ID
  const mockProduct = {
    id: params.id,
    name: 'Nike Air Max 270',
    description: 'The Nike Air Max 270 React generates an artistic demonstration by merging two historic icons: the Air Max 180 and Air Max 93...',
    status: 'active',
    category: 'Sneakers',
    brand: 'Nike',
    price: 129.99,
    compareAtPrice: 150.00,
    costPerItem: 80.00,
    sku: 'NK-AM270-001',
    barcode: '123456789',
    trackQuantity: true,
    quantity: 45,
    images: ['/products/nike-airmax-270.jpg'], // Assuming this image path exists in public or mock
    hasVariants: true,
    variants: [
        { id: '1', option1: '42', option2: 'Black', price: 129.99, stock: 20 },
        { id: '2', option1: '43', option2: 'Black', price: 129.99, stock: 15 },
    ]
  };

  return <ProductForm initialData={mockProduct} isEdit={true} />;
}
