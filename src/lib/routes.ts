// 📦src/lib/routes.ts - COMPREHENSIVE VERSION
export const routes = {
  // Main Routes
  home: '/',
  
  // Shop Routes
  shop: '/products',
  categories: {
    all: '/categories',
    men: '/categories/men',
    women: '/categories/women',
    kids: '/categories/kids',
    sports: '/categories/sports',
    formal: '/categories/formal',
    casual: '/categories/casual',
  },
  
  // Product Routes
  products: {
    all: '/products',
    newArrivals: '/products/new-arrivals',
    bestSellers: '/products/best-sellers',
    onSale: '/products/on-sale',
    flashDeals: '/products/flash-deals',
    compare: '/products/compare',
  },
  
  // Brand Routes
  brands: {
    all: '/brands',
    nike: '/brands/nike',
    adidas: '/brands/adidas',
    puma: '/brands/puma',
    newBalance: '/brands/new-balance',
    reebok: '/brands/reebok',
    converse: '/brands/converse',
  },
  
  // Account Routes (Protected)
  account: {
    dashboard: '/account',
    orders: '/account/orders',
    wishlist: '/account/wishlist',
    addresses: '/account/addresses',
    paymentMethods: '/account/payment-methods',
    settings: '/account/settings',
    notifications: '/account/notifications',
    reviews: '/account/reviews',
    loyalty: '/account/loyalty',
  },
  
  // Cart & Checkout
  cart: '/cart',
  checkout: {
    main: '/checkout',
    shipping: '/checkout/shipping',
    payment: '/checkout/payment',
    review: '/checkout/review',
    success: '/checkout/success',
  },
  
  // Auth Routes (Public)
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    verifyEmail: '/auth/verify-email',
  },
  
  // Pages (Public)
  pages: {
    about: '/about',
    contact: '/contact',
    help: '/help',
    faq: '/faqs',
    privacy: '/privacy',
    terms: '/terms',
    shipping: '/shipping',
    returns: '/returns',
    sizeGuide: '/size-guide',
    reviews: '/reviews',
    storeLocator: '/store-locator',
  },
  
  // Search
  search: '/search',
  
  // Admin (Protected)
  admin: {
    dashboard: '/admin',
    products: '/admin/products',
    orders: '/admin/orders',
    customers: '/admin/customers',
    analytics: '/admin/analytics',
  },
};

// Navigation helper functions
export const getRoute = {
  product: (slug: string) => `/products/${slug}`,
  category: (slug: string) => `/categories/${slug}`,
  brand: (slug: string) => `/brands/${slug}`,
  checkoutStep: (step: number) => {
    const steps = ['/checkout/shipping', '/checkout/payment', '/checkout/review'];
    return steps[step - 1] || '/checkout';
  },
};

// Route permissions
export const routePermissions = {
  public: [
    routes.home,
    routes.shop,
    routes.products.all,
    routes.products.newArrivals,
    routes.products.bestSellers,
    routes.products.onSale,
    routes.products.flashDeals,
    routes.brands.all,
    routes.categories.all,
    routes.cart,
    routes.auth.login,
    routes.auth.register,
    routes.auth.forgotPassword,
    routes.auth.resetPassword,
    routes.auth.verifyEmail,
    routes.pages.about,
    routes.pages.contact,
    routes.search,
  ],
  protected: [
    routes.account.dashboard,
    routes.account.orders,
    routes.account.wishlist,
    routes.account.addresses,
    routes.account.paymentMethods,
    routes.account.settings,
    routes.checkout.main,
    routes.checkout.shipping,
    routes.checkout.payment,
    routes.checkout.review,
  ],
  admin: [
    routes.admin.dashboard,
    routes.admin.products,
    routes.admin.orders,
    routes.admin.customers,
  ],
};

// Breadcrumb paths
export const breadcrumbPaths = {
  '/': 'Home',
  '/products': 'All Products',
  '/products/new-arrivals': 'New Arrivals',
  '/products/best-sellers': 'Best Sellers',
  '/products/on-sale': 'Sale',
  '/products/flash-deals': 'Flash Deals',
  '/products/compare': 'Compare Products',
  '/brands': 'Brands',
  '/categories': 'Categories',
  '/cart': 'Shopping Cart',
  '/checkout': 'Checkout',
  '/account': 'My Account',
  '/account/orders': 'My Orders',
  '/account/wishlist': 'My Wishlist',
  '/about': 'About Us',
  '/contact': 'Contact Us',
  '/help': 'Help Center',
  '/store-locator': 'Store Locator',
};

// SEO titles for pages
export const pageTitles = {
  '/': 'Luxury Store - Premium Footwear',
  '/products': 'All Products - Luxury Store',
  '/products/new-arrivals': 'New Arrivals - Latest Footwear',
  '/products/best-sellers': 'Best Sellers - Top Rated Shoes',
  '/products/on-sale': 'Sale - Discounted Shoes',
  '/brands': 'Brands - Premium Footwear Brands',
  '/categories': 'Categories - Shop by Category',
  '/account': 'My Account - Luxury Store',
  '/cart': 'Shopping Cart - Luxury Store',
  '/about': 'About Us - Luxury Store Story',
  '/store-locator': 'Store Locator - Find a Store Near You',
};