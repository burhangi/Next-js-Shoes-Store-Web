// 📄 /app/(shop)/products/on-sale/page.tsx - UPDATED
"use client";

import { useState, useEffect } from 'react';
import { Tag, Percent, DollarSign, Clock } from 'lucide-react';
import { ProductListingPage } from '@/components/products/listing/ProductListingPage';
import { MOCK_PRODUCTS } from '@/lib/data/products/mock-data';
import { Product } from '@/lib/data/products/types';
import { MinimalProduct } from '@/lib/data';

export default function OnSalePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const onSale = MOCK_PRODUCTS
        .filter(product => product.isOnSale)
        .sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0))
        .slice(0, 12);
      
      // Convert MinimalProduct to Product by ensuring all required fields are present
      const formattedProducts: Product[] = onSale.map((product: MinimalProduct) => ({
        // Required string fields
        id: product.id,
        slug: product.slug || `product-${product.id}`,
        name: product.name,
        description: product.description || `Description for ${product.name}`,
        shortDescription: product.shortDescription || product.description?.substring(0, 100) || `Short description for ${product.name}`,
        category: product.category,
        categorySlug: product.categorySlug || product.category.toLowerCase().replace(/\s+/g, '-'),
        
        // Required array fields
        images: product.images || [`/api/placeholder/400/400?text=${encodeURIComponent(product.name)}`],
        variants: product.variants || [],
        features: product.features || ['High Quality', 'Durable', 'Comfortable'],
        specifications: product.specifications || {
          'Material': 'Premium',
          'Style': 'Modern'
        },
        
        // Required status fields
        status: product.status || 'active',
        stockStatus: product.stockStatus || 'in_stock',
        
        // Required number fields
        price: product.price,
        rating: product.rating || 4.5,
        reviews: product.reviews || Math.floor(Math.random() * 100),
        
        // For ProductCardHorizontal compatibility
        thumbnail: product.image || product.images?.[0] || `/api/placeholder/400/400?text=${encodeURIComponent(product.name)}`,
        reviewCount: product.reviews || Math.floor(Math.random() * 100),
        
        // Optional fields (passed through)
        originalPrice: product.originalPrice,
        discountPercent: product.discountPercent,
        brand: product.brand,
        isNew: product.isNew,
        isBestSeller: product.isBestSeller,
        isOnSale: product.isOnSale,
        isFeatured: product.isFeatured,
        colors: product.colors,
        sizes: product.sizes,
        stock: product.stock,
        stockQuantity: product.stockQuantity,
        tags: product.tags,
        weight: product.weight,
        dimensions: product.dimensions,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        soldCount: product.soldCount,
        categoryId: product.categoryId,
        brandId: product.brandId,
        
        // Required image field (use first image or placeholder)
        image: product.image || product.images?.[0] || `/api/placeholder/400/400?text=${encodeURIComponent(product.name)}`
      }));
      
      setProducts(formattedProducts);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const totalDiscount = products.reduce((sum, product) => {
    if (product.originalPrice) {
      return sum + (product.originalPrice - product.price);
    }
    return sum;
  }, 0);

  const heroStats = [
    { label: 'On Sale', value: products.length, icon: <Tag className="h-4 w-4 text-green-600" /> },
    { label: 'Avg Discount', value: '40%', icon: <Percent className="h-4 w-4 text-green-600" /> },
    { label: 'Total Savings', value: `$${totalDiscount.toFixed(0)}+`, icon: <DollarSign className="h-4 w-4 text-green-600" /> },
    { label: 'Limited Time', value: '24h', icon: <Clock className="h-4 w-4 text-green-600" /> }
  ];

  return (
    <ProductListingPage
      // Hero Section
      pageTitle="On Sale"
      pageDescription="Discover amazing deals on quality products. Save big with our curated selection."
      heroIcon={<Tag className="h-5 w-5" />}
      heroBgColor="bg-gradient-to-r from-green-600 to-green-700"
      heroStats={heroStats}
      
      // Products Section
      products={products}
      loading={loading}
      sectionTitle="Discount Collection"
      sectionDescription="Quality products at unbeatable prices"
      showDiscountBadge={true}
      
      // CTA Section
      ctaIcon={<Percent className="h-10 w-10 text-green-600" />}
      ctaTitle="Love a Good Deal?"
      ctaDescription="Join our sale alerts and be the first to know about new discounts."
      ctaBgColor="bg-gradient-to-r from-green-50 to-green-100"
      primaryButton={{
        text: "View All Products",
        href: "/products",
        variant: "outline"
      }}
    />
  );
}