// 📦 lib/theme.ts - ENTERPRISE COLOR SYSTEM
export const colors = {
  // Core Brand Colors
  primary: {
    DEFAULT: '#FF6B35',
    dark: '#E85A28',
    light: '#FFF4EF',
    lighter: '#FFE8DD',
    foreground: '#FFFFFF',
  },
  
  secondary: {
    DEFAULT: '#2C3E50',
    dark: '#1A252F',
    light: '#4A5568',
    foreground: '#FFFFFF',
  },
  
  accent: {
    DEFAULT: '#F59E0B',
    light: '#FBBF24',
    dark: '#D97706',
  },
  
  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Neutrals
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Text Colors
  text: {
    primary: '#1A1A1A',
    secondary: '#6B7280',
    muted: '#9CA3AF',
    inverse: '#FFFFFF',
  },

  // Background Colors
  background: {
    DEFAULT: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
  },

  // Border Colors
  border: {
    DEFAULT: '#E5E7EB',
    medium: '#D1D5DB',
    light: '#F3F4F6',
    focus: '#FF6B35',
  }
}

export const gradients = {
  primary: 'linear-gradient(135deg, #FF6B35 0%, #E85A28 100%)',
  primaryGlow: 'linear-gradient(135deg, rgba(255,107,53,0.8) 0%, rgba(232,90,40,0.8) 100%)',
  secondary: 'linear-gradient(135deg, #2C3E50 0%, #1A252F 100%)',
  accent: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  sunset: 'linear-gradient(135deg, #FF6B35 0%, #F59E0B 50%, #FF6B35 100%)',
  fire: 'linear-gradient(135deg, #FF6B35 0%, #EF4444 100%)',
  cool: 'linear-gradient(135deg, #2C3E50 0%, #3B82F6 100%)',
}

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  glow: '0 0 20px rgba(255, 107, 53, 0.3)',
  glowStrong: '0 0 30px rgba(255, 107, 53, 0.5)',
}

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
}

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  spring: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
}

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
}

export default {
  colors,
  gradients,
  shadows,
  spacing,
  breakpoints,
  transitions,
  zIndex,
}