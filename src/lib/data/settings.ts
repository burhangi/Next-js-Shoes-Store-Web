// 📦 lib/data/settings.ts
export interface GeneralSettings {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  currency: string;
  timezone: string;
  language: string;
  maintenanceMode: boolean;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  orderNotifications: boolean;
  lowStockAlerts: boolean;
  customerReviewAlerts: boolean;
  marketingEmails: boolean;
  newsletterSubscriptions: boolean;
  slackWebhook: string;
  discordWebhook: string;
  telegramWebhook: string;
}

export interface PaymentSettings {
  stripeEnabled: boolean;
  paypalEnabled: boolean;
  razorpayEnabled: boolean;
  stripePublicKey: string;
  stripeSecretKey: string;
  paypalClientId: string;
  razorpayKeyId: string;
  razorpayKeySecret: string;
  currency: string;
  testMode: boolean;
}

export interface ShippingSettings {
  shippingEnabled: boolean;
  flatRate: number;
  freeShippingThreshold: number;
  shippingZones: ShippingZone[];
  pickupLocations: PickupLocation[];
}

export interface ShippingZone {
  id: string;
  name: string;
  countries: string[];
  rate: number;
}

export interface PickupLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export interface TaxSettings {
  taxEnabled: boolean;
  taxInclusive: boolean;
  defaultTaxRate: number;
  taxRates: TaxRate[];
  taxExemptCategories: string[];
}

export interface TaxRate {
  id: string;
  name: string;
  rate: number;
  country: string;
  state?: string;
}

export interface SEOSettings {
  siteTitle: string;
  siteDescription: string;
  metaKeywords: string;
  ogImage: string;
  twitterHandle: string;
  robotsTxt: string;
  sitemapEnabled: boolean;
  googleAnalyticsId: string;
  googleTagManagerId: string;
}

export interface IntegrationSettings {
  googleAnalytics: boolean;
  facebookPixel: boolean;
  mailchimp: boolean;
  sendgrid: boolean;
  twilio: boolean;
  recaptcha: boolean;
  googleAnalyticsId: string;
  facebookPixelId: string;
  mailchimpApiKey: string;
  sendgridApiKey: string;
  twilioSid: string;
  twilioToken: string;
  recaptchaSiteKey: string;
  recaptchaSecretKey: string;
}

export interface SettingsStore {
  general: GeneralSettings;
  notifications: NotificationSettings;
  payment: PaymentSettings;
  shipping: ShippingSettings;
  tax: TaxSettings;
  seo: SEOSettings;
  integrations: IntegrationSettings;
}

// Mock data
export const defaultSettings: SettingsStore = {
  general: {
    storeName: 'ShoeStore Pro',
    storeEmail: 'admin@shoestore.com',
    storePhone: '+1 (555) 123-4567',
    storeAddress: '123 Fashion Street, New York, NY 10001',
    currency: 'USD',
    timezone: 'America/New_York',
    language: 'en',
    maintenanceMode: false,
  },
  notifications: {
    emailNotifications: true,
    orderNotifications: true,
    lowStockAlerts: true,
    customerReviewAlerts: true,
    marketingEmails: false,
    newsletterSubscriptions: true,
    slackWebhook: '',
    discordWebhook: '',
    telegramWebhook: '',
  },
  payment: {
    stripeEnabled: true,
    paypalEnabled: true,
    razorpayEnabled: false,
    stripePublicKey: 'pk_live_51Hx...w4i2',
    stripeSecretKey: 'sk_live_51Hx...w4i2',
    paypalClientId: 'AY...RQ',
    razorpayKeyId: '',
    razorpayKeySecret: '',
    currency: 'USD',
    testMode: false,
  },
  shipping: {
    shippingEnabled: true,
    flatRate: 5.99,
    freeShippingThreshold: 50,
    shippingZones: [
      { id: '1', name: 'United States', countries: ['US'], rate: 5.99 },
      { id: '2', name: 'Canada', countries: ['CA'], rate: 9.99 },
      { id: '3', name: 'Europe', countries: ['GB', 'DE', 'FR', 'IT', 'ES'], rate: 14.99 },
    ],
    pickupLocations: [
      { id: '1', name: 'NYC Store', address: '123 Fashion Street, NY', phone: '+1 (555) 123-4567' },
      { id: '2', name: 'LA Store', address: '456 Sunset Blvd, LA', phone: '+1 (555) 987-6543' },
    ],
  },
  tax: {
    taxEnabled: true,
    taxInclusive: true,
    defaultTaxRate: 8.5,
    taxRates: [
      { id: '1', name: 'California Tax', rate: 8.5, country: 'US', state: 'CA' },
      { id: '2', name: 'New York Tax', rate: 8.875, country: 'US', state: 'NY' },
      { id: '3', name: 'Texas Tax', rate: 6.25, country: 'US', state: 'TX' },
      { id: '4', name: 'Canada GST', rate: 5, country: 'CA' },
    ],
    taxExemptCategories: ['Books', 'Groceries', 'Medicine'],
  },
  seo: {
    siteTitle: 'ShoeStore Pro - Premium Footwear',
    siteDescription: 'Shop the latest collection of premium shoes, sneakers, and boots for men, women, and kids.',
    metaKeywords: 'shoes, sneakers, boots, footwear, fashion',
    ogImage: '/og-image.png',
    twitterHandle: '@shoestorepro',
    robotsTxt: 'User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://shoestore.com/sitemap.xml',
    sitemapEnabled: true,
    googleAnalyticsId: 'UA-123456789-1',
    googleTagManagerId: 'GTM-ABCDEFG',
  },
  integrations: {
    googleAnalytics: true,
    facebookPixel: true,
    mailchimp: false,
    sendgrid: true,
    twilio: false,
    recaptcha: true,
    googleAnalyticsId: 'UA-123456789-1',
    facebookPixelId: '123456789012345',
    mailchimpApiKey: '',
    sendgridApiKey: 'SG.abcdefghijklmnop',
    twilioSid: '',
    twilioToken: '',
    recaptchaSiteKey: '6LcABCdUAAAAABCDEFGHIJKLMNOPQRSTUVWXYZ',
    recaptchaSecretKey: '6LcABCdUAAAAABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
};