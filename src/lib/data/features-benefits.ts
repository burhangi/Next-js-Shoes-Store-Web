// 📦 src/lib/data/features-benefits.ts
export interface FeatureBenefit {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}

export const featureBenefits: FeatureBenefit[] = [
  {
    id: '1',
    icon: '🚚',
    title: 'Free Shipping',
    description: 'On all orders over $100',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: '2',
    icon: '🔄',
    title: 'Easy Returns',
    description: '30-day money-back guarantee',
    color: 'from-green-500 to-green-600'
  },
  {
    id: '3',
    icon: '🔒',
    title: 'Secure Payment',
    description: '100% secure transactions',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: '4',
    icon: '⚡',
    title: 'Fast Delivery',
    description: '2-3 business days shipping',
    color: 'from-orange-500 to-orange-600'
  }
];
