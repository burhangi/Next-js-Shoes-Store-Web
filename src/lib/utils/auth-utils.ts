
import {  MinimalProduct, Product, ProductBadge  } from '../data/products/types'
/**
 * Convert MinimalProduct to full Product with defaults
 */
export function toFullProduct(minimal: MinimalProduct): Product {
  return {
    id: minimal.id,
    slug: minimal.slug || `product-${minimal.id}`,
    name: minimal.name,
    description: minimal.description || '',
    price: minimal.price,
    originalPrice: minimal.originalPrice,
    images: minimal.images || [],
    image: minimal.image || '',
    rating: minimal.rating || 0,
    reviews: minimal.reviews || 0,
    category: minimal.category || '',
    categorySlug: minimal.categorySlug || '',
    brand: minimal.brand,
    isNew: minimal.isNew || false,
    isOnSale: minimal.isOnSale || false,
    isBestSeller: minimal.isBestSeller || false,
    isFeatured: minimal.isFeatured || false,
    discountPercent: minimal.discountPercent,
    stock: minimal.stock,
    stockQuantity: minimal.stockQuantity,
    stockStatus: minimal.stockStatus || 'in_stock',
    tags: minimal.tags || [],
    weight: minimal.weight,
    soldCount: minimal.soldCount || 0, // Added missing property
    colors: minimal.colors || [],
    sizes: minimal.sizes || [],
    dimensions: minimal.dimensions,
    variants: minimal.variants || [],
    features: minimal.features || [],
    specifications: minimal.specifications || {},
    status: minimal.status || 'active',
    createdAt: minimal.createdAt,
    updatedAt: minimal.updatedAt,
    badges: minimal.badges || generateProductBadges(minimal)
  }
}

/**
 * Generate product badges based on product properties
 */
export function generateProductBadges(product: MinimalProduct): ProductBadge[] {
  const badges: ProductBadge[] = []

  if (product.isNew) {
    badges.push({ 
      type: 'new', 
      text: 'NEW', 
      color: 'bg-green-100 text-green-800 border-green-200' 
    })
  }
  if (product.isOnSale) {
    badges.push({ 
      type: 'sale', 
      text: 'SALE', 
      color: 'bg-red-100 text-red-800 border-red-200' 
    })
  }
  if (product.isBestSeller) {
    badges.push({ 
      type: 'bestseller', 
      text: 'BESTSELLER', 
      color: 'bg-purple-100 text-purple-800 border-purple-200' 
    })
  }
  if (product.isFeatured) {
    badges.push({ 
      type: 'featured', 
      text: 'FEATURED', 
      color: 'bg-blue-100 text-blue-800 border-blue-200' 
    })
  }

  return badges
}

/**
 * Format currency with proper symbol
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Truncate text with ellipsis and preserve words
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  
  // Try to cut at the last space before maxLength
  const truncated = text.substring(0, maxLength)
  const lastSpaceIndex = truncated.lastIndexOf(' ')
  
  if (lastSpaceIndex > 0) {
    return text.substring(0, lastSpaceIndex).trim() + '...'
  }
  
  return truncated.trim() + '...'
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Create slug from string
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/**
 * Calculate discount percentage
 */
export function calculateDiscountPercentage(
  originalPrice: number,
  salePrice: number
): number {
  if (!originalPrice || originalPrice <= salePrice) return 0
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

/**
 * Generate random ID for temporary data
 */
export function generateRandomId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

/**
 * Validate phone number
 */
export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  return phoneRegex.test(phone)
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  
  return phone
}

/**
 * Create initials from name
 */
export function createInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

/**
 * Mask email address for privacy
 */
export function maskEmail(email: string): string {
  const [username, domain] = email.split('@')
  if (!username || !domain) return email
  
  const maskedUsername = username.charAt(0) + '*'.repeat(Math.max(0, username.length - 2)) + username.charAt(username.length - 1)
  const [domainName, tld] = domain.split('.')
  
  if (!domainName || !tld) return maskedUsername + '@' + domain
  
  const maskedDomain = domainName.charAt(0) + '*'.repeat(Math.max(0, domainName.length - 2)) + domainName.charAt(domainName.length - 1)
  
  return `${maskedUsername}@${maskedDomain}.${tld}`
}

/**
 * Password strength checker
 */
export function checkPasswordStrength(password: string): {
  score: number
  strength: 'weak' | 'medium' | 'strong'
  feedback: string[]
} {
  const feedback: string[] = []
  let score = 0

  // Length check
  if (password.length >= 8) score++
  else feedback.push('Password should be at least 8 characters')

  // Uppercase check
  if (/[A-Z]/.test(password)) score++
  else feedback.push('Add uppercase letters')

  // Lowercase check
  if (/[a-z]/.test(password)) score++
  else feedback.push('Add lowercase letters')

  // Number check
  if (/\d/.test(password)) score++
  else feedback.push('Add numbers')

  // Special character check
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++
  else feedback.push('Add special characters')

  let strength: 'weak' | 'medium' | 'strong'
  if (score <= 2) {
    strength = 'weak'
  } else if (score <= 4) {
    strength = 'medium'
  } else {
    strength = 'strong'
  }

  return { score, strength, feedback }
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Generate avatar URL or placeholder
 */
export function getAvatarUrl(
  name: string,
  email?: string,
  imageUrl?: string
): string {
  if (imageUrl) return imageUrl
  
  if (email) {
    // Using Gravatar
    const hash = require('crypto')
      .createHash('md5')
      .update(email.trim().toLowerCase())
      .digest('hex')
    return `https://www.gravatar.com/avatar/${hash}?d=mp&s=200`
  }
  
  // Return placeholder with initials
  const initials = createInitials(name)
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    initials
  )}&background=FF6B35&color=fff&size=200`
}

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .trim()
    .substring(0, 1000) // Limit length
}

/**
 * Parse query string parameters
 */
export function parseQueryString(query: string): Record<string, string> {
  return query
    .replace('?', '')
    .split('&')
    .reduce((acc, param) => {
      const [key, value] = param.split('=')
      if (key) {
        acc[key] = decodeURIComponent(value || '')
      }
      return acc
    }, {} as Record<string, string>)
}