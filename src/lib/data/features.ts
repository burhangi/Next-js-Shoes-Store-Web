// 📦 src/lib/data/features.ts
export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    id: '1',
    icon: '🚚',
    title: 'Free Shipping',
    description: 'Free delivery on all orders over $100'
  },
  {
    id: '2',
    icon: '↩️',
    title: 'Easy Returns',
    description: '30-day hassle-free return policy'
  },
  {
    id: '3',
    icon: '🔒',
    title: 'Secure Payment',
    description: '100% secure and encrypted checkout'
  },
  {
    id: '4',
    icon: '💬',
    title: '24/7 Support',
    description: 'Dedicated customer service team'
  }
];
