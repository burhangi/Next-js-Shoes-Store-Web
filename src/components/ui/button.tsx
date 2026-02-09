// components/ui/button.tsx - UPDATED WITH XL SIZE
import * as React from "react"
import { cn } from "@/lib/utils/cn"
import { Slot } from "@radix-ui/react-slot"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export type ButtonVariant = 
  | "default" 
  | "destructive" 
  | "outline" 
  | "secondary" 
  | "ghost" 
  | "link" 
  | "accent" 
  | "success"

export type ButtonSize = "default" | "sm" | "lg" | "xl" | "icon" | "icon-sm"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  pulse?: boolean
  animation?: "none" | "scale" | "bounce" | "slide"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = "default",
    size = "default",
    asChild = false,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    fullWidth = false,
    pulse = false,
    animation = "scale",
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button"

    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

    const variants: Record<ButtonVariant, string> = {
      default: "bg-primary-900 text-white hover:bg-primary-800 shadow-md hover:shadow-lg",
      destructive: "bg-red-600 text-white hover:bg-red-700 shadow-md",
      outline: "border-2 border-primary-300 bg-transparent hover:bg-primary-50 text-primary-900",
      secondary: "bg-primary-100 text-primary-900 hover:bg-primary-200",
      ghost: "hover:bg-primary-100 hover:text-primary-900 text-primary-700",
      link: "text-accent-600 underline-offset-4 hover:underline p-0 h-auto",
      accent: "bg-accent-600 text-white hover:bg-accent-700 shadow-md hover:shadow-lg",
      success: "bg-green-600 text-white hover:bg-green-700 shadow-md",
    }

    const sizes: Record<ButtonSize, string> = {
      default: "h-10 px-6 py-2",
      sm: "h-8 px-4 py-1 text-sm",
      lg: "h-12 px-8 py-3 text-base",
      xl: "h-14 px-10 py-4 text-lg", // Added xl size
      icon: "h-10 w-10 p-0",
      "icon-sm": "h-8 w-8 p-0"
    }

    const buttonContent = (
      <>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </>
    )

    return (
      <motion.div
        initial={false}
        animate={pulse ? { scale: [1, 1.05, 1] } : {}}
        transition={pulse ? { repeat: Infinity, duration: 2 } : {}}
        className={fullWidth ? "w-full" : "inline-block"}
        whileHover={animation === "scale" ? { scale: 1.05 } : animation === "bounce" ? { y: -2 } : animation === "slide" ? { x: 2 } : {}}
        whileTap={animation === "scale" ? { scale: 0.95 } : {}}
      >
        <Comp
          className={cn(
            baseStyles,
            variants[variant],
            sizes[size],
            fullWidth && "w-full",
            className
          )}
          ref={ref}
          disabled={disabled || loading}
          {...props}
        >
          {buttonContent}
        </Comp>
      </motion.div>
    )
  }
)

Button.displayName = "Button"

export { Button }