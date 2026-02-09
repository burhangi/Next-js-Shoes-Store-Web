import { 
  Package, 
  CreditCard, 
  RefreshCw, 
  User, 
  ShieldCheck, 
  Truck,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  MapPin,
  Gift,
  Star,
  Settings
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface HelpArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  isPopular?: boolean;
  relatedArticles?: string[];
}

export interface HelpCategory {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  articleCount: number;
  color: string;
}

export const helpCategories: HelpCategory[] = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'New to our store? Start here',
    icon: HelpCircle,
    articleCount: 8,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'orders',
    name: 'Orders & Shipping',
    description: 'Track orders and shipping info',
    icon: Package,
    articleCount: 12,
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'returns',
    name: 'Returns & Refunds',
    description: 'Return policy and refund process',
    icon: RefreshCw,
    articleCount: 10,
    color: 'from-orange-500 to-amber-600'
  },
  {
    id: 'account',
    name: 'Account Management',
    description: 'Manage your profile and settings',
    icon: User,
    articleCount: 9,
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'payments',
    name: 'Payments & Security',
    description: 'Payment methods and security',
    icon: CreditCard,
    articleCount: 7,
    color: 'from-rose-500 to-red-600'
  },
  {
    id: 'products',
    name: 'Product Information',
    description: 'Sizing, care, and authenticity',
    icon: Star,
    articleCount: 11,
    color: 'from-cyan-500 to-blue-600'
  }
];

