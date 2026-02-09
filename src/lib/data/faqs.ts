export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  isPopular?: boolean;
}

export interface FAQCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  { 
    id: 'orders', 
    name: 'Orders & Shipping', 
    icon: '📦',
    description: 'Track, change, or manage your deliveries.'
  },
  { 
    id: 'returns', 
    name: 'Returns & Refunds', 
    icon: '🔄',
    description: 'Returns policy and refund status.'
  },
  { 
    id: 'products', 
    name: 'Product Info', 
    icon: '👟',
    description: 'Sizing, care, and authenticity details.'
  },
  { 
    id: 'account', 
    name: 'My Account', 
    icon: '👤',
    description: 'Profile, security, and preferences.'
  },
  { 
    id: 'payment', 
    name: 'Payments & Security', 
    icon: '💳',
    description: 'Billing, taxes, and data safety.'
  },
];

export const FAQS: FAQ[] = [
  // Orders & Shipping
  {
    id: '1',
    category: 'orders',
    question: 'How do I track my order?',
    answer: 'Once your order ships, you will receive an email with a tracking number. You can also track your order directly on our website through the "Track Order" page in the navigation menu.',
    isPopular: true,
  },
  {
    id: '2',
    category: 'orders',
    question: 'What are your shipping rates and delivery times?',
    answer: 'We offer free express shipping on orders over $150. Standard shipping takes 3-5 business days, while express shipping typically arrives in 1-2 business days.',
    isPopular: true,
  },
  {
    id: '3',
    category: 'orders',
    question: 'Do you ship internationally?',
    answer: 'Yes, we currently ship to over 50 countries worldwide. International shipping rates and times vary by location and will be calculated at checkout.',
  },
  // Returns & Refunds
  {
    id: '4',
    category: 'returns',
    question: 'What is your return policy?',
    answer: 'We accept returns within 30 days of purchase for unused items in their original packaging. Please note that sale items are final sale and cannot be returned.',
    isPopular: true,
  },
  {
    id: '5',
    category: 'returns',
    question: 'How do I start a return?',
    answer: 'To initiate a return, please visit our Returns portal or contact our customer support team with your order number and the reason for the return.',
  },
  {
    id: '6',
    category: 'returns',
    question: 'How long does it take to receive a refund?',
    answer: 'Once we receive and inspect your returned item, your refund will be processed within 5-7 business days. The credit will automatically be applied to your original payment method.',
    isPopular: true,
  },
  // Product Info
  {
    id: '7',
    category: 'products',
    question: 'How do I know what size to order?',
    answer: 'We provide a detailed size guide on every product page. If you are between sizes, we generally recommend sizing up for the best fit.',
    isPopular: true,
  },
  {
    id: '13',
    category: 'products',
    question: 'How should I clean and maintain my shoes?',
    answer: 'For most sneakers, we recommend using a soft brush and mild soapy water. Avoid machine washing or using harsh chemicals. Always air dry away from direct heat or sunlight.',
  },
  {
    id: '8',
    category: 'products',
    question: 'Are your shoes authentic?',
    answer: 'Absolutely. We only sell 100% authentic products sourced directly from the brands and authorized distributors. Every pair comes in its original box with all accompanying tags.',
  },
  // Account
  {
    id: '9',
    category: 'account',
    question: 'How do I create an account?',
    answer: 'Click on the "User" icon in the navigation bar and select "Sign Up". You can create an account using your email address or through your Google/Social accounts.',
  },
  {
    id: '10',
    category: 'account',
    question: 'I forgot my password, what should I do?',
    answer: 'On the login page, click "Forgot Password". We will send you an email with instructions on how to reset your password.',
  },
  // Payment
  {
    id: '11',
    category: 'payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. We also offer interest-free installment plans through Klarna and Afterpay.',
    isPopular: true,
  },
  {
    id: '12',
    category: 'payment',
    question: 'Is my payment information secure?',
    answer: 'Yes, we use industry-standard SSL encryption and secure payment gateways to ensure your data is 100% protected. We never store your full credit card details on our servers.',
  },
  {
    id: '14',
    category: 'orders',
    question: 'Can I change my shipping address after placing an order?',
    answer: 'Yes, you can modify your shipping address within 2 hours of placing your order by contacting our customer support team. After this window, we cannot guarantee changes as the order may already be in fulfillment.',
  },
  {
    id: '15',
    category: 'orders',
    question: 'What if my order arrives damaged?',
    answer: 'We take great care in packaging all items. If your order arrives damaged, please contact us within 48 hours with photos of the damage. We will arrange a replacement or full refund immediately.',
  },
  {
    id: '16',
    category: 'returns',
    question: 'Do I have to pay for return shipping?',
    answer: 'Return shipping is free for defective items or our errors. For size exchanges or change of mind, customers are responsible for return shipping costs unless you have our premium membership.',
  },
  {
    id: '17',
    category: 'products',
    question: 'Do you offer gift wrapping?',
    answer: 'Yes! We offer premium gift wrapping for $5 per item. You can add this option during checkout and include a personalized message card at no extra cost.',
  },
  {
    id: '18',
    category: 'products',
    question: 'How can I tell if shoes will fit me?',
    answer: 'Each product page includes detailed sizing information and customer reviews often mention fit. We also offer free size exchanges within 30 days if the shoes don\'t fit perfectly.',
    isPopular: true,
  },
  {
    id: '19',
    category: 'account',
    question: 'Can I save my favorite items?',
    answer: 'Yes! Create a free account to save items to your wishlist, get personalized recommendations, and receive early access to new releases and exclusive sales.',
  },
  {
    id: '20',
    category: 'account',
    question: 'How do I update my account information?',
    answer: 'Log in to your account, click on "My Profile" and you can update your email, shipping addresses, payment methods, and communication preferences at any time.',
  },
  {
    id: '21',
    category: 'payment',
    question: 'Do you offer buy now, pay later options?',
    answer: 'Yes! We partner with Klarna and Afterpay to offer flexible payment plans. You can split your purchase into 4 interest-free payments at checkout.',
    isPopular: true,
  },
  {
    id: '22',
    category: 'payment',
    question: 'Can I use multiple payment methods for one order?',
    answer: 'Currently, each order can only be paid with one payment method. However, you can use a combination of gift cards and one primary payment method.',
  },
];
