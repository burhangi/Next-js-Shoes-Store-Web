import { MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface Store {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  contact: {
    phone: string;
    email: string;
  };
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  features: string[];
  image: string;
  isFlagship?: boolean;
  isComingSoon?: boolean;
}

export interface StoreFeature {
  id: string;
  name: string;
  icon: LucideIcon;
}

export const stores: Store[] = [
  {
    id: 'nyc-flagship',
    name: 'New York Flagship Store',
    address: {
      street: '520 Fifth Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10036',
      country: 'USA'
    },
    coordinates: {
      lat: 40.7549,
      lng: -73.9840
    },
    contact: {
      phone: '+1 (212) 555-0100',
      email: 'nyc@shoesstore.com'
    },
    hours: {
      monday: '10:00 AM - 9:00 PM',
      tuesday: '10:00 AM - 9:00 PM',
      wednesday: '10:00 AM - 9:00 PM',
      thursday: '10:00 AM - 9:00 PM',
      friday: '10:00 AM - 10:00 PM',
      saturday: '10:00 AM - 10:00 PM',
      sunday: '11:00 AM - 8:00 PM'
    },
    features: [
      'Personal Shopping',
      'Premium Collection',
      'Express Alterations',
      'VIP Lounge',
      'Complimentary Refreshments'
    ],
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
    isFlagship: true
  },
  {
    id: 'la-beverly',
    name: 'Los Angeles - Beverly Hills',
    address: {
      street: '9600 Wilshire Boulevard',
      city: 'Beverly Hills',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    coordinates: {
      lat: 34.0672,
      lng: -118.3988
    },
    contact: {
      phone: '+1 (310) 555-0200',
      email: 'la@shoesstore.com'
    },
    hours: {
      monday: '10:00 AM - 8:00 PM',
      tuesday: '10:00 AM - 8:00 PM',
      wednesday: '10:00 AM - 8:00 PM',
      thursday: '10:00 AM - 8:00 PM',
      friday: '10:00 AM - 9:00 PM',
      saturday: '10:00 AM - 9:00 PM',
      sunday: '11:00 AM - 7:00 PM'
    },
    features: [
      'Celebrity Styling',
      'Exclusive Releases',
      'Valet Parking',
      'Personal Shopping'
    ],
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80',
    isFlagship: true
  },
  {
    id: 'miami-design',
    name: 'Miami Design District',
    address: {
      street: '140 NE 39th Street',
      city: 'Miami',
      state: 'FL',
      zipCode: '33137',
      country: 'USA'
    },
    coordinates: {
      lat: 25.8103,
      lng: -80.1910
    },
    contact: {
      phone: '+1 (305) 555-0300',
      email: 'miami@shoesstore.com'
    },
    hours: {
      monday: '11:00 AM - 8:00 PM',
      tuesday: '11:00 AM - 8:00 PM',
      wednesday: '11:00 AM - 8:00 PM',
      thursday: '11:00 AM - 8:00 PM',
      friday: '11:00 AM - 9:00 PM',
      saturday: '11:00 AM - 9:00 PM',
      sunday: '12:00 PM - 7:00 PM'
    },
    features: [
      'Resort Collection',
      'Express Shipping',
      'Personal Shopping',
      'Art Gallery'
    ],
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80'
  },
  {
    id: 'chicago-mag',
    name: 'Chicago - Magnificent Mile',
    address: {
      street: '835 N Michigan Avenue',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60611',
      country: 'USA'
    },
    coordinates: {
      lat: 41.8976,
      lng: -87.6252
    },
    contact: {
      phone: '+1 (312) 555-0400',
      email: 'chicago@shoesstore.com'
    },
    hours: {
      monday: '10:00 AM - 8:00 PM',
      tuesday: '10:00 AM - 8:00 PM',
      wednesday: '10:00 AM - 8:00 PM',
      thursday: '10:00 AM - 8:00 PM',
      friday: '10:00 AM - 9:00 PM',
      saturday: '10:00 AM - 9:00 PM',
      sunday: '11:00 AM - 7:00 PM'
    },
    features: [
      'Personal Shopping',
      'Gift Wrapping',
      'Express Alterations',
      'Complimentary Coffee'
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
  },
  {
    id: 'san-francisco',
    name: 'San Francisco - Union Square',
    address: {
      street: '865 Market Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
      country: 'USA'
    },
    coordinates: {
      lat: 37.7844,
      lng: -122.4078
    },
    contact: {
      phone: '+1 (415) 555-0500',
      email: 'sf@shoesstore.com'
    },
    hours: {
      monday: '10:00 AM - 8:00 PM',
      tuesday: '10:00 AM - 8:00 PM',
      wednesday: '10:00 AM - 8:00 PM',
      thursday: '10:00 AM - 8:00 PM',
      friday: '10:00 AM - 9:00 PM',
      saturday: '10:00 AM - 9:00 PM',
      sunday: '11:00 AM - 7:00 PM'
    },
    features: [
      'Tech Integration',
      'Virtual Try-On',
      'Personal Shopping',
      'Eco-Friendly Packaging'
    ],
    image: 'https://images.unsplash.com/photo-1516765657420-c4d8fcdd64f8?w=800&q=80'
  },
  {
    id: 'boston',
    name: 'Boston - Newbury Street',
    address: {
      street: '338 Newbury Street',
      city: 'Boston',
      state: 'MA',
      zipCode: '02115',
      country: 'USA'
    },
    coordinates: {
      lat: 42.3505,
      lng: -71.0868
    },
    contact: {
      phone: '+1 (617) 555-0600',
      email: 'boston@shoesstore.com'
    },
    hours: {
      monday: '10:00 AM - 8:00 PM',
      tuesday: '10:00 AM - 8:00 PM',
      wednesday: '10:00 AM - 8:00 PM',
      thursday: '10:00 AM - 8:00 PM',
      friday: '10:00 AM - 9:00 PM',
      saturday: '10:00 AM - 9:00 PM',
      sunday: '11:00 AM - 7:00 PM'
    },
    features: [
      'Heritage Collection',
      'Personal Shopping',
      'Gift Registry',
      'Express Shipping'
    ],
    image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&q=80'
  },
  {
    id: 'seattle',
    name: 'Seattle - Downtown',
    address: {
      street: '500 Pine Street',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA'
    },
    coordinates: {
      lat: 47.6117,
      lng: -122.3365
    },
    contact: {
      phone: '+1 (206) 555-0700',
      email: 'seattle@shoesstore.com'
    },
    hours: {
      monday: '10:00 AM - 8:00 PM',
      tuesday: '10:00 AM - 8:00 PM',
      wednesday: '10:00 AM - 8:00 PM',
      thursday: '10:00 AM - 8:00 PM',
      friday: '10:00 AM - 9:00 PM',
      saturday: '10:00 AM - 9:00 PM',
      sunday: '11:00 AM - 7:00 PM'
    },
    features: [
      'Outdoor Collection',
      'Personal Shopping',
      'Tech Integration',
      'Coffee Bar'
    ],
    image: 'https://images.unsplash.com/photo-1540206395-68808572332f?w=800&q=80'
  },
  {
    id: 'austin',
    name: 'Austin - South Congress',
    address: {
      street: '1428 South Congress Avenue',
      city: 'Austin',
      state: 'TX',
      zipCode: '78704',
      country: 'USA'
    },
    coordinates: {
      lat: 30.2525,
      lng: -97.7493
    },
    contact: {
      phone: '+1 (512) 555-0800',
      email: 'austin@shoesstore.com'
    },
    hours: {
      monday: '11:00 AM - 8:00 PM',
      tuesday: '11:00 AM - 8:00 PM',
      wednesday: '11:00 AM - 8:00 PM',
      thursday: '11:00 AM - 8:00 PM',
      friday: '11:00 AM - 9:00 PM',
      saturday: '11:00 AM - 9:00 PM',
      sunday: '12:00 PM - 7:00 PM'
    },
    features: [
      'Local Artists',
      'Live Music Events',
      'Personal Shopping',
      'Sustainable Products'
    ],
    image: 'https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=800&q=80',
    isComingSoon: false
  },
  {
    id: 'atlanta',
    name: 'Atlanta - Buckhead',
    address: {
      street: '3393 Peachtree Road NE',
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30326',
      country: 'USA'
    },
    coordinates: {
      lat: 33.8470,
      lng: -84.3667
    },
    contact: {
      phone: '+1 (404) 555-0900',
      email: 'atlanta@shoesstore.com'
    },
    hours: {
      monday: '10:00 AM - 8:00 PM',
      tuesday: '10:00 AM - 8:00 PM',
      wednesday: '10:00 AM - 8:00 PM',
      thursday: '10:00 AM - 8:00 PM',
      friday: '10:00 AM - 9:00 PM',
      saturday: '10:00 AM - 9:00 PM',
      sunday: '12:00 PM - 7:00 PM'
    },
    features: [
      'Southern Collection',
      'Personal Shopping',
      'Valet Parking',
      'Express Alterations'
    ],
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80'
  }
];

export const storeFeatures: StoreFeature[] = [
  { id: 'personal-shopping', name: 'Personal Shopping', icon: MapPin },
  { id: 'express-alterations', name: 'Express Alterations', icon: Clock },
  { id: 'vip-lounge', name: 'VIP Lounge', icon: Phone },
  { id: 'gift-wrapping', name: 'Gift Wrapping', icon: Mail },
  { id: 'valet-parking', name: 'Valet Parking', icon: Navigation }
];

export const cities = Array.from(new Set(stores.map(store => store.address.city))).sort();
export const states = Array.from(new Set(stores.map(store => store.address.state))).sort();

export function getStoresByCity(city: string): Store[] {
  return stores.filter(store => store.address.city === city);
}

export function getStoresByState(state: string): Store[] {
  return stores.filter(store => store.address.state === state);
}

export function getStoreById(id: string): Store | undefined {
  return stores.find(store => store.id === id);
}

export function getFlagshipStores(): Store[] {
  return stores.filter(store => store.isFlagship);
}

export function getComingSoonStores(): Store[] {
  return stores.filter(store => store.isComingSoon);
}