export const helpArticles: HelpArticle[] = [
  // Getting Started
  {
    id: 'how-to-create-account',
    category: 'getting-started',
    title: 'How do I create an account?',
    excerpt: 'Learn how to set up your account in just a few simple steps.',
    content: 'Creating an account is quick and easy! Click on the "Account" icon in the top right corner, then select "Register". Fill in your details including name, email, and password. You can also sign up using your Google or social media accounts for faster registration.',
    isPopular: true,
    relatedArticles: ['how-to-reset-password', 'update-profile']
  },
  {
    id: 'how-to-place-order',
    category: 'getting-started',
    title: 'How do I place my first order?',
    excerpt: 'Step-by-step guide to placing your first order with us.',
    content: 'Browse our collection, add items to cart, review your cart, proceed to checkout, enter shipping and payment information, and confirm your order. You\'ll receive an email confirmation immediately.',
    isPopular: true,
    relatedArticles: ['track-order', 'payment-methods']
  },
  {
    id: 'browse-products',
    category: 'getting-started',
    title: 'How do I browse products?',
    excerpt: 'Tips for finding the perfect shoes for you.',
    content: 'Use our category menu to browse by type (casual, formal, sports), or use the search bar. Apply filters for size, color, brand, and price range to narrow down your options.',
    relatedArticles: ['size-guide', 'product-authenticity']
  },

  // Orders & Shipping
  {
    id: 'track-order',
    category: 'orders',
    title: 'How do I track my order?',
    excerpt: 'Real-time tracking information for your purchase.',
    content: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order by logging into your account and visiting "My Orders". Click on any order to see detailed tracking information and estimated delivery date.',
    isPopular: true,
    relatedArticles: ['shipping-times', 'change-shipping-address']
  },
  {
    id: 'shipping-times',
    category: 'orders',
    title: 'What are the shipping times?',
    excerpt: 'Expected delivery times for different shipping methods.',
    content: 'Standard shipping takes 3-5 business days. Express shipping arrives in 1-2 business days. We offer free express shipping on orders over $150. International shipping times vary by destination (typically 7-14 business days).',
    isPopular: true
  },
  {
    id: 'change-shipping-address',
    category: 'orders',
    title: 'Can I change my shipping address?',
    excerpt: 'How to update your delivery address after ordering.',
    content: 'You can change your shipping address within 2 hours of placing your order by contacting our customer support team. After this window, we cannot guarantee changes as the order may already be in fulfillment.',
    relatedArticles: ['track-order', 'contact-support']
  },
  {
    id: 'international-shipping',
    category: 'orders',
    title: 'Do you ship internationally?',
    excerpt: 'Information about international shipping options.',
    content: 'Yes! We ship to over 65 countries worldwide. International shipping rates and times vary by location and will be calculated at checkout. All duties and taxes are the responsibility of the customer.',
    relatedArticles: ['shipping-times', 'customs-duties']
  },

  // Returns & Refunds
  {
    id: 'return-policy',
    category: 'returns',
    title: 'What is your return policy?',
    excerpt: 'Complete guide to our 30-day return policy.',
    content: 'We accept returns within 30 days of purchase for unused items in their original packaging. Sale items are final sale and cannot be returned. To initiate a return, visit our Returns portal or contact customer support with your order number.',
    isPopular: true,
    relatedArticles: ['start-return', 'refund-timeline']
  },
  {
    id: 'start-return',
    category: 'returns',
    title: 'How do I start a return?',
    excerpt: 'Step-by-step process to return your items.',
    content: 'Log into your account, go to "My Orders", select the order you want to return, click "Return Items", select the items and reason for return, print the return label, and ship the items back to us.',
    isPopular: true,
    relatedArticles: ['return-policy', 'refund-timeline']
  },
  {
    id: 'refund-timeline',
    category: 'returns',
    title: 'When will I receive my refund?',
    excerpt: 'Expected timeline for processing refunds.',
    content: 'Once we receive and inspect your returned item, your refund will be processed within 5-7 business days. The credit will automatically be applied to your original payment method. Bank processing times may vary.',
    relatedArticles: ['return-policy', 'start-return']
  },
  {
    id: 'exchange-items',
    category: 'returns',
    title: 'Can I exchange items?',
    excerpt: 'How to exchange for different size or color.',
    content: 'Yes! Free exchanges are available for size and color changes. Simply initiate a return and place a new order for the item you want. If you have a premium membership, contact support for direct exchange processing.',
    relatedArticles: ['start-return', 'size-guide']
  },

  // Account Management
  {
    id: 'how-to-reset-password',
    category: 'account',
    title: 'How do I reset my password?',
    excerpt: 'Steps to recover your account access.',
    content: 'On the login page, click "Forgot Password". Enter your email address and we\'ll send you instructions to reset your password. Check your spam folder if you don\'t receive the email within 5 minutes.',
    isPopular: true,
    relatedArticles: ['how-to-create-account', 'account-security']
  },
  {
    id: 'update-profile',
    category: 'account',
    title: 'How do I update my profile?',
    excerpt: 'Edit your personal information and preferences.',
    content: 'Log in to your account, click on "Profile Settings", and update your name, email, phone number, or shipping addresses. Don\'t forget to save your changes!',
    relatedArticles: ['how-to-create-account', 'manage-addresses']
  },
  {
    id: 'manage-addresses',
    category: 'account',
    title: 'How do I manage my addresses?',
    excerpt: 'Add, edit, or delete saved shipping addresses.',
    content: 'Go to "My Account" > "Addresses" to add, edit, or delete shipping addresses. You can set a default address for faster checkout.',
    relatedArticles: ['update-profile', 'change-shipping-address']
  },
  {
    id: 'wishlist-management',
    category: 'account',
    title: 'How does the wishlist work?',
    excerpt: 'Save your favorite items for later purchase.',
    content: 'Click the heart icon on any product to add it to your wishlist. Access your wishlist anytime from the navigation menu. You\'ll also receive notifications when wishlist items go on sale!',
    relatedArticles: ['how-to-place-order', 'sale-notifications']
  },

  // Payments & Security
  {
    id: 'payment-methods',
    category: 'payments',
    title: 'What payment methods do you accept?',
    excerpt: 'All available payment options for your purchase.',
    content: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. We also offer interest-free installment plans through Klarna and Afterpay for orders over $100.',
    isPopular: true,
    relatedArticles: ['payment-security', 'installment-plans']
  },
  {
    id: 'payment-security',
    category: 'payments',
    title: 'Is my payment information secure?',
    excerpt: 'Our commitment to protecting your data.',
    content: 'Yes! We use industry-standard SSL encryption and secure payment gateways. We never store your full credit card details on our servers. All transactions are PCI DSS compliant for maximum security.',
    isPopular: true,
    relatedArticles: ['payment-methods', 'account-security']
  },
  {
    id: 'installment-plans',
    category: 'payments',
    title: 'How do installment plans work?',
    excerpt: 'Buy now, pay later with flexible payment options.',
    content: 'Select Klarna or Afterpay at checkout to split your purchase into 4 interest-free payments. Approval is instant, and the first payment is taken at the time of purchase.',
    relatedArticles: ['payment-methods', 'how-to-place-order']
  },

  // Product Information
  {
    id: 'size-guide',
    category: 'products',
    title: 'How do I find my size?',
    excerpt: 'Complete sizing guide for perfect fit.',
    content: 'Check our detailed size guide on every product page. Measure your foot length and width, then match with our sizing chart. If you\'re between sizes, we generally recommend sizing up. Customer reviews often mention fit information too!',
    isPopular: true,
    relatedArticles: ['exchange-items', 'return-policy']
  },
  {
    id: 'product-authenticity',
    category: 'products',
    title: 'Are your products authentic?',
    excerpt: 'Our guarantee of 100% authentic merchandise.',
    content: 'Absolutely! We only sell 100% authentic products sourced directly from brands and authorized distributors. Every pair comes in its original box with all accompanying tags and certificates of authenticity.',
    isPopular: true,
    relatedArticles: ['quality-guarantee', 'warranty-info']
  },
  {
    id: 'care-instructions',
    category: 'products',
    title: 'How do I care for my shoes?',
    excerpt: 'Proper maintenance tips for longevity.',
    content: 'For most sneakers, use a soft brush and mild soapy water. Avoid machine washing or harsh chemicals. Always air dry away from direct heat or sunlight. Leather shoes benefit from regular conditioning and protective sprays.',
    relatedArticles: ['product-authenticity', 'warranty-info']
  },
  {
    id: 'gift-cards',
    category: 'products',
    title: 'Do you offer gift cards?',
    excerpt: 'Perfect gift for shoe lovers.',
    content: 'Yes! Digital gift cards are available in various denominations ($25-$500). They never expire and can be used on any product. You can purchase gift cards from our website and they\'re delivered instantly via email.',
    relatedArticles: ['how-to-place-order', 'payment-methods']
  }
];

