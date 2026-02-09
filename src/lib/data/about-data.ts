import { Award, Heart, Shield, Truck, Users, Globe, Star } from 'lucide-react';

export const aboutStats = [
  { label: 'Verified Shoppers', value: '120K+', icon: Users },
  { label: 'Exclusive Designs', value: '850+', icon: Award },
  { label: 'Global Distribution', value: '65+', icon: Globe },
  { label: 'Customer Satisfaction', value: '99.9%', icon: Star },
];

export const aboutValues = [
  {
    title: 'Artisan Craftsmanship',
    description: 'Every pair in our collection is crafted with meticulous attention to detail, using only the finest premium leathers and sustainable materials.',
    icon: Award,
    color: 'from-amber-500/20 to-amber-600/20',
    iconColor: 'text-amber-600',
  },
  {
    title: 'Concierge Support',
    description: 'We believe in a personalized shopping experience. Our dedicated experts are available 24/7 to help you find your perfect fit.',
    icon: Heart,
    color: 'from-rose-500/20 to-rose-600/20',
    iconColor: 'text-rose-600',
  },
  {
    title: 'Digital Trust',
    description: 'Your security is paramount. We utilize military-grade encryption and secure payment gateways to ensure your data remains private.',
    icon: Shield,
    color: 'from-emerald-500/20 to-emerald-600/20',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'Swift Fulfillment',
    description: 'Our global logistics network ensures that your premium footwear reaches your doorstep with speed and precision, wherever you are.',
    icon: Truck,
    color: 'from-indigo-500/20 to-indigo-600/20',
    iconColor: 'text-indigo-600',
  },
];

export const teamMembers = [
  {
    name: 'Jonathan Sterling',
    role: 'Managing Director',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80',
    bio: 'With over 20 years in luxury retail, Jonathan leads our vision to redefine premium footwear.'
  },
  {
    name: 'Elena Vancour',
    role: 'Director of Design',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80',
    bio: 'Elena\'s eye for timeless aesthetics ensures every collection meets our rigorous luxury standards.'
  },
  {
    name: 'Marcus Thorne',
    role: 'Operations Strategy',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80',
    bio: 'Marcus optimizes our global supply chain to deliver excellence from factory to front door.'
  },
  {
    name: 'Sofia Rossi',
    role: 'Head of Quality Assurance',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80',
    bio: 'Sofia ensures that every stitch and material in our products meets our uncompromising quality criteria.'
  },
];
