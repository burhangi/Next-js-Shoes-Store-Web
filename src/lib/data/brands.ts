// 📦 src/lib/data/brands.ts - COMPLETE BRAND DATA WITH PRODUCTS
export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
  slogan: string;
  icon: string;
  logo?: string;
  website?: string;
  founded?: number;
  headquarters?: string;
  productCount: number;
  rating: number;
  featured: boolean;
  categories: string[];
  specialties: string[];
  colors: string[];
  tags: string[];
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    pinterest?: string;
  };
  shippingInfo?: {
    freeShipping: boolean;
    minAmount?: number;
    returnDays: number;
    warranty: string;
  };
  createdAt: string;
  updatedAt: string;
  badge?: {
    text: string;
    color: string;
    type: 'featured' | 'new' | 'sale' | 'trending';
  };
  highlights?: string[];
  story?: string;
}

// Product Interface for brand-related products
export interface BrandProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  isBestSeller: boolean;
  isOnSale: boolean;
  category: string;
  colors: string[];
  sizes: string[];
  description: string;
  features: string[];
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
}

// Type for ProductCard compatibility
export interface ProductCardData {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  isBestSeller: boolean;
  isOnSale: boolean;
  brand?: string;
  discountPercent?: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  categories?: string[];
  category?: string;
}

