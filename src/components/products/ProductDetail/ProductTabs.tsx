"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/lib/api/queries/products";

interface ProductTabsProps {
  product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="w-full justify-start border-b border-primary-200 rounded-none bg-transparent p-0 mb-6">
        <TabsTrigger 
          value="description"
          className="rounded-none border-b-2 border-transparent px-6 py-3 data-[state=active]:border-accent-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Description
        </TabsTrigger>
        <TabsTrigger 
          value="details"
          className="rounded-none border-b-2 border-transparent px-6 py-3 data-[state=active]:border-accent-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Product Details
        </TabsTrigger>
        <TabsTrigger 
          value="reviews"
          className="rounded-none border-b-2 border-transparent px-6 py-3 data-[state=active]:border-accent-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Reviews ({product.reviewCount})
        </TabsTrigger>
        <TabsTrigger 
          value="shipping"
          className="rounded-none border-b-2 border-transparent px-6 py-3 data-[state=active]:border-accent-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Shipping & Returns
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="description" className="animate-fade-in-up">
        <div className="prose prose-neutral max-w-none">
          <p className="text-primary-600 leading-relaxed text-lg">
            {product.description}
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-50 p-6 rounded-xl">
              <h4 className="font-semibold text-primary-900 mb-4">Features</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-primary-600">
                  <span className="w-2 h-2 rounded-full bg-accent-500"></span>
                  Premium {product.category} construction
                </li>
                {product.tags && product.tags.map(tag => (
                  <li key={tag} className="flex items-center gap-3 text-primary-600">
                    <span className="w-2 h-2 rounded-full bg-accent-500"></span>
                    {tag}
                  </li>
                ))}
                <li className="flex items-center gap-3 text-primary-600">
                  <span className="w-2 h-2 rounded-full bg-accent-500"></span>
                  Designed for comfort and style
                </li>
              </ul>
            </div>
            <div className="bg-neutral-50 p-6 rounded-xl">
              <h4 className="font-semibold text-primary-900 mb-4">Care Instructions</h4>
              <ul className="space-y-3 text-primary-600">
                <li>• Clean with a soft, dry cloth</li>
                <li>• Store in a cool, dry place</li>
                <li>• Avoid direct contact with water</li>
                <li>• Use specialized cleaner for stains</li>
              </ul>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="details" className="animate-fade-in-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
          <div className="grid grid-cols-2 border-b border-primary-100 py-3">
            <span className="font-medium text-primary-900">Brand</span>
            <span className="text-primary-600">{product.brand}</span>
          </div>
          <div className="grid grid-cols-2 border-b border-primary-100 py-3">
            <span className="font-medium text-primary-900">Category</span>
            <span className="text-primary-600">{product.category}</span>
          </div>
          <div className="grid grid-cols-2 border-b border-primary-100 py-3">
            <span className="font-medium text-primary-900">SKU</span>
            <span className="text-primary-600">SKU-{product.slug.toUpperCase().slice(0, 8)}</span>
          </div>
          <div className="grid grid-cols-2 border-b border-primary-100 py-3">
            <span className="font-medium text-primary-900">Material</span>
            <span className="text-primary-600">Premium Leather / Synthetic Mix</span>
          </div>
          <div className="grid grid-cols-2 border-b border-primary-100 py-3">
            <span className="font-medium text-primary-900">Weight</span>
            <span className="text-primary-600">Approx. 0.8 kg</span>
          </div>
          <div className="grid grid-cols-2 border-b border-primary-100 py-3">
            <span className="font-medium text-primary-900">Warranty</span>
            <span className="text-primary-600">2 Years Manufacturer Warranty</span>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="animate-fade-in-up">
        <div className="flex flex-col items-center justify-center py-12 text-center bg-neutral-50 rounded-xl">
          <div className="text-5xl font-bold text-primary-900 mb-2">{product.rating}</div>
          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={`text-2xl ${star <= Math.round(product.rating) ? 'text-accent-500' : 'text-primary-200'}`}>★</span>
            ))}
          </div>
          <p className="text-primary-600 mb-6">Based on {product.reviewCount} customer reviews</p>
          <button className="btn-secondary">Write a Review</button>
        </div>
      </TabsContent>

      <TabsContent value="shipping" className="animate-fade-in-up">
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="p-3 bg-secondary-50 rounded-full h-fit">
              <span className="text-xl">🚚</span>
            </div>
            <div>
              <h4 className="font-semibold text-primary-900 mb-1">Free Shipping</h4>
              <p className="text-primary-600">We offer free standard shipping on all orders over $100. For orders under $100, a flat rate of $9.95 applies.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="p-3 bg-secondary-50 rounded-full h-fit">
              <span className="text-xl">⏱️</span>
            </div>
            <div>
              <h4 className="font-semibold text-primary-900 mb-1">Estimated Delivery</h4>
              <p className="text-primary-600">Standard shipping: 3-5 business days<br/>Express shipping: 1-2 business days</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="p-3 bg-secondary-50 rounded-full h-fit">
              <span className="text-xl">↩️</span>
            </div>
            <div>
              <h4 className="font-semibold text-primary-900 mb-1">Easy Returns</h4>
              <p className="text-primary-600">If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund or exchange.</p>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