export const quickLinks = [
  {
    title: 'Track Your Order',
    description: 'Get real-time updates on your delivery',
    href: '/track',
    icon: MapPin
  },
  {
    title: 'Start a Return',
    description: 'Easy returns within 30 days',
    href: '/returns',
    icon: RefreshCw
  },
  {
    title: 'Size Guide',
    description: 'Find your perfect fit',
    href: '/size-guide',
    icon: Star
  },
  {
    title: 'Contact Support',
    description: 'We\'re here to help 24/7',
    href: '/contact',
    icon: MessageCircle
  }
];

export const contactMethods = [
  {
    method: 'Live Chat',
    description: 'Chat with our support team',
    detail: 'Average response: < 2 minutes',
    icon: MessageCircle,
    color: 'from-green-500 to-emerald-600',
    action: '#chat',
    available: true
  },
  {
    method: 'Phone',
    description: 'Call us directly',
    detail: '+1 (888) 123-4567',
    icon: Phone,
    color: 'from-blue-500 to-indigo-600',
    action: 'tel:+18881234567',
    available: true
  },
  {
    method: 'Email',
    description: 'Send us a message',
    detail: 'support@shoesstore.com',
    icon: Mail,
    color: 'from-orange-500 to-amber-600',
    action: 'mailto:support@shoesstore.com',
    available: true
  },
  {
    method: 'Support Hours',
    description: '24/7 Customer Service',
    detail: 'Always here for you',
    icon: Clock,
    color: 'from-purple-500 to-pink-600',
    action: '#',
    available: true
  }
];