// Complete Brand Data with More Details
export const brands: Brand[] = [
  {
    id: '1',
    name: 'Nike',
    slug: 'nike',
    description: 'World\'s leading athletic brand revolutionizing sportswear with cutting-edge technology and iconic designs.',
    slogan: 'Just Do It',
    icon: '👟',
    logo: '/brands/nike-logo.png',
    website: 'https://nike.com',
    founded: 1964,
    headquarters: 'Beaverton, Oregon, USA',
    productCount: 324,
    rating: 4.8,
    featured: true,
    categories: ['Running', 'Basketball', 'Training', 'Lifestyle', 'Soccer', 'Tennis'],
    specialties: ['Air Technology', 'Flyknit', 'React Foam', 'Dri-FIT', 'Zoom Air'],
    colors: ['#111111', '#FFFFFF', '#FF6B35', '#E1E1E1', '#FF0000'],
    tags: ['athletic', 'performance', 'premium', 'innovation', 'sports'],
    socialMedia: {
      instagram: '@nike',
      facebook: 'nike',
      twitter: 'Nike',
      youtube: 'nike',
      pinterest: 'nike'
    },
    shippingInfo: {
      freeShipping: true,
      minAmount: 50,
      returnDays: 30,
      warranty: '2-year warranty'
    },
    highlights: [
      'Founded by Bill Bowerman and Phil Knight',
      'Air Jordan collaboration changed sneaker culture',
      'Sustainable "Move to Zero" initiative',
      'Official sponsor of NBA and NFL'
    ],
    story: 'From selling shoes from a car trunk to becoming a $40 billion global empire, Nike transformed athletic footwear forever.',
    createdAt: '2023-01-15',
    updatedAt: '2024-01-20',
    badge: {
      text: 'Premium',
      color: 'bg-black',
      type: 'featured'
    }
  },
  {
    id: '2',
    name: 'Adidas',
    slug: 'adidas',
    description: 'German sportswear giant known for iconic three stripes, innovative Boost technology, and football heritage.',
    slogan: 'Impossible is Nothing',
    icon: '🏃',
    logo: '/brands/adidas-logo.png',
    website: 'https://adidas.com',
    founded: 1949,
    headquarters: 'Herzogenaurach, Germany',
    productCount: 287,
    rating: 4.7,
    featured: true,
    categories: ['Running', 'Soccer', 'Training', 'Lifestyle', 'Outdoor', 'Golf'],
    specialties: ['Boost Technology', 'Primeknit', 'Ultraboost', 'Stan Smith', 'Predator'],
    colors: ['#000000', '#FFFFFF', '#1E429F', '#D32F2F', '#0C4A34'],
    tags: ['german', 'football', 'performance', 'heritage', 'innovation'],
    socialMedia: {
      instagram: '@adidas',
      facebook: 'adidas',
      twitter: 'adidas',
      youtube: 'adidas'
    },
    shippingInfo: {
      freeShipping: true,
      minAmount: 75,
      returnDays: 30,
      warranty: '2-year warranty'
    },
    highlights: [
      'Official FIFA World Cup partner since 1970',
      'Created first spiked running shoe',
      'Parley ocean plastic collaboration',
      'Kanye West Yeezy partnership'
    ],
    story: 'Founded by Adolf "Adi" Dassler, adidas has been at the forefront of athletic innovation for over 70 years.',
    createdAt: '2023-02-10',
    updatedAt: '2024-01-18',
    badge: {
      text: 'Iconic',
      color: 'bg-blue-600',
      type: 'featured'
    }
  },
  {
    id: '3',
    name: 'Puma',
    slug: 'puma',
    description: 'Global sportswear brand born from sibling rivalry, known for speed, fashion, and innovative designs.',
    slogan: 'Forever Faster',
    icon: '🐆',
    logo: '/brands/puma-logo.png',
    website: 'https://puma.com',
    founded: 1948,
    headquarters: 'Herzogenaurach, Germany',
    productCount: 189,
    rating: 4.6,
    featured: true,
    categories: ['Running', 'Training', 'Golf', 'Lifestyle', 'Football', 'Motorsport'],
    specialties: ['IGNITE Foam', 'NRGY Beads', 'HYBRID Technology', 'RS-X Series'],
    colors: ['#000000', '#FFFFFF', '#FF6B35', '#FFD700', '#1A1A1A'],
    tags: ['speed', 'fashion', 'athletic', 'performance', 'trendy'],
    highlights: [
      'Brother of Adidas founder',
      'Official Ferrari partner',
      'Rihanna Fenty collaboration',
      'Cobra golf sponsorship'
    ],
    story: 'Rudolf Dassler split from his brother to create Puma, sparking one of sport\'s greatest rivalries.',
    shippingInfo: {
      freeShipping: true,
      minAmount: 60,
      returnDays: 30,
      warranty: '1-year warranty'
    },
    createdAt: '2023-03-05',
    updatedAt: '2024-01-22',
    badge: {
      text: 'Fast',
      color: 'bg-orange-500',
      type: 'trending'
    }
  },
  {
    id: '4',
    name: 'New Balance',
    slug: 'new-balance',
    description: 'American comfort specialists offering superior arch support and made-in-USA craftsmanship since 1906.',
    slogan: 'Fearlessly Independent',
    icon: '🏃‍♂️',
    logo: '/brands/newbalance-logo.png',
    website: 'https://newbalance.com',
    founded: 1906,
    headquarters: 'Boston, Massachusetts, USA',
    productCount: 203,
    rating: 4.7,
    featured: true,
    categories: ['Running', 'Walking', 'Athletic', 'Lifestyle', 'Trail', 'Baseball'],
    specialties: ['Fresh Foam', 'FuelCell', 'Orthotics Support', 'Made in USA'],
    colors: ['#111111', '#999999', '#FF6B35', '#FFFFFF', '#2E2E2E'],
    tags: ['comfort', 'support', 'american', 'quality', 'heritage'],
    socialMedia: {
      instagram: '@newbalance',
      facebook: 'newbalance',
      twitter: 'newbalance'
    },
    shippingInfo: {
      freeShipping: true,
      minAmount: 80,
      returnDays: 30,
      warranty: '3-year warranty'
    },
    highlights: [
      'Made in USA/UK factories',
      'Multiple width options',
      'Kawhi Leonard signature line',
      'Teddy Santis collaboration'
    ],
    story: 'Started as arch support company, grew into one of the world\'s most respected athletic footwear brands.',
    createdAt: '2023-04-12',
    updatedAt: '2024-01-15',
    badge: {
      text: 'Comfort',
      color: 'bg-gray-600',
      type: 'featured'
    }
  },
  {
    id: '5',
    name: 'Reebok',
    slug: 'reebok',
    description: 'Fitness-focused brand with CrossFit heritage, classic styles, and performance innovation.',
    slogan: 'Be More Human',
    icon: '💪',
    logo: '/brands/reebok-logo.png',
    website: 'https://reebok.com',
    founded: 1958,
    headquarters: 'Boston, Massachusetts, USA',
    productCount: 145,
    rating: 4.5,
    featured: false,
    categories: ['Training', 'Crossfit', 'Running', 'Classic', 'Fitness', 'Combat Sports'],
    specialties: ['Nano Series', 'Floatride Energy', 'Classic Leather', 'CrossFit Games'],
    colors: ['#000000', '#FFFFFF', '#E2231A', '#333333', '#FFD700'],
    tags: ['fitness', 'crossfit', 'heritage', 'training', 'gym'],
    highlights: [
      'Official CrossFit sponsor',
      'Pump technology innovation',
      'Shaq Attaq nostalgia',
      'Les Mills collaboration'
    ],
    story: 'From spiked running shoes to fitness revolution, Reebok has been empowering athletes for decades.',
    shippingInfo: {
      freeShipping: true,
      minAmount: 70,
      returnDays: 30,
      warranty: '1-year warranty'
    },
    createdAt: '2023-05-20',
    updatedAt: '2024-01-25',
    badge: {
      text: 'Fitness',
      color: 'bg-red-500',
      type: 'trending'
    }
  },
  {
    id: '6',
    name: 'Converse',
    slug: 'converse',
    description: 'Iconic American brand famous for Chuck Taylor All Star sneakers and timeless street style.',
    slogan: 'Forever Chuck',
    icon: '⭐',
    logo: '/brands/converse-logo.png',
    website: 'https://converse.com',
    founded: 1908,
    headquarters: 'Boston, Massachusetts, USA',
    productCount: 156,
    rating: 4.9,
    featured: true,
    categories: ['Lifestyle', 'Casual', 'Skate', 'Classic'],
    specialties: ['Chuck Taylor', 'All Star', 'One Star', 'Jack Purcell'],
    colors: ['#000000', '#FFFFFF', '#FF6B35', '#FF0000'],
    tags: ['iconic', 'classic', 'casual', 'cultural'],
    socialMedia: {
      instagram: '@converse',
      facebook: 'converse',
      twitter: 'Converse'
    },
    shippingInfo: {
      freeShipping: true,
      minAmount: 50,
      returnDays: 30,
      warranty: '1-year warranty'
    },
    highlights: [
      'First basketball shoe (1917)',
      'Chuck Taylor endorsement (1921)',
      'Acquired by Nike (2003)',
      'Cultural icon in music and fashion'
    ],
    story: 'From basketball courts to punk rock stages, Converse has been defining cool for over a century.',
    createdAt: '2023-06-08',
    updatedAt: '2024-01-28',
    badge: {
      text: 'Iconic',
      color: 'bg-black',
      type: 'featured'
    }
  },
  {
    id: '7',
    name: 'Vans',
    slug: 'vans',
    description: 'Skateboarding brand known for durable, stylish sneakers and authentic skate culture.',
    slogan: 'Off The Wall',
    icon: '🛹',
    logo: '/brands/vans-logo.png',
    website: 'https://vans.com',
    founded: 1966,
    headquarters: 'Costa Mesa, California, USA',
    productCount: 198,
    rating: 4.8,
    featured: true,
    categories: ['Skate', 'Lifestyle', 'Casual', 'Surf'],
    specialties: ['Authentic', 'Old Skool', 'Sk8-Hi', 'Slip-On'],
    colors: ['#000000', '#FFFFFF', '#FF6B35', '#0000FF'],
    tags: ['skate', 'california', 'authentic', 'durable'],
    shippingInfo: {
      freeShipping: true,
      minAmount: 75,
      returnDays: 30,
      warranty: '2-year warranty'
    },
    highlights: [
      'Started as "Van Doren Rubber Company"',
      'Custom shoe service for skaters (1970s)',
      'Warped Tour sponsor',
      'Checkerboard slip-on icon'
    ],
    story: 'What started as a small shoe company for surfers and skaters became a global youth culture phenomenon.',
    createdAt: '2023-07-14',
    updatedAt: '2024-01-30',
    badge: {
      text: 'Skate',
      color: 'bg-blue-500',
      type: 'featured'
    }
  },
  {
    id: '8',
    name: 'Under Armour',
    slug: 'under-armour',
    description: 'Performance apparel and footwear brand with innovative moisture-wicking technology.',
    slogan: 'I Will',
    icon: '🛡️',
    logo: '/brands/underarmour-logo.png',
    website: 'https://underarmour.com',
    founded: 1996,
    headquarters: 'Baltimore, Maryland, USA',
    productCount: 134,
    rating: 4.6,
    featured: false,
    categories: ['Athletic', 'Training', 'Running', 'Basketball'],
    specialties: ['HOVR', 'Charged', 'Micro G', 'HeatGear'],
    colors: ['#000000', '#FFFFFF', '#1E1F26', '#FF6B35'],
    tags: ['performance', 'innovation', 'athletic', 'tech'],
    shippingInfo: {
      freeShipping: true,
      minAmount: 100,
      returnDays: 30,
      warranty: '1-year warranty'
    },
    highlights: [
      'Founded by former football player Kevin Plank',
      'Started with $40,000 in credit card debt',
      'Official outfitter of NFL and MLB',
      'Stephen Curry signature line'
    ],
    story: 'A simple idea - make a better t-shirt for athletes - turned into a billion-dollar sportswear empire.',
    createdAt: '2023-08-22',
    updatedAt: '2024-01-10',
    badge: {
      text: 'Performance',
      color: 'bg-gray-800',
      type: 'trending'
    }
  }
];

