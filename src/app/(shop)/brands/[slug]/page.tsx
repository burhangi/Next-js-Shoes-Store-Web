// app/(shop)/brands/[slug]/page.tsx
import { fetchBrandBySlug, getAllBrandProducts, getRelatedBrands } from '@/lib/data/brands';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ArrowLeft, Filter, Star } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';

// CORRECT: In Next.js 15, params is a Promise
interface BrandPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BrandPage({ params, searchParams }: BrandPageProps) {
  // Await the params and searchParams Promises
  const { slug } = await params;
  const searchParamsObj = await searchParams || {};
  
  const brand = fetchBrandBySlug(slug);
  
  if (!brand) {
    return notFound();
  }
  
  const products = getAllBrandProducts(slug);
  const relatedBrands = getRelatedBrands(brand);
  const categoryFilter = searchParamsObj?.category as string | undefined;

  // Filter products if category param is present (optional enhancement)
  const displayProducts = categoryFilter 
    ? products.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase())
    : products;

  // Map to ProductGrid expected format
  const formattedProducts = displayProducts.map(product => ({
    ...product,
    brand: brand.name,
    description: product.description,
    isFeatured: product.isBestSeller // Map best seller to featured if needed or just use as is
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title={brand.name}
        subtitle={brand.slogan}
        description={brand.description}
        icon={brand.logo ? (
          <div className="relative w-8 h-8">
            <Image src={brand.logo} alt={brand.name} fill className="object-contain invert brightness-0" />
          </div>
        ) : <span className="text-xl">{brand.icon}</span>}
        bgColor="bg-gradient-to-r from-gray-900 to-[#1A1A1A]"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
           {/* Detailed stats or actions can go here */}
           <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                 <div className="text-[10px] text-white/60 uppercase font-black">Products</div>
                 <div className="text-[18px] font-bold text-white">{brand.productCount}</div>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                 <div className="text-[10px] text-white/60 uppercase font-black">Rating</div>
                 <div className="text-[18px] font-bold text-white flex items-center gap-1">
                    {brand.rating} <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                 </div>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                 <div className="text-[10px] text-white/60 uppercase font-black">Founded</div>
                 <div className="text-[18px] font-bold text-white">{brand.founded}</div>
              </div>
           </div>
        </div>
      </PageHero>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-6 border-b border-gray-200 gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {categoryFilter ? `${categoryFilter} Products` : 'All Products'}
            <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {displayProducts.length} items
            </span>
          </h2>
          
          <div className="flex items-center gap-4">
             {categoryFilter && (
                <Link 
                  href={`/shop/brands/${brand.slug}`}
                  className="text-sm text-gray-500 hover:text-black flex items-center"
                >
                  <span className="mr-1">✕</span> Clear Filter
                </Link>
             )}
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid 
          products={formattedProducts} 
          columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
        />

        {/* Empty State */}
        {formattedProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">👟</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
            <p className="text-gray-500 mb-6">
              We couldn't find any products in this category for {brand.name}.
            </p>
            {categoryFilter && (
              <Link 
                href={`/shop/brands/${brand.slug}`}
                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                View All {brand.name} Products
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Related Brands Section */}
      {relatedBrands.length > 0 && (
        <section className="bg-white py-16 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Similar Brands</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedBrands.map((relatedBrand) => (
                <Link
                  key={relatedBrand.id}
                  href={`/shop/brands/${relatedBrand.slug}`}
                  className="group block p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100"
                >
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform origin-left">
                    {relatedBrand.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {relatedBrand.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                    {relatedBrand.description}
                  </p>
                  <div className="flex items-center text-sm font-medium text-gray-900">
                    <span className="text-yellow-500 mr-1">★</span>
                    {relatedBrand.rating}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// Generate metadata function (if needed)
export async function generateMetadata({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = fetchBrandBySlug(slug);
  
  if (!brand) {
    return {
      title: 'Brand Not Found',
      description: 'The requested brand could not be found.'
    };
  }
  
  return {
    title: `${brand.name} - Premium Footwear Brand`,
    description: brand.description,
    keywords: [...brand.tags, ...brand.categories, brand.name].join(', '),
    openGraph: {
      title: `${brand.name} - Premium Footwear Brand`,
      description: brand.description,
      type: 'website',
    },
  };
}