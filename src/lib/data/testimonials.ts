// 📦 src/lib/data/testimonials.ts
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  content: string;
  image?: string;
  verified: boolean;
  location?: string;
  purchaseDate?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Fashion Blogger',
    rating: 5,
    content: 'The quality and comfort of these shoes are unmatched. I\'ve been a loyal customer for years and they never disappoint. The service is exceptional and shipping is always fast!',
    verified: true,
    location: 'New York, USA',
    purchaseDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Professional Runner',
    rating: 5,
    content: 'As an athlete, I need reliable footwear. This store delivers premium quality with performance. The durability is impressive for daily training and the fit is perfect every time.',
    verified: true,
    location: 'Los Angeles, USA',
    purchaseDate: '2024-01-10'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Interior Designer',
    rating: 4,
    content: 'Style meets comfort perfectly. The collection is curated so well that I always find exactly what I need. Customer service is outstanding and returns are hassle-free!',
    verified: true,
    location: 'Miami, USA',
    purchaseDate: '2024-01-20'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Business Executive',
    rating: 5,
    content: 'Professional quality shoes for work and leisure. The attention to detail is remarkable and the prices are very competitive. Highly recommend to anyone looking for premium footwear.',
    verified: true,
    location: 'Chicago, USA',
    purchaseDate: '2024-01-08'
  },
  {
    id: '5',
    name: 'Jessica Thompson',
    role: 'Casual Walker',
    rating: 5,
    content: 'I bought my first pair last month and I am already planning my next purchase. The design is so sleek and I get compliments every time I wear them!',
    verified: true,
    location: 'London, UK',
    purchaseDate: '2024-01-22'
  },
  {
    id: '6',
    name: 'Marcus Bell',
    role: 'Vlogger',
    rating: 4,
    content: 'Great shoes, very stylish. Shipping took a tiny bit longer than expected but the customer support kept me updated. Definitely worth the wait for the quality you get.',
    verified: true,
    location: 'Toronto, Canada',
    purchaseDate: '2024-01-05'
  },
  {
    id: '7',
    name: 'Sophia Laurent',
    role: 'Designer',
    rating: 5,
    content: 'The packaging itself shows how much they care about the customer experience. The shoes are pieces of art. The comfort level is surprisingly high for such fashion-forward designs.',
    verified: true,
    location: 'Paris, France',
    purchaseDate: '2023-12-28'
  }
];

export const testimonialStats = {
  averageRating: 4.8,
  totalReviews: 12450,
  recommendationRate: '99%',
  ratingBreakdown: [
    { rating: 5, count: 8500, percentage: 70 },
    { rating: 4, count: 2500, percentage: 20 },
    { rating: 3, count: 950, percentage: 6 },
    { rating: 2, count: 350, percentage: 3 },
    { rating: 1, count: 150, percentage: 1 },
  ]
};