// Brand-Specific Products Data
export const brandProducts: Record<string, BrandProduct[]> = {
  nike: [
    {
      id: 'nike-air-max-270',
      name: 'Nike Air Max 270',
      slug: 'nike-air-max-270',
      price: 150,
      originalPrice: 180,
      image: '/products/nike-airmax-270.jpg',
      rating: 4.7,
      reviews: 1256,
      isNew: true,
      isBestSeller: true,
      isOnSale: true,
      category: 'Lifestyle',
      colors: ['#000000', '#FFFFFF', '#FF0000'],
      sizes: ['7', '8', '9', '10', '11', '12'],
      description: 'The Nike Air Max 270 delivers the biggest Air unit yet for unbelievable, all-day comfort.',
      features: ['Max Air cushioning', 'Breathable mesh upper', 'Rubber outsole'],
      stockStatus: 'in_stock'
    },
    {
      id: 'nike-metcon-8',
      name: 'Nike Metcon 8',
      slug: 'nike-metcon-8',
      price: 130,
      image: '/products/nike-metcon8.jpg',
      rating: 4.8,
      reviews: 987,
      isNew: false,
      isBestSeller: true,
      isOnSale: false,
      category: 'Training',
      colors: ['#1E429F', '#000000'],
      sizes: ['7', '8', '9', '10', '11'],
      description: 'Built for your hardest workouts with stability and durability for weight training.',
      features: ['Dual-density foam', 'Rope guard', 'Hyperlift insert'],
      stockStatus: 'in_stock'
    },
    {
      id: 'nike-pegasus-40',
      name: 'Nike Pegasus 40',
      slug: 'nike-pegasus-40',
      price: 120,
      originalPrice: 140,
      image: '/products/nike-pegasus40.jpg',
      rating: 4.6,
      reviews: 2345,
      isNew: false,
      isBestSeller: true,
      isOnSale: true,
      category: 'Running',
      colors: ['#FF6B35', '#000000', '#FFFFFF'],
      sizes: ['6', '7', '8', '9', '10', '11', '12'],
      description: 'The workhorse with React foam and Air Zoom units for responsive cushioning.',
      features: ['React foam', 'Air Zoom units', 'Breathable mesh'],
      stockStatus: 'in_stock'
    },
    {
      id: 'nike-dunk-low',
      name: 'Nike Dunk Low',
      slug: 'nike-dunk-low',
      price: 110,
      image: '/products/nike-dunk.jpg',
      rating: 4.9,
      reviews: 3456,
      isNew: true,
      isBestSeller: true,
      isOnSale: false,
      category: 'Lifestyle',
      colors: ['#111111', '#FFFFFF'],
      sizes: ['7', '8', '9', '10', '11'],
      description: 'Classic basketball-inspired design with premium leather construction.',
      features: ['Premium leather', 'Foam midsole', 'Rubber outsole'],
      stockStatus: 'low_stock'
    }
  ],
  adidas: [
    {
      id: 'adidas-ultraboost-23',
      name: 'Adidas Ultraboost 23',
      slug: 'adidas-ultraboost-23',
      price: 190,
      originalPrice: 220,
      image: '/products/adidas-ultraboost23.jpg',
      rating: 4.9,
      reviews: 1890,
      isNew: true,
      isBestSeller: true,
      isOnSale: true,
      category: 'Running',
      colors: ['#000000', '#FFFFFF', '#1E429F'],
      sizes: ['7', '8', '9', '10', '11'],
      description: 'Ultimate running shoe with Boost technology and Primeknit upper.',
      features: ['Boost midsole', 'Primeknit upper', 'Continental rubber'],
      stockStatus: 'in_stock'
    },
    {
      id: 'adidas-stan-smith',
      name: 'Adidas Stan Smith',
      slug: 'adidas-stan-smith',
      price: 85,
      image: '/products/adidas-stansmith.jpg',
      rating: 4.7,
      reviews: 4567,
      isNew: false,
      isBestSeller: true,
      isOnSale: false,
      category: 'Lifestyle',
      colors: ['#FFFFFF', '#000000'],
      sizes: ['6', '7', '8', '9', '10', '11'],
      description: 'Iconic leather sneaker with perforated 3-Stripes and rubber cupsole.',
      features: ['Premium leather', 'Ortholite sockliner', 'Rubber outsole'],
      stockStatus: 'in_stock'
    },
    {
      id: 'adidas-predator-edge',
      name: 'Adidas Predator Edge',
      slug: 'adidas-predator-edge',
      price: 250,
      image: '/products/adidas-predator.jpg',
      rating: 4.8,
      reviews: 678,
      isNew: true,
      isBestSeller: false,
      isOnSale: false,
      category: 'Soccer',
      colors: ['#FF0000', '#000000'],
      sizes: ['8', '9', '10', '11'],
      description: 'Revolutionary soccer cleats with Demonskin technology for superior grip.',
      features: ['Demonskin spikes', 'Primeknit collar', 'Carbitex plate'],
      stockStatus: 'low_stock'
    },
    {
      id: 'adidas-samba',
      name: 'Adidas Samba',
      slug: 'adidas-samba',
      price: 90,
      image: '/products/adidas-samba.jpg',
      rating: 4.8,
      reviews: 2890,
      isNew: false,
      isBestSeller: true,
      isOnSale: false,
      category: 'Lifestyle',
      colors: ['#000000', '#FFFFFF'],
      sizes: ['7', '8', '9', '10', '11'],
      description: 'Classic indoor soccer shoe turned streetwear icon.',
      features: ['Leather upper', 'Gum rubber sole', 'Classic design'],
      stockStatus: 'in_stock'
    }
  ],
  puma: [
    {
      id: 'puma-rs-x',
      name: 'Puma RS-X',
      slug: 'puma-rs-x',
      price: 110,
      originalPrice: 130,
      image: '/products/puma-rsx.jpg',
      rating: 4.5,
      reviews: 890,
      isNew: false,
      isBestSeller: true,
      isOnSale: true,
      category: 'Lifestyle',
      colors: ['#FF6B35', '#000000', '#FFFFFF'],
      sizes: ['7', '8', '9', '10'],
      description: 'Chunky sneaker with retro-futuristic design and comfortable cushioning.',
      features: ['RS cushioning', 'Synthetic upper', 'Rubber outsole'],
      stockStatus: 'in_stock'
    },
    {
      id: 'puma-ignite-profoam',
      name: 'Puma IGNITE Profoam',
      slug: 'puma-ignite-profoam',
      price: 125,
      originalPrice: 150,
      image: '/products/puma-ignite.jpg',
      rating: 4.6,
      reviews: 543,
      isNew: true,
      isBestSeller: false,
      isOnSale: true,
      category: 'Running',
      colors: ['#000000', '#1A1A1A'],
      sizes: ['8', '9', '10', '11'],
      description: 'High-energy return running shoe with Profoam technology.',
      features: ['IGNITE foam', 'Breathable mesh', 'EverTrack rubber'],
      stockStatus: 'in_stock'
    },
    {
      id: 'puma-suede',
      name: 'Puma Suede Classic',
      slug: 'puma-suede-classic',
      price: 80,
      image: '/products/puma-suede.jpg',
      rating: 4.7,
      reviews: 2345,
      isNew: false,
      isBestSeller: true,
      isOnSale: false,
      category: 'Lifestyle',
      colors: ['#000000', '#FF6B35', '#FFFFFF'],
      sizes: ['7', '8', '9', '10', '11'],
      description: 'Iconic basketball shoe from the 1960s, perfect for street style.',
      features: ['Suede upper', 'Rubber outsole', 'Formstrip detail'],
      stockStatus: 'in_stock'
    }
  ],
  'new-balance': [
    {
      id: 'new-balance-990v6',
      name: 'New Balance 990v6',
      slug: 'new-balance-990v6',
      price: 185,
      image: '/products/nb-990v6.jpg',
      rating: 4.8,
      reviews: 987,
      isNew: true,
      isBestSeller: true,
      isOnSale: false,
      category: 'Running',
      colors: ['#999999', '#111111'],
      sizes: ['7', '8', '9', '10', '11', '12'],
      description: 'Made in USA running shoe with premium materials and superior comfort.',
      features: ['FuelCell midsole', 'Pigskin suede', 'Dual-density collar'],
      stockStatus: 'in_stock'
    },
    {
      id: 'new-balance-574',
      name: 'New Balance 574',
      slug: 'new-balance-574',
      price: 85,
      image: '/products/nb-574.jpg',
      rating: 4.6,
      reviews: 4567,
      isNew: false,
      isBestSeller: true,
      isOnSale: true,
      category: 'Lifestyle',
      colors: ['#111111', '#FF6B35', '#FFFFFF'],
      sizes: ['7', '8', '9', '10', '11'],
      description: 'Classic heritage runner with ENCAP cushioning technology.',
      features: ['ENCAP midsole', 'Suede/mesh upper', 'Rubber outsole'],
      stockStatus: 'in_stock'
    }
  ],
  converse: [
    {
      id: 'converse-chuck-70',
      name: 'Converse Chuck 70',
      slug: 'converse-chuck-70',
      price: 95,
      originalPrice: 110,
      image: '/products/converse-chuck70.jpg',
      rating: 4.9,
      reviews: 6789,
      isNew: false,
      isBestSeller: true,
      isOnSale: true,
      category: 'Lifestyle',
      colors: ['#000000', '#FFFFFF', '#FF0000'],
      sizes: ['6', '7', '8', '9', '10', '11'],
      description: 'Premium version of the iconic Chuck Taylor with upgraded materials.',
      features: ['Higher rubber foxing', 'Ortholite sockliner', 'Durable canvas'],
      stockStatus: 'in_stock'
    },
    {
      id: 'converse-one-star',
      name: 'Converse One Star',
      slug: 'converse-one-star',
      price: 85,
      image: '/products/converse-onestar.jpg',
      rating: 4.7,
      reviews: 2345,
      isNew: true,
      isBestSeller: false,
      isOnSale: false,
      category: 'Skate',
      colors: ['#111111', '#FF6B35'],
      sizes: ['7', '8', '9', '10', '11'],
      description: 'Skateboarding classic with suede upper and star logo.',
      features: ['Suede upper', 'Star logo', 'Cushioned footbed'],
      stockStatus: 'in_stock'
    }
  ],
  vans: [
    {
      id: 'vans-old-skool',
      name: 'Vans Old Skool',
      slug: 'vans-old-skool',
      price: 70,
      image: '/products/vans-oldskool.jpg',
      rating: 4.8,
      reviews: 5678,
      isNew: false,
      isBestSeller: true,
      isOnSale: false,
      category: 'Skate',
      colors: ['#000000', '#0000FF'],
      sizes: ['6', '7', '8', '9', '10', '11'],
      description: 'The classic skate shoe that started it all, featuring the iconic side stripe.',
      features: ['Suede/canvas upper', 'Waffle outsole', 'Padded collar'],
      stockStatus: 'in_stock'
    },
    {
      id: 'vans-sk8-hi',
      name: 'Vans Sk8-Hi',
      slug: 'vans-sk8-hi',
      price: 80,
      image: '/products/vans-sk8hi.jpg',
      rating: 4.9,
      reviews: 3456,
      isNew: true,
      isBestSeller: true,
      isOnSale: false,
      category: 'Skate',
      colors: ['#000000', '#FFFFFF', '#111111'],
      sizes: ['7', '8', '9', '10', '11'],
      description: 'Legendary high top laced with durability and style.',
      features: ['High top profile', 'Reinforced toecaps', 'Signature rubber waffle outsoles'],
      stockStatus: 'in_stock'
    },
    {
      id: 'vans-checkerboard-slip-on',
      name: 'Vans Checkerboard Slip-On',
      slug: 'vans-checkerboard-slip-on',
      price: 65,
      image: '/products/vans-slipon.jpg',
      rating: 4.7,
      reviews: 4321,
      isNew: false,
      isBestSeller: true,
      isOnSale: true,
      category: 'Casual',
      colors: ['#000000', '#FFFFFF', '#FF0000'],
      sizes: ['6', '7', '8', '9', '10', '11'],
      description: 'The world\'s most iconic slip-on shoe, instantly recognizable.',
      features: ['Canvas upper', 'Elastic side accents', 'Original waffle outsoles'],
      stockStatus: 'in_stock'
    }
  ],
  'under-armour': [
    {
      id: 'ua-curry-10',
      name: 'Curry Flow 10',
      slug: 'ua-curry-flow-10',
      price: 160,
      image: '/products/ua-curry10.jpg',
      rating: 4.8,
      reviews: 1234,
      isNew: true,
      isBestSeller: true,
      isOnSale: false,
      category: 'Basketball',
      colors: ['#0000FF', '#FFD700', '#FFFFFF'],
      sizes: ['8', '9', '10', '11', '12', '13'],
      description: 'Steph Curry\'s latest signature shoe changed the game for good.',
      features: ['UA Flow cushioning', 'UA Warp upper', 'Internal midfoot shank'],
      stockStatus: 'in_stock'
    },
    {
      id: 'ua-charged-assert',
      name: 'UA Charged Assert 9',
      slug: 'ua-charged-assert-9',
      price: 75,
      originalPrice: 90,
      image: '/products/ua-charged.jpg',
      rating: 4.5,
      reviews: 2100,
      isNew: false,
      isBestSeller: true,
      isOnSale: true,
      category: 'Running',
      colors: ['#000000', '#808080'],
      sizes: ['7', '8', '9', '10', '11', '12'],
      description: 'Built to help anyone go faster - Charged Cushioning® helps protect against impact.',
      features: ['Charged Cushioning', 'Lightweight mesh upper', 'Durable leather overlays'],
      stockStatus: 'in_stock'
    },
    {
      id: 'ua-project-rock',
      name: 'Project Rock 6',
      slug: 'ua-project-rock-6',
      price: 160,
      image: '/products/ua-projectrock.jpg',
      rating: 4.9,
      reviews: 890,
      isNew: true,
      isBestSeller: false,
      isOnSale: false,
      category: 'Training',
      colors: ['#000000', '#1E1F26'],
      sizes: ['8', '9', '10', '11', '12'],
      description: 'Approved by Dwayne Johnson for the hardest workers in the room.',
      features: ['UA Tribase', 'External heel clip', 'Engineered mesh upper'],
      stockStatus: 'low_stock'
    }
  ],
  reebok: [
    {
      id: 'reebok-club-c',
      name: 'Reebok Club C 85',
      slug: 'reebok-club-c-85',
      price: 90,
      image: '/products/reebok-clubc.jpg',
      rating: 4.8,
      reviews: 3210,
      isNew: false,
      isBestSeller: true,
      isOnSale: false,
      category: 'Classic',
      colors: ['#FFFFFF', '#F5F5F5'],
      sizes: ['6', '7', '8', '9', '10', '11'],
      description: 'The champion of the court from 1985, updated for modern style.',
      features: ['Soft leather upper', 'Molded sockliner', 'EVA midsole'],
      stockStatus: 'in_stock'
    },
    {
      id: 'reebok-nano-x3',
      name: 'Reebok Nano X3',
      slug: 'reebok-nano-x3',
      price: 140,
      originalPrice: 150,
      image: '/products/reebok-nanox3.jpg',
      rating: 4.7,
      reviews: 987,
      isNew: true,
      isBestSeller: true,
      isOnSale: true,
      category: 'Training',
      colors: ['#000000', '#E2231A'],
      sizes: ['7', '8', '9', '10', '11', '12'],
      description: 'The official shoe of fitness, built for lifting and running.',
      features: ['Lift and Run Chassis', 'Floatride Energy Foam', 'Flexweave upper'],
      stockStatus: 'in_stock'
    },
    {
      id: 'reebok-classic-leather',
      name: 'Classic Leather',
      slug: 'reebok-classic-leather',
      price: 85,
      image: '/products/reebok-classicleather.jpg',
      rating: 4.6,
      reviews: 4567,
      isNew: false,
      isBestSeller: true,
      isOnSale: false,
      category: 'Classic',
      colors: ['#FFFFFF', '#000000'],
      sizes: ['6', '7', '8', '9', '10', '11'],
      description: 'Always iconic. Always classic. The definition of timeless style.',
      features: ['Garment leather upper', 'Die-cut EVA midsole', 'High abrasion rubber outsole'],
      stockStatus: 'in_stock'
    }
  ]
};

