// components/ui/card.tsx
import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    hoverable?: boolean
    clickable?: boolean
    bordered?: boolean
    shadow?: "none" | "sm" | "default" | "md" | "lg" | "xl"
    glass?: boolean
    gradient?: boolean
    animation?: "none" | "float" | "glow"
  }
>(({ 
  className, 
  hoverable = false, 
  clickable = false,
  bordered = true,
  shadow = "default",
  glass = false,
  gradient = false,
  animation = "none",
  ...props 
}, ref) => {
  const shadowClasses = {
    none: "shadow-none",
    sm: "shadow-sm",
    default: "shadow",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  }

  const floatAnimation = animation === "float" ? {
    animate: {
      y: [0, -10, 0],
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }
  } : {}

  const glowAnimation = animation === "glow" ? {
    animate: {
      boxShadow: [
        "0 4px 6px -1px rgba(212, 165, 116, 0.1), 0 2px 4px -2px rgba(212, 165, 116, 0.1)",
        "0 4px 6px -1px rgba(212, 165, 116, 0.3), 0 2px 4px -2px rgba(212, 165, 116, 0.2)",
        "0 4px 6px -1px rgba(212, 165, 116, 0.1), 0 2px 4px -2px rgba(212, 165, 116, 0.1)",
      ],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
    }
  } : {}

  return (
    <motion.div
      ref={ref}
      whileHover={hoverable ? { y: -4, transition: { duration: 0.2 } } : {}}
      {...floatAnimation}
      {...glowAnimation}
      className={cn(
        "rounded-xl bg-white text-primary-900 dark:bg-primary-800 dark:text-white",
        bordered && "border border-primary-200 dark:border-primary-700",
        shadowClasses[shadow],
        hoverable && "transition-all duration-300 hover:shadow-xl",
        clickable && "cursor-pointer",
        glass && "backdrop-blur-md bg-white/80 dark:bg-primary-800/80",
        gradient && "bg-gradient-to-br from-white to-primary-50 dark:from-primary-800 dark:to-primary-900",
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    withDivider?: boolean
  }
>(({ className, withDivider = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 p-6",
      withDivider && "border-b border-primary-200 dark:border-primary-700",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  }
>(({ className, as: Component = "h3", ...props }, ref) => (
  <Component
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-primary-600 dark:text-primary-400", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    withDivider?: boolean
  }
>(({ className, withDivider = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6 pt-0",
      withDivider && "border-t border-primary-200 dark:border-primary-700 pt-6",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Stats Card Component
interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  loading?: boolean
}

export const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ title, value, description, icon, trend, loading, className, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
        {loading ? (
          <div className="animate-pulse space-y-4 p-6">
            <div className="h-4 bg-primary-200 dark:bg-primary-700 rounded w-1/4"></div>
            <div className="h-8 bg-primary-200 dark:bg-primary-700 rounded w-1/2"></div>
            <div className="h-3 bg-primary-200 dark:bg-primary-700 rounded w-3/4"></div>
          </div>
        ) : (
          <>
            <div className="absolute top-4 right-4 text-primary-200 dark:text-primary-700">
              {icon}
            </div>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                {title}
              </p>
              <p className="text-3xl font-bold mt-2">
                {value}
              </p>
              {(description || trend) && (
                <div className="flex items-center gap-2 mt-4">
                  {trend && (
                    <span className={cn(
                      "text-sm font-medium",
                      trend.isPositive ? "text-green-600" : "text-red-600"
                    )}>
                      {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                    </span>
                  )}
                  {description && (
                    <p className="text-sm text-primary-500">
                      {description}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </>
        )}
      </Card>
    )
  }
)
StatsCard.displayName = "StatsCard"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }