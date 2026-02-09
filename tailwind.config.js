// tailwind.config.js - UPDATED
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Core Brand Colors
        primary: {
          DEFAULT: '#FF6B35',
          dark: '#E85A28',
          light: '#FFF4EF',
          lighter: '#FFE8DD',
          foreground: '#FFFFFF',
        },
        
        // Secondary Brand Colors
        secondary: {
          DEFAULT: '#2C3E50',
          dark: '#1A252F',    // Added this
          light: '#4A5568',   // Added this
          foreground: '#FFFFFF',
        },
        
        accent: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
        },
        
        // Backgrounds
        background: {
          DEFAULT: '#FFFFFF',
          secondary: '#F8F9FA',
          paper: '#FFFFFF',
        },
        
        // Text
        text: {
          primary: '#1A1A1A',
          secondary: '#6B7280',
          muted: '#9CA3AF',
          inverse: '#FFFFFF',
        },

        // Status
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',

        // Borders
        border: {
          DEFAULT: '#E5E7EB',
          medium: '#D1D5DB',
          focus: '#FF6B35',
        },

        // Shadcn/System Compat
        input: '#E5E7EB',
        ring: '#FF6B35',
        foreground: '#1A1A1A',
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F8F9FA',
          foreground: '#9CA3AF',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A1A1A',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A1A1A',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'elevated': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'button': '0 2px 4px rgba(255, 107, 53, 0.3)',
        'glow': '0 0 20px rgba(255, 107, 53, 0.3)',
        'glow-strong': '0 0 40px rgba(255, 107, 53, 0.6)',
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 107, 53, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 107, 53, 0.6)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}