// ============== EXPORTED FUNCTIONS ==============

// Fetch all brands
export const fetchBrands = (): Brand[] => {
  return brands;
};

// Fetch brand by slug
export const fetchBrandBySlug = (slug: string): Brand | undefined => {
  return brands.find(brand => brand.slug === slug);
};

// Get related brands
export const getRelatedBrands = (currentBrand: Brand, limit: number = 4): Brand[] => {
  return brands
    .filter(brand => 
      brand.id !== currentBrand.id && 
      brand.categories.some(cat => currentBrand.categories.includes(cat))
    )
    .slice(0, limit);
};

// Get all brand categories
export const getAllBrandCategories = (): string[] => {
  const allCategories = new Set<string>();
  brands.forEach(brand => {
    brand.categories.forEach(category => allCategories.add(category));
  });
  return Array.from(allCategories);
};

// Get brand statistics
export const getBrandStats = () => {
  const totalBrands = brands.length;
  const featuredBrands = brands.filter(b => b.featured).length;
  const avgRating = brands.reduce((sum, b) => sum + b.rating, 0) / totalBrands;
  const totalProducts = brands.reduce((sum, b) => sum + b.productCount, 0);
  
  return {
    totalBrands,
    featuredBrands,
    avgRating: parseFloat(avgRating.toFixed(1)),
    totalProducts,
    categories: getAllBrandCategories().length,
    newestBrand: brands.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]?.name
  };
};

// Get featured brands
export const getFeaturedBrands = (limit: number = 6): Brand[] => {
  return brands
    .filter(brand => brand.featured)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

// Get top rated brands
export const getTopRatedBrands = (limit: number = 8): Brand[] => {
  return brands
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

// Search brands
export const searchBrands = (query: string): Brand[] => {
  if (!query.trim()) return brands;
  
  const searchTerm = query.toLowerCase();
  return brands.filter(brand => 
    brand.name.toLowerCase().includes(searchTerm) ||
    brand.description.toLowerCase().includes(searchTerm) ||
    brand.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    brand.categories.some(category => category.toLowerCase().includes(searchTerm)) ||
    brand.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm))
  );
};

// Get brands by category
export const getBrandsByCategory = (category: string): Brand[] => {
  return brands.filter(brand => 
    brand.categories.some(cat => 
      cat.toLowerCase() === category.toLowerCase()
    )
  );
};

// Get brand products
export const getBrandProducts = (brandSlug: string, limit: number = 3): BrandProduct[] => {
  return brandProducts[brandSlug]?.slice(0, limit) || [];
};

// Get all brand products
export const getAllBrandProducts = (brandSlug: string): BrandProduct[] => {
  return brandProducts[brandSlug] || [];
};

// Get similar brands
export const getSimilarBrands = (brandSlug: string, limit: number = 3): Brand[] => {
  const currentBrand = fetchBrandBySlug(brandSlug);
  if (!currentBrand) return [];
  
  return getRelatedBrands(currentBrand, limit);
};

