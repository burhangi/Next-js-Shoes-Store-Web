import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Merge utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date formatting
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}

// String truncation
export function truncateString(str: string, length: number): string {
  return str.length > length ? str.substring(0, length) + '...' : str
}

// ID generation
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Email validation
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Password validation
export function validatePassword(password: string): boolean {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  
  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers
}

// Get initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Capitalize string
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Format currency
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  
  const truncated = text.substring(0, maxLength)
  const lastSpaceIndex = truncated.lastIndexOf(' ')
  
  if (lastSpaceIndex > 0) {
    return text.substring(0, lastSpaceIndex).trim() + '...'
  }
  
  return truncated.trim() + '...'
}

// Debounce function
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

// Check password strength
export function checkPasswordStrength(password: string): {
  score: number;
  strength: 'weak' | 'medium' | 'strong';
  feedback: string[];
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

// Validate phone number
export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  return phoneRegex.test(phone)
}

// Format phone number
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  
  return phone
}

// Sanitize input
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .substring(0, 1000)
}

// Create slug from string
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Calculate discount percentage
export function calculateDiscountPercentage(
  originalPrice: number,
  salePrice: number
): number {
  if (!originalPrice || originalPrice <= salePrice) return 0
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

// Generate avatar URL
export function getAvatarUrl(
  name: string,
  email?: string,
  imageUrl?: string
): string {
  if (imageUrl) return imageUrl
  
  const initials = getInitials(name)
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    initials
  )}&background=FF6B35&color=fff&size=200`
}

// All utility exports
export default {
  cn,
  formatDate,
  truncateString,
  generateId,
  validateEmail,
  validatePassword,
  getInitials,
  capitalize,
  formatCurrency,
  truncateText,
  debounce,
  checkPasswordStrength,
  validatePhoneNumber,
  formatPhoneNumber,
  sanitizeInput,
  createSlug,
  calculateDiscountPercentage,
  getAvatarUrl
}