// Get brands by rating
export const getBrandsByRating = (minRating: number = 4.0): Brand[] => {
  return brands.filter(brand => brand.rating >= minRating);
};

// Get newest brands
export const getNewestBrands = (limit: number = 4): Brand[] => {
  return [...brands]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};

// Get popular brands (by product count)
export const getPopularBrands = (limit: number = 5): Brand[] => {
  return [...brands]
    .sort((a, b) => b.productCount - a.productCount)
    .slice(0, limit);
};

// ============== PRODUCT FUNCTIONS ==============

// Function to get products by brand and category (MAIN FUNCTION FOR CategoryProducts)
export const getProductsByBrandAndCategory = (
  brandName: string, 
  category?: string, 
  limit: number = 8
): ProductCardData[] => {
  const brandSlug = brandName.toLowerCase().replace(/\s+/g, '-');
  const products = brandProducts[brandSlug] || [];
  
  let filteredProducts = products;
  
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  return filteredProducts
    .slice(0, limit)
    .map(product => {
      const discountPercent = product.originalPrice && product.price < product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : undefined;
      
      return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        rating: product.rating,
        reviews: product.reviews,
        isNew: product.isNew,
        isBestSeller: product.isBestSeller,
        isOnSale: product.isOnSale,
        brand: brandName,
        discountPercent,
        stockStatus: product.stockStatus,
        categories: [product.category],
        category: product.category
      };
    });
};

// Function to get featured products from brand
export const getFeaturedProductsFromBrand = (
  brandName: string,
  limit: number = 6
): ProductCardData[] => {
  return getProductsByBrandAndCategory(brandName, undefined, limit)
    .sort((a, b) => b.rating - a.rating);
};

// Function to get popular products from brand
export const getPopularProductsFromBrand = (
  brandName: string,
  limit: number = 8
): ProductCardData[] => {
  return getProductsByBrandAndCategory(brandName, undefined, limit)
    .sort((a, b) => b.reviews - a.reviews);
};

// Function to get best selling products from brand
export const getBestSellingProductsFromBrand = (
  brandName: string,
  limit: number = 6
): ProductCardData[] => {
  return getProductsByBrandAndCategory(brandName, undefined, limit)
    .filter(product => product.isBestSeller)
    .slice(0, limit);
};

// Function to get new arrivals from brand
export const getNewArrivalsFromBrand = (
  brandName: string,
  limit: number = 4
): ProductCardData[] => {
  return getProductsByBrandAndCategory(brandName, undefined, limit)
    .filter(product => product.isNew)
    .slice(0, limit);
};

// Helper function to convert BrandProduct to ProductCardData
export const convertToProductCardData = (
  brandProduct: BrandProduct, 
  brandName: string
): ProductCardData => {
  const discountPercent = brandProduct.originalPrice && brandProduct.price < brandProduct.originalPrice
    ? Math.round(((brandProduct.originalPrice - brandProduct.price) / brandProduct.originalPrice) * 100)
    : undefined;
  
  return {
    id: brandProduct.id,
    slug: brandProduct.slug,
    name: brandProduct.name,
    price: brandProduct.price,
    originalPrice: brandProduct.originalPrice,
    image: brandProduct.image,
    rating: brandProduct.rating,
    reviews: brandProduct.reviews,
    isNew: brandProduct.isNew,
    isBestSeller: brandProduct.isBestSeller,
    isOnSale: brandProduct.isOnSale,
    brand: brandName,
    discountPercent,
    stockStatus: brandProduct.stockStatus,
    categories: [brandProduct.category],
    category: brandProduct.category
  };
};

// Get brand categories with product counts
export const getBrandCategoriesWithCounts = (brandName: string): {category: string, count: number}[] => {
  const brandSlug = brandName.toLowerCase().replace(/\s+/g, '-');
  const products = brandProducts[brandSlug] || [];
  
  const categoryCounts: Record<string, number> = {};
  products.forEach(product => {
    const category = product.category;
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });
  
  return Object.entries(categoryCounts).map(([category, count]) => ({
    category,
    count
  }));
};